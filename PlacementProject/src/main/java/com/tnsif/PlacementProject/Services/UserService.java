package com.tnsif.PlacementProject.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tnsif.PlacementProject.Entities.User;
import com.tnsif.PlacementProject.Repositories.UserRepo;

import jakarta.transaction.Transactional;

/**
 * UserService class providing business logic for managing user data.
 * 

 */
@Service
@Transactional
public class UserService {

    /**
     * Injected instance of UserRepo for interacting with user data.
     */
    @Autowired
    private UserRepo userRepository;

    /**
     * Retrieves all users from the database.
     *
     * @return List of all user entities.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Gets a user record from the database by its ID.
     *
     * @param id Unique identifier of the user.
     * @return User entity if found, null otherwise.
     */
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    /**
     * Saves a user record to the database.
     *
     * @param user The user entity to be saved.
     * @return The saved user entity.
     */
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Deletes a user record from the database based on its ID.
     *
     * @param id Unique identifier of the user to be deleted.
     */
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}