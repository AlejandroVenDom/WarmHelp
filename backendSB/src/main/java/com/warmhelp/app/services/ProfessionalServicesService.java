package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.ProfessionalServicesRequest;
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

    public List<ProfessionalServices> getAllProfessionalServices(){
        return this.professionalServicesRepository.findAll();
    }

    public Optional<ProfessionalServices> getProfessionalServicesById (Long id){
        return this.professionalServicesRepository.findById(id);
    }

    public Optional<ProfessionalServices> getProfessionalServicesByTitle(String title){
        return this.professionalServicesRepository.findByTitle(title);
    }

    public ProfessionalServices createProfessionalService(ProfessionalServicesRequest postFormFront){
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

        return this.professionalServicesRepository.save(professionalServices);

    }

}
