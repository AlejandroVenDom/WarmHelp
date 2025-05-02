package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.ReportPostRequest;
import com.warmhelp.app.dtosResponses.ReportPostDTO;
import com.warmhelp.app.models.ReportPost;
import com.warmhelp.app.services.ReportPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports-posts")
@CrossOrigin("*")
public class ReportPostsController {
    private final ReportPostService reportPostService;

    public ReportPostsController(ReportPostService reportPostService) {
        this.reportPostService = reportPostService;
    }

    @GetMapping
    public ResponseEntity<List<ReportPostDTO>> getAllReports(){
        return ResponseEntity.ok(this.reportPostService.getAllReports());
    }

    @PostMapping("/register-report-post")
    public ResponseEntity<?> registerReport(@RequestBody ReportPostRequest reportPostRequest){
        try {
            ReportPostDTO report = this.reportPostService.createReportForPost(reportPostRequest);
            return ResponseEntity.ok(report);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
