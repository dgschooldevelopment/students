const db = require('../db'); // Assuming your database connection is in this file

// Create a new transaction
exports.createTransaction = (req, res) => {
    const { transactionid,studentid, date, amount, payment_mode } = req.body;

    // Insert query
    const query = `
        INSERT INTO transactions (transactionid,studentid, date, amount, payment_mode)
        VALUES (?, ?, ?, ?,?);
    `;
    
    db.query(query, [transactionid, studentid,date, amount, payment_mode], (err, result) => {
        if (err) {
            console.error('Error inserting transaction:', err);
            return res.status(500).json({ message: 'Error creating transaction', error: err.message });
        }
        res.status(201).json({ message: 'Transaction created successfully', transactionId: result.insertId });
    });
};


// Get all transactions
exports.getAllTransactions = (req, res) => {
    const query = 'SELECT * FROM transactions;';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching transactions:', err);
            return res.status(500).json({ message: 'Error fetching transactions', error: err.message });
        }
        res.status(200).json(results);
    });
};




exports.getStudentById = (req, res) => {
    const { studentid } = req.params;  // Extract studentid from the route parameters

    // SQL query to fetch student data based on studentid
    const query = 'SELECT * FROM transactions WHERE studentid = ?';

    db.query(query, [studentid], (err, results) => {
        if (err) {
            console.error('Error fetching student:', err);  // Log the error
            return res.status(500).json({ message: 'Error fetching student', error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Student not found' });  // Handle no records found
        }

        // Respond with the student data
        res.status(200).json(results);  // Send back the first result (since studentid should be unique)
    });
};