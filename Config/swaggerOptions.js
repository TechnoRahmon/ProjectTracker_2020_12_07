const get_SwaggerOptions = (ENV = "development", port) => {
  const serverUrl =
    ENV == "development"
      ? `http://localhost:${port}`
      : "https://projecttracker-technorahmon.b4a.run";

  return {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Project Tracker - Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a Project Tracker API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Techno Project Tracker",
          url: "https://github.com/TechnoRahmon/ProjectTracker_2020_12_07/tree/project-tracker-backend",
          email: "techno.r@outlook.com",
        },
      },
      servers: [
        {
          url: serverUrl,
        },
      ],
    },
    apis: ["./Routes/*.js"],
  };
};

exports.get_SwaggerOptions = get_SwaggerOptions;
