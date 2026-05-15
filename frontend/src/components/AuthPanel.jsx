import React from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { UI_COPY } from '../data/uiCopy.js';
import { glassCardStyle, inputStyle, tabButton } from '../styles/appStyles.js';

export default function AuthPanel({ mode, setMode, onLogin, onRegister, loading, message, language }) {
  const copy = UI_COPY[language];
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
            'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(247,247,249,0.78) 100%)',
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
              background: 'rgba(0, 122, 255, 0.08)',
              color: '#007aff',
              fontWeight: 700,
              fontSize: '0.84rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {copy.authBadge}
          </div>

          <h1
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 6.2rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              margin: '24px 0 16px',
              maxWidth: 620,
            }}
          >
            WhyThough.
          </h1>

          <p
            style={{
              maxWidth: 430,
              color: 'var(--text)',
              fontSize: '1.08rem',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {copy.authLine}
          </p>

          <p
            style={{
              maxWidth: 470,
              color: 'var(--muted)',
              fontSize: '0.98rem',
              lineHeight: 1.75,
              margin: '16px 0 0',
            }}
          >
            {copy.authBody}
          </p>
        </div>
      </div>

      <div
        style={{
          ...glassCardStyle,
          padding: '22px 22px 24px',
          alignSelf: 'center',
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
              background: 'rgba(29, 29, 31, 0.05)',
            }}
          >
            <button onClick={() => setMode('login')} style={tabButton(mode === 'login')}>
              {copy.loginTab}
            </button>
            <button onClick={() => setMode('register')} style={tabButton(mode === 'register')}>
              {copy.registerTab}
            </button>
          </div>

          <div>
            <h2
              style={{
                margin: '0 0 6px',
                fontSize: '2rem',
                letterSpacing: '-0.03em',
                color: 'var(--text)',
              }}
            >
              {mode === 'login' ? copy.welcomeBack : copy.joinTitle}
            </h2>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65 }}>
              {mode === 'login' ? copy.loginIntro : copy.registerIntro}
            </p>
          </div>

          {message ? (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 18,
                background: 'rgba(0, 122, 255, 0.08)',
                color: '#0057d9',
                fontWeight: 600,
              }}
            >
              {message}
            </div>
          ) : null}

          {mode === 'login' ? (
            <Login onSubmit={onLogin} loading={loading} inputStyle={inputStyle} copy={copy.loginForm} />
          ) : (
            <Register onSubmit={onRegister} loading={loading} inputStyle={inputStyle} copy={copy.registerForm} />
          )}
        </div>
      </div>
    </section>
  );
}

