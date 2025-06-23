package com.warmhelp.app.dtosResponses;

import com.warmhelp.app.models.Chat;

public class ChatResponse {

    private Long id;
    private Long firstUserId;
    private String firstUsername;
    private String firstAvatar; // ✅
    private Long secondUserId;
    private String secondUsername;
    private String secondAvatar; // ✅

    public ChatResponse(Chat chat) {
        this.id = chat.getId();
        this.firstUserId = chat.getFirstUser().getId();
        this.firstUsername = chat.getFirstUser().getUsername();
        this.firstAvatar = chat.getFirstUser().getUserInfo().getAvatar(); // ✅

        this.secondUserId = chat.getSecondUser().getId();
        this.secondUsername = chat.getSecondUser().getUsername();
        this.secondAvatar = chat.getSecondUser().getUserInfo().getAvatar(); // ✅
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public Long getFirstUserId() {
        return firstUserId;
    }

    public String getFirstUsername() {
        return firstUsername;
    }

    public String getFirstAvatar() {
        return firstAvatar;
    }

    public Long getSecondUserId() {
        return secondUserId;
    }

    public String getSecondUsername() {
        return secondUsername;
    }

    public String getSecondAvatar() {
        return secondAvatar;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstUserId(Long firstUserId) {
        this.firstUserId = firstUserId;
    }

    public void setFirstUsername(String firstUsername) {
        this.firstUsername = firstUsername;
    }

    public void setFirstAvatar(String firstAvatar) {
        this.firstAvatar = firstAvatar;
    }

    public void setSecondUserId(Long secondUserId) {
        this.secondUserId = secondUserId;
    }

    public void setSecondUsername(String secondUsername) {
        this.secondUsername = secondUsername;
    }

    public void setSecondAvatar(String secondAvatar) {
        this.secondAvatar = secondAvatar;
    }
}
