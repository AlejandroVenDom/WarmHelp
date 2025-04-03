package com.tienda.app.dtos.auth;

public class LoginRequest {

    /*
    * {
    * username: 'Camilo',
    * password: '12345'
    * }
    * */

    private String username;
    private String password;

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
}
