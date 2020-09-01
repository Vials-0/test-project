const express = require('express');
const bodyParser = require('body-parser')
const generateRoutes = require('./api');

// Load environment variables
require('dotenv').config()

const app = express();

// Create application/json parser
const jsonParser = bodyParser.json()

// Connect body parser as middleware
app.use(jsonParser);

// Generate CRUD API
generateRoutes(app);

// Spin up server
app.listen(process.env.PORT, () =>
    console.log(`Server is listening on port: ${process.env.PORT}`),
);