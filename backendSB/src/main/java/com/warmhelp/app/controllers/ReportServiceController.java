package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.ReportServicesRequest;
import com.warmhelp.app.dtos.auth.ReportStateUpdateRequest;
import com.warmhelp.app.dtosResponses.ReportServiceResponseDTO;
import com.warmhelp.app.models.ReportService;
import com.warmhelp.app.services.ReportServicesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reports-services")
@CrossOrigin("*")
public class ReportServiceController {
    private final ReportServicesService reportService;

    public ReportServiceController(ReportServicesService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public ResponseEntity<List<ReportServiceResponseDTO>> getAllReports(){
        return ResponseEntity.ok(this.reportService.getAllReports());
    }

    @PostMapping("/register-report-service")
    public ResponseEntity<?> registerReport(@RequestBody ReportServicesRequest request){
        try {
            ReportServiceResponseDTO responseDTO = this.reportService.createdReportForService(request);
            return ResponseEntity.ok(reportService);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    @PatchMapping("/{id}/update-state")
    public ResponseEntity<?> updateReportServiceState(@PathVariable Long id, @RequestBody ReportStateUpdateRequest request) {
        try {
            reportService.updateReportState(id, request.getNewState());
            return ResponseEntity.ok(Map.of("success", true, "message", "Estado actualizado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("success", false, "message", e.getMessage()));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReportService(@PathVariable Long id) {
        try {
            reportService.deleteReport(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Reporte eliminado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("success", false, "message", e.getMessage()));
        }
    }



}
