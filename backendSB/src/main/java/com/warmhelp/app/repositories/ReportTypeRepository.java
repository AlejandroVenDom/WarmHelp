package com.warmhelp.app.repositories;

import com.warmhelp.app.enums.ReportType;
import com.warmhelp.app.models.ReportTypeClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportTypeRepository extends JpaRepository<ReportTypeClass, Long> {
    Optional<ReportTypeClass> findByReportType(ReportType type);
}
