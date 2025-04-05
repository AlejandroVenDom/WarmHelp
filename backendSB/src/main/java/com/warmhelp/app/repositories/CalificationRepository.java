package com.warmhelp.app.repositories;

import com.warmhelp.app.enums.CalificationType;
import com.warmhelp.app.models.Calification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CalificationRepository extends JpaRepository<Calification,Long> {
    Optional<Calification> findByCalificationType(CalificationType calificationType);
}
