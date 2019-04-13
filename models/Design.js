const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designSchema = new Schema({
    grid: {
        type: Array
    },
    username: {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    diffulty: {
        type: String
    },
    rating: {
        type: Number
    },
    description: {
        type: String
    },
    published: {
        type: Boolean,
        default: false
    },
    canvasImage: {
        type: String
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const Design = mongoose.model("Design", designSchema);

module.exports = Design;