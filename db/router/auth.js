const express = require("express")
const router = express.Router();
const { register, login, getMe, logout } = require("../controllers/auth")
const { protect } = require("../middleware/auth");

router
    .route('/register')
    .post(register);

router
    .route('/login')
    .post(login);

router
    .route('/logout')
    .get(logout);

router
    .route('/getMe')
    .get(protect, getMe);

module.exports = router;