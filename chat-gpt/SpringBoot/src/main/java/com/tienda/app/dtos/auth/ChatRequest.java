package com.tienda.app.dtos.auth;

public class ChatRequest {
    private String question;
    private String owner; // ← nuevo campo

    public ChatRequest() {}

    public ChatRequest(String question, String owner) {
        this.question = question;
        this.owner = owner;
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

