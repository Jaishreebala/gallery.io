const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Gallery = require("./Gallery")
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
            minlength: [6, "Enter atleast 6 characters for your password"],
            select: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)
// Adding virtuals so user can be populated later.
UserSchema.virtual('images', {
    ref: 'Gallery',
    localField: '_id',
    foreignField: 'user',
    justOne: false
})

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.getJWTWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN })
}

UserSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
}
module.exports = mongoose.model('User', UserSchema);