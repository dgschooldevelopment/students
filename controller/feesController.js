const pool = require('../db'); // Import the database connection pool

// Get all fees
exports.getAllFeeDetails = async (req, res) => {
    try {
        const query = 'SELECT * FROM fees;';
        const [results] = await pool.query(query); // Using promise-based pool
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching fees:', err);
        res.status(500).json({ message: 'Error fetching fees', error: err.message });
    }
};

// Calculate paid and remaining fees for a specific student
exports.calculatePaidFees = async (req, res) => {
    const { studentid } = req.params;

    if (!studentid) {
        return res.status(400).json({ message: 'Student ID is required' });
    }

    const query = `
        SELECT 
            fees.studentid,
            fees.course_name,
            fees.total_fee,
            fees.next_installment,
            fees.payment_date,
            COALESCE(SUM(transactions.amount), 0) AS paid_amount,
            (fees.total_fee - COALESCE(SUM(transactions.amount), 0)) AS remaining_amount
        FROM fees
        LEFT JOIN transactions ON fees.studentid = transactions.studentid
        WHERE fees.studentid = ?
        GROUP BY fees.studentid, fees.course_name, fees.total_fee, fees.next_installment, fees.payment_date;
    `;

    try {
        const [result] = await pool.query(query, [studentid]); // Use parameterized query to prevent SQL injection
        if (result.length === 0) {
            return res.status(404).json({ message: 'No fee details found for the given student ID' });
        }
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Error calculating paid fees:', err);
        res.status(500).json({ message: 'Error calculating paid fees', error: err.message });
    }
};
