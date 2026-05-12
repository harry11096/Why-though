const { Question, allowedCategories } = require('../models/Question');

const normaliseQuestionInput = (rawQuestion) => {
  if (!rawQuestion || typeof rawQuestion !== 'object') {
    return { error: 'Each question must be an object.' };
  }

  const text = typeof rawQuestion.text === 'string' ? rawQuestion.text.trim() : '';
  const textEn = typeof rawQuestion.textEn === 'string' ? rawQuestion.textEn.trim() : '';
  const textZh = typeof rawQuestion.textZh === 'string' ? rawQuestion.textZh.trim() : '';
  const category = typeof rawQuestion.category === 'string' ? rawQuestion.category.trim() : '';
  const options = Array.isArray(rawQuestion.options)
    ? rawQuestion.options.map((option) => (typeof option === 'string' ? option.trim() : ''))
    : [];
  const optionsEn = Array.isArray(rawQuestion.optionsEn)
    ? rawQuestion.optionsEn.map((option) => (typeof option === 'string' ? option.trim() : ''))
    : undefined;
  const optionsZh = Array.isArray(rawQuestion.optionsZh)
    ? rawQuestion.optionsZh.map((option) => (typeof option === 'string' ? option.trim() : ''))
    : undefined;
  const correctAnswer =
    typeof rawQuestion.correctAnswer === 'string' ? rawQuestion.correctAnswer.trim() : '';
  const isActive = typeof rawQuestion.isActive === 'boolean' ? rawQuestion.isActive : true;

  if (!text) {
    return { error: 'Question text is required.' };
  }

  if (!allowedCategories.includes(category)) {
    return { error: `Category must be one of: ${allowedCategories.join(', ')}` };
  }

  if (options.length !== 4 || options.some((option) => !option)) {
    return { error: 'Each question must have exactly 4 non-empty options.' };
  }

  if (optionsEn && (optionsEn.length !== 4 || optionsEn.some((option) => !option))) {
    return { error: 'English options must have exactly 4 non-empty values.' };
  }

  if (optionsZh && (optionsZh.length !== 4 || optionsZh.some((option) => !option))) {
    return { error: 'Chinese options must have exactly 4 non-empty values.' };
  }

  const uniqueOptions = new Set(options.map((option) => option.toLowerCase()));
  if (uniqueOptions.size !== 4) {
    return { error: 'Question options must be unique.' };
  }

  if (!options.includes(correctAnswer)) {
    return { error: 'Correct answer must exactly match one of the 4 options.' };
  }

  return {
    value: {
      text,
      textEn,
      textZh,
      category,
      options,
      optionsEn,
      optionsZh,
      correctAnswer,
      isActive
    }
  };
};

const listQuestions = async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive !== 'false';
    const query = includeInactive ? {} : { isActive: true };
    const questions = await Question.find(query).sort({ createdAt: -1 });

    return res.json({ success: true, data: questions });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch questions.' });
  }
};

const createQuestion = async (req, res) => {
  try {
    const parsed = normaliseQuestionInput(req.body);

    if (parsed.error) {
      return res.status(400).json({ success: false, error: parsed.error });
    }

    const question = await Question.create(parsed.value);
    return res.status(201).json({ success: true, data: question });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create question.' });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const parsed = normaliseQuestionInput(req.body);

    if (parsed.error) {
      return res.status(400).json({ success: false, error: parsed.error });
    }

    const question = await Question.findByIdAndUpdate(req.params.id, parsed.value, {
      new: true,
      runValidators: true
    });

    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found.' });
    }

    return res.json({ success: true, data: question });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update question.' });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found.' });
    }

    return res.json({ success: true, data: { id: req.params.id } });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to delete question.' });
  }
};

const toggleQuestionStatus = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found.' });
    }

    question.isActive = !question.isActive;
    await question.save();

    return res.json({ success: true, data: question });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to toggle question status.' });
  }
};

const bulkImportQuestions = async (req, res) => {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, error: 'Questions must be a non-empty JSON array.' });
    }

    const preparedQuestions = [];
    for (let index = 0; index < questions.length; index += 1) {
      const parsed = normaliseQuestionInput(questions[index]);
      if (parsed.error) {
        return res.status(400).json({
          success: false,
          error: `Question ${index + 1}: ${parsed.error}`
        });
      }
      preparedQuestions.push(parsed.value);
    }

    const createdQuestions = await Question.insertMany(preparedQuestions, { ordered: true });

    return res.status(201).json({
      success: true,
      data: {
        importedCount: createdQuestions.length,
        questions: createdQuestions
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to bulk import questions.' });
  }
};

module.exports = {
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  toggleQuestionStatus,
  bulkImportQuestions,
  allowedCategories
};
