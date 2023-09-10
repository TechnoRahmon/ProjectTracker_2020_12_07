const get_SwaggerOptions = (ENV = "development", port) => {
  const serverUrl =
    ENV == "development"
      ? `http://localhost:${port}`
      : "https://techno-expense-tracker-80692413a6b0.herokuapp.com";

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
          name: "Techno Expense Tracker",
          url: "https://github.com/TechnoRahmon/ProjectTracker_2020_12_07",
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
