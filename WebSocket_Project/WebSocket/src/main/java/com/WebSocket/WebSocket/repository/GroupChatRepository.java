package com.WebSocket.WebSocket.repository;
import com.WebSocket.WebSocket.model.GroupChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface GroupChatRepository extends JpaRepository<GroupChat, Long> {

}
