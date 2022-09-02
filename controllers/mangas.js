const Manga = require('../models/manga');

// functions 

function index(req,res){
    Manga.find({},function(err, mangas){
     res.render('mangas/index',{title:"Manga Database", mangas});
        
    })
}

function newManga(req,res){
    res.render('mangas/new');
}

function show(req, res) { 
    Manga.findById(req.params.id, function (err, manga){
        res.render('mangas/show', {title: 'Details', manga})
    })
}

function createManga(req,res){

    Manga.create({
        title:req.body.title,
        artist:req.body.artist,
        author:req.body.author,
        linkToRead:req.body.linkToRead,
        picture:req.body.picture, 
    });
    res.redirect("/mangas")
}

// end functions

module.exports = {
    new : newManga,
    index,
    show,
    create: createManga
}