package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.ChatRequest;
import com.warmhelp.app.exceptions.ChatAlreadyExistException;
import com.warmhelp.app.exceptions.ChatNotFoundException;
import com.warmhelp.app.exceptions.NoChatExistsInTheRepository;
import com.warmhelp.app.models.Chat;
import com.warmhelp.app.models.Message;
import com.warmhelp.app.models.User;
import com.warmhelp.app.repositories.ChatRepository;
import com.warmhelp.app.services.ChatService;
import com.warmhelp.app.services.UserServiceChat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserServiceChat userService;

    // ✅ Crear un nuevo chat con lista de IDs de usuarios
    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestBody ChatRequest request) {
        Chat chat = chatService.createChatWithUsers(request.getUserIds());
        return ResponseEntity.ok(chat);
    }

    // ✅ Obtener chats por ID de usuario
    @GetMapping("/user/id/{userId}")
    public ResponseEntity<List<Chat>> getChatsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(chatService.getChatsByUser(userId));
    }

    // ✅ Obtener chats por username
    @GetMapping("/user/username/{username}")
    public ResponseEntity<List<Chat>> getChatsByUsername(@PathVariable String username) throws ChatNotFoundException {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new ChatNotFoundException("User not found"));
        List<Chat> chats = chatService.getChatsByUser(user);
        return ResponseEntity.ok(chats);
    }

    // ✅ Obtener un chat por ID
    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> getChatById(@PathVariable Long chatId) throws ChatNotFoundException {
        Chat chat = chatService.getById(chatId);
        return ResponseEntity.ok(chat);
    }

    // ✅ Obtener chat entre dos usuarios
    @PostMapping("/between")
    public ResponseEntity<Chat> getOrCreateChat(@RequestBody Map<String, String> users) {
        String username1 = users.get("user1");
        String username2 = users.get("user2");

        if (username1 == null || username2 == null) {
            return ResponseEntity.badRequest().build();
        }

        Chat chat = chatService.getOrCreateChat(username1, username2);
        return ResponseEntity.ok(chat);
    }


//    @GetMapping("/between")
//    public ResponseEntity<Chat> getChatBetweenUsers(@RequestParam String user1, @RequestParam String user2) throws ChatNotFoundException {
//        User firstUser = userService.findByUsername(user1)
//                .orElseThrow(() -> new ChatNotFoundException("User1 not found"));
//        User secondUser = userService.findByUsername(user2)
//                .orElseThrow(() -> new ChatNotFoundException("User2 not found"));
//
//        Optional<Chat> chatOpt = chatService.getChatBetweenUsers(firstUser, secondUser);
//        Chat chat = chatOpt.orElseThrow(() -> new ChatNotFoundException("Chat not found"));
//
//        return ResponseEntity.ok(chat);
//    }

    // ✅ Agregar un mensaje a un chat
    @PostMapping("/{chatId}/messages")
    public ResponseEntity<Chat> addMessageToChat(@PathVariable Long chatId, @RequestBody Message message) throws ChatNotFoundException {
        Chat updatedChat = chatService.addMessageToChat(message, chatId);
        return ResponseEntity.ok(updatedChat);
    }

    // ✅ Obtener mensajes de un chat
    @GetMapping("/{chatId}/messages")
    public ResponseEntity<List<Message>> getMessagesFromChat(@PathVariable Long chatId) throws NoChatExistsInTheRepository {
        List<Message> messages = chatService.getAllMessagesInChat(chatId);
        return ResponseEntity.ok(messages);
    }
}
