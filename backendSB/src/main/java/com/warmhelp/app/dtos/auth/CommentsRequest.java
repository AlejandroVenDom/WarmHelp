package com.warmhelp.app.dtos.auth;

public class CommentsRequest {
    private String description;
    private String userName;
    private Long postId;

    public CommentsRequest(Long postId ,String description, String userName) {
        this.description = description;
        this.userName = userName;
        this.postId = postId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
