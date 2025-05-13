package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.CartRequestDTO;
import com.warmhelp.app.dtosResponses.CartItemResponseDTO;
import com.warmhelp.app.dtosResponses.CartsResponse;
import com.warmhelp.app.models.Cart;
import com.warmhelp.app.models.CartItem;
import com.warmhelp.app.models.ProfessionalServices;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.CartItemRepository;
import com.warmhelp.app.repositories.CartRepository;
import com.warmhelp.app.repositories.ProfessionalServicesRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import com.warmhelp.app.repositories.ProfessionalServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProfessionalServicesRepository professionalServicesRepository;

    public List<CartsResponse> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();

        return carts.stream().map(cart -> {
            List<CartItemResponseDTO> itemResponseDTOS = cart.getItems()
                    .stream()
                    .map(item -> new CartItemResponseDTO(
                            item.getId(),
                            cart.getUserInfo().getUser().getUsername(),
                            item.getQuantity(),
                            item.getPrice(),
                            item.getTotalPrice(),
                            item.getProfessionalServices().getId(),
                            item.getProfessionalServices().getTitle(),
                            item.getProfessionalServices().getDescription(),
                            item.getProfessionalServices().getImage(),
                            item.getProfessionalServices().getCurrency().getCurrencyType().name(),
                            item.getCreatedAt(),
                            item.getUpdatedAt()
                    ))
                    .collect(Collectors.toList());

            BigDecimal totalPrice = itemResponseDTOS.stream()
                    .map(CartItemResponseDTO::getTotalPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            return new CartsResponse(
                    cart.getId(),
                    cart.getUserInfo().getUser().getUsername(),
                    itemResponseDTOS,
                    totalPrice,
                    cart.getCreatedAt(),
                    cart.getUpdatedAt()
            );
        }).collect(Collectors.toList());
    }

    public Cart createCartFromDTO(CartRequestDTO cartRequestDTO) {
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findById(cartRequestDTO.getUserInfoId());
        if (optionalUserInfo.isEmpty()) return null;

        Cart cart = new Cart();
        cart.setUserInfo(optionalUserInfo.get());
        cart = cartRepository.save(cart);

        List<CartItem> items = cartRequestDTO.getCartItemsIds().stream()
                .map(cartItemRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());

        for (CartItem item : items) {
            item.setCart(cart);
            cartItemRepository.save(item);
        }

        cart.setItems(items);
        cart.updateTotalPrice();
        return cartRepository.save(cart);
    }

    public Optional<Cart> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    public Cart removeItemFromCart(Long cartId, Long cartItemId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isEmpty()) return null;

        Cart cart = optionalCart.get();
        cart.getItems().removeIf(item -> item.getId().equals(cartItemId));
        cartItemRepository.deleteById(cartItemId);
        cart.updateTotalPrice();
        return cartRepository.save(cart);
    }

    public CartItem addOrUpdateCartItem(Long cartId, Long serviceId, int quantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        Optional<ProfessionalServices> optionalService = professionalServicesRepository.findById(serviceId);

        if (optionalCart.isEmpty() || optionalService.isEmpty()) throw new RuntimeException("Datos inválidos");

        Cart cart = optionalCart.get();
        ProfessionalServices service = optionalService.get();

        for (CartItem item : cart.getItems()) {
            if (item.getProfessionalServices().getId().equals(serviceId)) {
                item.setQuantity(item.getQuantity() + quantity);
                item.setPrice(service.getPrice()); // Actualiza precio por si cambió
                item.setTotalPrice(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
                cartItemRepository.save(item);
                cart.updateTotalPrice();
                cartRepository.save(cart);
                return item;
            }
        }

        CartItem newItem = new CartItem();
        newItem.setCart(cart);
        newItem.setProfessionalServices(service);
        newItem.setQuantity(quantity);
        newItem.setPrice(service.getPrice());
        newItem.setTotalPrice(service.getPrice().multiply(BigDecimal.valueOf(quantity)));

        CartItem savedItem = cartItemRepository.save(newItem);
        cart.getItems().add(savedItem);
        cart.updateTotalPrice();
        cartRepository.save(cart);

        return savedItem;
    }
    public boolean updateCartItemQuantity(Long cartItemId, int newQuantity) {
        Optional<CartItem> optionalItem = cartItemRepository.findById(cartItemId);
        if (optionalItem.isEmpty()) throw new RuntimeException("Item no encontrado");

        CartItem item = optionalItem.get();
        Cart cart = item.getCart();

        if (newQuantity <= 0) {
            cart.getItems().remove(item);
            cartItemRepository.deleteById(cartItemId);
            cart.updateTotalPrice();
            cartRepository.save(cart);
            return true; // Indica que el ítem fue eliminado
        }

        item.setQuantity(newQuantity);
        item.setTotalPrice(item.getPrice().multiply(BigDecimal.valueOf(newQuantity)));
        cartItemRepository.save(item);

        cart.updateTotalPrice();
        cartRepository.save(cart);

        return false; // El ítem fue actualizado, no eliminado
    }
    public boolean clearAllItemsFromCart(Long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isEmpty()) return false;

        Cart cart = optionalCart.get();

        // Elimina los ítems del repositorio
        for (CartItem item : new ArrayList<>(cart.getItems())) {
            cartItemRepository.deleteById(item.getId());
        }

        cart.getItems().clear();
        cart.updateTotalPrice();
        cartRepository.save(cart);

        return true;
    }


}
