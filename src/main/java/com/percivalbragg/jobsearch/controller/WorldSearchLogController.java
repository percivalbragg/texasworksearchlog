package com.percivalbragg.jobsearch.controller;


import java.io.IOException;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import com.percivalbragg.jobsearch.dao.UserRepo;
import com.percivalbragg.jobsearch.dao.WorkSearchLogRepo;
import com.percivalbragg.jobsearch.model.WorkSearchLog;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class WorldSearchLogController {
	
	@Autowired
	private WorkSearchLogRepo wslRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	public WorldSearchLogController() {}

	@GetMapping("/logs")
	public List<WorkSearchLog> getLogs() {
		return wslRepo.findAll();
	}
	
	@GetMapping("/log/{id}")
	public Optional<WorkSearchLog> getLog(@PathVariable("id") Long id) {
		return wslRepo.findById(id);
	}
	
	@GetMapping("/user/{id}/logs")
	public List<WorkSearchLog> getAllWorkSearchLogsByUserId(@PathVariable("id") Long id) {
		return wslRepo.findByUserId(id);
	}
	
	@GetMapping("/user/{userId}/log/{wslId}")
	public ResponseEntity<?> getLog(@PathVariable("userId") Long userId, 
									@PathVariable("wslId") Long wslId) {
		return wslRepo.findByIdAndUserId(wslId, userId).map(wsl -> {
			return ResponseEntity.ok().build();
		}).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping("/user/{id}/log")
	public WorkSearchLog createLog(@PathVariable("id") String id, @RequestBody WorkSearchLog wsl) {
		return userRepo.findById(Long.parseLong(id)).map(entity -> {
			wsl.setUser(entity);
			return wslRepo.save(wsl);
		}).orElseThrow(() -> new IllegalArgumentException("UserId " + id + " not found."));
	}

	@PostMapping("/log")
	public WorkSearchLog addLog(@RequestBody WorkSearchLog wsl) {
		wslRepo.save(wsl);
		
		return wsl;
	}

	@PutMapping("/user/{userId}/log/{wslId}")
	public WorkSearchLog updateLogForUser(@PathVariable("userId") Long userId, 
									@PathVariable("wslId") Long wslId, 
									@RequestBody WorkSearchLog wsl) {
		if(!userRepo.existsById(userId)) {
			throw new IllegalArgumentException("User ID " + userId + " not found.");
		}
		return wslRepo.findById(wslId).map(response -> {
			response.setActivity(wsl.getActivity());
			response.setContact(wsl.getContact());
			response.setEsa(wsl.getEsa());
			response.setResults(wsl.getResults());
			return wslRepo.save(response);
		}).orElseThrow(() -> new IllegalArgumentException("WorkSearchLog " + wslId + " not found."));
	}

	@PutMapping("/log")
	public ResponseEntity<WorkSearchLog> updateLog(@Validated @RequestBody WorkSearchLog wsl) throws URISyntaxException {
		WorkSearchLog result = wslRepo.save(wsl);
		return ResponseEntity.ok().body(result);
	}

	@DeleteMapping("/user/{userId}/log/{wslId}")
	public ResponseEntity<?> deleteLog(@PathVariable("userId") Long userId, 
									@PathVariable("wslId") Long wslId) {
		return wslRepo.findByIdAndUserId(wslId, userId).map(wsl -> {
			wslRepo.delete(wsl);
			return ResponseEntity.ok().build();
		}).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("/log")
	public WorkSearchLog deleteLog(@RequestBody WorkSearchLog wsl) {
		wslRepo.delete(wsl);
		
		return wsl;
	}

	@DeleteMapping("/log/{id}")
	public String deleteLog(@PathVariable("id") Long id) {
		WorkSearchLog wsl = wslRepo.getOne(id);
		wslRepo.delete(wsl);
		return "deleted";
	}
	
	@GetMapping("/logs/export")
	public void exportToCSV(HttpServletResponse response) throws IOException {
		response.setContentType("text/csv");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
		String currentDateTime = dateFormatter.format(new Date());
		
		String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=work_search_log_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);
        
        List<WorkSearchLog> wsls = wslRepo.findAll();
        
        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {
        		"Date Of Activity", "Work Search Activity", "Type of Job", 
        		"Employer/Service/Agency Name", "Address", "City", "State", "Zip Code", "Phone Number",
        		"Person Contacted", "Contact Email",
        		"Result", "Start Date", 
        		"Name", "SS#"
        		};
        String[] nameMapping = {"activityDate", "workSearchActivity", "jobType", 
        		"esaName", "esaAddress", "esaCity", "esaState", "esaZip", "esaPhoneNumber", 
        		"personContacted", "email",
        		"result", "startDate", 
        		"userName", "ssn"
        		};
        
        csvWriter.writeHeader(csvHeader);
        
        for (WorkSearchLog wsl : wsls) {
            csvWriter.write(wsl, nameMapping);
        }
         
        csvWriter.close();
		
	}
	
	@GetMapping("/logs/export/{fromDate}/{toDate}")
	public void exportToCSVFilterByDates(@PathVariable("fromDate") String fromDate,
										@PathVariable("toDate") String toDate,
										HttpServletResponse response) throws IOException {
		response.setContentType("text/csv");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
		String currentDateTime = dateFormatter.format(new Date());
		
		String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=work_search_log_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);
        
        List<WorkSearchLog> wsls = wslRepo.findAllByActivityDateBetween(fromDate, toDate);
        
        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {
        		"Date Of Activity", "Work Search Activity", "Type of Job", 
        		"Employer/Service/Agency Name", "Address", "City", "State", "Zip Code", "Phone Number",
        		"Person Contacted", "Contact Email",
        		"Result", "Start Date", 
        		"Name", "SS#"
        		};
        String[] nameMapping = {"activityDate", "workSearchActivity", "jobType", 
        		"esaName", "esaAddress", "esaCity", "esaState", "esaZip", "esaPhoneNumber", 
        		"personContacted", "email",
        		"result", "startDate", 
        		"userName", "ssn"
        		};
        
        csvWriter.writeHeader(csvHeader);
        
        for (WorkSearchLog wsl : wsls) {
            csvWriter.write(wsl, nameMapping);
        }
         
        csvWriter.close();
		
	}
	
}
