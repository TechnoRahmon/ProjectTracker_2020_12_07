const mongoose = require('mongoose');

const articleSchma = new mongoose.Schema({
    title:{type: String, required: true},
    content: { type:String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Article = (module.exports = mongoose.model("article", articleSchma));
module.exports.get = (callback, limit) => {
  Article.find(callback).limit(limit);
};