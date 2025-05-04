package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.CartRequestDTO;
import com.warmhelp.app.dtosResponses.CartsResponse;
import com.warmhelp.app.models.Cart;
import com.warmhelp.app.models.CartItem;
import com.warmhelp.app.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/carts")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartsResponse>> getAllCarts(){
        return ResponseEntity.ok(this.cartService.getAllCarts());
    }

    @PostMapping
    public Cart createCart(@RequestBody CartRequestDTO cartRequestDTO){
        return cartService.createCartFromDTO(cartRequestDTO);
    }

    @GetMapping("/{id}")
    public Cart getCartById(@PathVariable Long id){
        Optional<Cart> cart = cartService.getCartById(id);
        return cart.orElse(null);
    }


    public Cart removeItemFromCart(@PathVariable Long cartId, @PathVariable Long cartItemId){
        return cartService.removeItemFromCart(cartId, cartItemId);
    }
}
