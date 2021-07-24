const mongoose = require('mongoose');
const Review = require('./review');
const User = require('./user');
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema({
    title: String,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    price: Number,
    description: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, opts);

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

campgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href="/campgrounds/${this._id}">${this.title}</a>`
})

module.exports = mongoose.model('Campground', campgroundSchema);