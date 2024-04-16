SELECT 
	projects.name AS project,
	turbines.number AS turbine,
    users.email AS user,
    types.name AS type,
    EXTRACT(MONTH FROM activities.started_on) AS month,
    SUM((EXTRACT(EPOCH FROM activities.ended_on) - EXTRACT(EPOCH FROM activities.started_on)) / 60)::INT AS minutes
FROM activities

JOIN projects ON activities.projects_id = projects.id
JOIN turbines ON activities.turbines_id = turbines.id
JOIN users ON activities.users_id = users.id
JOIN types ON activities.types_id = types.id

WHERE users.id = 2

GROUP BY turbines.number, types.name, users.email, projects.name, EXTRACT(MONTH FROM activities.started_on);
