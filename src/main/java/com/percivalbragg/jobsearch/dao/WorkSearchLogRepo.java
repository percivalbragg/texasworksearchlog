package com.percivalbragg.jobsearch.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.percivalbragg.jobsearch.model.WorkSearchLog;

public interface WorkSearchLogRepo extends JpaRepository<WorkSearchLog, Long> {
	
	List<WorkSearchLog> findByUserId(Long id);
	Optional<WorkSearchLog> findByIdAndUserId(Long wslId, Long userId);
	@Query
		(
			value = 
			"select * from work_search_logs where user_id = ?1 and date_of_activity between to_date(?2, 'yyyy-mm-dd') "
			+ "and to_date(?3, 'yyyy-mm-dd')", nativeQuery = true
		)
	List<WorkSearchLog> findAllByActivityDateBetween(Long userId, String fromDate, String toDate);

}
