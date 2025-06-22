package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.SendMessageRequest;
import com.warmhelp.app.exceptions.MessageNotFoundException;
import com.warmhelp.app.models.Message;
import com.warmhelp.app.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "http://localhost:4200")
public class MessageController {

    @Autowired
    private MessageService messageService;

    // Mantén solo un método principal para enviar mensajes
    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody SendMessageRequest request) {
        Message message = messageService.sendMessage(request.getChatId(), request.getSenderId(), request.getContent());
        return ResponseEntity.ok(message);
    }

    // Si necesitas guardar mensajes directamente (por ejemplo en pruebas), usa una ruta diferente
    @PostMapping("/raw")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        Message savedMessage = messageService.saveMessage(message);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long chatId) {
        return ResponseEntity.ok(messageService.getMessages(chatId));
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<Message> getMessageById(@PathVariable Long messageId) throws MessageNotFoundException {
        Message message = messageService.getMessageById(messageId);
        return ResponseEntity.ok(message);
    }

    @GetMapping
    public ResponseEntity<List<Message>> getAllMessages() {
        List<Message> messages = messageService.getAllMessages();
        return ResponseEntity.ok(messages);
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long messageId) throws MessageNotFoundException {
        messageService.deleteMessage(messageId);
        return ResponseEntity.ok("Message deleted successfully");
    }
}
