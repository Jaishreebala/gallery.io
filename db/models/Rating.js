const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    photo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Gallery',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})


RatingSchema.statics.getAverageRating = async function (photoId) {
    const avgPipeline = await this.aggregate([
        { $match: { photo: photoId } },
        {
            $group: {
                _id: '$photo',
                averageRating: { $avg: '$rating' }
            }
        }
    ])
    try {
        await this.model('Gallery').findByIdAndUpdate(photoId, {
            averageRating: Math.round(avgPipeline[0].averageRating * 10) / 10
        })
    } catch (err) {
        console.log(err);
    }
    console.log(avgPipeline);
}

RatingSchema.post('save', function () {
    this.constructor.getAverageRating(this.photo);
})

module.exports = mongoose.model('Rating', RatingSchema);