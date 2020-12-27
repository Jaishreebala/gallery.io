const express = require("express");
const router = express.Router();
const { uploadPhoto } = require("../controllers/gallery");
const { protect } = require("../middleware/auth");

router
    .route("/")
    .post(protect, uploadPhoto)

module.exports = router;