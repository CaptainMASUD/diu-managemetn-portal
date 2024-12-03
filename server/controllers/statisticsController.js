const db = require('../config/db');

// Get total statistics
exports.getStatistics = (req, res) => {
  const statistics = {};

  // Total users count (all roles: student, teacher, admin)
  const usersQuery = 'SELECT COUNT(*) AS total_users FROM users';
  db.query(usersQuery, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching total users count.');
    }
    statistics.total_users = results[0].total_users;

    // Total students count
    const studentsQuery = "SELECT COUNT(*) AS total_students FROM users WHERE role = 'student'";
    db.query(studentsQuery, (err, results) => {
      if (err) {
        return res.status(500).send('Error fetching total students count.');
      }
      statistics.total_students = results[0].total_students;

      // Total teachers count
      const teachersQuery = "SELECT COUNT(*) AS total_teachers FROM users WHERE role = 'teacher'";
      db.query(teachersQuery, (err, results) => {
        if (err) {
          return res.status(500).send('Error fetching total teachers count.');
        }
        statistics.total_teachers = results[0].total_teachers;

        // Total courses count
        const coursesQuery = 'SELECT COUNT(*) AS total_courses FROM courses';
        db.query(coursesQuery, (err, results) => {
          if (err) {
            return res.status(500).send('Error fetching total courses count.');
          }
          statistics.total_courses = results[0].total_courses;

          // Total advised teachers count (teachers who have been assigned students)
          const advisedTeachersQuery = `
            SELECT COUNT(DISTINCT teacher_id) AS total_advised_teachers 
            FROM advisor_assignments
          `;
          db.query(advisedTeachersQuery, (err, results) => {
            if (err) {
              return res.status(500).send('Error fetching total advised teachers count.');
            }
            statistics.total_advised_teachers = results[0].total_advised_teachers;

            // Total courses assigned to teachers
            const teacherCoursesQuery = 'SELECT COUNT(*) AS total_teacher_courses FROM teacher_courses';
            db.query(teacherCoursesQuery, (err, results) => {
              if (err) {
                return res.status(500).send('Error fetching total teacher courses count.');
              }
              statistics.total_teacher_courses = results[0].total_teacher_courses;

              // Total course registrations (students enrolled in courses)
              const courseRegistrationsQuery = `
                SELECT COUNT(*) AS total_course_registrations 
                FROM registrations
              `;
              db.query(courseRegistrationsQuery, (err, results) => {
                if (err) {
                  return res.status(500).send('Error fetching total course registrations.');
                }
                statistics.total_course_registrations = results[0].total_course_registrations;

                // Total number of students per course (percentage of students enrolled in each course)
                const courseStudentCountQuery = `
                  SELECT c.course_id, c.course_name, COUNT(r.student_id) AS student_count 
                  FROM courses c
                  LEFT JOIN registrations r ON c.id = r.course_id
                  GROUP BY c.id
                `;
                db.query(courseStudentCountQuery, (err, results) => {
                  if (err) {
                    return res.status(500).send('Error fetching student count per course.');
                  }
                  statistics.course_student_counts = results;

                  // Return all statistics
                  return res.json(statistics);
                });
              });
            });
          });
        });
      });
    });
  });
};
