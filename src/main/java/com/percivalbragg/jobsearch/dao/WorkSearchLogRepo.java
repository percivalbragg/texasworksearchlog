package com.percivalbragg.jobsearch.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.percivalbragg.jobsearch.model.WorkSearchLog;

public interface WorkSearchLogRepo extends JpaRepository<WorkSearchLog, Long> {
	
	List<WorkSearchLog> findByUserId(Long id);
	Optional<WorkSearchLog> findByIdAndUserId(Long wslId, Long userId);
	@Query(value = "select * from work_search_logs where date_of_activity between to_date(?1, 'yyyy-mm-dd') and to_date(?2, 'yyyy-mm-dd')", nativeQuery = true)
	List<WorkSearchLog> findAllByActivityDateBetween(String fromDate, String toDate);

}
