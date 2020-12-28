const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    photo: {
        type: String
    },
    averageRating: {
        type: Number
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Cascade Delete Comments When the written work is deleted
GallerySchema.pre('remove', async function (next) {
    console.log(`Comments being deleted from ${this.name}`);
    await this.model('Rating').deleteMany({ photo: this._id });
    next();
})



module.exports = mongoose.model('Gallery', GallerySchema);