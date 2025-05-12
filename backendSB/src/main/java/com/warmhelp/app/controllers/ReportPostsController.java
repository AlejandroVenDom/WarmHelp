package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.ReportPostRequest;
import com.warmhelp.app.dtos.auth.ReportStateUpdateRequest;
import com.warmhelp.app.dtosResponses.ReportPostDTO;
import com.warmhelp.app.models.ReportPost;
import com.warmhelp.app.services.ReportPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @PatchMapping("/{id}/update-state")
    public ResponseEntity<?> updateReportPostState(@PathVariable Long id, @RequestBody ReportStateUpdateRequest request) {
        try {
            reportPostService.updateReportState(id, request.getNewState());
            return ResponseEntity.ok(Map.of("success", true, "message", "Estado actualizado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("success", false, "message", e.getMessage()));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReportPost(@PathVariable Long id) {
        try {
            reportPostService.deleteReport(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Reporte eliminado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("success", false, "message", e.getMessage()));
        }
    }


}
