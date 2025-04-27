package com.WebSocket.WebSocket.service;

import com.WebSocket.WebSocket.model.GroupChat;
import com.WebSocket.WebSocket.model.Message;
import com.WebSocket.WebSocket.model.User;
import com.WebSocket.WebSocket.repository.MessageRepository;
import com.WebSocket.WebSocket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // Enviar un mensaje privado entre dos usuarios
    public Message sendMessageToUser(User sender, User receiver, String content) {
        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setTimestamp(java.time.LocalDateTime.now());
        return messageRepository.save(message);
    }

    // Enviar un mensaje a un grupo
    public Message sendMessageToGroup(User sender, GroupChat group, String content) {
        Message message = new Message();
        message.setSender(sender);
        message.setGroup(group);
        message.setContent(content);
        message.setTimestamp(java.time.LocalDateTime.now());
        return messageRepository.save(message);
    }

    // Obtener mensajes privados entre dos usuarios
    public List<Message> getMessagesBetweenUsers(User sender, User receiver) {
        return messageRepository.findBySenderAndReceiver(sender, receiver);
    }

    // Obtener mensajes de un grupo
    public List<Message> getMessagesInGroup(GroupChat group) {
        return messageRepository.findByGroup(group);
    }
}
