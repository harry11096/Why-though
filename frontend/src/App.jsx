import React, { useEffect, useState } from 'react';
import AuthPanel from './components/AuthPanel.jsx';
import Dashboard from './components/Dashboard.jsx';
import QuizWorkspace from './components/QuizWorkspace.jsx';
import { authApi } from './api/api.js';
import { UI_COPY } from './data/uiCopy.js';
import {
  appAnimationStyles,
  getThemeVariables,
  languageButton,
  pageStyle,
  shellStyle,
} from './styles/appStyles.js';

// App owns only global concerns: authentication, language/theme preference,
// and routing between the dashboard and quiz workspace.
export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('whythough-language') || 'en');
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('whythough-theme') || 'light');
  const [mode, setMode] = useState('login');
  const [view, setView] = useState('dashboard');
  const [authState, setAuthState] = useState(() => ({
    token: localStorage.getItem('whythough-user-token') || '',
    user: null,
    attempts: [],
  }));
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const copy = UI_COPY[language] || UI_COPY.en;

  // Keep user interface preferences persistent without involving the backend.
  useEffect(() => {
    localStorage.setItem('whythough-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('whythough-theme', themeMode);
  }, [themeMode]);

  // If a saved token exists, restore the user profile and quiz history on load.
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
          localStorage.removeItem('whythough-user-token');
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
    localStorage.setItem('whythough-user-token', result.data.token);
    setAuthState({
      token: result.data.token,
      user: result.data.user,
      attempts: [],
    });
    setView('dashboard');
    setMessage('');
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
    localStorage.removeItem('whythough-user-token');
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
    <main style={{ ...shellStyle, ...getThemeVariables(themeMode) }}>
      <style>{appAnimationStyles}</style>
      <div style={pageStyle}>
        {/* Auth controls live in the header only before login; after login they move into the compact dashboard nav. */}
        <header style={{ marginBottom: 26 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 999,
                background: 'var(--secondary-bg)',
                border: '1px solid rgba(29,29,31,0.08)',
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.06)',
                fontWeight: 700,
                color: 'var(--text)',
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: 999, background: '#007aff', boxShadow: '0 0 18px rgba(0,122,255,0.32)' }} />
              WhyThough
            </div>
            {!isAuthenticated ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 10px',
                    borderRadius: 999,
                    background: 'var(--secondary-bg)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 600 }}>{copy.languageLabel}</span>
                  <div style={{ display: 'inline-flex', gap: 6 }}>
                    <button onClick={() => setLanguage('zh')} style={languageButton(language === 'zh')}>
                      中文
                    </button>
                    <button onClick={() => setLanguage('en')} style={languageButton(language === 'en')}>
                      EN
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 10px',
                    borderRadius: 999,
                    background: 'var(--secondary-bg)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 600 }}>{copy.themeLabel}</span>
                  <div style={{ display: 'inline-flex', gap: 6 }}>
                    <button onClick={() => setThemeMode('light')} style={languageButton(themeMode === 'light')}>
                      {copy.lightMode}
                    </button>
                    <button onClick={() => setThemeMode('dark')} style={languageButton(themeMode === 'dark')}>
                      {copy.darkMode}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
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
              globalMessage={message}
              language={language}
              themeMode={themeMode}
            />
          ) : (
            <Dashboard
              user={authState.user}
              attempts={authState.attempts}
              onSave={handleProfileSave}
              onLogout={handleLogout}
              onStartQuiz={() => {
                setMessage('');
                setView('quiz');
              }}
              loading={loading}
              language={language}
              setLanguage={setLanguage}
              setThemeMode={setThemeMode}
              themeMode={themeMode}
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
            language={language}
          />
        )}
      </div>
    </main>
  );
}
