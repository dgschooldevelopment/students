const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,      // Use environment variables
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,// Replace with your database name
    waitForConnections: true,  // Queue requests if no connection is available
    connectionLimit: 10,       // Max number of connections in the pool
    queueLimit: 0              // No limit on queued requests
});

// Export a promise-based pool for easy async/await usage


// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process if connection fails
    }
    console.log('Connected to the database.');
});


module.exports = pool.promise();