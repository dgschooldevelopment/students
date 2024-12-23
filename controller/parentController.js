const db = require('../db'); // Import the database connection

// Create a new student (POST)
exports.parentinfo = (req, res) => {
    const { name, mobileno, email, address } = req.body;

    const query = `
        INSERT INTO parent_details (name, mobileno, email, address)
        VALUES (?, ?, ?, ?);
    `;

    db.query(query, [name, mobileno, email, address], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating student', error: err.message });
        }
        res.status(201).json({ message: 'Student created successfully', studentId: result.insertId });
    });
};

// Get all students (GET)
exports.parentinfo = (req, res) => {
    const query = 'SELECT * FROM parent_details;';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching students', error: err.message });
        }
        res.status(200).json(results);
    });
};
