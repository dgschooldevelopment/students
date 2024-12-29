const mysql = require('mysql2');

// Load environment variables from.env file
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,      // Use environment variables
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,// Replace with your database name
    port: process.env.DB_PORT         // No limit on queued requests
});


const promisePool = pool.promise();

promisePool.getConnection()
  .then((conn) => {
      console.log('Successfully connected to the database!');
      conn.release();
  })
  .catch((err) => {
      console.error('Error connecting to the database:', err);
  });

module.exports = promisePool;


// Export a promise-based pool for easy async/await usage


// Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         process.exit(1); // Exit the process if connection fails
//     }
//     console.log('Connected to the database.');
// });


module.exports = pool.promise();