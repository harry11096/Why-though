const mongoose = require('mongoose');

const allowedCategories = [
  'Pun Play',
  'Body Facts',
  'Daily Life Trivia',
  'Animal Facts',
  'Brain Teasers'
];

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: allowedCategories
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator(value) {
          return (
            Array.isArray(value) &&
            value.length === 4 &&
            value.every((option) => typeof option === 'string' && option.trim().length > 0)
          );
        },
        message: 'A question must have exactly 4 non-empty options'
      }
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return Array.isArray(this.options) && this.options.includes(value);
        },
        message: 'Correct answer must match one of the provided options'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = {
  Question: mongoose.model('Question', questionSchema),
  allowedCategories
};
