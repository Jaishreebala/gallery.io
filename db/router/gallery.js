const express = require("express");
const router = express.Router();
const { uploadPhoto } = require("../controllers/gallery");

router
    .route("/")
    .post(uploadPhoto)

module.exports = router;