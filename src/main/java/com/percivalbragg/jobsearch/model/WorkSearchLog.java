package com.percivalbragg.jobsearch.model;

import java.time.LocalDate;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.percivalbragg.jobsearch.enums.Result;

@Entity
@Table(name="workSearchLogs")
@SequenceGenerator(name = "log_gen", sequenceName = "log_gen",  initialValue = 100)
public class WorkSearchLog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "log_gen")
	private Long id;
	
	@Embedded
	@AttributeOverrides({
	  @AttributeOverride( name = "activityDate", column = @Column(name = "date_of_activity")),
	  @AttributeOverride( name = "activity", column = @Column(name = "work_search_activity")),
	  @AttributeOverride( name = "job", column = @Column(name = "type_of_job"))	})
	private Activity activity;
	
	@JsonIgnore
	public LocalDate getActivityDate() {
		return activity.getActivityDate();
	}
	@JsonIgnore
	public String getWorkSearchActivity() {
		return activity.getActivity();
	}
	@JsonIgnore
	public String getJobType() {
		return activity.getJob();
	}
	
	@Embedded
	@AttributeOverrides({
	  @AttributeOverride( name = "employerServiceAgency", column = @Column(name = "employer_service_agency")),
	  @AttributeOverride( name = "address", column = @Column(name = "address")),
	  @AttributeOverride( name = "city", column = @Column(name = "city")),
	  @AttributeOverride( name = "state", column = @Column(name = "state")),
	  @AttributeOverride( name = "zip", column = @Column(name = "zip")),
	  @AttributeOverride( name = "phoneNumber", column = @Column(name = "phone_number")) })
	private EmployerServiceAgency esa;
	
	@JsonIgnore
	public String getEsaName() {
		return esa.getEmployerServiceAgency();
	}
	@JsonIgnore
	public String getEsaAddress() {
		return esa.getAddress();
	}
	@JsonIgnore
	public String getEsaCity() {
		return esa.getCity();
	}
	@JsonIgnore
	public String getEsaState() {
		return esa.getState();
	}
	@JsonIgnore
	public String getEsaZip() {
		return esa.getZip();
	}
	@JsonIgnore
	public String getEsaPhoneNumber() {
		return esa.getPhoneNumber();
	}
	
	@Embedded
	@AttributeOverrides({
	  @AttributeOverride( name = "personContacted", column = @Column(name = "person_contacted")),
	  @AttributeOverride( name = "contactEmailAddress", column = @Column(name = "contact_email_address"))	})
	private ContactInformation contact;
	
	@JsonIgnore
	public String getPersonContacted() {
		return contact.getPersonContacted();
	}
	@JsonIgnore
	public String getEmail() {
		return contact.getContactEmail();
	}
	
	@Embedded
	@AttributeOverrides({
	  @AttributeOverride( name = "result", column = @Column(name = "result")),
	  @AttributeOverride( name = "startDate", column = @Column(name = "start_date"))	})
	private Results results;
	
	@JsonIgnore
	public Result getResult() {
		return results.getResult();
	}
	@JsonIgnore
	public LocalDate getStartDate() {
		return results.getStartDate();
	}
	
	@ManyToOne(optional=false)
    @JoinColumn(name = "user_id", nullable=false)
	@OnDelete(action=OnDeleteAction.CASCADE)
	private User user;
	
	@JsonIgnore
	public String getUserName() {
		return user.getName();
	}
	@JsonIgnore
	public String getSsn() {
		return user.getSsn();
	}

	public WorkSearchLog() {}

	public WorkSearchLog(Activity activity, EmployerServiceAgency esa, ContactInformation contact, Results results) {
		super();
		this.activity = activity;
		this.esa = esa;
		this.contact = contact;
		this.results = results;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Activity getActivity() {
		return activity;
	}

	public void setActivity(Activity activity) {
		this.activity = activity;
	}

	public EmployerServiceAgency getEsa() {
		return esa;
	}

	public void setEsa(EmployerServiceAgency esa) {
		this.esa = esa;
	}

	public ContactInformation getContact() {
		return contact;
	}

	public void setContact(ContactInformation contact) {
		this.contact = contact;
	}

	public Results getResults() {
		return results;
	}

	public void setResults(Results results) {
		this.results = results;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "WorkSearchLog [id=" + id + ", activity=" + activity + ", esa=" + esa + ", contact=" + contact
				+ ", results=" + results + ", user=" + user + "]";
	}

}
