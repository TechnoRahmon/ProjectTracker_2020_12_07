const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
const PORT = process.env.PORT || 5000;
/** IMPORTING FILES **/
const projectsRoutes = require("./Routes/projectsRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const userRoutes = require("./Routes/userRoutes");
//link the config.env
dotenv.config({ path: "./Config/config.env" });
// import connectDB function
const { connectDB } = require("./Config/db");
connectDB();
//link morgan
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//include body-parser and cookieparser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

/** static file **/
app.use(express.static(path.join(__dirname, "public")));

const User = require("./Models/userModel");
const { get_SwaggerOptions } = require("./Config/swaggerOptions");

//check the token in cookies
app.use(async (req, res, next) => {
  //if the token is exisit in the cookie
  if (req.cookies["token"]) {
    try {
      // retrive the token
      const accesstoken = req.cookies["token"];
      const { userId } = await jwt.verify(accesstoken, process.env.TOKEN);
      //console.log(`userId: `,userId);
      // if token has expired

      res.locals.loggedInUser = await User.find({ _id: userId }).populate(
        "account_id",
        "name"
      );
      //console.log('app :',res.locals.loggedInUser);

      next();
    } catch (error) {
      res.status(500).json({ success: false, error: error + error.message });
    }
  } else {
    next();
  }
});

/************************ Api Routes ***************/
// api/v1/ for User routes
app.use("/api/v1", userRoutes);

//  /api/v1 for project routes
app.use("/api/v2", projectsRoutes);

// api/vi3/ for article routes
app.use("/api/v3/", require("./Routes/taskRoutes"));

// /***************************************/

// add swagger route
const specs = swaggerJsdoc(get_SwaggerOptions(process.env.NODE_ENV, PORT));
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);


app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode at port: ${PORT}`.yellow
      .bold
  )
);
