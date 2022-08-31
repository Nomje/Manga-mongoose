const express = require('express');
const router = express.Router();
const mangaCtrl = require('../controllers/mangas');

router.get('/', mangaCtrl.index);
router.get('/new', mangaCtrl.new);
router.post('/', mangaCtrl.show);
router.get ('/:id',mangaCtrl.create);


module.exports = router;