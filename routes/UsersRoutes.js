const bcrypt = require("bcrypt");

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //for demo purposes
  const email = "billywong@outlook.com";
  const password = "password";
  const name = "Billy Wong";
  const userIdDemo = 3;
  const avatar_url = null;

  // login routes
  router.post("/login", (req, res) => {
    // const { email, password } = req.body;

    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then((data) => {
        if (
          data.rowCount > 0 &&
          bcrypt.compareSync(password, data.rows[0].password)
        ) {
          //uses id 3 for demo purpose
          req.session.userId = userIdDemo;
          // req.session.userId = data.rows[0].id; // set cookies
          res.redirect("/");
        } else {
          res.status(400).send("<h1>Please check your email and password</h1>");
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/logout", (req, res) => {
    req.session = null; // remove browser cookies
    res.redirect("/");
  });

  router.get("/login", (req, res) => {
    if (req.session.userId) {
      db.query(`SELECT * FROM users WHERE id = $1`, [req.session.userId])
        .then((data) => res.send(data.rows[0]))
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res.status(400).send("<h1>Please log in.</h1>");
    }
  });

  // register routes
  router.post("/register", (req, res) => {
    // const {name, email, password, avatar_url} = req.body

    if (!name || !email || !password)
      return res
        .status(400)
        .send("<h1>Please fill in all necessary fields.</h1>");

    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then((data) => {
        if (data.rowCount > 0) {
          return res
            .status(400)
            .send("<h1>This email has been registered.</h1>");
        } else {
          // insert new user data if it's not in the database
          db.query(
            `INSERT INTO users (name, email, password, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, bcrypt.hashSync(password, 10), avatar_url]
          )
            .then((data) => {
              //for demo purposes
              req.session.userId = userIdDemo;
              // req.session.userId = data.rows[0].id;
              res.status(201).send(data.rows[0]);
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/register", (req, res) => {
    if (req.session.userId) {
      db.query(`SELECT * FROM users WHERE id = $1`, [req.session.userId])
        .then((data) => res.send(data.rows[0]))
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res.render("register"); // create register form later!
    }
  });

  return router;
};
