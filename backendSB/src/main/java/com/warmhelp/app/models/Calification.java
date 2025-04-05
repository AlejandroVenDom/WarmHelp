package com.warmhelp.app.models;

import com.warmhelp.app.enums.CalificationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "calification")
@Getter
@Setter
public class Calification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CalificationType calificationType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CalificationType getCalificationType() {
        return calificationType;
    }

    public void setCalificationType(CalificationType calificationType) {
        this.calificationType = calificationType;
    }
}
