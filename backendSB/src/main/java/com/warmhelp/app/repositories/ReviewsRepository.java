package com.warmhelp.app.repositories;

import com.warmhelp.app.models.ProfessionalServices;
import com.warmhelp.app.models.Reviews;
import com.warmhelp.app.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository extends JpaRepository<Reviews, Long> {
    List<Reviews> findByProfessionalServices(ProfessionalServices professionalServices);
    List<Reviews> findByUserInfo(UserInfo userInfo);
}
