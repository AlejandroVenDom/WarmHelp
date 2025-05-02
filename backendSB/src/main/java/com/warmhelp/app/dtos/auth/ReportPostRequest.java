package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.enums.ReportType;

public class ReportPostRequest {
    private ReportType type;
    private String description;
    private String userName;
    private Long postId;

    public ReportPostRequest(ReportType type, String description, String userName, Long postId) {
        this.type = type;
        this.description = description;
        this.userName = userName;
        this.postId = postId;
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

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
