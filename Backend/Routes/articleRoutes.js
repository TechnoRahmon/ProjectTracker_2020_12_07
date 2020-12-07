const Router = require("express").Router();
const articleController = require("../controller/articleController");


Router.route("/articles")
  .get(articleController.getArticles)
  .post(articleController.new);

Router.route("/article/:article_id")
  .get(articleController.view)
  .delete(articleController.delete);

module.exports = Router;
