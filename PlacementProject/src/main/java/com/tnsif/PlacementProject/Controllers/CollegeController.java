package com.tnsif.PlacementProject.Controllers;

import java.util.*;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tnsif.PlacementProject.Entities.College;
import com.tnsif.PlacementProject.Services.CollegeService;

import org.springframework.web.bind.annotation.ExceptionHandler;

@RestController
public class CollegeController {

    @Autowired
    private CollegeService collegeService;

    // Get all colleges
    @GetMapping("/colleges")
    public List<College> getAllColleges() {
        return collegeService.getAllColleges();
    }

    // Get a college by ID
    @GetMapping("/colleges/{id}")
    public ResponseEntity<College> getCollegeById(@PathVariable Long id) {
        try {
            College college = collegeService.getCollegeById(id);
            return new ResponseEntity<College>(college, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<College>(HttpStatus.NOT_FOUND);
        }
    }

    // Create a new college
    @PostMapping("/colleges")
    public ResponseEntity<College> createCollege(@RequestBody College college) {
        College savedCollege = collegeService.saveCollege(college);
        return ResponseEntity.created(null).body(savedCollege);
    }

    // Update a college
    @PutMapping("/colleges/{id}")
    public ResponseEntity<College> updateCollege(@PathVariable Long id, @RequestBody College college) {
        try {
            College existingCollege = collegeService.getCollegeById(id);
            college.setCollegeId(id); // Set the ID explicitly for update
            collegeService.saveCollege(college);
            return ResponseEntity.ok(college);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a college by ID
    @DeleteMapping("/colleges/{id}")
    public ResponseEntity<Void> deleteCollege(@PathVariable Long id) {
        try {
            collegeService.deleteCollegeById(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleCollegeNotFoundException(NoSuchElementException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    
    
    //PostCheck
    public Boolean checkCollege(Long id) {
    	College existingCollege = collegeService.getCollegeById(id);
        return true;
    }
}