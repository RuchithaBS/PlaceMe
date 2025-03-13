package com.tnsif.PlacementProject.Entities;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;


/**
 * College entity representing a college.
 *
 * @author [Akash]
 */

@Entity
public class College {
//primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long collegeId;

    private String name;
    private String location;
    private String contact;
    
    /**
     * One-to-one relationship with the User entity.
     * FetchType.EAGER means the user is loaded together with the college.
     */
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_user_id")
    @JsonIgnore
    private User user;
    
    private Long userId;
    
    @OneToMany
    @JoinColumn(name = "college_college_id")
    private List<Placement> placement;

	

	public College() {
	}
	/**
     * Constructor with all college details except `user`.
     *
     * @param collegeId Unique identifier for the college.
     * @param name Name of the college.
     * @param location Location of the college.
     * @param contact Contact information for the college.
     */

	public College( Long collegeId, String name,
			String location, String contact) {
		super();
		this.collegeId = collegeId;
		this.name = name;
		this.location = location;
		this.contact = contact;
	}


	public Long getCollegeId() {
		return collegeId;
	}


	public void setCollegeId(Long collegeId) {
		this.collegeId = collegeId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getContact() {
		return contact;
	}


	public void setContact(String contact) {
		this.contact = contact;
	}


	@Override
	public String toString() {
		return "College [collegeId=" + collegeId + ", name=" + name + ", location=" + location
				+ ", contact=" + contact + "]";
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
	/**
     * Sets the user ID associated with the college (redundant).
     *
     * @param userId User ID associated with the college.
     */

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	
	public List<Placement> getPlacement() {
		return placement;
	}
	public void setPlacement(List<Placement> placement) {
		this.placement = placement;
	}
    
 
}