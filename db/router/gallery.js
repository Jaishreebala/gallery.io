const express = require("express");
const router = express.Router();
const { uploadPhoto, allPhotos, deletePhoto, getPhoto, getPhotosOfUser } = require("../controllers/gallery");
const { protect } = require("../middleware/auth");

router
    .route("/")
    .post(protect, uploadPhoto)
    .get(protect, allPhotos)

router
    .route("/:id")
    .delete(protect, deletePhoto)
    .get(protect, getPhoto);

router
    .route("/user/:id")
    .get(protect, getPhotosOfUser)
module.exports = router;