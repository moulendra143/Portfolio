package com.portfolio.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileController {

    // ✅ IMPORTANT: matches your folder location
    private final String UPLOAD_DIR = "uploads/";

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            // 🔥 Build file path
            Path path = Paths.get(UPLOAD_DIR, filename);

            // 🔍 Debug log (very useful)
            System.out.println("Looking for file at: " + path.toAbsolutePath());

            Resource resource = new UrlResource(path.toUri());

            // ❌ If file not found
            if (!resource.exists()) {
                System.out.println("File NOT FOUND!");
                return ResponseEntity.notFound().build();
            }

            // ✅ Return PDF
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🔥 OPTIONAL: Test API
    @GetMapping("/test")
    public String test() {
        return "File API Working ✅";
    }
}