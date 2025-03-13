package com.tnsif.PlacementProject.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tnsif.PlacementProject.Entities.Placement;
import com.tnsif.PlacementProject.Repositories.PlacementRepo;

import jakarta.transaction.Transactional;

/**
 * PlacementService class providing business logic for managing placement data.
 * 
 */
@Service
@Transactional
public class PlacementService {

    /**
     * Injected instance of PlacementRepo for interacting with placement data.
     */
    @Autowired
    private PlacementRepo placementRepository;

    /**
     * Retrieves all placement records from the database.
     *
     * @return List of all placement entities.
     */
    public List<Placement> getAllPlacements() {
        return placementRepository.findAll();
    }

    /**
     * Gets a placement record from the database by its ID.
     *
     * @param id Unique identifier of the placement.
     * @return Placement entity if found, null otherwise.
     */
    public Placement getPlacementById(Long id) {
        return placementRepository.findById(id).orElse(null);
    }

    /**
     * Saves a placement record to the database.
     *
     * @param placement The placement entity to be saved.
     * @return The saved placement entity.
     */
    public Placement savePlacement(Placement placement) {
        return placementRepository.save(placement);
    }

    /**
     * Deletes a placement record from the database based on its ID.
     *
     * @param id Unique identifier of the placement to be deleted.
     */
    public void deletePlacementById(Long id) {
        placementRepository.deleteById(id);
    }
}