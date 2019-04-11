const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    body: {
        type: String, required: true
    },
    userName: {
        type: String, required: true
    },
    designId: {
        type: String, required: true
    }

});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;