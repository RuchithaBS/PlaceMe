package com.tnsif.PlacementProject.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tnsif.PlacementProject.Entities.User;

public interface UserRepo extends JpaRepository<User, Long> {

}
