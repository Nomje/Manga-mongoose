const { query } = require('express');
const { mongo } = require('mongoose');
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
    console.log(req.query,"this is req.query")
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
    Review.updateOne(
        { _id: req.body.hiddenMangaId, 
            "reviews._id": req.body.hiddenReviewId },
        {
            $set: {
                "reviews.$.content": req.body.content,
             }
        },function(error, ress){
            return res.redirect('/');
        }
    )
}

// function update(req,res, next){
//     // Manga.findOne({'reviews._id' : req.params.id}).then(function(manga){
//     //     const review = manga.reviews.id(req.params.id);
//     //     review.body = req.body.review;
//     //     manga.save().then(function (){
//     //         res.direct(`/mangas/${review._id}/edit`);
//     //     }).catch(function(err){
//     //         return next (err);
//     //     });
//     // });
//     const filter = {_id: req.params.id} ;
//     const update = {
//     "content": req.body.content
//     }
//     Manga.findByIdAndUpdate( filter, update, {new:true}, function (err, manga){
//     // Manga.findOneAndUpdate({_id:req.params.id},{"content":req.body.content},{new:true}, function(err, manga){
//     console.log(update,"this is the content");   
//     if(err){
//             console.log(err, "this is the errror")
//         }
//         console.log(manga);
//         res.redirect(`/mangas/${manga.id}`);
//     });

// }


module.exports = {
    create,
    delete: deleteReview,
    edit: getOne,
    update
}