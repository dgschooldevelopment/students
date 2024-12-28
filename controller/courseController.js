const pool = require('../db'); // Using the connection pool

// Create a new course (POST)
exports.postcourseinfo = async (req, res) => {
    const { course_name, courseid, joining_date, duration, batch_timing, mode_of_learning, fee_details, course_end_date } = req.body;

    // Validate required fields
    if (!course_name || !courseid || !joining_date || !duration || !batch_timing || !mode_of_learning || !fee_details || !course_end_date) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const query = `
            INSERT INTO course_details (course_name, courseid, joining_date, duration, batch_timing, mode_of_learning, fee_details, course_end_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const [result] = await pool.query(query, [course_name, courseid, joining_date, duration, batch_timing, mode_of_learning, fee_details, course_end_date]);
        res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
    } catch (err) {
        console.error('Error creating course:', err);
        res.status(500).json({ message: 'Error creating course', error: err.message });
    }
};

// Get all courses (GET)
exports.getcourseinfo = async (req, res) => {
    try {
        const query = 'SELECT * FROM course_details;';
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ message: 'Error fetching courses', error: err.message });
    }
};
