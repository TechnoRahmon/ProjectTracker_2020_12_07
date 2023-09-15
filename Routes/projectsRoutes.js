const Router = require("express").Router();
const {
  updateProject,
  uploadCallBack,
} = require("../middleware/projectValidator");
const projectController = require("../controller/projectsController");
const {
  AllowIfLogin,
  grantAccess,
} = require("./../middleware/GlobalMiddleware");

/***********
 * Adding validor!
 */
/**
 * @swagger
 * /api/v2/projects:
 *   get:
 *     summary: Get all projects
 *     description: Get all projects for a specific account
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: No data found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Router.route("/projects").get(
  AllowIfLogin,
  grantAccess("readAny", "project"),
  AllowIfLogin,
  projectController.getAllProjects
);

/**
 * @swagger
 * /api/v2/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     description: Create a new project for a specific account.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Project data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the new project.
 *                 default: Project 1
 *               description:
 *                 type: string
 *                 description: Description of the new project.
 *                 default: The essence of this board is to provide a high-level overview of your project. This is the place to plan and track your progress.
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the project creation was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID of the created project.
 *                     name:
 *                       type: string
 *                       description: Name of the created project.
 *                     created_at:
 *                       type: string
 *                       description: Date when the project was created.
 *                     description:
 *                       type: string
 *                       description: Description of the created project.
 *                     account_id:
 *                       type: string
 *                       description: ID of the associated account.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Router.route("/projects").post(
  AllowIfLogin,
  grantAccess("createAny", "project"),
  projectController.newProject
);

/**
 * @swagger
 * /api/v2/project/{id}:
 *   get:
 *     summary: Get project details
 *     tags: [Projects]
 *     description: Get details of a specific project for a specific account.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Project details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the project details retrieval was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID of the project.
 *                     name:
 *                       type: string
 *                       description: Name of the project.
 *                     created_at:
 *                       type: string
 *                       description: Date when the project was created.
 *                     description:
 *                       type: string
 *                       description: Description of the project.
 *                     account_id:
 *                       type: string
 *                       description: ID of the associated account.
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v2/project/{id}:
 *   put:
 *     summary: Update project details
 *     tags: [Projects]
 *     description: Update details of a specific project for a specific account.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to update.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Updated project data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the project.
 *               description:
 *                 type: string
 *                 description: Updated description of the project.
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Project details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the project details update was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID of the updated project.
 *                     name:
 *                       type: string
 *                       description: Updated name of the project.
 *                     created_at:
 *                       type: string
 *                       description: Date when the project was created.
 *                     description:
 *                       type: string
 *                       description: Updated description of the project.
 *                     account_id:
 *                       type: string
 *                       description: ID of the associated account.
 *       400:
 *         description: Bad request, invalid project data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v2/project/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     description: Delete a specific project for a specific account.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to delete.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                   description: Indicates successful project deletion.
 *                 message:
 *                   type: string
 *                   description: Confirmation message for project deletion.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the project deletion was successful.
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Router.route("/project/:id")
  .get(
    AllowIfLogin,
    grantAccess("readAny", "project"),
    projectController.projectDetails
  )
  .put(
    AllowIfLogin,
    grantAccess("updateAny", "project"),
    updateProject,
    projectController.updateProject
  )
  .delete(
    AllowIfLogin,
    grantAccess("deleteAny", "project"),
    projectController.deleteProjcet
  );

module.exports = Router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the project.
 *           example: My Project
 *         description:
 *           type: string
 *           description: The description of the project (maximum 300 characters).
 *           example: This is a project description.
 *         account_id:
 *           type: string
 *           description: The ID of the associated account.
 *           example: 12345abc
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the project was created.
 *           example: 2023-09-09T12:34:56Z
 *       required:
 *         - name
 *         - description
 *         - account_id
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: A brief error message.
 *       example:
 *         error: There was an error processing your request.
 */
