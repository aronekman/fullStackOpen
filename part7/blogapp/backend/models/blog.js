const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title can't be blanc"]
  },
  url: {
    type: String,
    required: [true, "url can't be blanc"]
  },
  author: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{ type: String, required: [true, "comment can't be blanc"] }]
});

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', schema);
