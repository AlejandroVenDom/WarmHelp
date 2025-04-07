package com.warmhelp.app.dtosResponses;

import java.time.LocalDateTime;

public class ReviewResponseDTO {
    private long id;
    private String description;
    private String username;
    private String calification;
    private LocalDateTime createdAt;

    public ReviewResponseDTO(long id, String description, String username, String calification, LocalDateTime createdAt) {
        this.id = id;
        this.description = description;
        this.username = username;
        this.calification = calification;
        this.createdAt = createdAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCalification() {
        return calification;
    }

    public void setCalification(String calification) {
        this.calification = calification;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
