const mongoose = require ('mongoose');

const authorSchema = new mongoose.Schema({
    name: {type: String, minlength: 16, maxlength: 25 },
    bookTitle: {type: String},
    numberOfPages: {type:Number},
    bookISBN: {type:String},
    bookLikes: {type:Number},
})

const author = mongoose.model('author, authorSchema')

module.exports = author