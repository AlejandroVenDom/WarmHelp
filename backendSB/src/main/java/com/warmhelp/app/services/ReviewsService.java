package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.ReviewsRequest;
import com.warmhelp.app.models.Calification;
import com.warmhelp.app.models.ProfessionalServices;
import com.warmhelp.app.models.Reviews;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.CalificationRepository;
import com.warmhelp.app.repositories.ProfessionalServicesRepository;
import com.warmhelp.app.repositories.ReviewsRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewsService {
    private final ReviewsRepository reviewsRepository;
    private final UserInfoRepository userInfoRepository;
    private final ProfessionalServicesRepository professionalServicesRepository;
    private final CalificationRepository calificationRepository;

    public ReviewsService(CalificationRepository calificationRepository,ReviewsRepository reviewsRepository, UserInfoRepository userInfoRepository, ProfessionalServicesRepository professionalServicesRepository) {
        this.reviewsRepository = reviewsRepository;
        this.calificationRepository = calificationRepository;
        this.userInfoRepository = userInfoRepository;
        this.professionalServicesRepository = professionalServicesRepository;
    }

    public List<Reviews> getAllReviews(){
        return this.reviewsRepository.findAll();
    }

    public Reviews createReview(ReviewsRequest reviewsRequest){
        UserInfo userInfo = this.userInfoRepository.findByUser_Username(reviewsRequest.getUserName())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        ProfessionalServices professionalServices = this.professionalServicesRepository.findById(reviewsRequest.getProfessionalServiceId()).orElseThrow(
                ()->new IllegalArgumentException("Servicio no encontrado por ID")
        );

        Calification calification = this.calificationRepository.findByCalificationType(reviewsRequest.getCalificationType()).orElseThrow(
                ()->new IllegalArgumentException("Calificacion no permitida")
        );


        Reviews reviews = new Reviews();
        reviews.setDescription(reviewsRequest.getDescription());
        reviews.setUserInfo(userInfo);
        reviews.setCalification(calification);
        reviews.setProfessionalServices(professionalServices);

        return this.reviewsRepository.save(reviews);
    }
}
