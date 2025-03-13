package com.tnsif.PlacementProject.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tnsif.PlacementProject.Entities.Certificate;
import com.tnsif.PlacementProject.Repositories.CertificateRepo;

import jakarta.transaction.Transactional;

/**
 * This class defines the business logic for managing Certificates.
 * It interacts with the CertificateRepository to perform CRUD operations on Certificate entities.
 * The @Service annotation marks this class as a Spring service bean.
 * The @Transactional annotation ensures data consistency across multiple database operations.
 */
@Service
@Transactional
public class CertificateService {

    /**
     * Injects the CertificateRepository dependency using Spring Autowired annotation.
     * This repository provides methods for accessing Certificate data from the database.
     */
    @Autowired
    private CertificateRepo certificateRepository;

    /**
     * Retrieves all Certificates from the database.
     * 
     * @return A list of all Certificates.
     */
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    /**
     * Retrieves a Certificate by its ID from the database.
     * 
     * @param id The ID of the Certificate to retrieve.
     * @return The retrieved Certificate or null if not found.
     */
    public Certificate getCertificateById(Long id) {
        return certificateRepository.findById(id).orElse(null);
    }

    /**
     * Saves a new or updated Certificate to the database.
     * 
     * @param certificate The Certificate object to save.
     * @return The saved Certificate object.
     */
    public Certificate saveCertificate(Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    /**
     * Deletes a Certificate by its ID from the database.
     * 
     * @param id The ID of the Certificate to delete.
     */
    public void deleteCertificateById(Long id) {
        certificateRepository.deleteById(id);
    }
}