const Manga = require('../models/manga');
const User = require('../models/user');

// functions 

function index(req,res){
    Manga.find({},function(err, mangas){
        res.render('mangas/index',{title:'Manga Database', manga});
    });
}

function newManga(req,res){
    res.render('mangas/new', {title: 'New Manga'});
}


// end functions

module.exports = {
    newManga,
    index
}