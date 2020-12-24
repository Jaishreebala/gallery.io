const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors")
const app = express();

// env file configuration
dotenv.config({ path: './db/config/config.env' })

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Up And Running On Port ${PORT}`.blue.bold));