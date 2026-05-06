import { useEffect, useMemo, useState } from 'react';
import {
  bulkImportQuestions,
  createQuestion,
  deleteQuestion,
  fetchCategories,
  fetchQuestions,
  loginAdmin,
  toggleQuestionStatus,
  updateQuestion
} from '../api/api.js';

const emptyForm = {
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

export default function AdminPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('quiz-admin-theme') || 'light');
  const [token, setToken] = useState(() => localStorage.getItem('quiz-admin-token') || '');
  const [categories, setCategories] = useState(['Pun Play']);
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [bulkJson, setBulkJson] = useState(sampleImport);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);

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
        const [categoryData, questionData] = await Promise.all([fetchCategories(), fetchQuestions()]);
        setCategories(categoryData);
        setQuestions(questionData);
      } catch (error) {
        setStatus({ type: 'error', message: error.message });
      }
    };

    bootstrap();
  }, [token]);

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

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const result = await loginAdmin(loginForm);
      localStorage.setItem('quiz-admin-token', result.token);
      setToken(result.token);
      setStatus({ type: 'success', message: `Welcome, ${result.user.username}.` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const refreshQuestions = async () => {
    const questionData = await fetchQuestions();
    setQuestions(questionData);
  };

  const handleSubmitQuestion = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      if (editingId) {
        await updateQuestion(editingId, form);
        setStatus({ type: 'success', message: 'Question updated.' });
      } else {
        await createQuestion(form);
        setStatus({ type: 'success', message: 'Question created.' });
      }

      await refreshQuestions();
      setForm({ ...emptyForm, category: categories[0] || emptyForm.category });
      setEditingId('');
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (questionId) => {
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

  const handleBulkImport = async (event) => {
    event.preventDefault();
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
  };

  const startEdit = (question) => {
    setEditingId(question._id);
    setForm({
      text: question.text,
      category: question.category,
      options: question.options,
      correctAnswer: question.correctAnswer,
      isActive: question.isActive
    });
  };

  const logout = () => {
    localStorage.removeItem('quiz-admin-token');
    setToken('');
    setQuestions([]);
    setEditingId('');
    setStatus({ type: 'success', message: 'Logged out.' });
  };

  if (!token) {
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

          <p className="muted">Sign in with an admin account to manage quiz questions.</p>

          <form className="stack" onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
            </label>
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
                <textarea
                  value={form.text}
                  onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
                  rows="4"
                  required
                />
              </label>

              <label>
                Category
                <select
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              {form.options.map((option, index) => (
                <label key={index}>
                  Option {index + 1}
                  <input
                    value={option}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        options: current.options.map((item, itemIndex) =>
                          itemIndex === index ? event.target.value : item
                        )
                      }))
                    }
                    required
                  />
                </label>
              ))}

              <label>
                Correct Answer
                <select
                  value={form.correctAnswer}
                  onChange={(event) => setForm((current) => ({ ...current, correctAnswer: event.target.value }))}
                  required
                >
                  <option value="">Select the correct option</option>
                  {form.options
                    .filter((option) => option.trim())
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))}
                />
                Active
              </label>

              <div className="actions">
                <button className="primary-button" type="submit" disabled={loading}>
                  {editingId ? 'Update Question' : 'Create Question'}
                </button>
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => {
                    setEditingId('');
                    setForm({ ...emptyForm, category: categories[0] || emptyForm.category });
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </section>

          <section className="card">
            <h2>Bulk Import</h2>
            <form className="stack" onSubmit={handleBulkImport}>
              <textarea value={bulkJson} onChange={(event) => setBulkJson(event.target.value)} rows="14" />
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
        </div>
      </section>
    </main>
  );
}
