const Manga = require('../models/manga');

function create(req,res){
    Manga.findById(req.params.id, function(err,manga){
        req.body.user = req.user._id;
        req.body.username = req.body.name;
        req.body.userAvatar = req.body.avatar;
        manga.reviews.push(req.body);
        manga.save (function(err){
            res.render(`/mangas/${manga._id}`);
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

module.exports = {
    create,
    delete: deleteReview
}