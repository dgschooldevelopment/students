const db = require('../db'); // Database connection

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const { transactionid, studentid, date, amount, payment_mode } = req.body;

    // Input validation
    if (!transactionid || !studentid || !date || !amount || !payment_mode) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `
        INSERT INTO transactions (transactionid, studentid, date, amount, payment_mode)
        VALUES (?, ?, ?, ?, ?);
    `;

    try {
        const [result] = await db.query(query, [transactionid, studentid, date, amount, payment_mode]);
        res.status(201).json({ message: 'Transaction created successfully', transactionId: result.insertId });
    } catch (err) {
        console.error('Error inserting transaction:', err);
        res.status(500).json({ message: 'Error creating transaction', error: err.message });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    const query = 'SELECT * FROM transactions;';

    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).json({ message: 'Error fetching transactions', error: err.message });
    }
};

// Get transactions by student ID
exports.getTransactionsByStudentId = async (req, res) => {
    const { studentid } = req.params;

    // Input validation
    if (!studentid) {
        return res.status(400).json({ message: 'Student ID is required' });
    }

    const query = 'SELECT * FROM transactions WHERE studentid = ?';

    try {
        const [results] = await db.query(query, [studentid]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No transactions found for the given student ID' });
        }

        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching transactions for student:', err);
        res.status(500).json({ message: 'Error fetching transactions', error: err.message });
    }
};
