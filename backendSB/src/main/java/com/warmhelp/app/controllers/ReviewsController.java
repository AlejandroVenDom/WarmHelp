package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.ReviewsRequest;
import com.warmhelp.app.dtosResponses.ReviewResponseDTO;
import com.warmhelp.app.models.Reviews;
import com.warmhelp.app.services.ReviewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin("*")
public class ReviewsController {
    private final ReviewsService reviewsService;

    public ReviewsController(ReviewsService reviewsService) {
        this.reviewsService = reviewsService;
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> getAllReviews(){
        return ResponseEntity.ok(this.reviewsService.getAllReviews());
    }

    @PostMapping("/registerReview")
    public ResponseEntity<?> registerReview(@RequestBody ReviewsRequest reviewsRequest){
        try {
            ReviewResponseDTO reviewsResponse = this.reviewsService.createReview(reviewsRequest);
            return ResponseEntity.ok(reviewsResponse);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }


}
