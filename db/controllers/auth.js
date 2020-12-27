const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({ firstName, lastName, email, password });
    sendTokenResponse(user, 201, res);
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorResponse(`Please enter an email and password`, 400))
    }
    const user = await User.findOne({ email }).select('+password');;
    if (!user) {
        return next(new ErrorResponse("Invalid Credentials", 401));
    }
    let passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
        return next(new ErrorResponse("Invalid Credentials", 401));
    }
    else {
        sendTokenResponse(user, 201, res);
    }
})
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getJWTWebToken();
    let options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, token: token });
}