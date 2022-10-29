const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //CREATE one list
  router.post("/", (req, res) => {
    console.log("in list route post");
    const { userId } = req.session;

    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    const { list_name, task } = req.body;

    if (!list_name) {
      return res.status(401).send("<h1>Please input list name.</h1>");
    }

    // // const {list_name} = req.body;
    // // let name = list_name;

    // // console.log('LIST_NAME:', list_name);
    // console.log('REQ.BODY:', req.body);
    // // if (!name || !icon_url) {
    // //   return res.status(401).send("<h1>Please input list name and icon.</h1>");
    // // }

    // // DUMMY DATA FOR TESTING
    // // const userId = 1;
    // // const name = "things to eat";
    // // const icon_url = 'url';

    // // DO WE WANT TO KEEP THIS - IS THIS FOR THE USER ICON OR LIST ICON??
    const icon_url = null;

    // // REMOVED ICON_URL for testing
    console.log("in list route post before db query");

    db.query(
      `INSERT into lists (user_id, name, icon_url) VALUES ($1, $2, $3) RETURNING *`,
      [userId, list_name, icon_url]
    )
      .then((data) => {
        const list = data.rows[0];
        res.redirect("/");
        res.status(201).json({ message: "List created.", list });
      })
      .catch((err) => {
        res.status(500);
      });
    console.log("in list route post after db query");
  });

  //READ ALL lists
  router.get("/", (req, res) => {
    const { userId } = req.session;

    db.query(`SELECT * FROM lists WHERE user_id = $1`, [userId])
      .then((data) => {
        const lists = data.rows;
        if (lists.length === 0) {
          //if no lists in db.
          return res
            .status(200)
            .send("<h1>You haven't created any lists yet.</h1>");
        }
        res.status(200).json({ message: "Here are all of your lists!", lists });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //READ ONE list
  router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.query(
      `SELECT lists.name AS list_name, lists.id AS list_id, tasks.name AS task_name, tasks.id AS task_id, tasks.category_id AS category_id
      FROM lists JOIN tasks ON lists.id = list_id WHERE lists.id = $1`,
      [id]
    )
      .then((data) => {
        // grab all rows in order to grab all tasks
        const list = data.rows;
        console.log("list in listsRoutes", list);
        if (!list) {
          return res.status(404).send("<h1>List not found!</h1>");
        }
        res.status(200).json({ message: "Here is your list.", list });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    // exports = { id };
  });

  //UPDATE one list
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    // const { name, icon_url } = req.body; //is this correct?
    // const { userId } = req.session;
    // if (!userId) {
    //   return res.status(401).send("<h1>You are not logged in.</h1>");
    // }

    //dummy data
    const name = "things NOT to eat";
    const icon_url = "url";

    db.query(
      `UPDATE lists SET name = $2, icon_url = $3 WHERE id = $1 RETURNING *`,
      [id, name, icon_url]
    )
      .then((data) => {
        const list = data.rows[0];
        if (!list) {
          return res.status(404).send("<h1>List not found!</h1>");
        }
        res.status(200).json({ message: "List updated.", list });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //DELETE one list
  router.delete("/:id/delete", (req, res) => {
    const { id } = req.params;
    // const { userId } = req.session;
    // if (!userId) {
    //   return res.status(401).send("<h1>You are not logged in.</h1>");
    // }

    db.query(`DELETE FROM lists WHERE id = $1 RETURNING *`, [id])
      .then((data) => {
        const list = data.rows[0];
        if (!list) {
          return res.status(404).send("<h1>List not found!</h1>");
        }

        res.status(204).redirect("back");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
