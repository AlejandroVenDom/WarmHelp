package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.ReportServicesRequest;
import com.warmhelp.app.dtosResponses.ReportServiceResponseDTO;
import com.warmhelp.app.enums.ReportState;
import com.warmhelp.app.models.*;
import com.warmhelp.app.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServicesService {
    private final ReportServicesRepository reportServicesRepository;
    private final ReportStateRepository reportStateRepository;
    private final ReportTypeRepository reportTypeRepository;
    private final UserInfoRepository userInfoRepository;
    private final ProfessionalServicesRepository professionalServicesRepository;

    public ReportServicesService(ReportServicesRepository reportServicesRepository, ReportStateRepository reportStateRepository, ReportTypeRepository reportTypeRepository, UserInfoRepository userInfoRepository, ProfessionalServicesRepository professionalServicesRepository) {
        this.reportServicesRepository = reportServicesRepository;
        this.reportStateRepository = reportStateRepository;
        this.reportTypeRepository = reportTypeRepository;
        this.userInfoRepository = userInfoRepository;
        this.professionalServicesRepository = professionalServicesRepository;
    }

    public List<ReportServiceResponseDTO> getAllReports(){
        List<ReportService> reports = this.reportServicesRepository.findAll();

        return reports.stream()
                .map(report->{
                    String state = report.getState() != null ? report.getState().getReportState().name() : null;

                    return new ReportServiceResponseDTO(
                            report.getId(),
                            report.getDescription(),
                            report.getType().getReportType().name(),
                            report.getState().getReportState().name(),
                            report.getUserInfo().getUser().getUsername(),
                            report.getProfessionalServices().getId(),
                            report.getProfessionalServices().getTitle(),
                            report.getProfessionalServices().getDescription(),
                            report.getCreatedAt(),
                            report.getUpdatedAt(),
                            report.getDeletedAt()
                    );
                })
                .collect(Collectors.toList());
    }

    public ReportServiceResponseDTO createdReportForService(ReportServicesRequest request){
        ReportStateClass defaultState = this.reportStateRepository
                .findByReportState(ReportState.PENDING)
                .orElseThrow(()->new IllegalArgumentException("PENDING state not found"));
        UserInfo userInfo = this.userInfoRepository.findByUser_Username(request.getUserName())
                .orElseThrow(()-> new IllegalArgumentException("user not found"));

        ProfessionalServices professionalServices = this.professionalServicesRepository.findById(request.getServiceId())
                .orElseThrow(() -> new IllegalArgumentException("professional service not found"));

        ReportTypeClass type = this.reportTypeRepository.findByReportType(request.getType())
                .orElseThrow(()-> new IllegalArgumentException("type not found"));

        ReportService reportService = new ReportService();
        reportService.setDescription(request.getDescription());
        reportService.setType(type);
        reportService.setState(defaultState);
        reportService.setUserInfo(userInfo);
        reportService.setProfessionalServices(professionalServices);

        ReportService saveRepost = this.reportServicesRepository.save(reportService);

        return new ReportServiceResponseDTO(
                saveRepost.getId(),
                saveRepost.getDescription(),
                saveRepost.getType().getReportType().name(),
                saveRepost.getState()!=null?saveRepost.getState().getReportState().name():null,
                saveRepost.getUserInfo().getUser().getUsername(),
                saveRepost.getProfessionalServices().getId(),
                saveRepost.getProfessionalServices().getTitle(),
                saveRepost.getProfessionalServices().getDescription(),
                saveRepost.getCreatedAt(),
                saveRepost.getUpdatedAt(),
                saveRepost.getDeletedAt()
        );

    }

}







