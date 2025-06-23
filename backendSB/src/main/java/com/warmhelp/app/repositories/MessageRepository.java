package com.warmhelp.app.repositories;

import com.warmhelp.app.models.Chat;
import com.warmhelp.app.models.Message;
import com.warmhelp.app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatOrderByTimestampAsc(Chat chat);

    // Obtener todos los mensajes enviados por un usuario
    List<Message> findBySender(User sender);

    // Obtener todos los mensajes de un chat enviados por un usuario específico
    List<Message> findByChatAndSenderOrderByTimestampAsc(Chat chat, User sender);

    List<Message> findByChatIdOrderByTimestampAsc(Long chatId);

}
