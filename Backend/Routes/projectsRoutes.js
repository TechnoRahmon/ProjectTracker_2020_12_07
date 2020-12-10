const Router = require("express").Router();
const {updateProject , uploadCallBack} = require('../middleware/projectValidator')
const projectController = require("../controller/projectsController");
const {AllowIfLogin, grantAccess,} = require('./../middleware/GlobalMiddleware')


/***********
 * Adding validor!
 */
Router
  .route("/projects")
    // Get all  projets & Add new project @accesss private (allow for all users)
    .get(AllowIfLogin,grantAccess('readAny','project'),AllowIfLogin,projectController.getAllProjects)
    // create default projects//@accesss private (allow for Admin)
    .post(AllowIfLogin,grantAccess('createAny','project'),projectController.newProject);


Router
  .route("/project/:id")
  // get project Details //@accesss private (allow for all users)
    .get(AllowIfLogin,grantAccess('readAny','project'),projectController.projectDetails)
  // delete project //@accesss private (allow for Admin)
    .delete(AllowIfLogin,grantAccess('deleteAny','project'),projectController.deleteProjcet)
  // update project Details //@accesss private (allow for Admin)
    .put(AllowIfLogin,grantAccess('updateAny','project'),updateProject,projectController.updateProject)

module.exports = Router;
