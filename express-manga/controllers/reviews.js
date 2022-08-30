const Manga = require('../models/manga');

function create(req,res){
    Manga.findById(req.params.id, function(err,manga){
        
    })
}