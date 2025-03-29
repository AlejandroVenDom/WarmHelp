package com.warmhelp.app.dtos.auth;

public class PostsRequest {

    private String title;
    private String description;
    private String image;
    private String userName;

    public PostsRequest(String title, String description, String image, String userName) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.userName = userName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
