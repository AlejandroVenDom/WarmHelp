package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.IncidentsRequest;
import com.warmhelp.app.dtosResponses.IncidentResponseDTO;
import com.warmhelp.app.enums.IncidentState;
import com.warmhelp.app.models.Incident;
import com.warmhelp.app.models.IncidentStateClass;
import com.warmhelp.app.models.IncidentTypeClass;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.IncidentRepository;
import com.warmhelp.app.repositories.IncidentStateRepository;
import com.warmhelp.app.repositories.IncidentTypeRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncidentService {
    private final IncidentRepository incidentRepository;
    private final UserInfoRepository userInfoRepository;
    private final IncidentTypeRepository incidentTypeRepository;
    private final IncidentStateRepository incidentStateRepository;

    public IncidentService(IncidentRepository incidentRepository, UserInfoRepository userInfoRepository, IncidentTypeRepository incidentTypeRepository, IncidentStateRepository incidentStateRepository) {
        this.incidentRepository = incidentRepository;
        this.userInfoRepository = userInfoRepository;
        this.incidentTypeRepository = incidentTypeRepository;
        this.incidentStateRepository = incidentStateRepository;
    }

    public List<IncidentResponseDTO> getAllIncidents(){
        List<Incident> incidents = this.incidentRepository.findAll();

        return incidents.stream()
                .map(incident -> {

                    String state = incident.getState() != null ? incident.getState().getIncidentState().name() : null;

                    return new IncidentResponseDTO(
                            incident.getId(),
                            incident.getTitle(),
                            incident.getDescription(),
                            incident.getType().getIncidentType().name(),
                            state,
                            incident.getUserInfo().getUser().getUsername(),
                            incident.getCreatedAt(),
                            incident.getUpdatedAt(),
                            incident.getDeletedAt()
                    );
                })
                .collect(Collectors.toList());
    }
    public void updateIncidentState(Long incidentId, IncidentState newState) {
        Incident incident = incidentRepository.findById(incidentId)
                .orElseThrow(() -> new IllegalArgumentException("Incidencia no encontrada"));

        IncidentStateClass stateClass = incidentStateRepository.findByIncidentState(newState)
                .orElseThrow(() -> new IllegalArgumentException("Estado no encontrado en base de datos"));

        incident.setState(stateClass);
        incidentRepository.save(incident);
    }

    public void deleteIncidentById(Long id) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Incidencia no encontrada"));
        incidentRepository.delete(incident);
    }




    public IncidentResponseDTO createIncident(IncidentsRequest incidentFormFront){

        IncidentStateClass defaultState = this.incidentStateRepository
                .findByIncidentState(IncidentState.PENDIENTE)
                .orElseThrow(()-> new IllegalArgumentException("Estado PENDIENTE no encontrado"));

        UserInfo userInfo = this.userInfoRepository.findByUser_Username(incidentFormFront.getUserName())
                .orElseThrow(()->new IllegalArgumentException("Usuario no encontrado en la base de datos"));

        IncidentTypeClass type = this.incidentTypeRepository.findByIncidentType(incidentFormFront.getType())
                .orElseThrow(()->new IllegalArgumentException("Type no encontrado"));

        Incident incident = new Incident();
        incident.setTitle(incidentFormFront.getTitle());
        incident.setDescription(incidentFormFront.getDescription());
        incident.setType(type);
        incident.setUserInfo(userInfo);
        incident.setState(defaultState);

        Incident saveIncident = this.incidentRepository.save(incident);

        return new IncidentResponseDTO(
                saveIncident.getId(),
                saveIncident.getTitle(),
                incident.getDescription(),
                incident.getType().getIncidentType().name(),
                incident.getState() != null ? saveIncident.getState().getIncidentState().name() : null,
                incident.getUserInfo().getUser().getUsername(),
                incident.getCreatedAt(),
                incident.getUpdatedAt(),
                incident.getDeletedAt()
        );

    }
}
