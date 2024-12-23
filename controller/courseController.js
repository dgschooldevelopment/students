const db = require('../db'); // Database connection

// Create a new course (POST)
exports.courseinfo = (req, res) => {
    const { course_name, joining_date, duration, batch_timing, mode_of_learning, fee_details, course_end_date } = req.body;
    const query = `
        INSERT INTO course_details (course_name, joining_date, duration, batch_timing, mode_of_learning, fee_details, course_end_date)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(query, [course_name, joining_date, duration, batch_timing, mode_of_learning, fee_details, course_end_date], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating course', error: err.message });
        }
        res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
    });
};

// Get all courses (GET)
exports.courseinfo = (req, res) => {
    const query = 'SELECT * FROM course_details;';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching courses', error: err.message });
        }
        res.status(200).json(results);
    });
};
