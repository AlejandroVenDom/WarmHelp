package com.WebSocket.WebSocket.dto;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String username;
    private String password;
}
