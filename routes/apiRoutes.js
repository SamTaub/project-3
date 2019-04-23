const beadliController = require("../controllers/beadliControllers.js");

module.exports = function (app) {

    // GET REQUESTS FOR DESIGNS AND SEARCH PARAMETERS (Title, Category, Rating)

    // Find all designs
    app.get("/api/designs", (req, res) => {
        beadliController.findAll(req, res);
    });

    // Find a design by its ID and populate its comments
    app.get("/api/designs/design/:id", (req, res) => {
        beadliController.findById(req, res);
    });

    // Find a design by title.  This function uses a regex to generate results based on designs with titles "like" the search term
    // NOT SURE IF THIS IS CORRECT ROUTING, NEED TO TEST
    app.get("/api/designs/title/:title", (req, res) => {
        beadliController.findByTitle(req, res);
    });

    // Find a design based on its category
    // NOT IF THIS IS CORRECT ROUTING, NEED TO TEST
    app.get("/api/designs/category/:category", (req, res) => {
        beadliController.findByCategory(req, res);
    });

    // Find a design based on its rating
    // NOT SURE IF THIS IS CORRECT ROUTING, NEED TO TEST, LOT"S OF TESTING REQUIRED BETSY
    app.get("/api/designs/rating/:rating", (req, res) => {
        beadliController.findByRating(req, res);
    });

    // DESIGN CONTROLLERS/ROUTES (Post, Put, Delete)

    // Create a design and post it 
    app.post("/api/designs/", (req, res) => {
        beadliController.createDesign(req, res);
    });

    // Update a design
    app.put("/api/designs/:id", (req, res) => {
        beadliController.updateDesign(req, res);
    });

    // Publish a design
    app.put("/api/designs/publish/:id", (req, res) => {
        beadliController.publishDesign(req, res);
    });

    // Unpublish a design
    app.put("/api/designs/unpublish/:id", (req, res) => {
        beadliController.unpublishDesign(req, res);
    });

    // Delete a design
    app.delete("/api/designs/design/:id", (req, res) => {
        beadliController.removeDesign(req, res);
    });

    // COMMENT CONTROLLERS/ROUTERS (Post, Put, Delete)

    // Creates a comment and inserts it to the design
    app.post("/api/comments", (req, res) => {
        beadliController.createComment(req, res);
    });

    // Updates a comment with a put request
    app.put("/api/comments/:id", (req, res) => {
        beadliController.updateComment(req, res);
    });

    // Delete a comment with a delete request
    app.delete("/api/comments/:id", (req, res) => {
        beadliController.deleteComment(req, res);
    });

    // CONTROLLERS AND ROUTES FOR THE DASHBOARD PAGE

    // Get request for Published Designs by the user
    app.get("/api/users/dashboard/:id/published", (req, res) => {
        beadliController.findPublished(req, res);
    });

    // Find all designs that meet the faceted queries (for Browse page).
    app.get("/api/designs/facet", (req, res) => {
        beadliController.findByFacet(req, res);
    });

    app.get("/api/designs/published/:category/:difficulty/:sort", (req, res) => {
        console.log(`ApiRoutes: ${req.params}`);
        beadliController.findAllPublished(req, res);
    })

    // Get Request for drafts by the user
    app.get("/api/users/dashboard/:id/drafts", (req, res) => {
        beadliController.findDraft(req, res);
    });

    // Get a users favorites
    // NEEDS TESTING TO ENSURE PROPER ROUTE
    app.get("/api/users/:id/favorites", (req, res) => {
        beadliController.findFavorites(req, res);
    });

    // Add to a users favorites
    // NEEDS TESTING TO ENSURE PROPER ROUTE
    app.put("/api/users/:userId/favorites/:designId", (req, res) => {
        beadliController.addFavorite(req, res);
    });

    // Delete a users favorites?
    // NEEDS TESTING, add :id? to end?
    app.delete("/api/users/:userId/favorites/:designId", (req, res) => {
        beadliController.removeFavorite(req, res);
    });

    // Find a user with favorites populated
    app.get("/api/users/user/:id", (req, res) => {
        beadliController.findUser(req, res);
    });

    app.get("/api/users/user/:id/unpopulated", (req, res) => {
        beadliController.findUserWithoutPopulation(req, res);
    });

}