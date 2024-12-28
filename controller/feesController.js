const db = require('../db'); // Import the database connection



// Get all transactions
exports.getAllFeeDetails = (req, res) => {
    const query = 'SELECT * FROM fees;';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching fees:', err);
            return res.status(500).json({ message: 'Error fetching fees', error: err.message });
        }
        res.status(200).json(results);
    });
};




exports.calculatePaidFees = (req, res) => {
    const { studentid } = req.params;

    
    const query = `
SELECT 
    transactions.studentid,
    fees.total_fee,
    fees.course_name,
    fees.next_installment,       -- Example additional column
    fees.payment_date,      -- Example additional column
    (SELECT SUM(transactions.amount) 
     FROM transactions 
     WHERE transactions.studentid = fees.studentid) AS paid_amount,
    (fees.total_fee - 
        (SELECT IFNULL(SUM(transactions.amount), 0) 
         FROM transactions 
         WHERE transactions.studentid = fees.studentid)) AS remaining_amount
FROM fees
LEFT JOIN transactions ON fees.studentid = transactions.studentid
WHERE transactions.studentid = ?;


        
    `;

    // Execute the query
    db.query(query, [studentid], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error calculating paid fees', error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'No fee details found for the given student ID' });
        }

        // Respond with the calculated data
        res.status(200).json(result[0]);
    });
};
