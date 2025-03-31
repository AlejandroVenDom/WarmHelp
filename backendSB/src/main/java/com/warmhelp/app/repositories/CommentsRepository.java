package com.warmhelp.app.repositories;

import com.warmhelp.app.models.Comments;
import com.warmhelp.app.models.Posts;
import com.warmhelp.app.models.UserInfo;
import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {

    // Encontrar comentarios por Post
    List<Comments> findByPost(Posts post);

    // Encontrar comentarios por UserInfo
    List<Comments> findByUserInfo(UserInfo userInfo);

    // Eliminar comentario (físico)
    @Modifying
    @Transactional
    @Query("DELETE FROM Comments c WHERE c.id = ?1")
    void deleteCommentById(Long id);

    // Soft delete (marcar como eliminado)
    @Modifying
    @Transactional
    @Query("UPDATE Comments c SET c.deletedAt = CURRENT_TIMESTAMP WHERE c.id = ?1")
    void softDeleteComment(Long id);



}
