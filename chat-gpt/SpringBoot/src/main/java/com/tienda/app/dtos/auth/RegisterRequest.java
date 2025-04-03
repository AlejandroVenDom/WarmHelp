package com.tienda.app.dtos.auth;

import com.tienda.app.enums.RoleName;

public class RegisterRequest {

    private String username;
    private String password;
    private RoleName roleName;
    private String firstName;
    private String lastName;
    private String address;

    public RegisterRequest(String username, String password, RoleName roleName, String firstName, String lastName, String address) {
        this.username = username;
        this.password = password;
        this.roleName = roleName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleName getRoleName() {
        return roleName;
    }

    public void setRoleName(RoleName roleName) {
        this.roleName = roleName;
    }

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
