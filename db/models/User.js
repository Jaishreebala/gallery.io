const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please Enter Your First Name"]
        },
        lastName: {
            type: String,
            required: [true, "Please Enter Your Last Name"]
        },
        email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: [true, 'Account already exists'],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ]
        },
        password: {
            type: String,
            required: [true, "Please Enter Your Password"],
            minlength: 6,
            select: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

module.exports = mongoose.model('User', UserSchema);