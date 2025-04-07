package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.ProfessionalServicesRequest;
import com.warmhelp.app.dtosResponses.ProfessionalServiceResponseDTO;
import com.warmhelp.app.dtosResponses.ReviewResponseDTO;
import com.warmhelp.app.models.Currency;
import com.warmhelp.app.models.ProfessionalServices;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.CurrencyRepository;
import com.warmhelp.app.repositories.ProfessionalServicesRepository;
import com.warmhelp.app.repositories.UserInfoRepository;
import com.warmhelp.app.repositories.UserRepository;

import java.util.Optional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessionalServicesService {

    private final ProfessionalServicesRepository professionalServicesRepository;
    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final CurrencyRepository currencyRepository;

    public ProfessionalServicesService(CurrencyRepository currencyRepository,ProfessionalServicesRepository professionalServicesRepository, UserRepository userRepository, UserInfoRepository userInfoRepository) {
        this.professionalServicesRepository = professionalServicesRepository;
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
        this.currencyRepository = currencyRepository;
    }

    public List<ProfessionalServiceResponseDTO> getAllProfessionalServices(){
        List<ProfessionalServices> services = professionalServicesRepository.findAll();

        return services
                .stream()
                .map(service -> {
                    List<ReviewResponseDTO> reviews = service.getReviews().stream().map(reviews1 ->
                            new ReviewResponseDTO(
                                        reviews1.getId(),
                                        reviews1.getDescription(),
                                    reviews1.getUserInfo().getUser().getUsername(),
                                    reviews1.getCalification().getCalificationType().name(),
                                        reviews1.getCreatedAt()
                            )
                    ).toList();

                return new ProfessionalServiceResponseDTO(
                        service.getId(),
                        service.getTitle(),
                        service.getDescription(),
                        service.getPrice(),
                        service.getTax(),
                        service.getUserInfo().getUser().getUsername(),
                        service.getCurrency().getCurrencyType().name(),
                        reviews,
                        service.getCreatedAt(),
                        service.getUpdatedAt(),
                        service.getDeletedAt()
                );
                }).toList();
    }

    public Optional<ProfessionalServices> getProfessionalServicesById (Long id){
        return this.professionalServicesRepository.findById(id);
    }

    public Optional<ProfessionalServices> getProfessionalServicesByTitle(String title){
        return this.professionalServicesRepository.findByTitle(title);
    }

    public ProfessionalServiceResponseDTO createProfessionalService(ProfessionalServicesRequest postFormFront){
        UserInfo userInfo = this.userInfoRepository.findByUser_Username(postFormFront.getUserName())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Currency currency = this.currencyRepository.findByCurrencyType(postFormFront.getCurrencyType()).orElseThrow(
                ()->new IllegalArgumentException("Valor de moneda no válido")
        );

        ProfessionalServices professionalServices = new ProfessionalServices();
        professionalServices.setTitle(postFormFront.getTitle());
        professionalServices.setDescription(postFormFront.getDescription());
        professionalServices.setCurrency(currency);
        professionalServices.setPrice(postFormFront.getPrice());
        professionalServices.setTax(postFormFront.getTax());
        professionalServices.setUserInfo(userInfo);

        ProfessionalServices saveService = this.professionalServicesRepository.save(professionalServices);
        return new ProfessionalServiceResponseDTO(
                saveService.getId(),
                saveService.getTitle(),
                saveService.getDescription(),
                saveService.getPrice(),
                saveService.getTax(),
                userInfo.getUser().getUsername(),
                saveService.getCurrency().getCurrencyType().name(),
                List.of(),
                saveService.getCreatedAt(),
                saveService.getUpdatedAt(),
                saveService.getDeletedAt()
        );

    }

}
