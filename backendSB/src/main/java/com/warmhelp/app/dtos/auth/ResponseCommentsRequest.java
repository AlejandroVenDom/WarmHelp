package com.warmhelp.app.dtos.auth;

public class ResponseCommentsRequest {
    private String description;
    private String userName;
    private Long commentId;

    public ResponseCommentsRequest(String description, String userName, Long commentId) {
        this.description = description;
        this.userName = userName;
        this.commentId = commentId;
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

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }
}
