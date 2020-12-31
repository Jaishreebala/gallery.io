const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors")
const connectDB = require("./db/config/db")
const cookieParser = require("cookie-parser");
const errorHandler = require("./db/middleware/error");
const fileUpload = require("express-fileupload");
const expressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();

// env file configuration
dotenv.config({ path: './db/config/config.env' })
//Body parser
app.use(express.json());
app.use(fileUpload());
// Preven t noSQL injections
app.use(expressMongoSanitize());
// Set headers for security
app.use(helmet());
// Prevent XSS atacks
app.use(xss());
// Prevent HPP
app.use(hpp());
connectDB();
// Routing
const auth = require('./db/router/auth');
app.use('/api/v1/auth', auth)
const gallery = require('./db/router/gallery');
app.use('/api/v1/photo', gallery);
const comments = require('./db/router/comments');
app.use('/api/v1/comments', comments);


// Call error handler after routing
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, './client/build')));// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(PORT, console.log(`Server Up And Running On Port ${PORT}`.blue.bold));