import React, { useEffect, useMemo, useState } from 'react';
import DashboardNav from './DashboardNav.jsx';
import PersonaReport from './PersonaReport.jsx';
import StatCard from './StatCard.jsx';
import { UI_COPY } from '../data/uiCopy.js';
import {
  getCategoryProfile,
  getCategoryTheme,
  getPersonaResult,
  getTextByLanguage,
  replaceParam,
} from '../lib/quizContent.js';
import {
  fieldTitleStyle,
  glassCardStyle,
  inputStyle,
  labelStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from '../styles/appStyles.js';

export default function Dashboard({
  user,
  attempts,
  onSave,
  onLogout,
  onStartQuiz,
  loading,
  language,
  setLanguage,
  setThemeMode,
  themeMode,
}) {
  const copy = UI_COPY[language] || UI_COPY.en;
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [activePanel, setActivePanel] = useState('home');
  const [navOpen, setNavOpen] = useState(false);
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

  const selectedAttemptResult = selectedAttempt
    ? {
        score: selectedAttempt.score,
        total: selectedAttempt.answers?.length || 0,
      }
    : null;
  const selectedAttemptPersona =
    selectedAttemptResult && selectedAttemptResult.total > 0
      ? getPersonaResult(selectedAttemptResult, selectedAttempt.category, language)
      : null;
  const selectedAttemptProfile = selectedAttempt ? getCategoryProfile(selectedAttempt.category) : null;
  const selectedAttemptTheme = getCategoryTheme(selectedAttemptProfile, themeMode);

  useEffect(() => {
    if (!selectedAttempt) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedAttempt]);

  if (selectedAttempt && selectedAttemptPersona && selectedAttemptResult) {
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
            <div style={{ color: 'var(--muted)', fontWeight: 600, marginBottom: 8 }}>{copy.attemptReport}</div>
            <h2 style={{ margin: 0, fontSize: '2rem', letterSpacing: '-0.03em' }}>
              {selectedAttemptProfile
                ? getTextByLanguage(selectedAttemptProfile.title, selectedAttemptProfile.titleEn, language)
                : selectedAttempt.category}
            </h2>
            <div style={{ color: 'var(--muted)', marginTop: 10, fontSize: '0.95rem' }}>
              {new Date(selectedAttempt.completedAt).toLocaleString()}
            </div>
          </div>
          <button onClick={() => setSelectedAttempt(null)} style={secondaryButtonStyle}>
            {copy.backToHistory}
          </button>
        </section>

        <PersonaReport
          persona={selectedAttemptPersona}
          result={selectedAttemptResult}
          language={language}
          categoryTheme={selectedAttemptTheme}
          label={copy.attemptReport}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <DashboardNav
        activePanel={activePanel}
        copy={copy}
        language={language}
        navOpen={navOpen}
        onLogout={onLogout}
        onSelectPanel={setActivePanel}
        setLanguage={setLanguage}
        setNavOpen={setNavOpen}
        setThemeMode={setThemeMode}
        themeMode={themeMode}
      />

      <div style={{ display: 'grid', gap: 24, marginTop: 24 }}>
        {activePanel === 'home' ? (
          <>
            <section
              style={{
                ...glassCardStyle,
                minHeight: 360,
                padding: 'clamp(34px, 7vw, 72px)',
                display: 'grid',
                alignContent: 'center',
                gap: 24,
              }}
            >
              <div>
                <div style={{ color: 'var(--muted)', fontWeight: 700, marginBottom: 12 }}>
                  {language === 'zh' ? '欢迎回来' : 'Welcome back'}
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'clamp(3rem, 8vw, 6.4rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.055em',
                  }}
                >
                  {user.fullName || user.username}
                </h2>
              </div>

              <button onClick={onStartQuiz} style={{ ...primaryButtonStyle, justifySelf: 'start' }}>
                {copy.startAssessment}
              </button>
            </section>
          </>
        ) : null}

        {activePanel === 'stats' ? (
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 18,
            }}
          >
            <StatCard
              eyebrow={copy.attempts}
              value={attemptSummary.total}
              note={copy.attemptsNote}
              tint="var(--card-bg)"
            />
            <StatCard
              eyebrow={copy.bestScore}
              value={attemptSummary.best}
              note={copy.bestScoreNote}
              tint="var(--card-bg)"
            />
            <StatCard
              eyebrow={copy.memberSince}
              value={new Date(user.createdAt).toLocaleDateString()}
              note={replaceParam(copy.memberSinceNote, 'role', user.role)}
              tint="var(--card-bg)"
            />
          </section>
        ) : null}

        {activePanel === 'profile' ? (
          <form
            onSubmit={handleProfileSubmit}
            style={{
              ...glassCardStyle,
              padding: '24px 24px 26px',
              display: 'grid',
              gap: 18,
              maxWidth: 520,
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
                {copy.personalInfo}
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65 }}>
                {copy.personalInfoBody}
              </p>
            </div>

            <label style={labelStyle}>
              <span style={fieldTitleStyle}>{copy.fullName}</span>
              <input
                name="fullName"
                value={profileForm.fullName}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Alex Morgan"
              />
            </label>

            <label style={labelStyle}>
              <span style={fieldTitleStyle}>{copy.email}</span>
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
              <span style={fieldTitleStyle}>{copy.bio}</span>
              <textarea
                name="bio"
                value={profileForm.bio}
                onChange={handleChange}
                rows={5}
                placeholder={copy.bioPlaceholder}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 124 }}
              />
            </label>

            <button type="submit" disabled={loading} style={{ ...primaryButtonStyle, opacity: loading ? 0.72 : 1 }}>
              {loading ? copy.savingProfile : copy.saveProfile}
            </button>
          </form>
        ) : null}

        {activePanel === 'history' ? (
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
                {copy.attemptsHistory}
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65 }}>
                {copy.attemptsBody}
              </p>
            </div>

            {attempts.length === 0 ? (
              <div
                style={{
                  borderRadius: 24,
                  padding: '26px 22px',
                  background: 'var(--secondary-bg)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--muted)',
                  lineHeight: 1.7,
                }}
              >
                {copy.noAttempts}
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 14 }}>
                {attempts.map((attempt) => {
                  const attemptProfile = getCategoryProfile(attempt.category);

                  return (
                    <div
                      key={attempt.id}
                      style={{
                        padding: '18px 18px 16px',
                        borderRadius: 22,
                        background: 'var(--secondary-bg)',
                        border: '1px solid var(--card-border)',
                        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.06)',
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
                        <strong style={{ fontSize: '1.03rem' }}>
                          {attemptProfile
                            ? getTextByLanguage(attemptProfile.title, attemptProfile.titleEn, language)
                            : attempt.category}
                        </strong>
                        <span
                          style={{
                            padding: '7px 12px',
                            borderRadius: 999,
                            background: 'var(--accent-soft)',
                            color: 'var(--accent)',
                            fontWeight: 700,
                          }}
                        >
                          Score {attempt.score}
                        </span>
                      </div>
                      <div style={{ color: 'var(--muted)', marginTop: 10, fontSize: '0.95rem' }}>
                        {new Date(attempt.completedAt).toLocaleString()}
                      </div>
                      <button
                        onClick={() => setSelectedAttempt(attempt)}
                        style={{ ...secondaryButtonStyle, marginTop: 14 }}
                      >
                        {copy.viewReport}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
