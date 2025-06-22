package com.warmhelp.app.dtos.auth;

import java.util.Set;

public class ChatRequest {
    private Set<Long> userIds;

    private String question;
    private String owner; // ← nuevo campo

    public ChatRequest() {}

    public ChatRequest(String question, String owner) {
        this.question = question;
        this.owner = owner;
    }

    public Set<Long> getUserIds() {
        return userIds;
    }

    public void setUserIds(Set<Long> userIds) {
        this.userIds = userIds;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}

