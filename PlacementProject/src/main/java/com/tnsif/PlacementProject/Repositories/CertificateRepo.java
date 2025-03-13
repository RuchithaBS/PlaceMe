package com.tnsif.PlacementProject.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tnsif.PlacementProject.Entities.Certificate;

/**
 * This interface extends JpaRepository and defines methods for accessing Certificate entities.
 * JpaRepository provides basic CRUD (Create, Read, Update, Delete) operations for JPA entities.
 * You can also define custom queries using the @Query annotation.
 */
public interface CertificateRepo extends JpaRepository<Certificate, Long> {
}
