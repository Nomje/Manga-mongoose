const express = require('express');
const router = express.Router();

const reviewCtrl = require('../controllers/reviews');

router.post("/mangas/:id/reviews", reviewCtrl.create);
router.delete("/reviews/:id", reviewCtrl.delete);
router.get('/mangas/:id/review/:id/edit', reviewCtrl.edit); // edited
router.put('/mangas/:id/review/:id/update',reviewCtrl.update)


module.exports = router;