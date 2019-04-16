const db = require("../models");

module.exports = function (app) {

    // GET REQUESTS FOR DESIGNS AND SEARCH PARAMETERS (Title, Category, Rating)

    // Find all designs
    app.get("/api/designs", function (req, res) {
        console.log("Getting all designs");
        db.Design
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Find a design by its ID and populate its comments
    app.get("/api/designs/:id", function (req, res) {
        console.log("Getting design");
        db.Design
            .findById(req.params.id)
            .populate("comments")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Find a design by title.  This function uses a regex to generate results based on designs with titles "like" the search term
    // NOT SURE IF THIS IS CORRECT ROUTING, NEED TO TEST
    app.get("/api/designs/title/:title", function (req, res) {
        db.Design
            .find({ "title": new RegExp("^" + req.params.title + "$", "i") })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Find a design based on its category
    // NOT IF THIS IS CORRECT ROUTING, NEED TO TEST
    app.get("/api/designs/category/:category", function (req, res) {
        db.Design
            .find({ "category": req.query })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Find a design based on its rating
    // NOT SURE IF THIS IS CORRECT ROUTING, NEED TO TEST, LOT"S OF TESTING REQUIRED BETSY
    app.get("/api/designs/rating/:rating", function (req, res) {
        db.Design
            .find({ "rating": req.query })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // DESIGN CONTROLLERS/ROUTES (Post, Put, Delete)

    // Create a design and post it 
    app.post("/api/designs/", function (req, res) {
        db.Design
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Update a design
    app.put("/api/designs/:id", function (req, res) {
        db.Design
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Delete a design
    app.delete("/api/designs/:id", function (req, res) {
        db.Design
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // COMMENT CONTROLLERS/ROUTERS (Post, Put, Delete)

    // Creates a comment and inserts it to the design
    app.post("/api/comments", function (req, res) {
        db.Comment
            .create(req.body)
            .then(dbModel => { db.Design.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbModel._id } }, { new: true }) })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Updates a comment with a put request
    app.put("/api/comments/:id", function (req, res) {
        db.Comment
            .findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Delete a comment with a delete request
    app.delete("/api/comments/:id", function (req, res) {
        db.Comment
            .deleteOne({ _id: req.params.commentId })
            .then(() => {
                return db.Design.update({ _id: req.params.designId }, { $pull: { comments: req.params.commentId } })
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // CONTROLLERS AND ROUTES FOR THE DASHBOARD PAGE

    // Get request for Published Designs by the user
    app.get("/api/users/dashboard/:id/published", function (req, res) {
        console.log("getting published designs test");
        db.Design
            .find({ "userId": req.params.id, "published": true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    })

    // Get Request for drafts by the user
    app.get("/api/users/dashboard/:id/drafts", function (req, res) {
        db.Design
            .find({ "userId": req.params.id, "published": false })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Get a users favorites
    // NEEDS TESTING TO ENSURE PROPER ROUTE
    app.get("/api/users/:id/favorites", function (req, res) {
        db.User
            .find({ "_id": req.params.id })
            .populate("favorites")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Add to a users favorites
    // NEEDS TESTING TO ENSURE PROPER ROUTE
    app.post("/api/users/:userId/favorites/:designId", function (req, res) {
        db.User
            .findOneAndUpdate({ "_id": req.params.userId }, { $push: { "favorites": req.params.designId } }, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Delete a users favorites?
    // NEEDS TESTING, add :id? to end?
    app.delete("/api/users/:userId/favorites/designId", function (req, res) {
        db.User
            .deleteOne({ "_id": req.params.designId })
            .then(() => {
                return db.User.update({ "_id": req.params.designId }, { $pull: { "favorites": req.params.designId } })
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json(err));
    });

    // Find a user
    app.get("/api/users/:id", function (req, res){
        db.User
        .findOne({"_id": req.params.id})
        .populate("designs", "favorites")
        .then(dbModel => res.json(dbModel))
        .catch(err => res.josn(err));
    })

}