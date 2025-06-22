package com.warmhelp.app.services;

import com.warmhelp.app.exceptions.MessageNotFoundException;
import com.warmhelp.app.models.Chat;
import com.warmhelp.app.models.Message;
import com.warmhelp.app.models.User;
import com.warmhelp.app.repositories.MessageRepository;
import com.warmhelp.app.repositories.UserChatRepository;
import com.warmhelp.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserChatRepository userChatRepository;

    public Message sendMessage(Long chatId, Long senderId, String content) {
        Chat chat = chatService.getChat(chatId);
        User sender = userChatRepository.findById(senderId).orElseThrow(() -> new RuntimeException("User not found"));

        Message message = new Message();
        message.setChat(chat);
        message.setSender(sender);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());

        return messageRepository.save(message);
    }

    public List<Message> getMessages(Long chatId) {
        return messageRepository.findByChatIdOrderByTimestampAsc(chatId);
    }
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public Message getMessageById(Long id) throws MessageNotFoundException {
        Optional<Message> message = messageRepository.findById(id);
        if (message.isEmpty()) {
            throw new MessageNotFoundException("Message with id " + id + " not found");
        }
        return message.get();
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public void deleteMessage(Long id) throws MessageNotFoundException {
        if (!messageRepository.existsById(id)) {
            throw new MessageNotFoundException("Message with id " + id + " not found");
        }
        messageRepository.deleteById(id);
    }

}
