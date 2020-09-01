const express = require('express');
const generateRoutes = require('./api');

// Load environment variables
require('dotenv').config()

const app = express();
generateRoutes(app);

// Spin up server
app.listen(process.env.PORT, () =>
    console.log(`Server is listening on port: ${process.env.PORT}`),
);