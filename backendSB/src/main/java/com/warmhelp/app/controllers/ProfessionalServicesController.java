package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.ProfessionalServicesRequest;
import com.warmhelp.app.dtos.auth.UpdateServiceRequest;
import com.warmhelp.app.dtosResponses.ProfessionalServiceResponseDTO;
import com.warmhelp.app.models.ProfessionalServices;
import com.warmhelp.app.services.ProfessionalServicesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professionalServices")
@CrossOrigin("*")
public class ProfessionalServicesController {
    private final ProfessionalServicesService professionalServicesService;

    public ProfessionalServicesController(ProfessionalServicesService professionalServicesService) {
        this.professionalServicesService = professionalServicesService;
    }

    @GetMapping
    public ResponseEntity<List<ProfessionalServiceResponseDTO>> getAllProfessionalServices(){
        return ResponseEntity.ok(this.professionalServicesService.getAllProfessionalServices());
    }

    @PostMapping("/registerService")
    public ResponseEntity<?> registerProfessionalService(@RequestBody ProfessionalServicesRequest professionalServicesRequest){
        try {
            ProfessionalServiceResponseDTO professionalServices = this.professionalServicesService.createProfessionalService(professionalServicesRequest);
            return ResponseEntity.ok(professionalServices);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/{id}/update")
    public ResponseEntity<ProfessionalServices> updateService(@PathVariable Long id, @RequestBody UpdateServiceRequest request){
        ProfessionalServices updateService = professionalServicesService.updateService(id, request);
        return ResponseEntity.ok(updateService);
    }

}
