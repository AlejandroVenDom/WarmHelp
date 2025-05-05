package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.PostsRequest;
import com.warmhelp.app.dtos.auth.UpdatePostRequest;
import com.warmhelp.app.dtosResponses.PostsResponseDTO;
import com.warmhelp.app.models.Posts;
import com.warmhelp.app.services.PostsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePostById(@PathVariable Long id){
        try {
            postsService.deletePostById(id);
            return ResponseEntity.ok("delete correctly");
        } catch (
                IllegalArgumentException e
        ){
            return ResponseEntity.notFound().build();
        }
    }

    // Importante que los valores coincidan con los valores de ANGULAR del formDATA
    @PostMapping("/uploadPostWithImage")
    public ResponseEntity<?> uploadPostWithImage(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("username") String username,
            @RequestParam("image") MultipartFile image
    ){
        return postsService.createPostWithImage(title, description, username, image);
    }


}
