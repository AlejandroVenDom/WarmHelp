package com.warmhelp.app.dtosResponses;

import com.warmhelp.app.models.Chat;

public class ChatResponse {

    private Long id;
    private Long firstUserId;
    private String firstUsername;
    private Long secondUserId;
    private String secondUsername;

    public ChatResponse(Chat chat) {
    this.id = chat.getId();
    this.firstUserId = chat.getFirstUser().getId();
    this.firstUsername = chat.getFirstUser().getUsername();
    this.secondUserId = chat.getSecondUser().getId();
    this.secondUsername = chat.getSecondUser().getUsername();
}
}
