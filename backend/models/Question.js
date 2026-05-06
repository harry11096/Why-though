//question题目表，定义了题目有哪些field

const mongoose = require('mongoose'); //MongoDB

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Pun Play', 'Body Facts', 'Daily Life Trivia', 'Animal Facts', 'Brain Teasers']
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 4;
      },
      message: 'A question must have exactly 4 options'
    }
  },
  correctAnswer: {
    type: String,
    required: true
  },
  isActive: { //whether the quiz is active or not
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
