const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors")
const connectDB = require("./db/config/db")
const app = express();

// env file configuration
dotenv.config({ path: './db/config/config.env' })
//Body parser
app.use(express.json());

connectDB();
// Routing
const auth = require('./db/router/auth');
app.use('/api/v1/auth', auth)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Up And Running On Port ${PORT}`.blue.bold));