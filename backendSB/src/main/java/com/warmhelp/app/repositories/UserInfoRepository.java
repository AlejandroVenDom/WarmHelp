package com.warmhelp.app.repositories;

import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByUserId(Long userId);

    Optional<UserInfo> findByUser_Username(String username);

    Optional<UserInfo> findByUser(User user);

    // Eliminar todos los comentarios de un usuario
    @Modifying
    @Transactional
    @Query("DELETE FROM Comments c WHERE c.userInfo.id = ?1")
    void deleteAllCommentsByUserInfoId(Long id);

    // Eliminar todos los posts de un usuario
    @Modifying
    @Transactional
    @Query("DELETE FROM Posts p WHERE p.userInfo.id = ?1")
    void deleteAllPostsByUserInfoId(Long id);

    // Soft delete (marcar como eliminado)
    @Modifying
    @Transactional
    @Query("UPDATE UserInfo u SET u.deletedAt = CURRENT_TIMESTAMP WHERE u.id = ?1")
    void softDeleteUserInfo(Long id);
}
