const db = require("../models");

module.exports = {
  // DESIGNS

  // Find all designs
  findAll: function(req, res) {
    db.Design.find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Find all published designs
  findAllPublished: function(req, res) {
    let query = {};
    let sortVal = -1;
    query["$and"] = [{ published: true }];

    if (req.params.category !== "All") {
      query["$and"].push({ category: req.params.category });
    }

    if (req.params.difficulty !== "All") {
      query["$and"].push({ difficulty: req.params.difficulty });
    }

    if (req.params.sort === "Oldest") {
      sortVal = 1;
    }

    if (req.params.sort === "Popular") {
      db.Design.find(query)
        .sort({ numFavorites: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.json(err));
    } else {
      db.Design.find(query)
        .sort({ _id: sortVal })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.json(err));
    }
  },

  // Find a design based on it's ID
  findById: function(req, res) {
    db.Design.findById(req.params.id)
      .populate("comments")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  findByUser: function(req, res) {
    db.Design.find({ userId: req.params.id, published: true })
      .sort({ _id: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  //  Find a design by a title 'like' the query
  //  Note:  Not sure if this will work cause req is not being used but this is what the docs say
  findByTitle: function(req, res) {
    db.Design.find({ title: new RegExp("^" + req.params.title + "$", "i") })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Find a design based on its category
  findByCategory: function(req, res) {
    db.Design.find({ category: req.query })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Find a design based on its rating
  findByRating: function(req, res) {
    db.Design.find({ rating: req.query })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Create a design
  createDesign: function(req, res) {
    db.Design.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Update a design
  updateDesign: function(req, res) {
    db.Design.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Remove a design
  removeDesign: function(req, res) {
    db.Design.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  //Publish a design
  publishDesign: function(req, res) {
    db.Design.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          published: true,
          title: req.body.title,
          description: req.body.description,
          difficulty: req.body.difficulty,
          category: req.body.category
        }
      }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Unpublish a design
  unpublishDesign: function(req, res) {
    db.Design.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { published: false }
      }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // COMMENTS

  // Create a comment
  createComment: function(req, res) {
    db.Comment.create(req.body)
      .then(dbModel => {
        db.Design.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: dbModel._id } },
          { new: true }
        );
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Update/edit a comment
  updateComment: function(req, res) {
    db.Comment.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Delete a comment
  deleteComment: function(req, res) {
    db.Comment.deleteOne({ _id: req.params.commentId })
      .then(() => {
        return db.Design.update(
          { _id: req.params.designId },
          { $pull: { comments: req.params.commentId } }
        );
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  // Controllers for Profile page

  findDraft: function(req, res) {
    db.Design.find({ userId: req.params.id, published: false })
      .sort({ _id: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  findPublished: function(req, res) {
    db.Design.find({ userId: req.params.id, published: true })
      .sort({ _id: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  //  Add favorites to an associated user

  findFavorites: function(req, res) {
    db.User.find({ _id: req.params.id })
      .populate({ path: "favorites", options: { sort: { _id: -1 } } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  addFavorite: function(req, res) {
    db.User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { favorites: req.params.designId } },
      { new: true }
    )
      .then(dbModel => res.json(dbModel))
      .then(() =>
        db.Design.findOneAndUpdate(
          { _id: req.params.designId },
          { $inc: { numFavorites: 1 } }
        )
      )
      .catch(err => res.json(err));
  },

  removeFavorite: function(req, res) {
    db.User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { favorites: req.params.designId } }
    )
      .then(dbModel => res.json(dbModel))
      .then(() =>
        db.Design.findOneAndUpdate(
          { _id: req.params.designId },
          { $inc: { numFavorites: -1 } }
        )
      )
      .catch(err => res.json(err));
  },

  // Find one user to display their dashboard

  findUser: function(req, res) {
    db.User.findOne({ _id: req.params.id })
      .populate("favorites")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  findUserWithoutPopulation: function(req, res) {
    db.User.findOne({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  }
};
