package com.warmhelp.app.dtos.auth;

public class UpdateUsernameRequest {
    private String newUsername;

    public UpdateUsernameRequest(String newUsername) {
        this.newUsername = newUsername;
    }

    public String getNewUsername() {
        return newUsername;
    }

    public void setNewUsername(String newUsername) {
        this.newUsername = newUsername;
    }
}
