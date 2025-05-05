package com.warmhelp.app.dtosResponses;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class CartItemResponseDTO {
    private Long cartItemId;
    private String username;
    private int quantity;
    private BigDecimal priceUd;
    private BigDecimal totalPrice;
    private Long serviceId;
    private String serviceTitle;
    private String serviceDescription;
    private String image;
    private String currency;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CartItemResponseDTO(Long cartItemId, String username, int quantity, BigDecimal priceUd, BigDecimal totalPrice, Long serviceId, String serviceTitle, String serviceDescription, String image, String currency, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.cartItemId = cartItemId;
        this.username = username;
        this.quantity = quantity;
        this.priceUd = priceUd;
        this.totalPrice = totalPrice;
        this.serviceId = serviceId;
        this.serviceTitle = serviceTitle;
        this.serviceDescription = serviceDescription;
        this.image = image;
        this.currency = currency;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }



    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPriceUd() {
        return priceUd;
    }

    public void setPriceUd(BigDecimal priceUd) {
        this.priceUd = priceUd;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceTitle() {
        return serviceTitle;
    }

    public void setServiceTitle(String serviceTitle) {
        this.serviceTitle = serviceTitle;
    }

    public String getServiceDescription() {
        return serviceDescription;
    }

    public void setServiceDescription(String serviceDescription) {
        this.serviceDescription = serviceDescription;
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
