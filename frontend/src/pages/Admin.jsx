import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  bulkImportQuestions,
  createQuestion,
  deleteQuestion,
  fetchCategories,
  fetchMe,
  fetchQuestions,
  loginAdmin,
  toggleQuestionStatus,
  updateQuestion
} from '../api/api.js';

const emptyQuestionForm = {
  text: '',
  category: 'Pun Play',
  options: ['', '', '', ''],
  correctAnswer: '',
  isActive: true
};

const sampleImport = `[
  {
    "text": "Which animal is known for sleeping standing up?",
    "category": "Animal Facts",
    "options": ["Horse", "Tiger", "Panda", "Dolphin"],
    "correctAnswer": "Horse",
    "isActive": true
  }
]`;

const loginSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.')
});

const questionSchema = z
  .object({
    text: z.string().trim().min(1, 'Question text is required.'),
    category: z.string().min(1, 'Category is required.'),
    options: z.array(z.string().trim().min(1, 'Option cannot be empty.')).length(4),
    correctAnswer: z.string().min(1, 'Select the correct answer.'),
    isActive: z.boolean()
  })
  .superRefine((value, context) => {
    const uniqueOptions = new Set(value.options.map((option) => option.toLowerCase()));

    if (uniqueOptions.size !== value.options.length) {
      context.addIssue({
        code: 'custom',
        message: 'All four options must be unique.',
        path: ['options', 0]
      });
    }

    if (!value.options.includes(value.correctAnswer)) {
      context.addIssue({
        code: 'custom',
        message: 'Correct answer must match one option.',
        path: ['correctAnswer']
      });
    }
  });

const bulkImportSchema = z.object({
  bulkJson: z.string().trim().min(1, 'Paste a JSON array first.')
});

export default function AdminPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('quiz-admin-theme') || 'light');
  const [token, setToken] = useState(() => localStorage.getItem('quiz-admin-token') || '');
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState(['Pun Play']);
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const questionForm = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: emptyQuestionForm
  });

  const bulkForm = useForm({
    resolver: zodResolver(bulkImportSchema),
    defaultValues: { bulkJson: sampleImport }
  });

  const watchedOptions = questionForm.watch('options');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('quiz-admin-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const bootstrap = async () => {
      try {
        const [me, categoryData, questionData] = await Promise.all([
          fetchMe(),
          fetchCategories(),
          fetchQuestions()
        ]);

        if (me.role !== 'admin') {
          throw new Error('This account is not an admin account.');
        }

        setAdmin(me);
        setCategories(categoryData);
        setQuestions(questionData);

        if (categoryData.length > 0) {
          questionForm.setValue('category', questionForm.getValues('category') || categoryData[0]);
        }
      } catch (error) {
        localStorage.removeItem('quiz-admin-token');
        setToken('');
        setAdmin(null);
        setStatus({ type: 'error', message: error.message });
      }
    };

    bootstrap();
  }, [token, questionForm]);

  const sortedQuestions = useMemo(
    () =>
      [...questions].sort((left, right) => {
        if (left.category !== right.category) {
          return left.category.localeCompare(right.category);
        }
        return left.text.localeCompare(right.text);
      }),
    [questions]
  );

  const refreshQuestions = async () => {
    const questionData = await fetchQuestions();
    setQuestions(questionData);
  };

  const handleLogin = loginForm.handleSubmit(async (values) => {
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const result = await loginAdmin(values);

      if (result.user.role !== 'admin') {
        throw new Error('This account does not have admin access.');
      }

      localStorage.setItem('quiz-admin-token', result.token);
      setToken(result.token);
      setStatus({ type: 'success', message: 'Admin login successful.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  });

  const handleSubmitQuestion = questionForm.handleSubmit(async (values) => {
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      if (editingId) {
        await updateQuestion(editingId, values);
        setStatus({ type: 'success', message: 'Question updated.' });
      } else {
        await createQuestion(values);
        setStatus({ type: 'success', message: 'Question created.' });
      }

      await refreshQuestions();
      questionForm.reset({
        ...emptyQuestionForm,
        category: categories[0] || emptyQuestionForm.category
      });
      setEditingId('');
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  });

  const handleBulkImport = bulkForm.handleSubmit(async ({ bulkJson }) => {
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const parsed = JSON.parse(bulkJson);
      const result = await bulkImportQuestions(parsed);
      await refreshQuestions();
      setStatus({ type: 'success', message: `${result.importedCount} questions imported.` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Invalid JSON.' });
    } finally {
      setLoading(false);
    }
  });

  const handleDelete = async (questionId) => {
    if (!window.confirm('Delete this question?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteQuestion(questionId);
      await refreshQuestions();
      setStatus({ type: 'success', message: 'Question deleted.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (questionId) => {
    setLoading(true);
    try {
      await toggleQuestionStatus(questionId);
      await refreshQuestions();
      setStatus({ type: 'success', message: 'Question status updated.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (question) => {
    setEditingId(question._id);
    questionForm.reset({
      text: question.text,
      category: question.category,
      options: question.options,
      correctAnswer: question.correctAnswer,
      isActive: question.isActive
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetQuestionForm = () => {
    setEditingId('');
    questionForm.reset({
      ...emptyQuestionForm,
      category: categories[0] || emptyQuestionForm.category
    });
  };

  const logout = () => {
    localStorage.removeItem('quiz-admin-token');
    setToken('');
    setAdmin(null);
    setQuestions([]);
    setEditingId('');
    loginForm.reset();
    resetQuestionForm();
    setStatus({ type: 'success', message: 'Logged out.' });
  };

  if (!token || !admin) {
    return (
      <main className="shell">
        <section className="panel login-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Quiz Game</p>
              <h1>Admin Console</h1>
            </div>
            <button className="ghost-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>

          <p className="muted">
            Sign in with an admin account. If you need to create the first admin user, register with
            `ADMIN_SETUP_KEY` from the backend environment.
          </p>

          <form className="stack" onSubmit={handleLogin}>
            <label>
              Email
              <input type="email" {...loginForm.register('email')} required />
            </label>
            {loginForm.formState.errors.email ? (
              <p className="field-error">{loginForm.formState.errors.email.message}</p>
            ) : null}

            <label>
              Password
              <input type="password" {...loginForm.register('password')} required />
            </label>
            {loginForm.formState.errors.password ? (
              <p className="field-error">{loginForm.formState.errors.password.message}</p>
            ) : null}

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {status.message ? <p className={`notice ${status.type}`}>{status.message}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Question Management</h1>
            <p className="muted">Logged in as {admin.username}</p>
          </div>
          <div className="actions">
            <button className="ghost-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
            <button className="ghost-button" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>

        {status.message ? <p className={`notice ${status.type}`}>{status.message}</p> : null}

        <div className="grid">
          <section className="card">
            <h2>{editingId ? 'Edit Question' : 'Create Question'}</h2>
            <form className="stack" onSubmit={handleSubmitQuestion}>
              <label>
                Question Text
                <textarea {...questionForm.register('text')} rows="4" required />
              </label>
              {questionForm.formState.errors.text ? (
                <p className="field-error">{questionForm.formState.errors.text.message}</p>
              ) : null}

              <label>
                Category
                <select {...questionForm.register('category')}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              {questionForm.formState.errors.category ? (
                <p className="field-error">{questionForm.formState.errors.category.message}</p>
              ) : null}

              {watchedOptions.map((_, index) => (
                <label key={index}>
                  Option {index + 1}
                  <input {...questionForm.register(`options.${index}`)} required />
                </label>
              ))}
              {questionForm.formState.errors.options?.[0] ? (
                <p className="field-error">{questionForm.formState.errors.options[0].message}</p>
              ) : null}

              <label>
                Correct Answer
                <select {...questionForm.register('correctAnswer')} required>
                  <option value="">Select the correct option</option>
                  {watchedOptions
                    .filter((option) => option.trim())
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </label>
              {questionForm.formState.errors.correctAnswer ? (
                <p className="field-error">{questionForm.formState.errors.correctAnswer.message}</p>
              ) : null}

              <label className="checkbox">
                <input type="checkbox" {...questionForm.register('isActive')} />
                Active
              </label>

              <div className="actions">
                <button className="primary-button" type="submit" disabled={loading}>
                  {editingId ? 'Update Question' : 'Create Question'}
                </button>
                <button className="ghost-button" type="button" onClick={resetQuestionForm}>
                  Reset
                </button>
              </div>
            </form>
          </section>

          <section className="card">
            <h2>Bulk Import</h2>
            <p className="muted">Paste a JSON array. Every object must include text, category, 4 options and correctAnswer.</p>
            <form className="stack" onSubmit={handleBulkImport}>
              <textarea {...bulkForm.register('bulkJson')} rows="14" />
              {bulkForm.formState.errors.bulkJson ? (
                <p className="field-error">{bulkForm.formState.errors.bulkJson.message}</p>
              ) : null}
              <button className="primary-button" type="submit" disabled={loading}>
                Import JSON
              </button>
            </form>
          </section>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Inventory</p>
            <h2>All Questions</h2>
          </div>
          <span className="badge">{sortedQuestions.length} total</span>
        </div>

        <div className="question-list">
          {sortedQuestions.map((question) => (
            <article className="question-card" key={question._id}>
              <div className="question-top">
                <div>
                  <p className="category-chip">{question.category}</p>
                  <h3>{question.text}</h3>
                </div>
                <span className={`status-pill ${question.isActive ? 'active' : 'inactive'}`}>
                  {question.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <ol>
                {question.options.map((option) => (
                  <li key={option} className={option === question.correctAnswer ? 'correct-answer' : ''}>
                    {option}
                  </li>
                ))}
              </ol>

              <div className="actions">
                <button className="ghost-button" onClick={() => startEdit(question)}>
                  Edit
                </button>
                <button className="ghost-button" onClick={() => handleToggle(question._id)}>
                  {question.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button className="danger-button" onClick={() => handleDelete(question._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}

          {!sortedQuestions.length ? <p className="muted">No questions yet.</p> : null}
        </div>
      </section>
    </main>
  );
}
