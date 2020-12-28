const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { addRating, getCommentsOfPhoto, updateComment } = require("../controllers/comments");

router
    .route("/:id")
    .post(protect, addRating)
    .get(protect, getCommentsOfPhoto)
    .put(protect, updateComment)


module.exports = router;