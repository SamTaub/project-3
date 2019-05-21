const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const designSchema = new Schema({
  grid: {
    type: Array
  },
  userId: {
    type: String
  },
  title: {
    type: String,
    default: "Untitled"
  },
  category: {
    type: String,
    default: "Miscellaneous"
  },
  difficulty: {
    type: String,
    default: "Normal"
  },
  rating: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: "No description"
  },
  published: {
    type: Boolean,
    default: false
  },
  numFavorites: {
    type: Number,
    default: 0
  },
  canvasImage: {
    type: String,
    default: "https://via.placeholder.com/400?text=No+Preview"
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Design = mongoose.model("Design", designSchema);

module.exports = Design;
