const db = require('../db'); // Database connection
exports.getStudentDetails = (req, res) => {
    const query = `
   SELECT studentid, name, batchno, NULL AS joining_date
FROM students

UNION

SELECT course_name, joining_date, NULL AS batchno, NULL AS studentid
FROM course_details;


    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching student details with course :', err);
            return res.status(500).json({ message: 'Error fetching student details', error: err.message });
        }
        res.status(200).json(results);
    });
};
