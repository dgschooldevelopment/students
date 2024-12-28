const db = require('../db'); // Database connection

exports.getStudentDetails = (req, res) => {
    const query = `
        SELECT 
            students.studentid,
            students.name,
            students.batchno,
            course_details.course_name,
            course_details.joining_date
        FROM students
        LEFT JOIN course_details ON students.studentid = course_details.studentid;
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching student details with courses:', err);
            return res.status(500).json({ message: 'Error fetching student details', error: err.message });
        }
        res.status(200).json(results);
    });
};
