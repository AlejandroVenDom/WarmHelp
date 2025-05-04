package com.warmhelp.app.dtosResponses;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Likes_Posts_ResponseDTO {
    private String userName;
    private LocalDateTime createdAt;

    public Likes_Posts_ResponseDTO(String userName, LocalDateTime createdAt) {
        this.userName = userName;
        this.createdAt = createdAt;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
