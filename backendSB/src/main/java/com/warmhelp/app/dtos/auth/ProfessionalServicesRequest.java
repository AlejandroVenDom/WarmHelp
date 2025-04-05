package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.enums.CurrencyType;

import java.math.BigDecimal;

public class ProfessionalServicesRequest {

    private String title;
    private String description;
    private String image;
    private BigDecimal price;
    private Double tax;
    private CurrencyType currencyType;
    private String userName;

    public ProfessionalServicesRequest(String title, String description, String image, BigDecimal price, Double tax, CurrencyType currencyType, String userName) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.price = price;
        this.tax = tax;
        this.currencyType = currencyType;
        this.userName= userName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public CurrencyType getCurrencyType() {
        return currencyType;
    }

    public void setCurrencyType(CurrencyType currencyType) {
        this.currencyType = currencyType;
    }
}
