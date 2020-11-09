package com.percivalbragg.jobsearch.model;

import java.time.LocalDate;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.percivalbragg.jobsearch.enums.Result;

@Embeddable
public class Results {
	
	@Enumerated(EnumType.STRING)
	private Result result;
	private LocalDate startDate;

	public Results() {}

	public Result getResult() {
		return result;
	}

	public void setResult(Result result) {
		this.result = result;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	@Override
	public String toString() {
		return "Results [result=" + result + ", startDate=" + startDate + "]";
	}

}
