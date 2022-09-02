const Manga = require('../models/manga');
const Review = require('../models/manga');

function create(req,res){
    Manga.findById(req.params.id, function(err,manga){
        req.body.user = req.user._id;
        req.body.username = req.body.name;
        req.body.userAvatar = req.body.avatar;
        manga.reviews.push(req.body);
        manga.save (function(err){
            res.redirect(`/mangas/${manga._id}`);
        });

    });
}

function deleteReview(req,res,next){
    Manga.findOne({'reviews._id': req.params.id}).then(function(manga){
        const review = manga.reviews.id(req.params.id);
        if (!review.user.equals(req.user._id)) return res.redirect(`/mangas/${manga._id}`);
        review.remove();
        manga.save().then(function(){
            res.redirect(`/mangas/${manga._id}`);
        }).catch(function (err){
            return next(error);
        })
    })
}

function getOne(req,res,next){
    Manga.findOne({'reviews._id':req.params.id}).then(function(manga){
        const review = manga.reviews.id(req.params.id);
        res.render('mangas/reviews', {title: 'Edidt Review', manga, review})
    }).catch(function (err){
        return next(err);
    });

// Manga.findOne({'review':req.review}, function (err, review){
//     res.render('mangas/reviews',review)
// });

}

function update(req,res, next){
    // Manga.findOne({'reviews._id' : req.params.id}).then(function(manga){
    //     const review = manga.reviews.id(req.params.id);
    //     review.body = req.body.review;
    //     manga.save().then(function (){
    //         res.direct(`/mangas/${review._id}/edit`);
    //     }).catch(function(err){
    //         return next (err);
    //     });
    // });

    Manga.findByIdAndUpdate(req.params.id, req.body,{new:true}, function(err, manga){
        console.log(manga);
        console.log(req.body,"this is req.body");
        res.redirect(`/mangas/${manga.id}`);
    });

}

module.exports = {
    create,
    delete: deleteReview,
    edit: getOne,
    update
}