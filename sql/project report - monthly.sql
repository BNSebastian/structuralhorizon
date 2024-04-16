SELECT 
	projects.name AS project,
    types.name AS type,
    EXTRACT(MONTH FROM activities.started_on) AS month,
    SUM((EXTRACT(EPOCH FROM activities.ended_on) - EXTRACT(EPOCH FROM activities.started_on)) / 60)::INT AS minutes
FROM activities

JOIN types ON activities.types_id = types.id
JOIN projects ON activities.projects_id = projects.id

GROUP BY types.name, projects.name, EXTRACT(MONTH FROM activities.started_on);
