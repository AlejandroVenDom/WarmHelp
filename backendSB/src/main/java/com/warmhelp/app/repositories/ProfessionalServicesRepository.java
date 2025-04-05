package com.warmhelp.app.repositories;

import com.warmhelp.app.models.ProfessionalServices;
import com.warmhelp.app.models.Reviews;
import com.warmhelp.app.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfessionalServicesRepository extends JpaRepository<ProfessionalServices, Long> {
    Optional<ProfessionalServices> findByTitle(String title);
    List<Reviews> findByUserInfo(UserInfo userInfo);
}
