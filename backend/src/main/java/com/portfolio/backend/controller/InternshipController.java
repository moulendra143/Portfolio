package com.portfolio.backend.controller;

import com.portfolio.backend.model.Internship;
import com.portfolio.backend.repository.InternshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    @Autowired
    InternshipRepository internshipRepository;

    @GetMapping
    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Internship> createInternship(@RequestBody Internship internship) {
        try {
            Internship _internship = internshipRepository.save(internship);
            return new ResponseEntity<>(_internship, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Internship> updateInternship(@PathVariable("id") long id, @RequestBody Internship internship) {
        Optional<Internship> internshipData = internshipRepository.findById(id);

        if (internshipData.isPresent()) {
            Internship _internship = internshipData.get();
            _internship.setCompany(internship.getCompany());
            _internship.setRole(internship.getRole());
            _internship.setDuration(internship.getDuration());
            _internship.setDescription(internship.getDescription());
            return new ResponseEntity<>(internshipRepository.save(_internship), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteInternship(@PathVariable("id") long id) {
        try {
            internshipRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
