const Manga = require('../models/manga');
const User = require('../models/user');

// functions 

function index(req,res){
    Manga.find({},function(err, mangas){
        res.render('mangas/index',{title:'Manga Database', mangas});
    });
}

function newManga(req,res){
    res.render('mangas/new', {title: 'New Manga'});
}

function show(req,res){
    Manga.findById(req.params.id);
    res.render('movies/show',{
        manga
    });
}

function create (req,res){
    req.body.nowShowing = !!req.body.nowShowing;
    for(let key in req.body){
        if(req.body[key]==='')delete req.body[key];
    }
    const manga = new Manga(req.body);
    manga.save(function(err){
        if(err) return res.redirect('/manga/new');
        res.redirect(`/mangas/${manga._id}`);
    })
}

// end functions

module.exports = {
    new : newManga,
    index,
    show,
    create
}