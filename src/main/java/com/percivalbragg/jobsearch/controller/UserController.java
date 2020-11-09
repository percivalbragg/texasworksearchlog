package com.percivalbragg.jobsearch.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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

import com.percivalbragg.jobsearch.dao.UserRepo;
import com.percivalbragg.jobsearch.model.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserRepo repo;

	public UserController() {}

	@GetMapping("/users")
	public List<User> getUsers() {
		return repo.findAll();
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
		Optional<User> user = repo.findById(id);
		return user.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/user")
	public ResponseEntity<User> addUser(@Validated @RequestBody User user) throws URISyntaxException {
		User result = repo.save(user);
		return ResponseEntity.created(new URI("/user" + result.getId())).body(result);
	}

	@PutMapping("/user")
	public ResponseEntity<User> updateUser(@Validated @RequestBody User user) throws URISyntaxException {
		User result = repo.save(user);
		return ResponseEntity.ok().body(result);
	}

	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
		repo.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
}
