SELECT 
	projects.name AS project_name,
    users.email AS user_email,
    types.name AS type_name,
    EXTRACT(MONTH FROM activities.started_on) AS month,
    SUM((EXTRACT(EPOCH FROM activities.ended_on) - EXTRACT(EPOCH FROM activities.started_on)) / 60)::INT AS time_elapsed
FROM activities
JOIN types ON activities.types_id = types.id
JOIN users ON activities.users_id = users.id
JOIN projects ON activities.projects_id = projects.id
WHERE projects.id = '0845cd2f-2dbc-4dbc-8145-f2afefa06fbd'
GROUP BY types.name, users.email, projects.name, EXTRACT(MONTH FROM activities.started_on);
