// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

console.log(dbParams);
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

// Separated Routes for each Resource
const usersRoutes = require("./routes/UsersRoutes");
const listsRoutes = require("./routes/ListsRoutes");
const tasksRoutes = require("./routes/TasksRoutes");
const viewsRoutes = require("./routes/ViewsRoutes");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/lists", listsRoutes(db));
app.use("/api/tasks", tasksRoutes(db));
// for page rendering
app.use("/", viewsRoutes(db));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
