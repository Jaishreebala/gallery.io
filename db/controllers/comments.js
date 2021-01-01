const Rating = require("../models/Rating");
const asyncHanlder = require("../middleware/async");
const User = require("../models/User");
const Gallery = require("../models/Gallery");
const ErrorResponse = require("../utils/errorResponse");
const Filter = require('bad-words');

filter = new Filter();

exports.addRating = asyncHanlder(async (req, res, next) => {
    req.body.user = req.user.id;
    req.body.photo = req.params.id;
    const photo = await Gallery.findById(req.params.id);
    if (!photo) {
        return next(new ErrorResponse(`Image with ID ${req.params.id} Not Found`), 400)
    }
    if (!req.body.comment && !req.body.rating) {
        return next(new ErrorResponse(`Leave either a comment/rating to submit`), 400)
    }
    console.log(photo.user.toString().blue)
    if (photo.user.toString() === req.user._id.toString()) {
        return next(new ErrorResponse(`You can't leave ratings on your own photos`), 400)
    }

    if (req.body.comment) {
        if (filter.isProfane(req.body.comment)) {
            return next(new ErrorResponse(`Please refrain from obscene language.`), 400)
        }
        req.body.comment = filter.clean(req.body.comment);
    }
    const rating = await Rating.create(req.body);
    res.status(201).json({ success: true, data: rating });
})

exports.getCommentsOfPhoto = asyncHanlder(async (req, res, next) => {
    const photo = await Rating.find({ photo: req.params.id });
    res.status(200).json({ success: true, data: photo });
})

exports.updateComment = asyncHanlder(async (req, res, next) => {
    const comment = await Rating.findById(req.params.id);
    if (comment.user.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`You can only edit your own comments`), 400)
    }
    const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    });
    res.status(200).json({ success: true, data: rating });
})