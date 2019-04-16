// const router = require('express').Router();
//const beadliController = require('../../controllers/beadliControllers');
const db = require('../../models');

module.exports = function(app) {
    app.get("/api/users/dashboard/:id/published", function(req, res) {
        console.log("getting published designs test");
        db.Design
        .find({"userId": req.params.id, "published": true})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.json(err));
    })
}
// Route for beadlie/users/dashboard/user/favorites
// Add, grab, and delete
// router.route("/dashboard/:id/favorites")
//     .post(beadliController.addFavorites)
//     .get(beadliController.findFavorites)
//     .delete(beadliController.removeFavorite);

// // Route for grabbing drafts
// router.route("/dashboard/:id/drafts")
//     .get(beadliController.findDraft);

// Route for grabbing published works

// module.exports = router;