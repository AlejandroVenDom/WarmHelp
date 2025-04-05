package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.enums.CalificationType;

public class ReviewsRequest {

    private String description;
    private String userName;
    private Long professionalServiceId;
    private CalificationType calificationType;

    public ReviewsRequest(String description, String userName, Long professionalServiceId, CalificationType calificationType) {
        this.description = description;
        this.userName = userName;
        this.professionalServiceId = professionalServiceId;
        this.calificationType = calificationType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getProfessionalServiceId() {
        return professionalServiceId;
    }

    public void setProfessionalServiceId(Long professionalServiceId) {
        this.professionalServiceId = professionalServiceId;
    }

    public CalificationType getCalificationType() {
        return calificationType;
    }

    public void setCalificationType(CalificationType calificationType) {
        this.calificationType = calificationType;
    }
}
