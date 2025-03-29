package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.enums.RoleType;

public class RegisterRequest {

    private String username;
    private String password;
    private RoleType roleType;
    private String first_name;
    private String last_name;
    private String address;
    private String number;
    private String email;

    public RegisterRequest(
            String username,
            String password,
            String first_name,
            String last_name,
            String address,
            String number,
            String email,
            RoleType roleType
    ){
        this.username = username;
        this.address = address;
        this.email = email;
        this.last_name = last_name;
        this.first_name = first_name;
        this.number = number;
        this.roleType = roleType;
        this.password = password;
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

    public RoleType getRoleType() {
        return roleType;
    }

    public void setRoleType(RoleType roleType) {
        this.roleType = roleType;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
