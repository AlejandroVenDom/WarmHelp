package com.WebSocket.WebSocket.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDto {
    private Long id;
    private String content;
    private LocalDateTime timestamp;

    private Long senderId;
    private String senderUsername;

    private Long receiverId; // null si es grupo
    private Long groupId;
}
