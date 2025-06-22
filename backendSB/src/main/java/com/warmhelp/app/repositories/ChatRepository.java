package com.warmhelp.app.repositories;

import com.warmhelp.app.models.Chat;
import com.warmhelp.app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByFirstUser(User user);

    List<Chat> findBySecondUser(User user);

    Optional<Chat> findByFirstUserAndSecondUser(User firstUser, User secondUser);

    Optional<Chat> findBySecondUserAndFirstUser(User secondUser, User firstUser);

    // Si deseas encontrar todos los chats donde un usuario participa:
    List<Chat> findByFirstUserOrSecondUser(User user1, User user2);

    @Query("SELECT c FROM Chat c JOIN c.participants p WHERE :participants MEMBER OF c.participants GROUP BY c.id HAVING COUNT(c.participants) = :size")
    Optional<Chat> findByParticipants(@Param("participants") Set<User> participants, @Param("size") long size);

    @Query("SELECT c FROM Chat c WHERE (c.firstUser.id = :id1 AND c.secondUser.id = :id2) OR (c.firstUser.id = :id2 AND c.secondUser.id = :id1)")
    Optional<Chat> findChatBetweenUsers(@Param("id1") Long id1, @Param("id2") Long id2);

    List<Chat> findByParticipants_Id(Long userId);
}
