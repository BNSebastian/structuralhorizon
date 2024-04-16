            SELECT projects.name AS project,
                   types.name AS type,
                   EXTRACT(WEEK FROM activities.started_on) AS week,
                   SUM((EXTRACT(EPOCH FROM activities.ended_on) - EXTRACT(EPOCH FROM activities.started_on)) / 60) AS minutes
            FROM activities

            JOIN types ON activities.types_id = types.id
            JOIN projects ON activities.projects_id = projects.id

            WHERE projects.id = :projectId

            GROUP BY types.name, projects.id, EXTRACT(WEEK FROM activities.started_on)