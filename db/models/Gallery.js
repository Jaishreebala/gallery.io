const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    photo: {
        type: String,
        required: [true, "Please Upload A Photo"]
    }
})