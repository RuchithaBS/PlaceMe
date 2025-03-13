package com.tnsif.PlacementProject.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class StudentPlacement {
	
	@Id
    @ManyToOne
    private Student student;

    @Id
    @ManyToOne
    private Placement placement;

    private String applicationStatus;
    
    

	public StudentPlacement() {
	}

	public StudentPlacement(Student student, Placement placement, String applicationStatus) {
		super();
		this.student = student;
		this.placement = placement;
		this.applicationStatus = applicationStatus;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Placement getPlacement() {
		return placement;
	}

	public void setPlacement(Placement placement) {
		this.placement = placement;
	}

	public String getApplicationStatus() {
		return applicationStatus;
	}

	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}

	@Override
	public String toString() {
		return "StudentPlacement [student=" + student + ", placement=" + placement + ", applicationStatus="
				+ applicationStatus + "]";
	}
    
    
    
    

}
