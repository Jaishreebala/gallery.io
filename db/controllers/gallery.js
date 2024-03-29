const Gallery = require("../models/Gallery");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
const fs = require("fs");

exports.uploadPhoto = asyncHandler(async (req, res, next) => {
    if (!req.files.photo) {
        return next(new ErrorResponse("Please upload an image", 400));
    }
    const photo = req.files.photo;
    if (!photo.mimetype.startsWith("image")) {
        return next(new ErrorResponse("Please upload an image", 400));
    }
    if (photo.size > process.env.IMAGE_MAX_SIZE) {
        return next(new ErrorResponse(`Image file size should be less than ${process.env.IMAGE_MAX_SIZE / 1000}KB`), 400)
    }
    const gallery = await Gallery.create({ user: req.user._id, description: req.body.description, tags: req.body.tags });
    photo.name = `image_${gallery._id}${path.parse(photo.name).ext}`;
    photo.mv(`.${process.env.IMAGE_UPLOAD_PATH}/${photo.name}`, async err => {
        if (err) {
            console.log(err);
            await Gallery.findByIdAndDelete(gallery._id);
            return next(new ErrorResponse(`Problem with image upload, try again`), 500)
        }
        await Gallery.findByIdAndUpdate(gallery._id, { photo: photo.name });
        res.status(200).json({ success: true, data: gallery })
    })

})


exports.deletePhoto = asyncHandler(async (req, res, next) => {
    const photo = await Gallery.findById(req.params.id);
    if (!photo) {
        return next(new ErrorResponse(`Image with ID ${req.params.id} Not Found`), 400)
    }
    if (photo.user.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`You can only delete the images you uploaded.`), 400)
    }
    const imagepath = `${__dirname}${process.env.IMAGE_UPLOAD_PATH}/${photo.photo}`;
    fs.unlink(imagepath, function (err) {
        if (err) {
            return next(new ErrorResponse(`Problem with delete, try again.`), 400)
        } else {
            console.log("Successfully deleted the image.")
        }
    })
    await photo.remove();
    res.status(200).json({ success: true, data: {} });
})

exports.allPhotos = asyncHandler(async (req, res, next) => {
    let photos = Gallery.find().populate({ path: 'user', select: 'firstName lastName' }).sort('-_id');
    // Search By Tags 
    if (req.query.tags) {
        photos = Gallery.find({ tags: { $regex: `.*${req.query.tags}.*`, $options: 'i' } }).populate({ path: 'user', select: 'firstName lastName' }).sort('-_id');
    }
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;
    let totalResults = await Gallery.countDocuments();
    let pagination = {};
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    if (endIndex < totalResults) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    photos = photos.skip(startIndex).limit(limit);
    const results = await photos;
    res.status(200).json({ success: true, data: results, count: results.length, pagination, });
})


exports.getPhotosOfUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate({ path: 'images', options: { sort: { '_id': -1 } } });
    if (!user) {
        return next(new ErrorResponse(`User with ID ${req.params.id} Not Found`), 400)
    }
    res.status(200).json({ success: true, data: user });
})

exports.getPhoto = asyncHandler(async (req, res, next) => {
    const photo = await Gallery.findById(req.params.id).populate({
        path: "comments", populate: {
            path: 'user',
            select: 'firstName lastName'
        }
    }).populate({ path: 'user', select: 'firstName lastName' });
    if (!photo) {
        return next(new ErrorResponse(`Image with ID ${req.params.id} Not Found`), 400)
    }
    res.status(200).json({ success: true, data: photo });
})