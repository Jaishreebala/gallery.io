const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    photo: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Gallery', GallerySchema);