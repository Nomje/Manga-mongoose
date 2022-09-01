const Manga = require('../models/manga');

function getOne(req,res){
    Manga.findOne({'reviews._id':req.params.id}).then(function(manga){
        const review = manga.reviews.id(req.params.id);
        res.render('reviews/edit', {title: 'Edidt Review', manga, review})
    }).catch(function (err){
        return next(err);
    });
}

function update(req,res, next){
    Manga.findOne({'reviews._id' : req.params.id}).then(function(manga){
        const review = manga.reviews.id(req.params.id);
        review.body = req.body.review;
        manga.save().then(function (){
            res.direct(`/mangas/${review._id}/edit`);
        }).catch(function(err){
            return next (err);
        });
    });
}

module.exports = {
    edit: getOne,
    update
}