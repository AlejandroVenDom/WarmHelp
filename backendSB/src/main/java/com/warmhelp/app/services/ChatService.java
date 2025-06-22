package com.warmhelp.app.services;

import com.warmhelp.app.exceptions.ChatNotFoundException;
import com.warmhelp.app.exceptions.NoChatExistsInTheRepository;
import com.warmhelp.app.models.Chat;
import com.warmhelp.app.models.Message;
import com.warmhelp.app.models.User;
import com.warmhelp.app.repositories.ChatRepository;
import com.warmhelp.app.repositories.MessageRepository;
import com.warmhelp.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Chat addChat(Chat chat) {
        Long firstUserId = chat.getFirstUser().getId();
        Long secondUserId = chat.getSecondUser().getId();

        User firstUser = userRepository.findById(firstUserId)
                .orElseThrow(() -> new RuntimeException("First user not found"));

        User secondUser = userRepository.findById(secondUserId)
                .orElseThrow(() -> new RuntimeException("Second user not found"));

        chat.setFirstUser(firstUser);
        chat.setSecondUser(secondUser);

        return chatRepository.save(chat);
    }
    public Chat createChatWithUsers(Set<Long> userIds) {
        Set<User> participants = userIds.stream()
                .map(id -> userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found: " + id)))
                .collect(Collectors.toSet());

        Optional<Chat> existing = chatRepository.findByParticipants(participants, participants.size());
        return existing.orElseGet(() -> {
            Chat chat = new Chat();
            chat.setParticipants(participants);
            return chatRepository.save(chat);
        });
    }
    public List<Chat> getChatsByUser(Long userId) {
        return chatRepository.findByParticipants_Id(userId);
    }
    public Chat getOrCreateChat(String username1, String username2) {
        User user1 = userRepository.findByUsername(username1)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username1));
        User user2 = userRepository.findByUsername(username2)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username2));

        // Intentar encontrar un chat existente (en cualquier orden)
        Optional<Chat> existingChat = getChatBetweenUsers(user1, user2);

        if (existingChat.isPresent()) {
            return existingChat.get();
        }

        // Si no existe, creamos un nuevo chat
        Chat newChat = new Chat();
        newChat.setFirstUser(user1);
        newChat.setSecondUser(user2);

        Set<User> participants = new HashSet<>();
        participants.add(user1);
        participants.add(user2);
        newChat.setParticipants(participants);

        return chatRepository.save(newChat);
    }

    public Chat getChat(Long chatId) {
        return chatRepository.findById(chatId).orElseThrow(() -> new RuntimeException("Chat not found"));
    }
    public Message addMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getAllMessagesInChat(Long chatId) throws NoChatExistsInTheRepository {
        Optional<Chat> chat = chatRepository.findById(chatId);
        if (chat.isEmpty()) {
            throw new NoChatExistsInTheRepository();
        }
        return chat.get().getMessageList();
    }

    public List<Chat> findAllChats() throws NoChatExistsInTheRepository {
        List<Chat> chats = chatRepository.findAll();
        if (chats.isEmpty()) {
            throw new NoChatExistsInTheRepository();
        }
        return chats;
    }

    public Chat getById(Long id) throws ChatNotFoundException {
        return chatRepository.findById(id)
                .orElseThrow();
    }

    public List<Chat> getChatsByUser(User user) throws ChatNotFoundException {
        List<Chat> chats = chatRepository.findByFirstUserOrSecondUser(user, user);
        if (chats.isEmpty()) throw new ChatNotFoundException("Chat not found");
        return chats;
    }

    public Optional<Chat> getChatBetweenUsers(User user1, User user2) {
        Optional<Chat> chat = chatRepository.findByFirstUserAndSecondUser(user1, user2);
        if (chat.isEmpty()) {
            chat = chatRepository.findBySecondUserAndFirstUser(user1, user2);
        }
        return chat;
    }

    public Chat addMessageToChat(Message message, Long chatId) throws ChatNotFoundException {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ChatNotFoundException("Chat not found"));

        message.setChat(chat); // ✅ Asignar el chat al mensaje
        messageRepository.save(message);

        chat.getMessageList().add(message);
        return chatRepository.save(chat);
    }

}
