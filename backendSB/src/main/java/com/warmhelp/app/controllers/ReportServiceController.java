package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.ReportServicesRequest;
import com.warmhelp.app.dtosResponses.ReportServiceResponseDTO;
import com.warmhelp.app.models.ReportService;
import com.warmhelp.app.services.ReportServicesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

}
