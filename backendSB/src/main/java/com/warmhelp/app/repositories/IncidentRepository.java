package com.warmhelp.app.repositories;

import com.warmhelp.app.enums.IncidentState;
import com.warmhelp.app.enums.IncidentType;
import com.warmhelp.app.models.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {

    List<Incident> findByState(IncidentState state);

    List<Incident> findByType(IncidentType type);

    List<Incident> findByUserInfoId(Long id);
}
