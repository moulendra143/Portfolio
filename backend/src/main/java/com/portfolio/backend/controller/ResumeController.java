package com.portfolio.backend.controller;

import com.portfolio.backend.model.Resume;
import com.portfolio.backend.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    @Autowired
    private ResumeRepository resumeRepository;

    // ✅ Get all resumes
    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    // ✅ Get active resume
    @GetMapping("/active")
    public ResponseEntity<Resume> getActiveResume() {
        List<Resume> activeResumes = resumeRepository.findByIsActiveTrue();
        if (!activeResumes.isEmpty()) {
            return ResponseEntity.ok(activeResumes.get(0));
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Download Resume (IMPORTANT)
    @GetMapping("/download")
public ResponseEntity<Resource> downloadResume() {
    try {
        List<Resume> activeResumes = resumeRepository.findByIsActiveTrue();

        if (activeResumes.isEmpty()) {
            System.out.println("No active resume found");
            return ResponseEntity.notFound().build();
        }

        String filePath = activeResumes.get(0).getFileData();
        // "/uploads/DUDDUGUNTA_MOULENDRA_REDDY.pdf"

        // 🔥 REMOVE "/uploads/" from DB path
        String fileName = filePath.replace("/uploads/", "");

        // 🔥 CORRECT PATH
        Path path = Paths.get("uploads", fileName);

        System.out.println("Looking for file at: " + path.toAbsolutePath());

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            System.out.println("File NOT FOUND!");
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + fileName)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.internalServerError().build();
    }
}
}