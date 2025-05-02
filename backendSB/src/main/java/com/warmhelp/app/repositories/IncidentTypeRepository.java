package com.warmhelp.app.repositories;

import com.warmhelp.app.enums.IncidentType;
import com.warmhelp.app.models.IncidentTypeClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IncidentTypeRepository extends JpaRepository<IncidentTypeClass,Long> {
    Optional<IncidentTypeClass> findByIncidentType(IncidentType type);
}
