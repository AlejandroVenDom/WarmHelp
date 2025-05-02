package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.IncidentsRequest;
import com.warmhelp.app.dtosResponses.IncidentResponseDTO;
import com.warmhelp.app.models.Incident;
import com.warmhelp.app.models.IncidentTypeClass;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.IncidentRepository;
import com.warmhelp.app.repositories.IncidentTypeRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentService {
    private final IncidentRepository incidentRepository;
    private final UserInfoRepository userInfoRepository;
    private final IncidentTypeRepository incidentTypeRepository;

    public IncidentService(IncidentRepository incidentRepository, UserInfoRepository userInfoRepository, IncidentTypeRepository incidentTypeRepository) {
        this.incidentRepository = incidentRepository;
        this.userInfoRepository = userInfoRepository;
        this.incidentTypeRepository = incidentTypeRepository;
    }

    public List<Incident> getAllIncidents(){
        return this.incidentRepository.findAll();
    }



    public Incident createIncident(IncidentsRequest incidentFormFront){

        UserInfo userInfo = this.userInfoRepository.findByUser_Username(incidentFormFront.getUserName())
                .orElseThrow(()->new IllegalArgumentException("Usuario no encontrado en la base de datos"));

        IncidentTypeClass type = this.incidentTypeRepository.findByIncidentType(incidentFormFront.getType())
                .orElseThrow(()->new IllegalArgumentException("Type no encontrado"));

        Incident incident = new Incident();
        incident.setTitle(incidentFormFront.getTitle());
        incident.setDescription(incidentFormFront.getDescription());
        incident.setType(type);
        incident.setUserInfo(userInfo);

        return this.incidentRepository.save(incident);

    }
}
