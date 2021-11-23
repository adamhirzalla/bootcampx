SELECT name AS student, AVG(assignment_submissions.duration) AS average_assignment_duration
FROM students JOIN assignment_submissions ON student_id = students.id
WHERE end_date IS NULL
GROUP BY name
ORDER BY average_assignment_duration DESC;