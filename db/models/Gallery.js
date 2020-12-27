const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    photo: {
        type: String
    }
})

module.exports = mongoose.model('Gallery', GallerySchema);