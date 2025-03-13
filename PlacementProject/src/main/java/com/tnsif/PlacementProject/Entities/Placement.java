package com.tnsif.PlacementProject.Entities;

import java.util.NoSuchElementException;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import com.tnsif.PlacementProject.Controllers.CollegeController;

@Entity
public class Placement {

	//primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placementId;

    /**
     * Many-to-one relationship with the College entity.
     * FetchType.EAGER means the college is loaded together with the placement.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "college_college_id")
    @JsonIgnore
    private College college;

    private String companyName;
    private String jobRole;
    //extra collegeid field for getter to set the college id so that the whole college details can be ignored
    private Long collegeId;
    
    
    //default constructor for the jpa
	public Placement() {
	}
	//Constructors
	public Placement(Long placementId, College college, String companyName, String jobRole) {
		super();
		this.placementId = placementId;
		this.college = college;
		this.companyName = companyName;
		this.jobRole = jobRole;
	}
	public Long getPlacementId() {
		return placementId;
	}
	public void setPlacementId(Long placementId) {
		this.placementId = placementId;
	}
	public College getCollege() {
		return college;
	}
	public void setCollege(College college) {
		this.college = college;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getJobRole() {
		return jobRole;
	}
	public void setJobRole(String jobRole) {
		this.jobRole = jobRole;
	}
	@Override
	public String toString() {
		return "Placement [placementId=" + placementId + ", college=" + college + ", companyName=" + companyName
				+ ", jobRole=" + jobRole + "]";
	}

	//check and handling the null values
	public Long getCollegeId() {
		if (college != null) {
	        return college.getCollegeId();
	    } else {
	        return null;
	    }
	}

	public void setCollegeId(Long collegeId) {
        this.collegeId = collegeId;
    }

    
	
}