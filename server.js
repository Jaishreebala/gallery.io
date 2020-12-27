const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors")
const connectDB = require("./db/config/db")
const cookieParser = require("cookie-parser");
const errorHandler = require("./db/middleware/error");
const fileUpload = require("express-fileupload");

const app = express();

// env file configuration
dotenv.config({ path: './db/config/config.env' })
//Body parser
app.use(express.json());
app.use(fileUpload())
connectDB();
// Routing
const auth = require('./db/router/auth');
app.use('/api/v1/auth', auth)
const gallery = require('./db/router/gallery');
app.use('/api/v1/photo', gallery);


// Call error handler after routing
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Up And Running On Port ${PORT}`.blue.bold));