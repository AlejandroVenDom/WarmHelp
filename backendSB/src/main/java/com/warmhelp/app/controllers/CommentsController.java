package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.CommentsRequest;
import com.warmhelp.app.models.Comments;
import com.warmhelp.app.services.CommentsService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin("*")
public class CommentsController {
    private final CommentsService commentsService;

    public CommentsController(CommentsService commentsService) {
        this.commentsService = commentsService;
    }

    @GetMapping
    public ResponseEntity<List<Comments>> getAllComments(){
        return ResponseEntity.ok(this.commentsService.getAllComments());
    }

    @PostMapping("/registerComment")
    public ResponseEntity<?> registerComment(@RequestBody CommentsRequest commentsRequest){
        try{
            Comments comments = this.commentsService.createComment(commentsRequest);
            return ResponseEntity.ok(comments);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }


}
