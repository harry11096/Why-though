const mongoose = require('mongoose');

const allowedCategories = [
  'Midnight Convenience Store Research Department',
  'Human Confusing Behavior Observation Center',
  'Cosmic Nonsense Laboratory',
  'Internet Mental State Detection Center',
  'The System Is Watching You'
];

const questionSchema = new mongoose.Schema(
  {
    textEn: {
      type: String,
      trim: true,
      default: ''
    },
    textZh: {
      type: String,
      trim: true,
      default: ''
    },
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
    optionsEn: {
      type: [String],
      default: undefined,
      validate: {
        validator(value) {
          return value === undefined || (
            Array.isArray(value) &&
            value.length === 4 &&
            value.every((option) => typeof option === 'string' && option.trim().length > 0)
          );
        },
        message: 'English options must have exactly 4 non-empty values'
      }
    },
    optionsZh: {
      type: [String],
      default: undefined,
      validate: {
        validator(value) {
          return value === undefined || (
            Array.isArray(value) &&
            value.length === 4 &&
            value.every((option) => typeof option === 'string' && option.trim().length > 0)
          );
        },
        message: 'Chinese options must have exactly 4 non-empty values'
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
