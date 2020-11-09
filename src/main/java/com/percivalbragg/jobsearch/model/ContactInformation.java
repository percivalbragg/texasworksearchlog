package com.percivalbragg.jobsearch.model;

import javax.persistence.Embeddable;

@Embeddable
public class ContactInformation {

	private String personContacted;
	private String contactEmail;

	public ContactInformation() {
	}

	public String getPersonContacted() {
		return personContacted;
	}

	public void setPersonContacted(String personContacted) {
		this.personContacted = personContacted;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmailAddress(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	@Override
	public String toString() {
		return "ContactInformation [personContacted=" + personContacted + ", contactEmail=" + contactEmail + "]";
	}

}
