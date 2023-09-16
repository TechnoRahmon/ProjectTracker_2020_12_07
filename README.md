# Project-Tracker
**Project-Tracker** is a comprehensive project management and tracking platform designed for efficient collaboration and task management. With role-based control, you can effortlessly manage your projects and streamline your workflow. This backend Express.js project provides a range of API endpoints to support your project management needs.

## Installation
To get started with **Project-Tracker**, follow these installation steps:

1. Clone the repository to your local machine (branch `project-tracker-backend`):
```bash
git clone https://github.com/TechnoRahmon/ProjectTracker_2020_12_07.git
```
2. Change your working directory to the project folder:
```bash
cd your-project
```
3. Install the project dependencies using npm or yarn:
```bash
npm install
# or
yarn install
```

## Running the Server
To run the Express.js server, use the following command:
```bash
npm start
# or
yarn start
```
The server will start on the specified port (default: 5000). You can access the Swagger documentation to explore the API endpoints and begin managing your projects efficiently.
## API Endpoints

### Users

- **GET /api/v1/users:** Get all users (restricted for non-admin users).
- **POST /api/v1/users:** Create a new user account.
- **POST /api/v1/users/invite:** Invite a new user.
- **PUT /api/v1/users/:id:** Update user details.
- **PUT /api/v1/users/:id:** Accept user invitation (Admin).
- **DELETE /api/v1/users/:id:** Delete user (Admin).

### Projects

- **GET /api/v2/projects:** Get all projects.
- **POST /api/v2/projects:** Create a new project.
- **PUT /api/v2/projects/:id:** Update project details.
- **DELETE /api/v2/projects/:id:** Delete project.

### Tasks

- **GET /api/v3/project/:projectId/task/:taskId:** Get task details.
- **PUT /api/v3/project/:projectId/task/:taskId:** Update task.
- **DELETE /api/v3/project/:projectId/task/:taskId:** Delete task.

## Live Demo

You can explore our project's Swagger documentation with a live demo by visiting the following link:
[Swagger Demo](https://projecttracker-technorahmon.b4a.run)

## Using Mailtrap for User Invitation

For user invitation features, we utilize Mailtrap, a service for testing emails in a development environment. To send invitation emails correctly, you can sign up for a Mailtrap account at [Mailtrap](https://mailtrap.io/home). Once you have an account, you can configure your Mailtrap settings in the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

***Thank you for using my Express.js project :)!***

