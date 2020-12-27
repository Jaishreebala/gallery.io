const Gallery = require("../models/Gallery");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

exports.uploadPhoto = asyncHandler(async (req, res, next) => {
    console.log(req.files.photo);
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
    const gallery = await Gallery.create({});
    photo.name = `image_${gallery._id}${path.parse(photo.name).ext}`;
    photo.mv(`.${process.env.IMAGE_UPLOAD_PATH}/${photo.name}`, async err => {
        if (err) {
            console.log(err);
            console.log(gallery._id);
            await Gallery.findByIdAndDelete(gallery._id);
            return next(new ErrorResponse(`Problem with image upload, try again`), 500)
        }
        await Gallery.findByIdAndUpdate(gallery._id, { photo: photo.name });
        res.status(200).json({ success: true, data: photo.name })
    })

})