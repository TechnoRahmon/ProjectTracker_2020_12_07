const Router = require("express").Router();
const UserController = require("../controller/userController");
const {
  AllowIfLogin,
  grantAccess,
} = require("./../middleware/GlobalMiddleware");
const {
  addUserValidator,
  inviteUserValidator,
  userVerficationValidator,
  updateUserDetails,
  userLoginValidator,
} = require("../middleware/userMiddleware");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user account
 *     tags: [Users]
 *     requestBody:
 *       description: User data to create an account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               fullname:
 *                 type: string
 *                 example: John Doe
 *               accountname:
 *                 type: string
 *                 example: MyAccount
 *             required:
 *               - email
 *               - password
 *               - fullname
 *               - accountname
 *     responses:
 *       201:
 *         description: User account created successfully
 *       400:
 *         description: Bad request, invalid user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users (restricted for non-admin users)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of users (limited details for non-admin users)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                    properties:
 *                      fullname:
 *                        type: string
 *                        description: Full name of the user.
 *                      email:
 *                        type: string
 *                        description: Email address of the user.
 *                      image_path:
 *                        type: string
 *                        description: Path to the user's image.
 *                      account_id:
 *                        type: string
 *                        description: ID of the associated account.
 *                      user_type:
 *                        type: string
 *                        description: Type of user (e.g., ViwerUser, BasicUser, AdminUser).
 *                        enum: [ViwerUser, BasicUser, AdminUser]
 *                      verified:
 *                        type: boolean
 *                        description: Indicates whether the user is verified.
 *       401:
 *         description: Unauthorized (user not logged in)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       403:
 *         description: Forbidden (user does not have permission to access)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 */
Router.route("/users")
  // create account  : public
  .post(addUserValidator, UserController.addUserDetails)
  // get all users : private (all users only [ return less details if user not Admin ])
  .get(
    AllowIfLogin,
    grantAccess("readAny", "profile"),
    UserController.getAllUsers
  );
/**
 * @swagger
 * /api/v1/users/invite:
 *   post:
 *     summary: Invite a new user
 *     tags: [Users]
 *     description: Admin can invite a new user by sending an invitation email.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User invitation data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               role:
 *                 type: string
 *                 example: Admin
 *             required:
 *               - email
 *               - role
 *     responses:
 *       200:
 *         description: User invited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: invitation is successfully Send
 *                 link:
 *                   type: string
 *                   example: http://localhost:3000/auth/account_name/account_id/confirm/user/userID
 *                 data:
 *                    properties:
 *                      email:
 *                        type: string
 *                        description: Email address of the user.
 *                      _id:
 *                        type: string
 *                        description: id of the user.
 *                        example: 650446db3a174d348c91555
 *                      account_id:
 *                        type: string
 *                        description: ID of the associated account.
 *                      user_type:
 *                        type: string
 *                        description: Type of user (e.g., ViwerUser, BasicUser, AdminUser).
 *                        enum: [ViwerUser, BasicUser, AdminUser]
 *                      verified:
 *                        type: boolean
 *                        description: Indicates whether the user is verified.
 *       400:
 *         description: Bad request, invalid user invitation data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       401:
 *         description: Unauthorized (user not logged in)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       403:
 *         description: Forbidden (user does not have permission to invite)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 */
Router.route("/users/invite")
  // invite   : Admin
  .post(
    AllowIfLogin,
    grantAccess("createAny", "invite"),
    inviteUserValidator,
    UserController.inviteUser,
    UserController.sendInvitation
  );

/**
 * @swagger
 * /api/v1/{accountId}/users/{userId}:
 *   put:
 *     summary: Accept user invitation
 *     tags: [Users]
 *     description: Public endpoint to accept a user invitation by verifying the user's identity.
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: ID of the account to which the user belongs
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user accepting the invitation
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User verification data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User invitation accepted successfully
 *       400:
 *         description: Bad request, invalid user verification data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       404:
 *         description: Account or user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 */
Router.route("/:accountId/users/:userId")
  // accepting invitation   : public
  .put(userVerficationValidator, UserController.userAccecptInvitation);
/**
 * @swagger
 * /api/v1/user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Privileged operation to delete a user profile.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized (user not logged in)
 *       403:
 *         description: Forbidden (user does not have permission to delete)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   put:
 *     summary: Update a user profile
 *     tags: [Users]
 *     description: Privileged operation to update a user's profile information.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User profile data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Bad request, invalid user profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       401:
 *         description: Unauthorized (user not logged in)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       403:
 *         description: Forbidden (user does not have permission to update)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 */
Router.route("/user/:userId")
  // delete user & update user  : privte AdminUser, and the owner MemberUser
  .delete(
    AllowIfLogin,
    grantAccess("deleteAny", "profile"),
    UserController.deleteUser
  )
  .put(
    AllowIfLogin,
    grantAccess("updateAny", "profile"),
    updateUserDetails,
    UserController.updateUser
  ); // user_type only the role

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     description: Authenticate a user by email and password and return an access token.
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 default: admin@tracker.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 default: P@ssw0rd
 *               account_name:
 *                 type: string
 *                 description: Name of the user's account.
 *                 default: Admin
 *             required:
 *               - email
 *               - password
 *               - account_name
 *     responses:
 *       200:
 *         description: User logged in successfully and received access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the login was successful.
 *                 token:
 *                   type: string
 *                   description: Access token for the logged-in user.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User's ID.
 *                     fullname:
 *                       type: string
 *                       description: User's full name.
 *                     image_path:
 *                       type: string
 *                       description: Path to the user's image.
 *                     user_type:
 *                       type: string
 *                       description: Type of user (e.g., ViwerUser, BasicUser, AdminUser).
 *                     account:
 *                       type: string
 *                       description: ID of the associated account.
 *       400:
 *         description: Bad request, invalid login credentials.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 */
Router.route("/login").post(userLoginValidator, UserController.userLogin);

/**
 * @swagger
 * /api/v1/logout:
 *   get:
 *     tags: [Users]
 *     summary: Logout user
 *     description: Logs out the user and clears the token cookie.
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */
Router.route("/logout").get(UserController.logout);

/**
 * @swagger
 * /api/v1/valid:
 *   get:
 *     tags: [Users]
 *     summary: Check if token is valid
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Token is invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserErrorResponse'
 */
Router.route("/valid").get(UserController.isTokenValid);

module.exports = Router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: Full name of the user.
 *         email:
 *           type: string
 *           description: Email address of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *         image_path:
 *           type: string
 *           description: Path to the user's image.
 *         account_id:
 *           type: string
 *           description: ID of the associated account.
 *         user_type:
 *           type: string
 *           description: Type of user (e.g., ViwerUser, BasicUser, AdminUser).
 *           enum: [ViwerUser, BasicUser, AdminUser]
 *         verified:
 *           type: boolean
 *           description: Indicates whether the user is verified.
 *       required:
 *         - email
 *         - user_type
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the account.
 *           example: My Account
 *         users:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the user associated with the account.
 *             description: Array of user IDs.
 *           example:
 *             - _id: 12345abc
 *         projects:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the project associated with the account.
 *             description: Array of project IDs.
 *           example:
 *             - _id: 67890def
 *       required:
 *         - name
 */
/**
/**
 * @swagger
 * components:
 *   schemas:
 *     UserErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful or not.
 *         error:
 *           type: string
 *           description: A description of the error that occurred.
 *         msg:
 *           type: string
 *           description: A message providing additional details about the error.
 *       example:
 *         success: false
 *         error: This is an example error message.
 *         msg: Additional details about the error.
 */
