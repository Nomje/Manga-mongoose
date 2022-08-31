const { request } = require('express');
const Manga = require('../models/manga');

// functions 

function index(req,res){
    Manga.find({},function(err, mangas){
       // if (err) return res.redirect('/');
     res.render('mangas/index',{title:"Manga Database", mangas});
        
    })
}

function newManga(req,res){
    res.render('mangas/new');
}

function show(req,res){
    Manga.findById(req.params.id, function(err, manga){
        console.log(manga);
        console.log("#######");
        res.render('mangas/show',{title: " All Mangas", mangas});
    });
}

function createManga(req,res){
    const manga = new Manga(req.body);
    console.log(manga);
    manga.save(function(err){
        if(err) return res.redirect('/mangas/new');
        res.redirect(`/mangas/${manga._id}`);
    })
    // Manga.create({
    //     title:req.body.title,
    //     artist:req.body.artist,
    //     author:req.body.author,
    //     linkToRead:req.body.linkToRead
    // });
    // res.redirect("/mangas")
}

// end functions

module.exports = {
    new : newManga,
    index,
    show,
    create: createManga
}