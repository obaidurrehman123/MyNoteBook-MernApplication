const express = require("express");
const router = express.Router();
const fetchUser = require("../miidleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//fetching all the notes of a particular user
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error occurred");
  }
});
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast five words").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await notes.save();
      res.send(savedNotes);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("some error occurred");
    }
  }
);
//update Note
router.put("/updateNotes/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NotFound");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error occurred");
  }
});
//delete the notes
router.delete("/deleteNotes/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NotFound");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "You have deleted Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error occurred");
  }
});

module.exports = router;
