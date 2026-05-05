package com.portfolio.backend.controller;

import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @GetMapping
    public List<Project> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        projects.forEach(item -> {
            if (item.getLiveLink() != null && item.getLiveLink().contains("localhost:8080")) {
                item.setLiveLink(item.getLiveLink().replace("localhost:8080", "16.171.148.29:8080"));
            }
            if (item.getGithubLink() != null && item.getGithubLink().contains("localhost:8080")) {
                item.setGithubLink(item.getGithubLink().replace("localhost:8080", "16.171.148.29:8080"));
            }
        });
        return projects;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable("id") long id) {
        Optional<Project> projectData = projectRepository.findById(id);

        if (projectData.isPresent()) {
            return new ResponseEntity<>(projectData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        try {
            Project _project = projectRepository.save(project);
            return new ResponseEntity<>(_project, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> updateProject(@PathVariable("id") long id, @RequestBody Project project) {
        Optional<Project> projectData = projectRepository.findById(id);

        if (projectData.isPresent()) {
            Project _project = projectData.get();
            _project.setTitle(project.getTitle());
            _project.setDescription(project.getDescription());
            _project.setTechStack(project.getTechStack());
            _project.setGithubLink(project.getGithubLink());
            _project.setLiveLink(project.getLiveLink());
            return new ResponseEntity<>(projectRepository.save(_project), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteProject(@PathVariable("id") long id) {
        try {
            projectRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
