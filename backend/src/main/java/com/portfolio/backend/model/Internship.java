package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "internships")
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;

    private String role;

    private String duration;

    @Column(columnDefinition = "TEXT")
    private String description;

    // 🔥 ADD THIS LINE (VERY IMPORTANT)
    private String link;
}