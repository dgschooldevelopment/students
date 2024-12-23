
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',      // Database host
    user: 'root',           // Your MySQL username
    password: '5503',           // Your MySQL password
    database: 'dreamsguider' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process if connection fails
    }
    console.log('Connected to the database.');
});

module.exports = db; // Export the database connection
