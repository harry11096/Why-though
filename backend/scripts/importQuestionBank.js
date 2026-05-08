require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const { Question } = require('../models/Question');
const questionBank = require('../data/question-bank.json');

const importQuestionBank = async () => {
  try {
    await connectDB();

    const questionTexts = questionBank.map((question) => question.text);
    await Question.deleteMany({ text: { $in: questionTexts } });
    await Question.insertMany(questionBank, { ordered: true });

    console.log(`Imported ${questionBank.length} questions.`);
  } catch (error) {
    console.error(`Failed to import question bank: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

importQuestionBank();
