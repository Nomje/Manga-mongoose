//Manga Schema 
//Review schema


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//embed in to manga 
const reviewSchema = new Schema({
    content: String,
    rating: {type:Number,min:1,max:5, default:3 },
    user:{type:Schema.Types.ObjectId, ref:'User' },
    userName: String
},{
    timestamps: true
});

// main schema
const mangaSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    Author:{
        type: String,
        required: true
    },
    Artist: String,
    linkToRead:{
        type: String,
        required: true
    },
    rating: Number,
    reviews: [reviewSchema],
    users: Number
},{
    timestamps:true
});

module.exports = mongoose.model('Manga', mangaSchema);

