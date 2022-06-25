const express = require('express');
const router  = express.Router();

//do we want to send html error messages with validation?

module.exports = (db) => {

  //CREATE one list
  router.post("/", (req, res) => {
    const { userId } = req.session;
    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    const { name, icon_url } = req.body;
    if (!name || !icon_url) {
      return res.status(401).send("<h1>Please input list name and icon.</h1>");
    }

    db.query(
      `INSERT into lists (user_id, name, icon_url) VALUES ($1, $2, $3) RETURNING *`,
      [userId, name, icon_url])
      .then(data => {
        const list = data.rows[0];
        res.status(201).json({ message: "List created.", list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //READ ALL lists
  router.get("/", (req, res) => {
    const { userId } = req.session;
    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    db.query(
      `SELECT * FROM lists WHERE user_id = $1`,
      [userId])
      .then(data => {
        const lists = data.rows;
        if (lists.length === 0) {
          //if no lists in db.
          return res.status(200).send("<h1>You haven't created any lists yet.</h1>");
        }
        res.status(200).json({ message: "Here are all of your lists!", lists });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //READ ONE list
  router.get("/:id", (req, res) => {
    const { listId } = req.params.id;
    const { userId } = req.session;
    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    db.query(
      `SELECT * FROM lists WHERE id = $1`,
      [listId])
      .then(data => {
        const list = data.rows[0];
        if (!list) {
          return res.status(404).send("<h1>List not found!</h1>");
        }
        res.status(200).json({ message: "Here is your list.", list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //UPDATE one list
  router.put("/:id", (req, res) => {
    const { listId } = req.params.id;
    const { name, icon_url } = req.body; //is this correct?
    const { userId } = req.session;
    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    db.query(
      `UPDATE lists SET name = $2, icon_url = $3 WHERE id = $1`,
      [listId, name, icon_url])
      .then(data => {
        const list = data.rows[0];
        if (!list) {
          return res.status(404).send("<h1>List not found!</h1>");
        }
        res.status(200).json({ message: "List updated.", list });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //DELETE one list
  router.delete("/:id", (req, res) => {
    const { listId } = req.params.id;
    const { userId } = req.session;
    if (!userId) {
      return res.status(401).send("<h1>You are not logged in.</h1>");
    }

    db.query(`DELETE FROM lists WHERE id = $1`,
      [listId])
      .then(data => {
        const list = data.rows[0];
        if (!list) {
          return res.status(404).send("<h1>List not found!</h1>");
        }
        res.status(204).json({ message: "List deleted." });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
