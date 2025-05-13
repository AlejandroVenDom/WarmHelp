package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.enums.IncidentState;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncidentStateUpdateRequest {
    private IncidentState newState;
}