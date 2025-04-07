package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.ResponseCommentsRequest;
import com.warmhelp.app.dtosResponses.ResponseCommentsResponseDTO;
import com.warmhelp.app.models.ResponseComments;
import com.warmhelp.app.services.ResponseCommentsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/responseComments")
@CrossOrigin("*")
public class ResponseCommentController {
    private final ResponseCommentsService responseCommentsService;

    public ResponseCommentController(ResponseCommentsService responseCommentsService) {
        this.responseCommentsService = responseCommentsService;
    }

    @GetMapping
    public ResponseEntity<List<ResponseCommentsResponseDTO>> getAllResponseComments(){
        return ResponseEntity.ok(this.responseCommentsService.getAllResponseComments());
    }

    @PostMapping("/registerResponseComment")
    public ResponseEntity<?> registerResponseComment(@RequestBody ResponseCommentsRequest responseCommentsRequest){
        try {
            ResponseCommentsResponseDTO responseComments = this.responseCommentsService.createResponseComment(responseCommentsRequest);
            return ResponseEntity.ok(responseComments);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
