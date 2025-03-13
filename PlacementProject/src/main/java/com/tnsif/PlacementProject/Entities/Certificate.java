package com.tnsif.PlacementProject.Entities;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Certificate {
	/**
     * Unique identifier for the Certificate.
     */
    @Id
    private Long certificateId;

    /**
     * The Student associated with this Certificate.
     * This is a ManyToOne relationship (one Student can have many Certificates).
     * FetchType.EAGER fetches the Student data along with the Certificate in a single database call for efficiency.
     * @JsonIgnore prevents the student object from being serialized during JSON conversion to avoid infinite recursion.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_student_id")
//    @JsonIgnore
    private Student student;

    private String courseName;
    private Date dateIssued;
    /**
     * Redundant field for student ID. This might be useful for specific use cases 
     * but can be removed if student object is always retrieved.
     */
    private Long studentId;
   
    
    public Certificate() {
	}

	public Certificate(Long certificateId, Student student, String courseName, Date dateIssued) {
		super();
		this.certificateId = certificateId;
		this.student = student;
		this.courseName = courseName;
		this.dateIssued = dateIssued;
	}
	
	
	

	public Long getCertificateId() {
		return certificateId;
	}
	public void setCertificateId(Long certificateId) {
		this.certificateId = certificateId;
	}
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public Date getDateIssued() {
		return dateIssued;
	}
	public void setDateIssued(Date dateIssued) {
		this.dateIssued = dateIssued;
	}
	@Override
	public String toString() {
		return "Certificate [certificateId=" + certificateId + ", student=" + student + ", courseName=" + courseName
				+ "]";
	}

	/**
     * This method retrieves the student ID from the associated Student object.
     * This might be useful if you need the student ID without fetching the entire student object.
     * 
     * @return The student ID associated with the Certificate.
     */
	 public Long getStudentId() {
		 if (student != null) {
	        return student.getStudentId();
	    }
		 else {
			 return null;
		 }
	 }
	 /**
	     * Setter for studentId. This might be useful for specific scenarios, but consider
	     * if directly setting the student object is a better approach.
	     * 
	     * @param studentId The student ID to set.
	     */

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

    
}