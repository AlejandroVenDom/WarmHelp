package com.warmhelp.app.repositories;

import com.warmhelp.app.models.User;
import com.warmhelp.app.models.UserInfo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    boolean existsByUsername(String username);

    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.id = ?1")
    void deleteUserById(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.deletedAt = CURRENT_TIMESTAMP WHERE u.id = ?1")
    void softDeleteUser(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.username = :newUsername WHERE u.id = :id")
    void updateUsername(Long id, String newUsername);
}
