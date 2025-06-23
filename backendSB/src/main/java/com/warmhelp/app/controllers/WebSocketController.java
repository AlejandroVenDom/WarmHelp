package com.warmhelp.app.controllers;

import com.warmhelp.app.exceptions.ChatNotFoundException;
import com.warmhelp.app.models.Message;
import com.warmhelp.app.services.ChatService;
import com.warmhelp.app.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.Date;

@Controller
@CrossOrigin(origins = "*")
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.send")
    public void send(Message message) {
        Message saved = messageService.sendMessage(message.getChat().getId(), message.getSender().getId(), message.getContent());
        messagingTemplate.convertAndSend("/topic/chat." + message.getChat().getId(), saved);
    }

    @MessageMapping("/chat.sendMessage") // cliente envía a /app/chat.sendMessage
    public void sendMessage(Message message) throws Exception, ChatNotFoundException {
        // Fija la fecha/hora actual
        message.setTimestamp(LocalDateTime.now());

        // Guarda el mensaje en la base de datos asociado al chat
        chatService.addMessageToChat(message, message.getChat().getId());

        // Envía el mensaje solo a los usuarios suscritos a este chat específico
        messagingTemplate.convertAndSend("/topic/chat." + message.getChat().getId(), message);
    }

}
