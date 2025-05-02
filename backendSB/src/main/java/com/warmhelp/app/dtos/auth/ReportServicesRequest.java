package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.enums.ReportType;

public class ReportServicesRequest {
    private ReportType type;
    private String description;
    private String userName;
    private Long serviceId;

    public ReportServicesRequest(ReportType type, String description, String userName, Long serviceId) {
        this.type = type;
        this.description = description;
        this.userName = userName;
        this.serviceId = serviceId;
    }

    public ReportType getType() {
        return type;
    }

    public void setType(ReportType type) {
        this.type = type;
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

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
}
