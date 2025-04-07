package com.warmhelp.app.dtosResponses;

import java.time.LocalDateTime;
import java.util.List;

public class CommentsResponseDTO {
    private long id;
    private String description;
    private List<ResponseCommentsResponseDTO> responseComments;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    public CommentsResponseDTO(long id, String description, List<ResponseCommentsResponseDTO> responseComments, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime deletedAt) {
        this.id = id;
        this.description = description;
        this.responseComments = responseComments;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
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

    public List<ResponseCommentsResponseDTO> getResponseComments() {
        return responseComments;
    }

    public void setResponseComments(List<ResponseCommentsResponseDTO> responseComments) {
        this.responseComments = responseComments;
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
