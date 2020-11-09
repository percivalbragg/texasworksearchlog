insert into users (id, name, ssn) values (100, 'Percival Bragg', '090-74-3132');
insert into work_search_logs 
	(
		id,
		work_search_activity,
		date_of_activity,
		type_of_job,
		contact_email,
		person_contacted,
		address,
		city,
		state,
		zip,
		phone_number,
		employer_service_agency,
		result,
		start_date,
		user_id
	)
values 
	(
		101,
		'Contacted by Agency',
		TO_DATE('2020-11-02', 'YYYY-MM-DD'),
		'Java Developer',
		'tiffany.serrato@insightglobal.com',
		'Tiffany Serrato',
		'300 Convent Street',
		'San Antonio',
		'TX',
		'78205',
		'210-424-5594',
		'Insight Global',
		'APPLICATION_FILED',
		NULL,
		100
	);
		
