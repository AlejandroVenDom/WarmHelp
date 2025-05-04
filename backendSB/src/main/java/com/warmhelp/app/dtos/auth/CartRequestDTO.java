package com.warmhelp.app.dtos.auth;


import java.util.List;

public class CartRequestDTO {
    private Long userInfoId;
    private List<Long> cartItemsIds;

    public Long getUserInfoId() {
        return userInfoId;
    }

    public void setUserInfoId(Long userInfoId) {
        this.userInfoId = userInfoId;
    }

    public List<Long> getCartItemsIds() {
        return cartItemsIds;
    }

    public void setCartItemsIds(List<Long> cartItemsIds) {
        this.cartItemsIds = cartItemsIds;
    }
}
