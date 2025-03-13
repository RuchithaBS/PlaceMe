package com.tnsif.PlacementProject;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.tnsif.PlacementProject.Controllers.CertificateController;
import com.tnsif.PlacementProject.Entities.Certificate;
import com.tnsif.PlacementProject.Services.CertificateService;


@RunWith(SpringRunner.class)
@SpringBootTest
public class CertificateTesting {

	
	@Autowired
    private CertificateController certificateController;

    @MockBean
    private CertificateService certificateService;

    @Test
    public void testGetAllCertificates_shouldReturnEmptyList() {
        List<Certificate> emptyList = Collections.emptyList();
        Mockito.when(certificateService.getAllCertificates()).thenReturn(emptyList);

        List<Certificate> retrievedCertificates = certificateController.getAllCertificates();

        // Assert that the retrieved list is empty
        assertEquals(0, retrievedCertificates.size());
    }

    @Test
    public void testGetAllCertificates_shouldReturnListOfCertificates() {
        List<Certificate> certificates = Arrays.asList(new Certificate(), new Certificate());
        Mockito.when(certificateService.getAllCertificates()).thenReturn(certificates);

        List<Certificate> retrievedCertificates = certificateController.getAllCertificates();

        // Assert that the retrieved list matches the expected list
        assertEquals(certificates, retrievedCertificates);
    }
    
    
	
	@Test
	public void testGetCertificateById_shouldReturnCertificate() throws Exception {
	    Long certificateId = 1L;
	    Certificate expectedCertificate = new Certificate();
	    Mockito.when(certificateService.getCertificateById(certificateId)).thenReturn(expectedCertificate);

	    ResponseEntity<Certificate> responseEntity = certificateController.getCertificateById(certificateId);

	    // Assert that the response status is OK and the body matches the expected certificate
	    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	    assertEquals(expectedCertificate, responseEntity.getBody());
	}

	@Test
	public void testGetCertificateById_shouldReturnNotFound() throws Exception {
	    Long certificateId = 1L;
	    Mockito.when(certificateService.getCertificateById(certificateId)).thenThrow(new NoSuchElementException());

	    ResponseEntity<Certificate> responseEntity = certificateController.getCertificateById(certificateId);

	    // Assert that the response status is NOT_FOUND
	    assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
	}
	
	
	
	@Test
	public void testCreateCertificate_shouldCreateCertificate() throws Exception {
	    Certificate newCertificate = new Certificate();
	    Certificate savedCertificate = new Certificate();
	    savedCertificate.setCertificateId(1L);
	    Mockito.when(certificateService.saveCertificate(newCertificate)).thenReturn(savedCertificate);

	    ResponseEntity<Certificate> responseEntity = certificateController.createCertificate(newCertificate);

	    // Assert that the response status is CREATED and the body matches the saved certificate
	    assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
	    assertEquals(savedCertificate, responseEntity.getBody());
	}
	
	
	

}
