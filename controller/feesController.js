const db = require('../db'); // Import the database connection

// Create a new fee detail (POST)
exports.feeinfo = (req, res) => {
    const { course_name, total_fee, paid_amount, payment_status, payment_date, student_email } = req.body;

    // Calculate remaining amount based on total fee and paid amount
    const remaining_amount = total_fee - paid_amount;

    const query = `
        INSERT INTO fee_details (course_name, total_fee, paid_amount, remaining_amount, payment_status, payment_date, student_email)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    db.query(query, [course_name, total_fee, paid_amount, remaining_amount, payment_status, payment_date, student_email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating fee detail', error: err.message });
        }
        res.status(201).json({ message: 'Fee detail created successfully', feeId: result.insertId });
    });
};

// Get all fee details (GET)
exports.feeinfo = (req, res) => {
    const query = 'SELECT * FROM fee_details;';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching fee details', error: err.message });
        }
        res.status(200).json(results);
    });
};
