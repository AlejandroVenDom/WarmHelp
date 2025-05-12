package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.ReportPostRequest;
import com.warmhelp.app.dtosResponses.ReportPostDTO;
import com.warmhelp.app.enums.ReportState;
import com.warmhelp.app.enums.ReportType;
import com.warmhelp.app.models.*;
import com.warmhelp.app.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportPostService {
    private final ReportPostsRepository reportPostsRepository;
    private final ReportStateRepository reportStateRepository;
    private final ReportTypeRepository reportTypeRepository;
    private final UserInfoRepository userInfoRepository;
    private final PostsRepository postsRepository;

    public ReportPostService(ReportPostsRepository reportPostsRepository, ReportStateRepository reportStateRepository, ReportTypeRepository reportTypeRepository, UserInfoRepository userInfoRepository, PostsRepository postsRepository) {
        this.reportPostsRepository = reportPostsRepository;
        this.reportStateRepository = reportStateRepository;
        this.reportTypeRepository = reportTypeRepository;
        this.userInfoRepository = userInfoRepository;
        this.postsRepository = postsRepository;
    }

    public List<ReportPostDTO> getAllReports(){
        List<ReportPost> reports = this.reportPostsRepository.findAll();

        return reports.stream()
                .filter(report -> report.getDeletedAt() == null) // 👈 aquí se filtran los eliminados
                .map(report -> {
                    String state = report.getState() != null ? report.getState().getReportState().name() : null;

                    return new ReportPostDTO(
                            report.getId(),
                            report.getDescription(),
                            report.getType().getReportType().name(),
                            state,
                            report.getUserInfo().getUser().getUsername(),
                            report.getPost().getId(),
                            report.getPost().getTitle(),
                            report.getPost().getDescription(),
                            report.getCreatedAt(),
                            report.getUpdatedAt(),
                            report.getDeletedAt()
                    );
                })
                .collect(Collectors.toList());
    }
    public void updateReportState(Long id, String newState) {
        ReportPost report = reportPostsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reporte no encontrado"));

        ReportState stateEnum = ReportState.valueOf(newState);
        ReportStateClass stateClass = reportStateRepository.findByReportState(stateEnum)
                .orElseThrow(() -> new IllegalArgumentException("Estado inválido"));

        report.setState(stateClass);
        reportPostsRepository.save(report);
    }
    public void deleteReport(Long id) {
        ReportPost report = reportPostsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reporte de post no encontrado"));

        report.setDeletedAt(java.time.LocalDateTime.now());
        reportPostsRepository.save(report);
    }


    public ReportPostDTO createReportForPost(ReportPostRequest reportPostFormFront){

        ReportStateClass defaultState = this.reportStateRepository
                .findByReportState(ReportState.PENDING)
                .orElseThrow(()->new IllegalArgumentException("PENDING state not found"));

        UserInfo userInfo = this.userInfoRepository.findByUser_Username(reportPostFormFront.getUserName())
                .orElseThrow(()->new IllegalArgumentException("User not found"));

        Posts post = this.postsRepository.findById(reportPostFormFront.getPostId())
                .orElseThrow(()->new IllegalArgumentException("Post not found"));

        ReportTypeClass type = this.reportTypeRepository.findByReportType(reportPostFormFront.getType())
                .orElseThrow(()-> new IllegalArgumentException("type not found"));

        ReportPost reportPost = new ReportPost();
        reportPost.setDescription(reportPostFormFront.getDescription());
        reportPost.setType(type);
        reportPost.setPost(post);
        reportPost.setUserInfo(userInfo);
        reportPost.setState(defaultState);

        ReportPost saveReport = this.reportPostsRepository.save(reportPost);

        return new ReportPostDTO(
                saveReport.getId(),
                saveReport.getDescription(),
                saveReport.getType().getReportType().name(),
                reportPost.getState() != null ? saveReport.getState().getReportState().name():null,
                reportPost.getUserInfo().getUser().getUsername(),
                reportPost.getPost().getId(),
                reportPost.getPost().getTitle(),
                reportPost.getPost().getDescription(),
                reportPost.getCreatedAt(),
                reportPost.getUpdatedAt(),
                reportPost.getDeletedAt()
        );
    }
}
