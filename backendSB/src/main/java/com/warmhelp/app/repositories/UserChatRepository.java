package com.warmhelp.app.repositories;

import com.warmhelp.app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserChatRepository extends JpaRepository<User, String> {
}
