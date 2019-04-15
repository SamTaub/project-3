const router = require('express').router();
const beadliController = require('../../controllers/beadliControllers');

//Route for beadli/api/comments/:id
router.route("/:id")
    .post(beadliController.createComment)
    .put(beadliController.updateComment)
    .delete(beadliController.deleteComment);

module.exports = router;
