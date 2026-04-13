package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "achievements")
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    private String type; // e.g., "Hackathon", "Award"
    
    private String date;
    
    @Column(columnDefinition = "TEXT")
    private String description;
}
