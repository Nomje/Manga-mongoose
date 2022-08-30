const express = require('express');
const router = express.Router();

const reviewCtrl = require('../controllers/reviews');

router.post("/mangas/:id/reviews", reviewCtrl.create);
router.delete("/reviews/:id", reviewCtrl.delete);
router.get('/mangas/:id/edit', reviewCtrl.edit);
router.post('/:id',reviewCtrl.update)

module.exports = router;