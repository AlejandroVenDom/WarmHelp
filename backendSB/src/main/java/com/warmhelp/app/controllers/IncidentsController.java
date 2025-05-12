package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.IncidentStateUpdateRequest;
import com.warmhelp.app.dtos.auth.IncidentsRequest;
import com.warmhelp.app.dtosResponses.IncidentResponseDTO;
import com.warmhelp.app.enums.IncidentState;
import com.warmhelp.app.models.Incident;
import com.warmhelp.app.services.IncidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/incidents")
@CrossOrigin("*")
public class IncidentsController {
    private final IncidentService incidentService;

    public IncidentsController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @GetMapping
    public ResponseEntity<List<IncidentResponseDTO>> getAllIncidents(){
        return ResponseEntity.ok(this.incidentService.getAllIncidents());
    }

    @PostMapping("/registerIncident")
    public ResponseEntity<?> registerIncident(@RequestBody IncidentsRequest incidentsRequest){
        try {
            IncidentResponseDTO incident = this.incidentService.createIncident(incidentsRequest);
            return ResponseEntity.ok(incident);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    @PatchMapping("/{id}/update-state")
    public ResponseEntity<Map<String, Object>> updateIncidentState(
            @PathVariable Long id,
            @RequestBody IncidentStateUpdateRequest request) {

        IncidentState newState = request.getNewState();

        try {
            incidentService.updateIncidentState(id, newState);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Estado actualizado correctamente");
            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", e.getMessage());
            error.put("success", false);
            return ResponseEntity.status(400).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIncident(@PathVariable Long id) {
        try {
            incidentService.deleteIncidentById(id);
            return ResponseEntity.ok("Incidencia eliminada correctamente.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("La incidencia con ID " + id + " no existe.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }




}
