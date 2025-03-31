package com.warmhelp.app.repositories;

import com.warmhelp.app.models.Comments;
import com.warmhelp.app.models.ResponseComments;
import com.warmhelp.app.models.UserInfo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponseCommentsRespository extends JpaRepository<ResponseComments, Long> {
    List<ResponseComments> findByComments(Comments comments);

    List<ResponseComments> findByUserInfo(UserInfo userInfo);

    @Modifying
    @Transactional
    @Query("DELETE FROM ResponseComments c WHERE c.id = ?1")
    void deleteResponseCommentById(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE ResponseComments c SET c.deletedAt = CURRENT_TIMESTAMP WHERE c.id = ?1")
    void softDeleteResponseComment(Long id);
}
