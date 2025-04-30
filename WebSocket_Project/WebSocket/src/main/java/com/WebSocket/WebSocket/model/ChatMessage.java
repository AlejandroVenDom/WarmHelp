package com.WebSocket.WebSocket.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    private String type; // "CHAT", "JOIN", "LEAVE"
    private String sender;
    private String receiver; // para chats privados
    private String content;
    private Long groupId; // para chats grupales
}