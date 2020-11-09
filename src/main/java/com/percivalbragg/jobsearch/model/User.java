package com.percivalbragg.jobsearch.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.lang.NonNull;

@Entity
@Table(name="users")
@SequenceGenerator(name = "user_gen", sequenceName = "user_gen",  initialValue = 100)
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "user_gen")
	private Long id;
	
	@NonNull
	private String name;
	@NonNull
	private String ssn;
	
//	@OneToMany
//	private Set<WorkSearchLog> workSearchLogs;
	
	public User() {}

	public User(String name, String ssn) {
		super();
		this.name = name;
		this.ssn = ssn;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", ssn=" + ssn + "]";
	}

}
