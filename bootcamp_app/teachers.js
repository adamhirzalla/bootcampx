const { Pool } = require('pg');

const config = {
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
};
const pool = new Pool(config);

pool.connect(()=>{
  console.log(`Connected to ${config.database}:`);
});

const cohort = process.argv[2];

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers 
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${cohort || 'JUL02'}%'
ORDER BY teachers.name;
`)
  .then(res => {
    res.rows.forEach(row => console.log(`${row.cohort}: ${row.teacher}`));
  })
  .catch(err => console.error('query error', err.stack));