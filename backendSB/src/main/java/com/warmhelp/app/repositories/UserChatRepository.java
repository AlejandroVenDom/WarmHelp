package com.warmhelp.app.repositories;

import com.warmhelp.app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserChatRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
