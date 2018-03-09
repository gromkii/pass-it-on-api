const router = require('express').Router();
const NoteController = require('../controllers/note.controller');

router.route('/')
  .get(NoteController.getNotes)
  .post(NoteController.addNewNote);

module.exports = router;