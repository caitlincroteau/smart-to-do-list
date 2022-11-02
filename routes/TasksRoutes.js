const express = require("express");
const router = express.Router();
// const list_id = require('ListsRoutes.js').id

module.exports = (db) => {
  const generateCategory = require("../lib/generateCategory");
  const categories = [
    "Film / Series",
    "Books",
    "Restaurants / Cafes / etc.",
    "Products",
  ];

  // POST /task --- create new task
  router.post("/", (req, res) => {
    // /task isn't needed - use just /

    const { userId } = req.session;
    const { list_id } = req.body;
    const { task_name } = req.body;
    const create_at = new Date();
    //demo data - need to implement priority function later
    const priority = true;

    // make sure user is logged in
    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    let name = task_name;

    if (!list_id || !name || !create_at) {
      return res
        .status(401)
        .send("<h1>Please ensure all required fields are populated!</h1>");
    }

    // fetch openai to sort new task into appropriate category
    // MASTER CODE
    generateCategory(name)
      .then((resp) => {
        categories.forEach((category) => {
          if (resp.data.choices[0].text.includes(category)) {
            db.query(`SELECT id FROM categories WHERE name = $1`, [
              category,
            ]).then((data) => {
              const category_id = data.rows[0].id;

              db.query(
                `INSERT into tasks (list_id, category_id, name, create_at) VALUES ($1, $2, $3, $4) RETURNING *`,
                [list_id, category_id, name, create_at]
              )
                .then((data) => {
                  // FORMS CODE BELOW
                  res.redirect(`/lists/${list_id}`);
                })
                .catch((err) => {
                  res.status(500).json({ error: err.message });
                });
            });
          }
        });
      })
      .catch((err) => console.log(err));
  });

  // --------------------------------------------------------------------------------------------------
  // PUT /task/:id --- edit one task
  //INCOMPLETE - need to update this route

  router.put("/:id", (req, res) => {
    // /task/:id isn't needed - use just /:id
    let taskId = req.params.id;
    // const { list_id, category_id, name, create_at, priority } = req.body; //is this correct?
    const { userId } = req.session;
    const { name } = req.body;

    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    generateCategory(name).then((resp) => {
      categories
        .forEach((category) => {
          if (resp.data.choices[0].text.includes(category)) {
            // query db to retrieve category_id
            db.query(`SELECT id FROM categories WHERE name = $1`, [
              category,
            ]).then((data) => {
              const category_id = data.rows[0].id;

              db.query(
                `UPDATE tasks SET name = $2, category_id = $3 WHERE id = $1 RETURNING *`, // do we want to update create_at on edit?
                [taskId, name, category_id]
              )

                .then((data) => {
                  const task = data.rows[0];

                  if (!task) {
                    return res.status(404).send("<h1>Task not found!</h1>");
                  }
                  res.status(200).json({ message: "Task updated.", taskId });
                })
                .catch((err) => {
                  res.status(500).json({ error: err.message });
                });
            });
          }
        })
        .catch((err) => console.log(err));
    });

    // --------------------------------------------------------------------------------------------------
    // DELETE /task/:id -- delete one task
    //INCOMPLETE - need to update this route

    router.delete("/:id", (req, res) => {
      // /task/:id isn't needed - use just /:id
      let taskId = req.params.id;
      const { userId } = req.session;

      if (!userId) {
        return res.status(401).send("<h1>You are not logged in.</h1>"); // should this be listId?
      }

      db.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [taskId])
        .then((data) => {
          const task = data.rows[0];
          if (!task) {
            return res.status(404).send("<h1>Task not found!</h1>");
          }
          res.status(204).redirect("back"); // message isn't logged due to 204 No Content response https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  return router;
};
