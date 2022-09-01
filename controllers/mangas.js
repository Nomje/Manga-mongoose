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

function show(req, res) { //more details on each activity
    Manga.findById(req.params.id, function (err, manga){
        console.log(manga)
        res.render('mangas/show', {title: 'Details', manga})
    })
}

function createManga(req,res){
    // const manga = new Manga(req.body);
    // console.log(manga);
    // manga.save(function(err){
    //     if(err) return res.redirect('/mangas/new');
    //     res.redirect(`/mangas/${manga._id}`);
    // })

    // need to add more info to schema and here
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