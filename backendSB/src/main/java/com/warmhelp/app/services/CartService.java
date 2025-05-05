package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.CartRequestDTO;
import com.warmhelp.app.dtosResponses.CartItemResponseDTO;
import com.warmhelp.app.dtosResponses.CartsResponse;
import com.warmhelp.app.models.Cart;
import com.warmhelp.app.models.CartItem;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.CartItemRepository;
import com.warmhelp.app.repositories.CartRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public List<CartsResponse> getAllCarts(){
        List<Cart> carts = cartRepository.findAll();

        return carts.stream().map(cart -> {
            List<CartItemResponseDTO> itemResponseDTOS = cart.getItems()
                    .stream()
                    .map(item->
                        new CartItemResponseDTO(
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
                        )
                    ).collect(Collectors.toList());

            BigDecimal totalPrice = itemResponseDTOS.stream()
                    .map(CartItemResponseDTO::getTotalPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);


            String userName = cart.getUserInfo().getUser().getUsername();

            return new CartsResponse(
                    cart.getId(),
                    userName,
                    itemResponseDTOS,
                    totalPrice,
                    cart.getCreatedAt(),
                    cart.getUpdatedAt()
            );
        }).collect(Collectors.toList());
    }

    public Cart createCartFromDTO(CartRequestDTO cartRequestDTO){
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

        for (CartItem item : items){
            item.setCart(cart);
            cartItemRepository.save(item);
        }

        cart.setItems(items);
        cart.updateTotalPrice();
        cartRepository.save(cart);
        return cart;
    }

    public Optional<Cart> getCartById(Long id){
        return cartRepository.findById(id);
    }



    public Cart removeItemFromCart(Long cartId, Long cartItemId){
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()){
            Cart cart = optionalCart.get();
            CartItem cartItemToRemove = null;
            for (CartItem item: cart.getItems()){
                if (item.getId().equals(cartItemId)){
                    cartItemToRemove = item;
                    break;
                }
            }
            if (cartItemToRemove!=null){
                cart.getItems().remove(cartItemToRemove);
                cartItemRepository.delete(cartItemToRemove);
                cart.updateTotalPrice();
                return cartRepository.save(cart);
            }
        }
        return null;
    }

}
