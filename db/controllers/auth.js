const User = require("../models/User");
exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.create({ firstName, lastName, email, password });
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error })
    }
}