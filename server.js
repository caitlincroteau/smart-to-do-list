// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
// const cookieSession = require("cookie-session");

// PG database client/connection setup
const {Pool} = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

console.log(dbParams)
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1']
// }));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/UsersRoutes");
const listsRoutes = require("./routes/ListsRoutes");
const tasksRoutes = require("./routes/TasksRoutes");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
app.use("/api/lists", listsRoutes(db));
app.use("/api/tasks", tasksRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

// All good layout! -caitlin says
app.get("/list/:id", (req, res) => {
  //grab id
  const { id } = req.params;
  const templateVars = { id };

  //pass the template variables -
  res.render("list", templateVars);
});

// TEMPORTARY FOR LAYOUT TESTING
app.get("/edit_task", (req, res) => {
  console.log('Hello Edit Task Modal!')
  res.render("edit_task");
});

// TEMPORTARY FOR LAYOUT TESTING
app.get("/create_task", (req, res) => {
  console.log('Hello Create Task Modal!')
  res.render("create_task");
});

// TEMPORTARY FOR LAYOUT TESTING
app.get("/create_list", (req, res) => {
  console.log('Hello Create List Modal!')
  res.render("create_list");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
