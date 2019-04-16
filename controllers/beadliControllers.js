// const db = require ('../models');

// module.exports = {

//     // DESIGNS

//     // Find all designs
//     findAll: function(req, res) {
//         db.Design
//         .find({})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Find a design based on it's ID
//     findById: function(req, res) {
//         db.Design
//         .findById(req.params.id)
//         .populate('comments')
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     //  Find a design by user.
//     //  Commented out because this will be accomplished in a new controller.
//     // findByUser: function(req, res) {
//     //     db.Design
//     //     .find({username: req.query})
//     //     .then(dbModel => res.json(dbModel))
//     //     .catch(err => res.status(422).json(err));
//     // },

//     //  Find a design by a title 'like' the query
//     //  Note:  Not sure if this will work cause req is not being used but this is what the docs say
//     findByTitle: function(req, res) {
//         db.Design
//         .find({title: new RegExp('^'+req.params.title+'$', 'i')})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Find a design based on its category
//     findByCategory: function(req, res) {
//         db.Design
//         .find({category: req.query})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Find a design based on its rating
//     findByRating: function(req, res){
//         db.Design
//         .find({rating: req.query})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Create a design
//     createDesign: function(req, res) {
//         db.Design
//         .create(req.body)
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Update a design
//     updateDesign: function(req, res) {
//         db.Design
//         .findOneAndUpdate({_id: req.params.id}, req.body)
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Remove a design
//     removeDesign: function(req, res) {
//         db.Design
//         .findById({_id: req.params.id})
//         .then(dbModel => dbModel.remove())
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // COMMENTS

//     // Create a comment
//     createComment: function(req, res) {
//         db.Comment
//         .create(req.body)
//         .then(dbModel => {db.Design.findOneAndUpdate({ _id: req.params.id }, { $push: {comments: dbModel._id }}, { new: true })})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Update/edit a comment
//     updateComment: function(req, res) {
//         db.Comment
//         .findByIdAndUpdate({_id: req.params.id}, req.body)
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Delete a comment
//     deleteComment: function(req, res){
//         db.Comment
//         .deleteOne({_id: req.params.commentId})
//         .then(() => {
//             return db.Design.update({_id: req.params.designId}, {$pull: {comments: req.params.commentId}})
//         })
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Controllers for Profile page

//     findDraft: function(req, res){
//         db.Design
//         .find({_id: req.params.id}, {published: false})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     findPublished: function(req, res){
//         console.log("this is the controller for findPublished");
//         db.Design
//         .find({_id: req}, {published: true})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.json(err));
//     },

//     //  Add fovories to an associated user
//     addFavorites: function(req, res){
//         db.User
//         .findOneAndUpdate({ _id: req.params.userId }, { $push: {favorites: req.params.designId }}, { new: true })
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     findFavorites: function(req, res){
//         db.User
//         .find({_id: req.params.id})
//         .populate('favorites')
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     removeFavorite: function(req, res){
//         db.User
//         .deleteOne({_id: req.params.designId})
//         .then(() => {
//             return db.User.update({_id: req.params.designId}, {$pull: {favorites: req.params.designId}})
//         })
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },

//     // Find one user to display their dashboard

//     findUser: function(req, res){
//         db.User
//         .findOne({_id: req.params.id})
//         .populate('designs', 'favorites')
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).josn(err));
//     }

// };