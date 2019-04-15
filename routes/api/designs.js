const router = require('express').router();
const beadliController = require('../../controllers/beadliControllers');

// Route for beadli/api/designs
router.route('/')
    .get(beadliController.findAll)
    .post(beadliController.createDesign);

// Route for beadlie/api/designs/:id    
router.route(':id')
    .get(beadliController.findById)
    .put(beadliController.updateDesign)
    .delete(beadliController.removeDesign);

module.exports = router;