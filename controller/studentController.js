const db = require('../db'); 


exports.studentinfo = (req, res) => {
    const { name, mobileno, email, qualification, adhar_card_no, college_name, gender, date_of_birth } = req.body;

    const query = `
        INSERT INTO student_details (name, mobileno, email, qualification, adhar_card_no, college_name, gender, date_of_birth)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(query, [name, mobileno, email, qualification, adhar_card_no, college_name, gender, date_of_birth], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating student', error: err.message });
        }
        res.status(201).json({ message: 'Student created successfully', studentId: result.insertId });
    });
};

// Get all students
exports.studentinfo = (req, res) => {
    const query = `SELECT * FROM student_details;`;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching students', error: err.message });
        }
        res.status(200).json(results);
    });
};

