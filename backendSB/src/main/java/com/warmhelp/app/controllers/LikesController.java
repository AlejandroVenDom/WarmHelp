package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.LikeRequest;
import com.warmhelp.app.dtosResponses.LikeResponse;
import com.warmhelp.app.models.Like;
import com.warmhelp.app.models.Posts;
import com.warmhelp.app.models.User;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.PostsRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import com.warmhelp.app.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likes")
@CrossOrigin("*")
public class    LikesController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @PostMapping("/toggle")
    public ResponseEntity<LikeResponse> toggleLike(@RequestBody LikeRequest request){
        Posts post = postsRepository.findById(request.getPostId()).orElseThrow(()->new IllegalArgumentException("post not found"));
        UserInfo user = userInfoRepository.findByUserId(request.getUserId()).orElseThrow(()->new IllegalArgumentException("user not found"));

        boolean wasLiked = likeService.isLikedByUser(user, post);
        likeService.toggleLike(user, post);
        boolean isNowLiked = !wasLiked;

        Long totalLikes = likeService.countLikes(post);
        LikeResponse response = new LikeResponse(isNowLiked, totalLikes);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countLikes(@RequestParam Long id){
        Posts post = postsRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("post not found"));
        return ResponseEntity.ok(likeService.countLikes(post));
    }

    @GetMapping("/isLiked")
    public ResponseEntity<Boolean> isLiked(@RequestParam Long postId, @RequestParam Long userId){
        Posts post = postsRepository.findById(postId).orElseThrow(()->new IllegalArgumentException("post not found"));
        UserInfo user = userInfoRepository.findByUserId(userId).orElseThrow(()->new IllegalArgumentException("user not found"));
        return ResponseEntity.ok(likeService.isLikedByUser(user,post));
    }
}
