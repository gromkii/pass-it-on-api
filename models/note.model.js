const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  user: {type: Schema.ObjectId, ref:'User', require: true},
  imgPath: String,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;