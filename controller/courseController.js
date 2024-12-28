const db = require('../db'); 

// Create a new course (POST)
exports.postcourseinfo = (req, res) => {
    const { course_name, courseid, joining_date, duration, batch_timing, mode_of_learning, fee_details, course_end_date } = req.body;

    console.log('Received data:', req.body);
    const query = `
        INSERT INTO course_details (course_name, courseid, joining_date, duration, batch_timing, mode_of_learning, fee_details, course_end_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    db.query(query, [course_name, courseid, joining_date, duration, batch_timing, mode_of_learning, fee_details, course_end_date], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Error creating course', error: err.message });
        }
        console.log('Query result:', result);
        res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
    });
};

// Get all courses (GET)
exports.getcourseinfo = (req, res) => {
    const query = 'SELECT * FROM course_details;';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching courses', error: err.message });
        }
        res.status(200).json(results);
    });
};

