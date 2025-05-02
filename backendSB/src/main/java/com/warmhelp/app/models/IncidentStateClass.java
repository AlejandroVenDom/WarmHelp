package com.warmhelp.app.models;

import com.warmhelp.app.enums.IncidentState;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "incident_states")
@Getter
@Setter
public class IncidentStateClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IncidentState incidentState;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public IncidentState getIncidentState() {
        return incidentState;
    }

    public void setIncidentState(IncidentState incidentState) {
        this.incidentState = incidentState;
    }
}
