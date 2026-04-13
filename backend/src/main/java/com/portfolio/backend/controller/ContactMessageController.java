package com.portfolio.backend.controller;

import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/contact")
public class ContactMessageController {

    @Autowired
    ContactMessageRepository contactMessageRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submitMessage(@RequestBody ContactMessage contactMessage) {
        try {
            contactMessage.setDate(LocalDateTime.now());
            ContactMessage _contactMessage = contactMessageRepository.save(contactMessage);
            return new ResponseEntity<>(_contactMessage, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteMessage(@PathVariable("id") long id) {
        try {
            contactMessageRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
