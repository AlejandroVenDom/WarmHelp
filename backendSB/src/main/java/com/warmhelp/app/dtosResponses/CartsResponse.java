package com.warmhelp.app.dtosResponses;

import com.warmhelp.app.models.CartItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class CartsResponse {
    private Long cartId;
    private String userName;
    private List<CartItem> items;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public CartsResponse(Long cartId, String userName, List<CartItem> items, BigDecimal totalPrice, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.cartId = cartId;
        this.userName = userName;
        this.items = items;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
