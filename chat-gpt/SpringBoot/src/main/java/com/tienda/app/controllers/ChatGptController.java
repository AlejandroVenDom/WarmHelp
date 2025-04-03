package com.tienda.app.controllers;

import com.tienda.app.dtos.auth.ChatRequest;
import com.tienda.app.models.ChatGptMessage;
import com.tienda.app.services.ChatGptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin("*")
public class ChatGptController {

    private final ChatGptService chatGptService;

    public ChatGptController(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @PostMapping
    public ResponseEntity<ChatGptMessage> askChat(@RequestBody ChatRequest request) {
        ChatGptMessage message = chatGptService.sendQuestion(request.getQuestion());
        return ResponseEntity.ok(message);
    }
    @GetMapping("/history")
    public ResponseEntity<List<ChatGptMessage>> getHistory() {
        List<ChatGptMessage> history = chatGptService.getHistory();
        return ResponseEntity.ok(history);
    }
    @DeleteMapping("/history")
    public ResponseEntity<Void> deleteAllMessages() {
        chatGptService.deleteAllMessages();
        return ResponseEntity.noContent().build();
    }



}