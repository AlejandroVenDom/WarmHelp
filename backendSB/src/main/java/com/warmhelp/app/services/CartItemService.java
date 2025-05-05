package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.CartItemRequestDTO;
import com.warmhelp.app.dtosResponses.CartItemResponseDTO;
import com.warmhelp.app.models.Cart;
import com.warmhelp.app.models.CartItem;
import com.warmhelp.app.models.ProfessionalServices;
import com.warmhelp.app.repositories.CartItemRepository;
import com.warmhelp.app.repositories.CartRepository;
import com.warmhelp.app.repositories.ProfessionalServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProfessionalServicesRepository professionalServicesRepository;

    @Autowired
    private CartRepository cartRepository;

    public CartItem createCartItem(CartItemRequestDTO dto){
        Optional<ProfessionalServices> optionalProfessionalServices = professionalServicesRepository.findById(dto.getServiceId());
        if(optionalProfessionalServices.isEmpty()){
            throw new RuntimeException("Service not found with ID: " + dto.getServiceId());
        }

        ProfessionalServices service = optionalProfessionalServices.get();

        Optional<Cart> optionalCart = cartRepository.findById(dto.getCartId());
        Cart cart = optionalCart.orElseGet(()->{
            Cart newCart = new Cart();
            return cartRepository.save(newCart);
        });


        CartItem cartItem = new CartItem();
        cartItem.setProfessionalServices(service);
        cartItem.setQuantity(dto.getQuantity());
        cartItem.setPrice(service.getPrice());

        BigDecimal quantityAsBigDecimal = new BigDecimal(dto.getQuantity());
        BigDecimal totalPrice = service.getPrice().multiply(quantityAsBigDecimal);
        cartItem.setTotalPrice(totalPrice);
        cartItem.setCart(cart);

        CartItem savedCartItem = cartItemRepository.save(cartItem);

        cart.getItems().add(savedCartItem);
        cart.updateTotalPrice();
        cartRepository.save(cart);

        return cartItemRepository.save(cartItem);
    }

    public List<CartItemResponseDTO> getAllCartItems(){
        List<CartItem> cartItems = cartItemRepository.findAll();

        return cartItems
                .stream()
                .map(cartItem -> {
                    return new CartItemResponseDTO(
                            cartItem.getId(),
                            cartItem.getCart().getUserInfo().getUser().getUsername(),
                            cartItem.getQuantity(),
                            cartItem.getPrice(),
                            cartItem.getTotalPrice(),
                            cartItem.getProfessionalServices().getId(),
                            cartItem.getProfessionalServices().getTitle(),
                            cartItem.getProfessionalServices().getDescription(),
                            cartItem.getProfessionalServices().getImage(),
                            cartItem.getProfessionalServices().getCurrency().getCurrencyType().name(),
                            cartItem.getCreatedAt(),
                            cartItem.getUpdatedAt()
                    );
                }).collect(Collectors.toList());
    }
}
