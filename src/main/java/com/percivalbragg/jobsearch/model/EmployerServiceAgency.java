package com.percivalbragg.jobsearch.model;

import javax.persistence.Embeddable;

@Embeddable
public class EmployerServiceAgency {
	
	private String employerServiceAgency;
	private String address;
	private String city;
	private String state;
	private String zip;
	private String phoneNumber;

	public EmployerServiceAgency() {}

	public String getEmployerServiceAgency() {
		return employerServiceAgency;
	}

	public void setEmployerServiceAgency(String employerServiceAgency) {
		this.employerServiceAgency = employerServiceAgency;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	@Override
	public String toString() {
		return "EmployerServiceAgency [employerServiceAgency=" + employerServiceAgency + ", address=" + address + ", city=" + city + ", state=" + state
				+ ", zip=" + zip + ", phoneNumber=" + phoneNumber + "]";
	}

}
