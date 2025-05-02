package com.warmhelp.app.repositories;

import com.warmhelp.app.models.Posts;
import com.warmhelp.app.models.ReportPost;
import com.warmhelp.app.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportPostsRepository extends JpaRepository<ReportPost, Long> {
    List<ReportPost> findByPost(Posts post);
    List<ReportPost> findByUserInfo(UserInfo userInfo);

}
