package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.enums.IncidentType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncidentsRequest {

    private String title;

    private String description;

    private IncidentType type;

    private String userName;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public IncidentType getType() {
        return type;
    }

    public void setType(IncidentType type) {
        this.type = type;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
