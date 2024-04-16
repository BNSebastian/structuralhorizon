SELECT 
    types_id, users_id,
    EXTRACT(WEEK FROM started_on) AS week,
    SUM(EXTRACT(EPOCH FROM ended_on) - EXTRACT(EPOCH FROM started_on)) AS total_elapsed_time
FROM activities
GROUP BY types_id, users_id, EXTRACT(WEEK FROM started_on);
