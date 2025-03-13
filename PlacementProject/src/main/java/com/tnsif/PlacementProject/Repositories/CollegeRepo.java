package com.tnsif.PlacementProject.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tnsif.PlacementProject.Entities.College;

public interface CollegeRepo extends JpaRepository<College, Long> {
}