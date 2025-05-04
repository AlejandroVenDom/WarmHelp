package com.warmhelp.app.dtosResponses;

import java.time.LocalDateTime;
import java.util.List;

public class PostsResponseDTO {
    private long id;
    private String title;
    private String username;
    private String description;
    private String image;
    private List<CommentsResponseDTO> comments;
    private List<ReportPostDTO> reports;
    private List<Likes_Posts_ResponseDTO> likes_posts;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    public PostsResponseDTO(long id, String title, String username, String description, String image, List<CommentsResponseDTO> comments, List<ReportPostDTO> reports, List<Likes_Posts_ResponseDTO> likes_posts, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime deletedAt) {
        this.id = id;
        this.title = title;
        this.username = username;
        this.description = description;
        this.image = image;
        this.comments = comments;
        this.reports = reports;
        this.likes_posts = likes_posts;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    public List<Likes_Posts_ResponseDTO> getLikes_posts() {
        return likes_posts;
    }

    public void setLikes_posts(List<Likes_Posts_ResponseDTO> likes_posts) {
        this.likes_posts = likes_posts;
    }

    public List<ReportPostDTO> getReports() {
        return reports;
    }

    public void setReports(List<ReportPostDTO> reports) {
        this.reports = reports;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public List<CommentsResponseDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentsResponseDTO> comments) {
        this.comments = comments;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }
}
