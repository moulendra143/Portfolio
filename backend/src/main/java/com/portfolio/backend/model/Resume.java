package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "resumes")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(columnDefinition = "LONGTEXT")
    private String fileData; // Base64 encoded PDF string
    
    private boolean isActive; // Only one resume should typically be active at a time
}
