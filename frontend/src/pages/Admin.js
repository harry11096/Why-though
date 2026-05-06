import { useEffect, useState } from 'react';
import { loginAdmin } from '../api/api.js';

export default function AdminPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('quiz-admin-theme') || 'light');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('quiz-admin-theme', theme);
  }, [theme]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const result = await loginAdmin(loginForm);
      localStorage.setItem('quiz-admin-token', result.token);
      setStatus(`Admin login successful for ${result.user.username}.`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

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

        {status ? <p className="notice success">{status}</p> : null}
      </section>
    </main>
  );
}
