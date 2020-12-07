const Router = require("express").Router();
const {checkV , uploadCallBack} = require('../middleware/projectValidator')
const projectController = require("../controller/projectsController");


/***********
 * Adding validor!
 */
Router.route("/projects")
  .get(projectController.getProjects)
  .post(uploadCallBack,checkV,projectController.new);


  Router.route("/project/:project_id").
  get(projectController.view).delete(projectController.delete);

module.exports = Router;
