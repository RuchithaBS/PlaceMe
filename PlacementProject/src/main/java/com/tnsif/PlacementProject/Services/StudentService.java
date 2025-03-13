package com.tnsif.PlacementProject.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tnsif.PlacementProject.Entities.Student;
import com.tnsif.PlacementProject.Repositories.StudentRepo;

import jakarta.transaction.Transactional;

/**
 * StudentService class providing business logic for managing student data.
 * 
 */
@Service
@Transactional
public class StudentService {

    /**
     * Injected instance of StudentRepo for interacting with student data.
     */
    @Autowired
    private StudentRepo studentRepository;

    /**
     * Retrieves all students from the database.
     *
     * @return List of all student entities.
     */
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    /**
     * Gets a student record from the database by its ID.
     *
     * @param id Unique identifier of the student.
     * @return Student entity if found, null otherwise.
     */
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    /**
     * Saves a student record to the database.
     *
     * @param student The student entity to be saved.
     * @return The saved student entity.
     */
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    /**
     * Deletes a student record from the database based on its ID.
     *
     * @param id Unique identifier of the student to be deleted.
     */
    public void deleteStudentById(Long id) {
        studentRepository.deleteById(id);
    }
}