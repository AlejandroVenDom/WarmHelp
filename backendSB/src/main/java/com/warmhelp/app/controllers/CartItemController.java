package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.CartItemRequestDTO;
import com.warmhelp.app.dtosResponses.CartItemResponseDTO;
import com.warmhelp.app.models.CartItem;
import com.warmhelp.app.services.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart-items")
@CrossOrigin("*")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @PostMapping
    public CartItem createCartItem(@RequestBody CartItemRequestDTO dto){
        return cartItemService.createCartItem(dto);
    }

    @GetMapping
    public List<CartItemResponseDTO> getAllCartItems(){
        return cartItemService.getAllCartItems();
    }


}
