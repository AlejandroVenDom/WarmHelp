package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.ReviewsRequest;
import com.warmhelp.app.dtosResponses.ReviewResponseDTO;
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
import java.util.stream.Collectors;

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

    public List<ReviewResponseDTO> getAllReviews(){
        return this.reviewsRepository.findAll()
                .stream()
                .map(reviews -> new ReviewResponseDTO(
                        reviews.getId(),
                        reviews.getDescription(),
                        reviews.getUserInfo().getUser().getUsername(),
                        reviews.getCalification().getCalificationType().name(),
                        reviews.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public ReviewResponseDTO createReview(ReviewsRequest reviewsRequest){
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

        Reviews saveReviews = this.reviewsRepository.save(reviews);

        return new ReviewResponseDTO(
                saveReviews.getId(),
                saveReviews.getDescription(),
                saveReviews.getUserInfo().getUser().getUsername(),
                saveReviews.getCalification().getCalificationType().name(),
                saveReviews.getCreatedAt()
        );
    }
}
