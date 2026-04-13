package com.portfolio.backend.controller;

import com.portfolio.backend.model.About;
import com.portfolio.backend.repository.AboutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/about")
public class AboutController {

    @Autowired
    AboutRepository aboutRepository;

    @GetMapping
    public ResponseEntity<About> getAboutDetails() {
        List<About> abouts = aboutRepository.findAll();
        if (abouts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(abouts.get(0), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<About> createOrUpdateAbout(@RequestBody About about) {
        try {
            List<About> abouts = aboutRepository.findAll();
            if (abouts.isEmpty()) {
                About _about = aboutRepository.save(about);
                return new ResponseEntity<>(_about, HttpStatus.CREATED);
            } else {
                About existingAbout = abouts.get(0);
                existingAbout.setIntroduction(about.getIntroduction());
                existingAbout.setCareerObjective(about.getCareerObjective());
                existingAbout.setEducationDetails(about.getEducationDetails());
                existingAbout.setExperienceSummary(about.getExperienceSummary());
                return new ResponseEntity<>(aboutRepository.save(existingAbout), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
