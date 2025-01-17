/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT name from users WHERE id = $1`, [req.session.userId]).then(
      (data) => {
        const name = data.rowCount > 0 ? data.rows[0].name : "User";
        res.render("index", { name });
      }
    );
  });

  router.get("/lists/:id", (req, res) => {
    //grab id
    const { id } = req.params;
    const templateVars = { id };

    //pass the template variables -
    res.render("list", templateVars);
  });

  return router;
};
