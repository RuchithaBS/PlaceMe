package com.tnsif.PlacementProject.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tnsif.PlacementProject.Entities.College;
import com.tnsif.PlacementProject.Repositories.CollegeRepo;

import jakarta.transaction.Transactional;

/**
 * CollegeService class providing business logic for managing college data.

 */
@Service
@Transactional
public class CollegeService {

    /**
     * Injected instance of CollegeRepo for interacting with college data.
     */
    @Autowired
    private CollegeRepo collegeRepository;

    /**
     * Retrieves all colleges from the database.
     *
     * @return List of all college entities.
     */
    public List<College> getAllColleges() {
        return collegeRepository.findAll();
    }

    /**
     * Gets a college record from the database by its ID.
     *
     * @param id Unique identifier of the college.
     * @return College entity if found, null otherwise.
     */
    public College getCollegeById(Long id) {
        return collegeRepository.findById(id).orElse(null);
    }

    /**
     * Saves a college record to the database.
     *
     * @param college The college entity to be saved.
     * @return The saved college entity.
     */
    public College saveCollege(College college) {
        return collegeRepository.save(college);
    }

    /**
     * Deletes a college record from the database based on its ID.
     *
     * @param id Unique identifier of the college to be deleted.
     */
    public void deleteCollegeById(Long id) {
        collegeRepository.deleteById(id);
    }
}