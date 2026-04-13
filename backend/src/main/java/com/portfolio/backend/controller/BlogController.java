package com.portfolio.backend.controller;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    BlogRepository blogRepository;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable("id") long id) {
        Optional<Blog> blogData = blogRepository.findById(id);
        return blogData.map(blog -> new ResponseEntity<>(blog, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
        try {
            Blog _blog = blogRepository.save(blog);
            return new ResponseEntity<>(_blog, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Blog> updateBlog(@PathVariable("id") long id, @RequestBody Blog blog) {
        Optional<Blog> blogData = blogRepository.findById(id);

        if (blogData.isPresent()) {
            Blog _blog = blogData.get();
            _blog.setTitle(blog.getTitle());
            _blog.setSummary(blog.getSummary());
            _blog.setContent(blog.getContent());
            _blog.setDate(blog.getDate());
            _blog.setReadTime(blog.getReadTime());
            _blog.setTag(blog.getTag());
            return new ResponseEntity<>(blogRepository.save(_blog), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteBlog(@PathVariable("id") long id) {
        try {
            blogRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
