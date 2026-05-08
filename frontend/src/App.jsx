import React, { useEffect, useMemo, useState } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { authApi } from './api/api.js';

const shellStyle = {
  minHeight: '100vh',
  background:
    'linear-gradient(180deg, #f7fbff 0%, #eff5ff 45%, #f8fbf6 100%)',
  color: '#111827',
  fontFamily:
    '"SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: '28px 16px 48px',
  position: 'relative',
  overflow: 'hidden',
};

const ambientOrbBase = {
  position: 'absolute',
  borderRadius: '999px',
  filter: 'blur(60px)',
  opacity: 0.55,
  pointerEvents: 'none',
};

const pageStyle = {
  maxWidth: 1180,
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
};

const glassCardStyle = {
  background: 'rgba(255, 255, 255, 0.72)',
  backdropFilter: 'blur(26px) saturate(180%)',
  WebkitBackdropFilter: 'blur(26px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.85)',
  boxShadow: '0 24px 80px rgba(29, 78, 216, 0.10)',
  borderRadius: 30,
};

const inputStyle = {
  width: '100%',
  padding: '15px 16px',
  borderRadius: 18,
  border: '1px solid rgba(148, 163, 184, 0.24)',
  background: 'rgba(255, 255, 255, 0.88)',
  boxSizing: 'border-box',
  fontSize: '0.98rem',
  color: '#0f172a',
  outline: 'none',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.55)',
};

const labelStyle = {
  display: 'grid',
  gap: 8,
};

const fieldTitleStyle = {
  fontSize: '0.88rem',
  fontWeight: 600,
  color: '#475569',
};

const primaryButtonStyle = {
  border: 'none',
  borderRadius: 999,
  padding: '15px 18px',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '0.98rem',
  color: '#ffffff',
  background: 'linear-gradient(135deg, #0071e3 0%, #32a8ff 100%)',
  boxShadow: '0 16px 30px rgba(0, 113, 227, 0.26)',
};

const secondaryButtonStyle = {
  border: '1px solid rgba(148, 163, 184, 0.28)',
  borderRadius: 999,
  padding: '13px 18px',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '0.95rem',
  color: '#0f172a',
  background: 'rgba(255, 255, 255, 0.78)',
  backdropFilter: 'blur(20px)',
};

function AuthPanel({ mode, setMode, onLogin, onRegister, loading, message }) {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(340px, 460px)',
        gap: 24,
        alignItems: 'stretch',
      }}
    >
      <div
        style={{
          ...glassCardStyle,
          padding: '34px clamp(24px, 4vw, 42px)',
          minHeight: 560,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.56) 100%)',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.72)',
              color: '#2563eb',
              fontWeight: 700,
              fontSize: '0.84rem',
              letterSpacing: '0.04em',
            }}
          >
            BEAUTIFULLY POINTLESS
          </div>

          <h1
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 6.2rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              margin: '24px 0 16px',
              maxWidth: 620,
            }}
          >
            WhyThough.
          </h1>

          <p
            style={{
              maxWidth: 430,
              color: '#475569',
              fontSize: '1.08rem',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Answer first. Question your life later.
          </p>

          <p
            style={{
              maxWidth: 470,
              color: '#64748b',
              fontSize: '0.98rem',
              lineHeight: 1.75,
              margin: '16px 0 0',
            }}
          >
            You open one pointless question, then another, then suddenly you have a score, a fake
            personality type, and a very serious question about why any of this made sense to you.
          </p>
        </div>
      </div>

      <div
        style={{
          ...glassCardStyle,
          padding: '22px 22px 24px',
          alignSelf: 'center',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(248,250,252,0.76) 100%)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 18,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 8,
              padding: 6,
              borderRadius: 999,
              background: 'rgba(241,245,249,0.92)',
            }}
          >
            <button onClick={() => setMode('login')} style={tabButton(mode === 'login')}>
              Login
            </button>
            <button onClick={() => setMode('register')} style={tabButton(mode === 'register')}>
              Register
            </button>
          </div>

          <div>
            <h2
              style={{
                margin: '0 0 6px',
                fontSize: '2rem',
                letterSpacing: '-0.03em',
              }}
            >
              {mode === 'login' ? 'Welcome back.' : 'Join WhyThough.'}
            </h2>
            <p style={{ margin: 0, color: '#64748b', lineHeight: 1.65 }}>
              {mode === 'login'
                ? 'Sign in to open your profile and track your recent progress.'
                : 'Create a new account and start building your beautifully useless record.'}
            </p>
          </div>

          {message ? (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 18,
                background: 'linear-gradient(135deg, rgba(219,234,254,0.9), rgba(236,253,245,0.92))',
                color: '#1d4ed8',
                fontWeight: 600,
              }}
            >
              {message}
            </div>
          ) : null}

          {mode === 'login' ? (
            <Login onSubmit={onLogin} loading={loading} inputStyle={inputStyle} />
          ) : (
            <Register onSubmit={onRegister} loading={loading} inputStyle={inputStyle} />
          )}
        </div>
      </div>
    </section>
  );
}

function StatCard({ eyebrow, value, note, tint }) {
  return (
    <div
      style={{
        ...glassCardStyle,
        padding: '24px 24px 22px',
        background: tint,
      }}
    >
      <div style={{ color: '#64748b', fontSize: '0.88rem', fontWeight: 600, marginBottom: 10 }}>
        {eyebrow}
      </div>
      <div style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.05em' }}>{value}</div>
      <div style={{ marginTop: 10, color: '#475569', lineHeight: 1.55 }}>{note}</div>
    </div>
  );
}

function QuizWorkspace({
  token,
  loading,
  onBack,
  onComplete,
  setGlobalMessage,
}) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState('categories');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const response = await authApi.getCategories();
        if (!cancelled) {
          setCategories(response.data || []);
        }
      } catch (error) {
        if (!cancelled) {
          setGlobalMessage(error.message);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, [setGlobalMessage]);

  const startCategory = async (category) => {
    try {
      setGlobalMessage('');
      setSelectedCategory(category);
      const response = await authApi.getQuestions(token, category);
      setQuestions(response.data || []);
      setAnswers({});
      setResult(null);
      setStep('questions');
    } catch (error) {
      setGlobalMessage(error.message);
    }
  };

  const chooseAnswer = (questionId, option) => {
    setAnswers((current) => ({ ...current, [questionId]: option }));
  };

  const handleSubmit = async () => {
    const payload = {
      category: selectedCategory,
      answers: questions.map((question) => ({
        questionId: question._id,
        selectedAnswer: answers[question._id],
      })),
    };

    if (payload.answers.some((answer) => !answer.selectedAnswer)) {
      setGlobalMessage('Please answer every question before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await authApi.submitQuiz(token, payload);
      setResult(response.data);
      setStep('result');
      setGlobalMessage('Quiz submitted successfully.');
      onComplete();
    } catch (error) {
      setGlobalMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <section
        style={{
          ...glassCardStyle,
          padding: '24px 24px 26px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ color: '#64748b', fontWeight: 600, marginBottom: 8 }}>Quiz Mode</div>
          <h2 style={{ margin: 0, fontSize: '2rem', letterSpacing: '-0.03em' }}>
            {step === 'categories' ? 'Pick your chaos.' : selectedCategory || 'Quiz in progress'}
          </h2>
        </div>
        <button onClick={onBack} style={secondaryButtonStyle}>
          Back to profile
        </button>
      </section>

      {step === 'categories' ? (
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => startCategory(category)}
              disabled={loading}
              style={{
                ...glassCardStyle,
                padding: '24px 20px',
                border: '1px solid rgba(255,255,255,0.85)',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#0f172a',
                background: 'rgba(255,255,255,0.72)',
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 10 }}>{category}</div>
              <div style={{ color: '#64748b', lineHeight: 1.65 }}>
                Enter this category and see whether your brain should really know any of it.
              </div>
            </button>
          ))}
        </section>
      ) : null}

      {step === 'questions' ? (
        <section style={{ display: 'grid', gap: 18 }}>
          {questions.map((question, index) => (
            <div
              key={question._id}
              style={{
                ...glassCardStyle,
                padding: '24px 24px 26px',
                display: 'grid',
                gap: 16,
              }}
            >
              <div style={{ color: '#64748b', fontWeight: 600 }}>Question {index + 1}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, lineHeight: 1.5 }}>{question.text}</div>
              <div style={{ display: 'grid', gap: 12 }}>
                {question.options.map((option) => {
                  const active = answers[question._id] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => chooseAnswer(question._id, option)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 18,
                        border: active ? '1px solid #3b82f6' : '1px solid rgba(148,163,184,0.22)',
                        background: active ? 'rgba(219,234,254,0.9)' : 'rgba(255,255,255,0.88)',
                        color: '#0f172a',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.98rem',
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{ ...primaryButtonStyle, opacity: submitting ? 0.72 : 1, justifySelf: 'start' }}
          >
            {submitting ? 'Submitting...' : 'Submit quiz'}
          </button>
        </section>
      ) : null}

      {step === 'result' && result ? (
        <section
          style={{
            ...glassCardStyle,
            padding: '28px 26px 30px',
            display: 'grid',
            gap: 14,
            maxWidth: 560,
          }}
        >
          <div style={{ color: '#64748b', fontWeight: 600 }}>Result</div>
          <h3 style={{ margin: 0, fontSize: '2rem', letterSpacing: '-0.04em' }}>
            Score {result.score} / {result.total}
          </h3>
          <p style={{ margin: 0, color: '#475569', lineHeight: 1.75 }}>
            You finished the category, earned a score, and probably learned something nobody
            urgently needed.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => setStep('categories')} style={primaryButtonStyle}>
              Try another category
            </button>
            <button onClick={onBack} style={secondaryButtonStyle}>
              Back to profile
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Dashboard({ user, attempts, onSave, onLogout, onStartQuiz, loading }) {
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  useEffect(() => {
    setProfileForm({
      fullName: user?.fullName || '',
      email: user?.email || '',
      bio: user?.bio || '',
    });
  }, [user]);

  const attemptSummary = useMemo(() => {
    if (!attempts.length) {
      return {
        total: 0,
        best: 0,
      };
    }

    return {
      total: attempts.length,
      best: Math.max(...attempts.map((attempt) => attempt.score)),
    };
  }, [attempts]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((current) => ({ ...current, [name]: value }));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    onSave(profileForm);
  };

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <section
        style={{
          ...glassCardStyle,
          padding: '26px clamp(22px, 4vw, 34px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 16,
          alignItems: 'center',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(240,249,255,0.72) 100%)',
        }}
      >
        <div>
          <div style={{ color: '#64748b', fontWeight: 600, marginBottom: 8 }}>Signed in as</div>
          <h2
            style={{
              margin: '0 0 10px',
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.05em',
            }}
          >
            {user.fullName || user.username}
          </h2>
          <div style={{ color: '#475569', lineHeight: 1.6 }}>
            @{user.username} · {user.email}
          </div>
        </div>

        <button onClick={onLogout} style={secondaryButtonStyle}>
          Logout
        </button>
      </section>

      <section
        style={{
          ...glassCardStyle,
          padding: '24px 24px 26px',
          display: 'grid',
          gap: 12,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(236,253,245,0.72) 100%)',
        }}
      >
        <div style={{ color: '#64748b', fontWeight: 600 }}>Ready to waste knowledge productively?</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
          Start a new WhyThough round.
        </div>
        <div style={{ color: '#475569', lineHeight: 1.7 }}>
          Choose a category, answer the strange questions, and collect the score you probably did
          not need.
        </div>
        <button onClick={onStartQuiz} style={{ ...primaryButtonStyle, justifySelf: 'start' }}>
          Start quiz
        </button>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 18,
        }}
      >
        <StatCard
          eyebrow="Quiz Attempts"
          value={attemptSummary.total}
          note="Your complete record of submitted absurd quiz sessions."
          tint="linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(239,246,255,0.85) 100%)"
        />
        <StatCard
          eyebrow="Best Score"
          value={attemptSummary.best}
          note="The highest score currently saved in your account."
          tint="linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(236,253,245,0.88) 100%)"
        />
        <StatCard
          eyebrow="Member Since"
          value={new Date(user.createdAt).toLocaleDateString()}
          note={`Account role: ${user.role}`}
          tint="linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(255,247,237,0.88) 100%)"
        />
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 420px) minmax(0, 1fr)',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <form
          onSubmit={handleProfileSubmit}
          style={{
            ...glassCardStyle,
            padding: '24px 24px 26px',
            display: 'grid',
            gap: 18,
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
              Personal information
            </h3>
            <p style={{ margin: 0, color: '#64748b', lineHeight: 1.65 }}>
              Keep your account identity simple, clean, and current.
            </p>
          </div>

          <label style={labelStyle}>
            <span style={fieldTitleStyle}>Full Name</span>
            <input
              name="fullName"
              value={profileForm.fullName}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Alex Morgan"
            />
          </label>

          <label style={labelStyle}>
            <span style={fieldTitleStyle}>Email</span>
            <input
              type="email"
              name="email"
              value={profileForm.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="alex@example.com"
              required
            />
          </label>

          <label style={labelStyle}>
            <span style={fieldTitleStyle}>Bio</span>
            <textarea
              name="bio"
              value={profileForm.bio}
              onChange={handleChange}
              rows={5}
              placeholder="Tell the team a little about you."
              style={{ ...inputStyle, resize: 'vertical', minHeight: 124 }}
            />
          </label>

          <button type="submit" disabled={loading} style={{ ...primaryButtonStyle, opacity: loading ? 0.72 : 1 }}>
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>

        <div
          style={{
            ...glassCardStyle,
            padding: '24px 24px 26px',
            display: 'grid',
            gap: 18,
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
              Attempts history
            </h3>
            <p style={{ margin: 0, color: '#64748b', lineHeight: 1.65 }}>
              A tidy timeline of quiz activity, ready for later integration with the full game.
            </p>
          </div>

          {attempts.length === 0 ? (
            <div
              style={{
                borderRadius: 24,
                padding: '26px 22px',
                background: 'rgba(248,250,252,0.78)',
                border: '1px solid rgba(226,232,240,0.9)',
                color: '#64748b',
                lineHeight: 1.7,
              }}
            >
              No attempts yet. Once the WhyThough quiz flow is connected, your records will appear
              here automatically.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 14 }}>
              {attempts.map((attempt) => (
                <div
                  key={attempt.id}
                  style={{
                    padding: '18px 18px 16px',
                    borderRadius: 22,
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(248,250,252,0.90) 100%)',
                    border: '1px solid rgba(226,232,240,0.95)',
                    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 12,
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <strong style={{ fontSize: '1.03rem' }}>{attempt.category}</strong>
                    <span
                      style={{
                        padding: '7px 12px',
                        borderRadius: 999,
                        background: 'rgba(59,130,246,0.10)',
                        color: '#2563eb',
                        fontWeight: 700,
                      }}
                    >
                      Score {attempt.score}
                    </span>
                  </div>
                  <div style={{ color: '#64748b', marginTop: 10, fontSize: '0.95rem' }}>
                    {new Date(attempt.completedAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState('login');
  const [view, setView] = useState('dashboard');
  const [authState, setAuthState] = useState(() => ({
    token: localStorage.getItem('quiz-game-token') || '',
    user: null,
    attempts: [],
  }));
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authState.token) {
      return;
    }

    let cancelled = false;

    async function loadDashboard() {
      try {
        const [profileResult, attemptsResult] = await Promise.all([
          authApi.getProfile(authState.token),
          authApi.getAttempts(authState.token),
        ]);

        if (!cancelled) {
          setAuthState((current) => ({
            ...current,
            user: profileResult.data,
            attempts: attemptsResult.data,
          }));
        }
      } catch (error) {
        if (!cancelled) {
          localStorage.removeItem('quiz-game-token');
          setAuthState({ token: '', user: null, attempts: [] });
          setMessage(error.message);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [authState.token]);

  const handleAuthSuccess = (result) => {
    localStorage.setItem('quiz-game-token', result.data.token);
      setAuthState({
        token: result.data.token,
        user: result.data.user,
        attempts: [],
      });
      setView('dashboard');
      setMessage(result.message || '');
    };

  const handleLogin = async (payload) => {
    setLoading(true);
    try {
      const result = await authApi.login(payload);
      handleAuthSuccess(result);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (payload) => {
    setLoading(true);
    try {
      const result = await authApi.register(payload);
      handleAuthSuccess(result);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async (payload) => {
    setLoading(true);
    try {
      const result = await authApi.updateProfile(authState.token, payload);
      setAuthState((current) => ({ ...current, user: result.data }));
      setMessage(result.message || '');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('quiz-game-token');
    setAuthState({ token: '', user: null, attempts: [] });
    setMode('login');
    setView('dashboard');
    setMessage('Logged out successfully.');
  };

  const refreshAttempts = async () => {
    try {
      const attemptsResult = await authApi.getAttempts(authState.token);
      setAuthState((current) => ({ ...current, attempts: attemptsResult.data }));
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isAuthenticated = Boolean(authState.token && authState.user);

  return (
    <main style={shellStyle}>
      <div style={{ ...ambientOrbBase, width: 340, height: 340, background: '#b9e6ff', top: -90, left: -80 }} />
      <div style={{ ...ambientOrbBase, width: 280, height: 280, background: '#c7f9cc', top: 120, right: -80 }} />
      <div style={{ ...ambientOrbBase, width: 300, height: 300, background: '#ffd6a5', bottom: -80, left: '28%' }} />

      <div style={pageStyle}>
        <header style={{ marginBottom: 26 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.05)',
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 999, background: '#34c759' }} />
            WhyThough
          </div>
        </header>

        {isAuthenticated ? (
          view === 'quiz' ? (
            <QuizWorkspace
              token={authState.token}
              loading={loading}
              onBack={() => setView('dashboard')}
              onComplete={refreshAttempts}
              setGlobalMessage={setMessage}
            />
          ) : (
            <Dashboard
              user={authState.user}
              attempts={authState.attempts}
              onSave={handleProfileSave}
              onLogout={handleLogout}
              onStartQuiz={() => setView('quiz')}
              loading={loading}
            />
          )
        ) : (
          <AuthPanel
            mode={mode}
            setMode={setMode}
            onLogin={handleLogin}
            onRegister={handleRegister}
            loading={loading}
            message={message}
          />
        )}
      </div>
    </main>
  );
}

const tabButton = (active) => ({
  flex: 1,
  border: 'none',
  borderRadius: 999,
  padding: '12px 14px',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '0.96rem',
  transition: 'all 180ms ease',
  background: active ? '#ffffff' : 'transparent',
  color: active ? '#0f172a' : '#64748b',
  boxShadow: active ? '0 8px 20px rgba(15, 23, 42, 0.08)' : 'none',
});
