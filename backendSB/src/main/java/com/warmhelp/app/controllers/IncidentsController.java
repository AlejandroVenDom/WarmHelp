package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.IncidentsRequest;
import com.warmhelp.app.models.Incident;
import com.warmhelp.app.services.IncidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/incidents")
@CrossOrigin("*")
public class IncidentsController {
    private final IncidentService incidentService;

    public IncidentsController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @GetMapping
    public ResponseEntity<List<Incident>> getAllIncidents(){
        return ResponseEntity.ok(this.incidentService.getAllIncidents());
    }

    @PostMapping("/registerIncident")
    public ResponseEntity<?> registerIncident(@RequestBody IncidentsRequest incidentsRequest){
        try {
            Incident incident = this.incidentService.createIncident(incidentsRequest);
            return ResponseEntity.ok(incident);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
