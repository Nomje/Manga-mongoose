const express = require('express');
const router = express.Router();

const editsCtrl = require('../controllers/reviews');

router.get('/mangas/:id/edit', editsCtrl.edit);
router.post('/:id',editsCtrl.update)

module.exports = router;