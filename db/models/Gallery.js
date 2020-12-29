const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    photo: {
        type: String
    },
    averageRating: {
        type: Number
    },
    description: {
        type: String,
        required: [true, 'Please add a short relevant description.'],
        maxlength: [500, 'Description has a limit of 500 characters']
    },
    tags: {
        type: String,
        required: [true, 'Please add atleast one tag.']
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