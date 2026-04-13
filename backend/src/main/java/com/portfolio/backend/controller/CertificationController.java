package com.portfolio.backend.controller;

import com.portfolio.backend.model.Certification;
import com.portfolio.backend.repository.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    @Autowired
    CertificationRepository certificationRepository;

    @GetMapping
    public List<Certification> getAllCertifications() {
        return certificationRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Certification> createCertification(@RequestBody Certification certification) {
        try {
            Certification _certification = certificationRepository.save(certification);
            return new ResponseEntity<>(_certification, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Certification> updateCertification(@PathVariable("id") long id, @RequestBody Certification certification) {
        Optional<Certification> certificationData = certificationRepository.findById(id);

        if (certificationData.isPresent()) {
            Certification _certification = certificationData.get();
            _certification.setName(certification.getName());
            _certification.setOrganization(certification.getOrganization());
            _certification.setDate(certification.getDate());
            _certification.setLink(certification.getLink());
            return new ResponseEntity<>(certificationRepository.save(_certification), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteCertification(@PathVariable("id") long id) {
        try {
            certificationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
