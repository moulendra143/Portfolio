package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "about")
public class About {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String introduction;
    
    @Column(columnDefinition = "TEXT")
    private String careerObjective;
    
    @Column(columnDefinition = "TEXT")
    private String educationDetails;
    
    @Column(columnDefinition = "TEXT")
    private String experienceSummary;
}
