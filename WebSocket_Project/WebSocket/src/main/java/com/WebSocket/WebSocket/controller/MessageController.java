package com.WebSocket.WebSocket.controller;

import com.WebSocket.WebSocket.model.GroupChat;
import com.WebSocket.WebSocket.model.Message;
import com.WebSocket.WebSocket.model.User;
import com.WebSocket.WebSocket.service.GroupChatService;
import com.WebSocket.WebSocket.service.MessageService;
import com.WebSocket.WebSocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;
    private final UserService userService;
    private final GroupChatService groupChatService;

    @Autowired
    public MessageController(MessageService messageService, UserService userService, GroupChatService groupChatService) {
        this.messageService = messageService;
        this.userService = userService;
        this.groupChatService = groupChatService;
    }

    // Enviar mensaje privado
    @PostMapping("/private")
    public ResponseEntity<Message> sendPrivateMessage(@RequestParam String senderUsername,
                                                      @RequestParam String receiverUsername,
                                                      @RequestParam String content) {
        User sender = userService.findByUsername(senderUsername).orElse(null);
        User receiver = userService.findByUsername(receiverUsername).orElse(null);

        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().build();
        }

        Message message = messageService.sendMessageToUser(sender, receiver, content);
        return ResponseEntity.ok(message);
    }

    // Enviar mensaje a un grupo
    @PostMapping("/group")
    public ResponseEntity<Message> sendGroupMessage(@RequestParam String senderUsername,
                                                    @RequestParam Long groupId,
                                                    @RequestParam String content) {
        User sender = userService.findByUsername(senderUsername).orElse(null);
        GroupChat group = groupChatService.getGroupById(groupId);

        if (sender == null || group == null) {
            return ResponseEntity.badRequest().build();
        }

        Message message = messageService.sendMessageToGroup(sender, group, content);
        return ResponseEntity.ok(message);
    }

    // Obtener mensajes entre dos usuarios
    @GetMapping("/private")
    public ResponseEntity<List<Message>> getPrivateMessages(@RequestParam String senderUsername,
                                                            @RequestParam String receiverUsername) {
        User sender = userService.findByUsername(senderUsername).orElse(null);
        User receiver = userService.findByUsername(receiverUsername).orElse(null);

        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Message> messages = messageService.getMessagesBetweenUsers(sender, receiver);
        return ResponseEntity.ok(messages);
    }

    // Obtener mensajes de un grupo
    @GetMapping("/group")
    public ResponseEntity<List<Message>> getGroupMessages(@RequestParam Long groupId) {
        GroupChat group = groupChatService.getGroupById(groupId);

        if (group == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Message> messages = messageService.getMessagesInGroup(group);
        return ResponseEntity.ok(messages);
    }
}
