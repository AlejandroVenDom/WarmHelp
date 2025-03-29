package com.WebSocket.WebSocket.controller;

import com.WebSocket.WebSocket.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
// @CrossOrigin(origins = "http://localhost:4200")
public class WebSocketController {
 
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage chat(@DestinationVariable String roomId, ChatMessage message){
        System.out.println(message);
        return new ChatMessage(message.getMessage(), message.getUser());
    }
}
