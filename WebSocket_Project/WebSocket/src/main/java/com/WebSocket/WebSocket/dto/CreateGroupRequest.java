package com.WebSocket.WebSocket.dto;

import lombok.Data;

import java.util.Set;

@Data
public class CreateGroupRequest {
    private String name;
    private Set<Long> userIds;
}
