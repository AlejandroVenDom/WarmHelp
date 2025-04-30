package com.WebSocket.WebSocket.controller;

import com.WebSocket.WebSocket.model.ChatMessage;
import com.WebSocket.WebSocket.model.GroupChat;
import com.WebSocket.WebSocket.model.User;
import com.WebSocket.WebSocket.service.GroupChatService;
import com.WebSocket.WebSocket.service.MessageService;
import com.WebSocket.WebSocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private UserService userService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private GroupChatService groupChatService;

    // Mensaje enviado desde el cliente a "/app/chat.send"
    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        User sender = userService.findByUsername(chatMessage.getSender()).orElse(null);
        if (sender == null) return;

        if (chatMessage.getReceiver() != null) {
            // Chat privado
            User receiver = userService.findByUsername(chatMessage.getReceiver()).orElse(null);
            if (receiver == null) return;

            messageService.sendMessageToUser(sender, receiver, chatMessage.getContent());
            messagingTemplate.convertAndSendToUser(
                    chatMessage.getReceiver(), "/queue/private", chatMessage
            );
        } else if (chatMessage.getGroupId() != null) {
            // Chat grupal
            GroupChat group = groupChatService.getGroupById(chatMessage.getGroupId());
            if (group == null) return;

            messageService.sendMessageToGroup(sender, group, chatMessage.getContent());
            messagingTemplate.convertAndSend(
                    "/topic/group/" + chatMessage.getGroupId(), chatMessage
            );
        }
    }
}