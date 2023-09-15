const Router = require("express").Router();
const TaskController = require("../controller/taskController");
const { updateTaskValidator, upload } = require("../middleware/taskMiddleware");
const {
  AllowIfLogin,
  grantAccess,
} = require("./../middleware/GlobalMiddleware");

/**
 * @swagger
 * /api/v3/project/{projectId}/tasks:
 *   get:
 *     summary: Get all tasks for a project
 *     tags: [Tasks]
 *     description: Get all tasks for a specific project.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: ID of the project to retrieve tasks for.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v3/project/{projectId}/tasks:
 *   post:
 *     summary: Create a new task for a project
 *     tags: [Tasks]
 *     description: Create a new task for a specific project.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: ID of the project to create a task for.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Task data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the new task.
 *                 default: Task 1
 *               start_date:
 *                 type: string
 *                 format: date
 *                 description: Start date of the new task.
 *                 default: "2023-09-09"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 description: End date of the new task.
 *                 default: "2023-09-16"
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the task creation was successful.
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Router.route("/project/:projectId/tasks")
  // Get all  tasks & Add new project @accesss private (allow for all users)
  .get(AllowIfLogin, grantAccess("readAny", "task"), TaskController.getTasks)
  // add new  task //@accesss private (allow for Admin)
  .post(AllowIfLogin, grantAccess("createAny", "task"), TaskController.newTask);
/**
 * @swagger
 * /api/v3/project/{projectId}/task/{taskId}:
 *   get:
 *     summary: Get task details by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: ID of the project.
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID of the task to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
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
 * /api/v3/project/{projectId}/task/{taskId}:
 *   put:
 *     summary: Update task details by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: ID of the project.
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID of the task to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized, not enough permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Task not found
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
 * /api/v3/project/{projectId}/task/{taskId}:
 *   delete:
 *     summary: Delete task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: ID of the project.
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID of the task to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
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

Router.route("/project/:projectId/task/:taskId")
  // get taskDetails @accesss private (allow for all users)
  .get(AllowIfLogin, grantAccess("readAny", "task"), TaskController.taskDetails)
  // update task (task's Details & owners & commnets) @accesss private (allow for admin and BasicUser onwer)
  .put(
    AllowIfLogin,
    grantAccess("updateAny", "task"),
    updateTaskValidator,
    TaskController.updateTask,
    TaskController.sendUpdateRes
  )
  // delete task //@accesss private (allow for Admin)
  .delete(
    AllowIfLogin,
    grantAccess("deleteAny", "task"),
    TaskController.deleteTask
  );

module.exports = Router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the task.
 *           example: Task 1
 *         owners:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the owner user.
 *               fullname:
 *                 type: string
 *                 description: The full name of the owner user.
 *             description: Array of task owners.
 *           example:
 *             - _id: 12345abc
 *               fullname: John Doe
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user who posted the comment.
 *               content:
 *                 type: string
 *                 description: The content of the comment (maximum 300 words).
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the comment was created.
 *             description: Array of task comments.
 *           example:
 *             - user_id: 56789def
 *               content: This is a comment.
 *               created_at: 2023-09-09T12:34:56Z
 *         account_id:
 *           type: string
 *           description: The ID of the associated account.
 *           example: 67890ghi
 *         project_id:
 *           type: string
 *           description: The ID of the associated project.
 *           example: 78901jkl
 *         status:
 *           type: number
 *           description: The status of the task (0, 25, 50, 75, 100).
 *           example: 50
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: The start date of the task.
 *           example: 2023-09-09T12:34:56Z
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: The end date of the task.
 *           example: 2023-09-16T12:34:56Z
 *       required:
 *         - name
 *         - account_id
 *         - project_id
 *         - status
 *         - start_date
 *         - end_date
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