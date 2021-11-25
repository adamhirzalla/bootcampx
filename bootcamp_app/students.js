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

const cohort = process.argv[2] ? '%' + process.argv[2].toUpperCase() + '%' : 'FEB12';
const limit = process.argv[3] || 5;

pool.query(`
SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, [cohort, limit])
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack));