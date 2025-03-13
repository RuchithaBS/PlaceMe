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

import com.tnsif.PlacementProject.Entities.Certificate;
import com.tnsif.PlacementProject.Services.CertificateService;

/**
 * This class defines a REST controller for managing Certificates.
 * It exposes various API endpoints for CRUD operations on Certificates.
 */
@RestController
public class CertificateController {
	
	/**
     * Injects the CertificateService dependency using Spring Autowired annotation.
     * The service layer handles business logic related to Certificates.
     */
	 @Autowired
	    private CertificateService certificateService;

	 /**
	     * GET request handler to retrieve all Certificates.
	     * 
	     * @return ResponseEntity containing a list of all Certificates.
	     */
	    // Get all certificates
	    @GetMapping("/certificates")
	    public List<Certificate> getAllCertificates() {
	        return certificateService.getAllCertificates();
	    }
	    
	    /**
	     * GET request handler to retrieve a Certificate by its ID.
	     * 
	     * @param id The ID of the Certificate to retrieve.
	     * @return ResponseEntity containing the retrieved Certificate or a NOT_FOUND status if not found.
	     */

	    // Get a certificate by ID
	    @GetMapping("/certificates/{id}")
	    public ResponseEntity<Certificate> getCertificateById(@PathVariable Long id) {
	        try {
	            Certificate certificate = certificateService.getCertificateById(id);
	            return new ResponseEntity<Certificate>(certificate, HttpStatus.OK);
	        } catch (NoSuchElementException e) {
	            return new ResponseEntity<Certificate>(HttpStatus.NOT_FOUND);
	        }
	    }
	    
	    /**
	     * POST   
	 request handler to create a new Certificate.
	     * 
	     * @param certificate The Certificate object to be created.
	     * @return ResponseEntity containing the created Certificate with a CREATED status.
	     */

	    // Create a new certificate
	    @PostMapping("/certificates")
	    public ResponseEntity<Certificate> createCertificate(@RequestBody Certificate certificate) {
	        Certificate savedCertificate = certificateService.saveCertificate(certificate);
	        return ResponseEntity.created(null).body(savedCertificate);
	    }
	    /**
	     * PUT request handler to update an existing Certificate.
	     * 
	     * @param id The ID of the Certificate to update.
	     * @param certificate The updated Certificate object.
	     * @return ResponseEntity containing the updated Certificate or a NOT_FOUND status if not found.
	     */

	    // Update a certificate
	    @PutMapping("/certificates/{id}")
	    public ResponseEntity<Certificate> updateCertificate(@PathVariable Long id, @RequestBody Certificate certificate) {
	        try {
	            Certificate existingCertificate = certificateService.getCertificateById(id);
	            certificate.setCertificateId(id); // Set the ID explicitly for update
	            certificateService.saveCertificate(certificate);
	            return ResponseEntity.ok(certificate);
	        } catch (NoSuchElementException e) {
	            return ResponseEntity.notFound().build();
	        }
	    }
	    /**
	     * DELETE request handler to delete a Certificate by its ID.
	     * 
	     * @param id The ID of the Certificate to delete.
	     * @return ResponseEntity with a NO_CONTENT status on successful deletion or a NOT_FOUND status if not found.
	     */
	    // Delete a certificate by ID
	    @DeleteMapping("/certificates/{id}")
	    public ResponseEntity<Void> deleteCertificate(@PathVariable Long id) {
	        try {
	            certificateService.deleteCertificateById(id);
	            return ResponseEntity.noContent().build();
	        } catch (NoSuchElementException e) {
	            return ResponseEntity.notFound().build();
	        }
	    }
	    
	    /**
	     * Exception handler for NoSuchElementException. This is triggered when a Certificate is not found during
	     * retrieval or deletion.
	     * 
	     * @param ex The NoSuchElementException object.
	     * @return ResponseEntity with a NOT_FOUND status and the exception message.
	     */

	    @ExceptionHandler(NoSuchElementException.class)
	    public ResponseEntity<String> handleCertificateNotFoundException(NoSuchElementException ex) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	    }
}
