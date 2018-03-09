const Note = require('../models/note.model');

const NoteController = {

  getNotes(req, res) {
    Note.find((err, notes) => {
      if (err) {
        res.json({
          error: err,
          message: '',
        });
      } else {
        res.json(notes.json());
      }
    });
  },

  addNewNote(req, res) {
    const newNote = Note({
      userId: req.body.userId,
      imagePath: req.body.imagePath
    });

    newNote.save();

    res.json({
      message: "Note successfully saved. 👍"
    })
  },

};

module.exports = NoteController;