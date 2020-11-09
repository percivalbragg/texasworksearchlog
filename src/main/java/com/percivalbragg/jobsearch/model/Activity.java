package com.percivalbragg.jobsearch.model;

import java.time.LocalDate;

import javax.persistence.Embeddable;

import org.springframework.lang.NonNull;

@Embeddable
public class Activity {
	
	@NonNull
	private LocalDate activityDate;
	private String activity;
	private String job;

	public Activity() {}

	public LocalDate getActivityDate() {
		return activityDate;
	}

	public void setActivityDate(LocalDate activityDate) {
		this.activityDate = activityDate;
	}

	public String getActivity() {
		return activity;
	}

	public void setActivity(String activity) {
		this.activity = activity;
	}

	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}

	@Override
	public String toString() {
		return "Activity [activityDate=" + activityDate + ", activity=" + activity + ", job=" + job + "]";
	}

}
