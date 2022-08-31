const express = require('express');
const router = express.Router();
const mangaCtrl = require('../controllers/mangas');

router.get('/', mangaCtrl.index);
router.get('/new', mangaCtrl.new);

router.get ('/:id',mangaCtrl.show);
router.post('/', mangaCtrl.create);

module.exports = router;