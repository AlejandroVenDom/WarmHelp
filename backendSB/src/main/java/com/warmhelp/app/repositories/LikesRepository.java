package com.warmhelp.app.repositories;

import com.warmhelp.app.models.Like;
import com.warmhelp.app.models.Posts;
import com.warmhelp.app.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Like, Long> {
    boolean existsByUserInfoAndPost(UserInfo userInfo, Posts posts);
    void deleteByUserInfoAndPost(UserInfo userInfo, Posts posts);
    long countByPost(Posts posts);
}
