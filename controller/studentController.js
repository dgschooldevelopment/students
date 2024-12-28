const db = require('../db');

exports.createStudent = (req, res) => {
    const { name, mobileno, email, qualification, adhar_card_no, college_name, gender, date_of_birth, parent_name, parent_mobileno, parent_email, address } = req.body;
    const query = `
        INSERT INTO students (name, mobileno, email, qualification, adhar_card_no, college_name, gender, date_of_birth,parent_name,parent_mobileno,parent_email,address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?);
    `;

    db.query(query, [name, mobileno, email, qualification, adhar_card_no, college_name, gender, date_of_birth, parent_name, parent_mobileno, parent_email, address], (err, result) => {
        if (err) {
            console.error('Error in SQL query:', err);  
            return res.status(500).json({ message: 'Error creating student', error: err.message });
        }
        res.status(201).json({ message: 'Student created successfully', studentId: result.insertId });
    });
};

exports.getAllStudents = (req, res) => {
    const query = 'SELECT * FROM students;';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err); 
            return res.status(500).json({ message: 'Error fetching students', error: err.message });
        }
        res.status(200).json(results);
    });
};



exports.getStudentById = (req, res) => {
    const { studentid } = req.params; 
  
    const query = 'SELECT * FROM students WHERE studentid = ?';

    db.query(query, [studentid], (err, results) => {
        if (err) {
            console.error('Error fetching student:', err);  
            return res.status(500).json({ message: 'Error fetching student', error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Student not found' });  
        }

        
        res.status(200).json(results);  
    });
};
