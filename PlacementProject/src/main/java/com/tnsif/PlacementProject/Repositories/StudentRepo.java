package com.tnsif.PlacementProject.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.tnsif.PlacementProject.Entities.Student;

public interface StudentRepo extends JpaRepository<Student, Long> {
}
