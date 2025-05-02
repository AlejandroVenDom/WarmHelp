package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.IncidentsRequest;
import com.warmhelp.app.models.Incident;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.IncidentRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentService {
    private final IncidentRepository incidentRepository;
    private final UserInfoRepository userInfoRepository;

    public IncidentService(IncidentRepository incidentRepository, UserInfoRepository userInfoRepository) {
        this.incidentRepository = incidentRepository;
        this.userInfoRepository = userInfoRepository;
    }

    public List<Incident> getAllIncidents(){
        return this.incidentRepository.findAll();
    }

    public Incident createIncident(IncidentsRequest incidentFormFront){

        UserInfo userInfo = this.userInfoRepository.findByUser_Username(incidentFormFront.getUserName())
                .orElseThrow(()->new IllegalArgumentException("Usuario no encontrado en la base de datos"));

        Incident incident = new Incident();
        incident.setTitle(incidentFormFront.getTitle());
        incident.setDescription(incidentFormFront.getDescription());
        incident.setType(incidentFormFront.getType());
        incident.setUserInfo(userInfo);

        return this.incidentRepository.save(incident);

    }
}
