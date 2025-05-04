package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.PostsRequest;
import com.warmhelp.app.dtos.auth.UpdatePostRequest;
import com.warmhelp.app.dtosResponses.PostsResponseDTO;
import com.warmhelp.app.models.Posts;
import com.warmhelp.app.services.PostsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@CrossOrigin("*")
public class PostsController {

    private final PostsService postsService;

    public PostsController(PostsService postsService) {
        this.postsService = postsService;
    }

    @GetMapping
    public ResponseEntity<List<PostsResponseDTO>> getAllPosts(){
        return ResponseEntity.ok(this.postsService.getAllPosts());
    }

    @PostMapping("/registerPost")
    public ResponseEntity<?> registerPost(@RequestBody PostsRequest postsRequest){
        try{
            Posts posts = this.postsService.createPost(postsRequest);
            return ResponseEntity.ok(posts);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/{id}/update")
    public ResponseEntity<Posts> updatePost(@PathVariable Long id, @RequestBody UpdatePostRequest request){
        Posts updatePost = postsService.updatePost(id, request);
        return ResponseEntity.ok(updatePost);
    }

}
