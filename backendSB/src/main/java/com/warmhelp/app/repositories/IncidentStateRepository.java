package com.warmhelp.app.repositories;

import com.warmhelp.app.enums.IncidentState;
import com.warmhelp.app.models.IncidentStateClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IncidentStateRepository extends JpaRepository<IncidentStateClass, Long> {
    Optional<IncidentStateClass> findByIncidentState(IncidentState state);
}
