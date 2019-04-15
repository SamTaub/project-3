const router = require('express').router();
const beadliController = require('../../controllers/beadliControllers');


// Route for beadlie/users/dashboard/user/favorites
// Add, grab, and delete
router.route("/dashboard/:id/favorites")
    .post(beadliController.addFavorites)
    .get(beadliController.findFavorites)
    .delete(beadliController.removeFavorite);

// Route for grabbing drafts
router.route("/dashboard/:id/drafts")
    .get(beadliController.findDraft);

// Route for grabbing published works
router.route("/dashboard/:id/published")
    .get(beadliController.findPublished);

module.exports = router;