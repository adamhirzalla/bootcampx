SELECT name, id, cohort_id
  FROM students
  WHERE start_date IS NOT NULL
    AND end_date IS NULL
  ORDER BY cohort_id;