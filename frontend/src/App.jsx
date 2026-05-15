import React, { useEffect, useMemo, useState } from 'react';
import AuthPanel from './components/AuthPanel.jsx';
import PersonaReport from './components/PersonaReport.jsx';
import StatCard from './components/StatCard.jsx';
import { authApi } from './api/api.js';
import { UI_COPY } from './data/uiCopy.js';
import {
  getCategoryProfile,
  getCategoryTheme,
  getDepartmentOrder,
  getLocalizedOptions,
  getLocalizedQuestionText,
  getPersonaResult,
  getScanlineOverlay,
  getSystemNotices,
  getTextByLanguage,
  replaceParam,
} from './lib/quizContent.js';
import {
  fieldTitleStyle,
  getThemeVariables,
  glassCardStyle,
  inputStyle,
  labelStyle,
  languageButton,
  pageStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
  shellStyle,
} from './styles/appStyles.js';

function QuizWorkspace({
  token,
  loading,
  onBack,
  onComplete,
  setGlobalMessage,
  globalMessage,
  language,
}) {
  const copy = UI_COPY[language];
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState('categories');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [systemFlashIndex, setSystemFlashIndex] = useState(0);
  const [systemFlashVisible, setSystemFlashVisible] = useState(false);
  const [systemFlashPosition, setSystemFlashPosition] = useState({ top: 108, left: 64 });

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

  useEffect(() => {
    const profile = getCategoryProfile(selectedCategory);

    if (profile?.theme !== 'system' || step !== 'questions') {
      setSystemFlashVisible(false);
      return undefined;
    }

    const notices = getSystemNotices(language);
    let timeoutId = null;

    const intervalId = setInterval(() => {
      setSystemFlashIndex((current) => (current + 1) % notices.length);
      const horizontalRange = Math.max(window.innerWidth - 420, 80);
      const verticalRange = Math.max(Math.min(window.innerHeight * 0.35, 260), 120);
      setSystemFlashPosition({
        top: 88 + Math.round(Math.random() * verticalRange),
        left: 28 + Math.round(Math.random() * horizontalRange),
      });
      setSystemFlashVisible(true);
      timeoutId = setTimeout(() => {
        setSystemFlashVisible(false);
      }, 820);
    }, 5600);

    setSystemFlashPosition({
      top: 104,
      left: Math.max(28, Math.round(window.innerWidth * 0.18)),
    });
    setSystemFlashVisible(true);
    timeoutId = setTimeout(() => {
      setSystemFlashVisible(false);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [language, selectedCategory, step]);

  useEffect(() => {
    if (step !== 'result') {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

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
        selectedAnswer: question.options[answers[question._id]],
      })),
    };

    if (payload.answers.some((answer) => answer.selectedAnswer === undefined)) {
      setGlobalMessage(copy.answerAll);
      return;
    }

    try {
      setSubmitting(true);
      const response = await authApi.submitQuiz(token, payload);
      setResult(response.data);
      setStep('result');
      setGlobalMessage(copy.successSubmit);
      onComplete();
    } catch (error) {
      setGlobalMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedProfile = getCategoryProfile(selectedCategory);
  const persona = result ? getPersonaResult(result, selectedCategory, language) : null;
  const categoryTheme = getCategoryTheme(selectedProfile);
  const answeredCount = questions.reduce(
    (count, question) => (answers[question._id] !== undefined ? count + 1 : count),
    0
  );
  const systemNotices = getSystemNotices(language);
  const systemStatusLine =
    systemNotices[Math.min(systemNotices.length - 1, answeredCount % systemNotices.length)];
  const activeSystemFlashNotice = systemNotices[systemFlashIndex % systemNotices.length];
  const orderedCategories = useMemo(
    () =>
      [...categories].sort((left, right) => {
        const leftProfile = getCategoryProfile(left);
        const rightProfile = getCategoryProfile(right);
        const orderDiff = getDepartmentOrder(leftProfile) - getDepartmentOrder(rightProfile);

        if (orderDiff !== 0) {
          return orderDiff;
        }

        return left.localeCompare(right);
      }),
    [categories]
  );

  // Reset quiz-local state when the player leaves a category result or in-progress quiz.
  const goToCategories = () => {
    setSelectedCategory('');
    setQuestions([]);
    setAnswers({});
    setResult(null);
    setGlobalMessage('');
    setStep('categories');
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
          <div style={{ color: 'var(--muted)', fontWeight: 600, marginBottom: 8 }}>{copy.assessmentMode}</div>
          <h2 style={{ margin: 0, fontSize: '2rem', letterSpacing: '-0.03em' }}>
            {step === 'categories' ? copy.choosePattern : selectedCategory || copy.progressTitle}
          </h2>
        </div>
        <button onClick={onBack} style={secondaryButtonStyle}>
          {copy.backToProfile}
        </button>
      </section>

      {globalMessage ? (
        <div
          style={{
            ...glassCardStyle,
            padding: '14px 18px',
            color: globalMessage.toLowerCase().includes('saved') || globalMessage.includes('保存') ? '#0057d9' : '#b45309',
            fontWeight: 600,
            background: globalMessage.toLowerCase().includes('saved') || globalMessage.includes('保存')
              ? 'rgba(0,122,255,0.08)'
              : 'rgba(245,158,11,0.12)',
          }}
        >
          {globalMessage}
        </div>
      ) : null}

      {selectedProfile?.theme === 'system' && step === 'questions' && systemFlashVisible ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 3,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.00) 35%, rgba(248,113,113,0.06) 100%)',
            opacity: 0.78,
            mixBlendMode: 'screen',
          }}
        />
      ) : null}

      {selectedProfile?.theme === 'system' && step === 'questions' ? (
        <div
          style={{
            position: 'fixed',
            top: systemFlashPosition.top,
            left: systemFlashPosition.left,
            zIndex: 5,
            pointerEvents: 'none',
            minHeight: 0,
            maxWidth: 'calc(100vw - 48px)',
          }}
        >
          <div
            style={{
              width: 'min(420px, 100%)',
              padding: '14px 18px',
              borderRadius: 18,
              border: '1px solid rgba(248,113,113,0.22)',
              background: systemFlashVisible
                ? 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(254,242,242,0.94) 100%)'
                : 'linear-gradient(135deg, rgba(16,16,18,0.88) 0%, rgba(8,8,10,0.92) 100%)',
              color: systemFlashVisible ? '#7f1d1d' : '#fca5a5',
              boxShadow: systemFlashVisible
                ? '0 0 0 1px rgba(255,255,255,0.16), 0 0 28px rgba(248,113,113,0.28)'
                : '0 18px 40px rgba(0,0,0,0.34)',
              transform: systemFlashVisible ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.985)',
              opacity: systemFlashVisible ? 1 : 0,
              transition: 'opacity 140ms ease, transform 140ms ease, background 120ms ease, color 120ms ease, box-shadow 120ms ease',
              letterSpacing: '0.05em',
              lineHeight: 1.6,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={getScanlineOverlay(18)} />
            <strong style={{ display: 'block', marginBottom: 4 }}>
              {language === 'zh' ? '系统提示' : 'System Notice'}
            </strong>
            <div>{activeSystemFlashNotice}</div>
          </div>
        </div>
      ) : null}

      {selectedProfile && step !== 'categories' ? (
        <section
          style={{
            ...glassCardStyle,
            background: categoryTheme.cardBackground,
            border: categoryTheme.cardBorder,
            boxShadow: categoryTheme.shadow,
            padding: '22px 22px 24px',
            display: 'grid',
            gap: 12,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {selectedProfile?.theme === 'system' ? <div style={getScanlineOverlay(30)} /> : null}
          <div style={{ color: categoryTheme.accent, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {selectedProfile.departmentCode}
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            <h3 style={{ margin: 0, fontSize: '1.8rem', letterSpacing: '-0.04em', color: categoryTheme.text }}>
              {getTextByLanguage(selectedProfile.title, selectedProfile.titleEn, language)}
            </h3>
            <p style={{ margin: 0, color: categoryTheme.text, lineHeight: 1.75 }}>
              {getTextByLanguage(selectedProfile.intro, selectedProfile.introEn, language)}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(language === 'zh' ? selectedProfile.vibe : selectedProfile.vibeEn || selectedProfile.vibe).map((item) => (
              <span
                key={item}
                style={{
                  padding: '8px 12px',
                  borderRadius: 999,
                  background: categoryTheme.chipBackground,
                  border: categoryTheme.chipBorder,
                  color: categoryTheme.text,
                  fontSize: '0.92rem',
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <p style={{ margin: 0, color: categoryTheme.subtext, lineHeight: 1.75 }}>
            {step === 'questions'
              ? getTextByLanguage(selectedProfile.questionLeadZh, selectedProfile.questionLead, language)
              : getTextByLanguage(selectedProfile.categoryHintZh, selectedProfile.categoryHint, language)}
          </p>
          {selectedProfile?.theme === 'system' ? (
            <div
              style={{
                marginTop: 4,
                padding: '10px 12px',
                borderRadius: 16,
                border: '1px solid rgba(248,113,113,0.18)',
                background: 'rgba(255,255,255,0.02)',
                color: '#fca5a5',
                fontSize: '0.92rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {systemStatusLine}
            </div>
          ) : null}
        </section>
      ) : null}

      {step === 'categories' ? (
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
          }}
        >
          {orderedCategories.map((category) => (
            (() => {
              const profile = getCategoryProfile(category);
              const theme = getCategoryTheme(profile);

              return (
                <button
                  key={category}
                  onClick={() => startCategory(category)}
                  disabled={loading}
                  style={{
                    ...glassCardStyle,
                    padding: '24px 20px',
                    border: profile
                      ? theme.cardBorder
                      : '1px solid rgba(255,255,255,0.10)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: profile ? theme.text : 'var(--text)',
                    background: profile
                      ? theme.cardBackground
                      : 'var(--secondary-bg)',
                    boxShadow: profile
                      ? theme.shadow
                      : glassCardStyle.boxShadow,
                  }}
                >
                  {profile ? (
                    <div
                      style={{
                        color: theme.accent,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: 10,
                      }}
                    >
                      {profile.departmentCode}
                    </div>
                  ) : null}
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>
                    {profile ? getTextByLanguage(profile.title, profile.titleEn, language) : category}
                  </div>
                  <div style={{ color: profile ? theme.subtext : 'var(--muted)', lineHeight: 1.65 }}>
                    {profile
                      ? getTextByLanguage(profile.categoryHintZh, profile.categoryHint, language)
                      : copy.categoryFallback}
                  </div>
                </button>
              );
            })()
          ))}
        </section>
      ) : null}

      {step === 'questions' ? (
        <section style={{ display: 'grid', gap: 18 }}>
          {selectedProfile?.theme === 'system' ? (
            <div
              style={{
                ...glassCardStyle,
                background: categoryTheme.cardBackground,
                border: categoryTheme.cardBorder,
                boxShadow: categoryTheme.shadow,
                padding: '18px 20px 20px',
                display: 'grid',
                gap: 12,
                position: 'relative',
                overflow: 'hidden',
              }}
              >
                <div style={getScanlineOverlay(24)} />
                <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <strong style={{ color: categoryTheme.text, letterSpacing: '0.04em' }}>
                  {language === 'zh' ? '系统同步进度' : 'System Synchronization'}
                </strong>
                <span style={{ color: '#fca5a5', fontSize: '0.9rem' }}>{answeredCount} / {questions.length}</span>
              </div>
              <div
                style={{
                  height: 12,
                  borderRadius: 999,
                  border: '1px solid rgba(248,113,113,0.18)',
                  background: 'rgba(255,255,255,0.04)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%`,
                    maxWidth: questions.length && answeredCount < questions.length ? 'calc(100% - 14px)' : '100%',
                    height: '100%',
                    borderRadius: 999,
                    background:
                      'repeating-linear-gradient(90deg, rgba(248,113,113,0.92) 0px, rgba(248,113,113,0.92) 18px, rgba(255,255,255,0.92) 18px, rgba(255,255,255,0.92) 22px)',
                    boxShadow: '0 0 18px rgba(248,113,113,0.28)',
                  }}
                />
              </div>
              <div style={{ color: categoryTheme.subtext, lineHeight: 1.7 }}>
                {systemStatusLine}
              </div>
            </div>
          ) : null}

          {questions.map((question, index) => (
            <div
              key={question._id}
              style={{
                ...glassCardStyle,
                background: categoryTheme.cardBackground,
                border: categoryTheme.cardBorder,
                boxShadow: categoryTheme.shadow,
                padding: '24px 24px 26px',
                display: 'grid',
                gap: 16,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {selectedProfile?.theme === 'system' ? <div style={getScanlineOverlay(30)} /> : null}
              <div style={{ color: categoryTheme.subtext, fontWeight: 600 }}>
                {replaceParam(copy.questionLabel, 'number', String(index + 1))}
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, lineHeight: 1.5, color: categoryTheme.text }}>
                {getLocalizedQuestionText(question, language)}
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {getLocalizedOptions(question, language).map((option, optionIndex) => {
                  const active = answers[question._id] === optionIndex;
                  return (
                    <button
                      key={`${question._id}-${optionIndex}`}
                      onClick={() => chooseAnswer(question._id, optionIndex)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 18,
                        border: active ? `1px solid ${categoryTheme.accent}` : categoryTheme.optionBorder,
                        background: active ? categoryTheme.optionActive : categoryTheme.chipBackground,
                        color: categoryTheme.text,
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

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{ ...primaryButtonStyle, opacity: submitting ? 0.72 : 1, justifySelf: 'start' }}
            >
              {submitting
                ? copy.submitting
                : selectedProfile
                  ? getTextByLanguage(selectedProfile.submitLabelZh, selectedProfile.submitLabel, language)
                  : copy.submitQuiz}
            </button>
            <button onClick={goToCategories} style={secondaryButtonStyle}>
              {copy.backToCategories}
            </button>
          </div>
        </section>
      ) : null}

      {step === 'result' && result ? (
        <div style={{ display: 'grid', gap: 18 }}>
          <PersonaReport
            persona={persona}
            result={result}
            language={language}
            categoryTheme={categoryTheme}
            label={
              selectedProfile
                ? getTextByLanguage(selectedProfile.resultLabelZh, selectedProfile.resultLabel, language)
                : copy.resultLabel
            }
          />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={goToCategories} style={primaryButtonStyle}>
              {selectedProfile
                ? getTextByLanguage(selectedProfile.retryLabelZh, selectedProfile.retryLabel, language)
                : copy.beginAnother}
            </button>
            <button onClick={onBack} style={secondaryButtonStyle}>
              {copy.backToProfile}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Dashboard({ user, attempts, onSave, onLogout, onStartQuiz, loading, language }) {
  const copy = UI_COPY[language] || UI_COPY.en;
  const [selectedAttempt, setSelectedAttempt] = useState(null);
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
  const selectedAttemptTheme = getCategoryTheme(selectedAttemptProfile);

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
    <div style={{ display: 'grid', gap: 24 }}>
      <section
        style={{
          ...glassCardStyle,
          padding: '26px clamp(22px, 4vw, 34px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ color: 'var(--muted)', fontWeight: 600, marginBottom: 8 }}>{copy.profileActive}</div>
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
          <div style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
            @{user.username} · {user.email}
          </div>
        </div>

        <button onClick={onLogout} style={secondaryButtonStyle}>
          {copy.logout}
        </button>
      </section>

      <section
        style={{
          ...glassCardStyle,
          padding: '24px 24px 26px',
          display: 'grid',
          gap: 12,
        }}
      >
        <div style={{ color: 'var(--muted)', fontWeight: 600 }}>{copy.assessmentReady}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
          {copy.startIncident}
        </div>
        <div style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          {copy.startIncidentBody}
        </div>
        <button onClick={onStartQuiz} style={{ ...primaryButtonStyle, justifySelf: 'start' }}>
          {copy.startAssessment}
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
            <p style={{ margin: 0, color: '#64748b', lineHeight: 1.65 }}>
              {copy.attemptsBody}
            </p>
          </div>

          {attempts.length === 0 ? (
            <div
              style={{
                borderRadius: 24,
                padding: '26px 22px',
                background: 'rgba(248,250,252,0.78)',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.03)',
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
                      border: '1px solid rgba(29,29,31,0.08)',
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
                        background: 'rgba(0,122,255,0.08)',
                        color: '#0057d9',
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
      </section>
    </div>
  );
}

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

  useEffect(() => {
    localStorage.setItem('whythough-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('whythough-theme', themeMode);
  }, [themeMode]);

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
      <div style={pageStyle}>
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
            />
          ) : (
            <Dashboard
              user={authState.user}
              attempts={authState.attempts}
              onSave={handleProfileSave}
              onLogout={handleLogout}
              onStartQuiz={() => setView('quiz')}
              loading={loading}
              language={language}
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
