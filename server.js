const express = require ('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/route');
const cors = require('cors');


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
// const express = require('express');  // Add this line to import express

// Routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://192.168.1.109:${PORT}`);
});


