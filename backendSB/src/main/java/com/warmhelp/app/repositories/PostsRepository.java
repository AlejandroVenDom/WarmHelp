package com.warmhelp.app.repositories;

import com.warmhelp.app.models.Posts;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.warmhelp.app.models.UserInfo;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostsRepository extends JpaRepository<Posts, Long> {
    // Encontrar todos los posts de un UserInfo
    List<Posts> findByUserInfo(UserInfo userInfo);

    // Eliminar post (físico)
    @Modifying
    @Transactional
    @Query("DELETE FROM Posts p WHERE p.id = ?1")
    void deletePostById(Long id);

    // Soft delete (marcar como eliminado)
    @Modifying
    @Transactional
    @Query("UPDATE Posts p SET p.deletedAt = CURRENT_TIMESTAMP WHERE p.id = ?1")
    void softDeletePost(Long id);
}
