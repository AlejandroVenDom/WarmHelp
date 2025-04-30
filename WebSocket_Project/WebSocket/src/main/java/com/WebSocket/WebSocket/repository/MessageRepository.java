package com.WebSocket.WebSocket.repository;

import com.WebSocket.WebSocket.model.GroupChat;
import com.WebSocket.WebSocket.model.Message;
import com.WebSocket.WebSocket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    // Mensajes entre dos usuarios
    List<Message> findBySenderAndReceiver(User sender, User receiver);

    // Mensajes enviados a un grupo
    List<Message> findByGroup(GroupChat group);
}