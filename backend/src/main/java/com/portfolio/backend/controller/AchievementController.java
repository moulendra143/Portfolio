package com.portfolio.backend.controller;

import com.portfolio.backend.model.Achievement;
import com.portfolio.backend.repository.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    @Autowired
    AchievementRepository achievementRepository;

    @GetMapping
    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        try {
            Achievement _achievement = achievementRepository.save(achievement);
            return new ResponseEntity<>(_achievement, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Achievement> updateAchievement(@PathVariable("id") long id, @RequestBody Achievement achievement) {
        Optional<Achievement> achievementData = achievementRepository.findById(id);

        if (achievementData.isPresent()) {
            Achievement _achievement = achievementData.get();
            _achievement.setTitle(achievement.getTitle());
            _achievement.setType(achievement.getType());
            _achievement.setDate(achievement.getDate());
            _achievement.setDescription(achievement.getDescription());
            return new ResponseEntity<>(achievementRepository.save(_achievement), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteAchievement(@PathVariable("id") long id) {
        try {
            achievementRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
