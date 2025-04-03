package com.tienda.app.repositories;

import com.tienda.app.models.ChatGptMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatGptRepository extends JpaRepository<ChatGptMessage, Long> {
    List<ChatGptMessage> findAllByOrderByCreatedAtAsc();
    void deleteAll();
}
