package com.tnsif.PlacementProject.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Student {
//primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    private String email;
    private String contact;
    private String yearOfStudy;
    private String branch;
    private Double cgpa;
    private String placementStatus;
    
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "college_college_id")
    @JsonIgnore
    private College college;
    
    private Long collegeId;
    
    /**
     * One-to-one relationship with the User entity.
     * FetchType.EAGER means the user is loaded together with the college.
     */
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_user_id")
    @JsonIgnore
    private User user;
    
    private Long userId;
    

    
	public Student() {
	}



	public Student(Long studentId, String email, String contact, String yearOfStudy, String branch, Double cgpa,
			String placementStatus) {
		super();
		this.studentId = studentId;
		this.email = email;
		this.contact = contact;
		this.yearOfStudy = yearOfStudy;
		this.branch = branch;
		this.cgpa = cgpa;
		this.placementStatus = placementStatus;
	}



	public Long getStudentId() {
		return studentId;
	}



	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getContact() {
		return contact;
	}



	public void setContact(String contact) {
		this.contact = contact;
	}



	public String getYearOfStudy() {
		return yearOfStudy;
	}



	public void setYearOfStudy(String yearOfStudy) {
		this.yearOfStudy = yearOfStudy;
	}



	public String getBranch() {
		return branch;
	}



	public void setBranch(String branch) {
		this.branch = branch;
	}



	public Double getCgpa() {
		return cgpa;
	}



	public void setCgpa(Double cgpa) {
		this.cgpa = cgpa;
	}



	public String getPlacementStatus() {
		return placementStatus;
	}



	public void setPlacementStatus(String placementStatus) {
		this.placementStatus = placementStatus;
	}



	@Override
	public String toString() {
		return "Student [studentId=" + studentId + ", email=" + email + ", contact=" + contact + ", yearOfStudy="
				+ yearOfStudy + ", branch=" + branch + ", cgpa=" + cgpa + ", placementStatus=" + placementStatus + "]";
	}

	 /**
     * Gets the college ID associated with the college (redundant).
     *
     * @return college ID associated with the college.
     */

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


	 /**
     * Gets the user ID associated with the college (redundant).
     *
     * @return User ID associated with the college.
     */
	public Long getUserId() {
		if (user != null) {
	        return user.getUserId();
	    } else {
	        return null;
	    }
	}



	public void setUserId(Long userId) {
		this.userId = userId;
	}




	
	
    
}
