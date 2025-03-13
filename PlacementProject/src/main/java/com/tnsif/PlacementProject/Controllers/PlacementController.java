package com.tnsif.PlacementProject.Controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tnsif.PlacementProject.Entities.Placement;
import com.tnsif.PlacementProject.Services.PlacementService;

@RestController
public class PlacementController {
	@Autowired
    private PlacementService placementService;

    // Get all placements
    @GetMapping("/placements")
    public List<Placement> getAllPlacements() {
        return placementService.getAllPlacements();
    }

    // Get a placement by ID
    @GetMapping("/placements/{id}")
    public ResponseEntity<Placement> getPlacementById(@PathVariable Long id) {
        try {
            Placement placement = placementService.getPlacementById(id);
            return new ResponseEntity<Placement>(placement, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Placement>(HttpStatus.NOT_FOUND);
        }
    }

    // Create a new placement
    @PostMapping("/placements")
    public ResponseEntity<Placement> createPlacement(@RequestBody Placement placement) {
        Placement savedPlacement = placementService.savePlacement(placement);
        return ResponseEntity.created(null).body(savedPlacement);
    }

    // Update a placement
    @PutMapping("/placements/{id}")
    public ResponseEntity<Placement> updatePlacement(@PathVariable Long id, @RequestBody Placement placement) {
        try {
            Placement existingPlacement = placementService.getPlacementById(id);
            placement.setPlacementId(id); // Set the ID explicitly for update
            placementService.savePlacement(placement);
            return ResponseEntity.ok(placement);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a placement by ID
    @DeleteMapping("/placements/{id}")
    public ResponseEntity<Void> deletePlacement(@PathVariable Long id) {
        try {
            placementService.deletePlacementById(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handlePlacementNotFoundException(NoSuchElementException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
