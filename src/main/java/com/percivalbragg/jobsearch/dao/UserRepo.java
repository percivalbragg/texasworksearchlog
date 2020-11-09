package com.percivalbragg.jobsearch.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.percivalbragg.jobsearch.model.User;

public interface UserRepo extends JpaRepository<User, Long> {

}
