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
        res.status(200).json({ success: true, data: photo.name })
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
    const imagepath = `.${process.env.IMAGE_UPLOAD_PATH}/${photo.photo}`;
    fs.unlink(imagepath, function (err) {
        if (err) {
            next();
            throw err;

        } else {
            console.log("Successfully deleted the image.")
        }
    })
    await photo.remove();
    res.status(200).json({ success: true, data: {} });
})

exports.allPhotos = asyncHandler(async (req, res, next) => {
    const photos = await Gallery.find();
    res.status(200).json({ success: true, data: photos });
})


exports.getPhotosOfUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate('images');
    if (!user) {
        return next(new ErrorResponse(`User with ID ${req.params.id} Not Found`), 400)
    }
    res.status(200).json({ success: true, data: user.images });
})

exports.getPhoto = asyncHandler(async (req, res, next) => {
    const photo = await Gallery.findById(req.params.id);
    if (!photo) {
        return next(new ErrorResponse(`Image with ID ${req.params.id} Not Found`), 400)
    }
    res.status(200).json({ success: true, data: photo });
})