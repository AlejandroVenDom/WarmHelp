package com.warmhelp.app.repositories;

import com.warmhelp.app.models.ProfessionalServices;
import com.warmhelp.app.models.ReportService;
import com.warmhelp.app.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportServicesRepository extends JpaRepository<ReportService, Long> {
    List<ReportService> findByProfessionalServices(ProfessionalServices professionalServices);
    List<ReportService> findByUserInfo(UserInfo userInfo);
}
