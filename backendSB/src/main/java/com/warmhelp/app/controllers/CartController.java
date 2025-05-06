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
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/carts")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartsResponse>> getAllCarts() {
        return ResponseEntity.ok(this.cartService.getAllCarts());
    }

    @PostMapping
    public Cart createCart(@RequestBody CartRequestDTO cartRequestDTO) {
        return cartService.createCartFromDTO(cartRequestDTO);
    }

    @GetMapping("/{id}")
    public Cart getCartById(@PathVariable Long id) {
        Optional<Cart> cart = cartService.getCartById(id);
        return cart.orElse(null);
    }

    @DeleteMapping("/{cartId}/items/{cartItemId}")
    public ResponseEntity<Cart> removeItem(@PathVariable Long cartId, @PathVariable Long cartItemId) {
        Cart updated = cartService.removeItemFromCart(cartId, cartItemId);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{cartId}/add-item")
    public ResponseEntity<CartItem> addOrUpdateItem(
            @PathVariable Long cartId,
            @RequestBody Map<String, Object> payload
    ) {
        Long serviceId = Long.valueOf(payload.get("serviceId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());
        CartItem item = cartService.addOrUpdateCartItem(cartId, serviceId, quantity);
        return ResponseEntity.ok(item);
    }
    @PatchMapping("/items/{cartItemId}/quantity")
    public ResponseEntity<?> updateCartItemQuantity(
            @PathVariable Long cartItemId,
            @RequestBody Map<String, Integer> payload
    ) {
        int newQuantity = payload.get("quantity");
        boolean deleted = cartService.updateCartItemQuantity(cartItemId, newQuantity);

        if (deleted) {
            return ResponseEntity.noContent().build(); // 204 sin cuerpo
        }

        return ResponseEntity.ok().build(); // 200 OK
    }
}
