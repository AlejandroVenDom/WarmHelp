package com.tienda.app.dtos.auth;

import com.tienda.app.enums.RoleName;


/*
* Retornar al front
*
* {
* token: "sdhgdfsbw435",
* username: "Camilo",
* role: "Admin"
* }
*
* */
public class LoginResponse {

    private String token;

    private String username;

    private RoleName role;


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    private String firstName;  // Nuevo campo
    private String lastName;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public RoleName getRole() {
        return role;
    }

    public void setRole(RoleName role) {
        this.role = role;
    }

    private String address;

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }



}
