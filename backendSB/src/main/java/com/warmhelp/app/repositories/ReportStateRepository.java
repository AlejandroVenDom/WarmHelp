package com.warmhelp.app.repositories;

import com.warmhelp.app.enums.ReportState;
import com.warmhelp.app.models.ReportStateClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportStateRepository extends JpaRepository<ReportStateClass, Long> {
    Optional<ReportStateClass> findByReportState(ReportState state);

}
