package com.tnsif.PlacementProject.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tnsif.PlacementProject.Entities.Placement;

public interface PlacementRepo extends JpaRepository<Placement, Long> {
}