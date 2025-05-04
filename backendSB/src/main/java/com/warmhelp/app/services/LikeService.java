package com.warmhelp.app.services;

import com.warmhelp.app.models.Like;
import com.warmhelp.app.models.Posts;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.LikesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    @Autowired
    private LikesRepository likesRepository;

    @Transactional
    public void toggleLike(UserInfo userInfo, Posts post){
        if(likesRepository.existsByUserInfoAndPost(userInfo,post)){
            likesRepository.deleteByUserInfoAndPost(userInfo,post);
        }else {
            Like like = new Like();
            like.setUserInfo(userInfo);
            like.setPost(post);
            likesRepository.save(like);
        }
    }

    public Long countLikes(Posts post){
        return likesRepository.countByPost(post);
    }

    public boolean isLikedByUser(UserInfo userInfo, Posts post){
        return likesRepository.existsByUserInfoAndPost(userInfo, post);
    }
}
