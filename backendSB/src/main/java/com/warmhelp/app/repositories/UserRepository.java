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
    // Encontrar un usuario por username
    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    // comprobar si existe un usuario por username
    boolean existsByUsername(String username);

    // Eliminar físicamente un usuario
    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.id = ?1")
    void deleteUserById(Long id);

    // Soft delete (marcar como eliminado)
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.deletedAt = CURRENT_TIMESTAMP WHERE u.id = ?1")
    void softDeleteUser(Long id);
}
