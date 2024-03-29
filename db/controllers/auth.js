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
        return next(new ErrorResponse(`Please enter an email and password`, 400))
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

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({ success: true, data: {} })
})

exports.getMe = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id).populate({
        path: 'images', select: 'photo description averageRating', populate: {
            path: 'comments',
        }, options: { sort: { '_id': -1 } }
    });
    res.status(200).json({ success: true, data: user })
})
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getJWTWebToken();
    let options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, token: token });
}