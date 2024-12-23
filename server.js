const express = require ('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/route');

const app = express();
const PORT = 3000;
app.use(express.json());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


