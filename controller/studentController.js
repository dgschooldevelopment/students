const db = require('../db'); // Database connection

// Create a new student
exports.createStudent = async (req, res) => {
    const { 
        name, 
        mobileno, 
        email, 
        qualification, 
        adhar_card_no, 
        college_name, 
        gender, 
        date_of_birth, 
        parent_name, 
        parent_mobileno, 
        parent_email, 
        address 
    } = req.body;

    // Input validation
    if (!name || !mobileno || !email || !qualification) {
        return res.status(400).json({ message: 'Missing required fields: name, mobileno, email, or qualification' });
    }

    const query = `
        INSERT INTO students 
        (name, mobileno, email, qualification, adhar_card_no, college_name, gender, date_of_birth, parent_name, parent_mobileno, parent_email, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    try {
        const [result] = await db.query(query, [
            name, mobileno, email, qualification, adhar_card_no, college_name, gender, date_of_birth, 
            parent_name, parent_mobileno, parent_email, address
        ]);
        res.status(201).json({ message: 'Student created successfully', studentId: result.insertId });
    } catch (err) {
        console.error('Error in SQL query:', err);
        res.status(500).json({ message: 'Error creating student', error: err.message });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    const query = 'SELECT * FROM students;';

    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ message: 'Error fetching students', error: err.message });
    }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
    const { studentid } = req.params;

    if (!studentid) {
        return res.status(400).json({ message: 'Student ID is required' });
    }

    const query = 'SELECT * FROM students WHERE studentid = ?';

    try {
        const [results] = await db.query(query, [studentid]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(results[0]); // Return a single student object
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).json({ message: 'Error fetching student', error: err.message });
    }
};
