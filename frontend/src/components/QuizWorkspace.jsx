import React, { useEffect, useMemo, useRef, useState } from 'react';
import PersonaReport from './PersonaReport.jsx';
import QuizQuestionCard from './QuizQuestionCard.jsx';
import { authApi } from '../api/api.js';
import { UI_COPY } from '../data/uiCopy.js';
import {
  getCategoryProfile,
  getCategoryTheme,
  getDepartmentOrder,
  getPersonaResult,
  getSystemNotices,
  getTextByLanguage,
} from '../lib/quizContent.js';
import {
  glassCardStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from '../styles/appStyles.js';

// QuizWorkspace owns the full quiz state machine: category selection, one-page
// questions, submission, result rendering, and the fifth category's glitch cues.
export default function QuizWorkspace({
  token,
  loading,
  onBack,
  onComplete,
  setGlobalMessage,
  globalMessage,
  language,
  themeMode,
}) {
  const copy = UI_COPY[language];
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [step, setStep] = useState('categories');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [systemGlitch, setSystemGlitch] = useState(null);
  const [systemGlitchPlan, setSystemGlitchPlan] = useState([]);
  const [systemGlitchSeen, setSystemGlitchSeen] = useState([]);
  const systemGlitchTimeoutRef = useRef(null);

  // Categories are loaded from the backend so admin-managed question banks can
  // change without requiring frontend deploys.
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
    if (step !== 'result') {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Avoid a delayed glitch timeout trying to update state after leaving the page.
  useEffect(() => () => {
    if (systemGlitchTimeoutRef.current) {
      clearTimeout(systemGlitchTimeoutRef.current);
    }
  }, []);

  // The system category should feel like a normal quiz with a few accidental
  // leaks, so the triggers are sparse and partly unpredictable.
  const createSystemGlitchPlan = (questionCount) => {
    if (questionCount <= 0) {
      return [];
    }

    const guaranteedFirstGlitch = Math.min(2, questionCount);
    const middleGlitch = Math.max(guaranteedFirstGlitch, Math.ceil(questionCount / 2));
    const lateGlitch = Math.max(guaranteedFirstGlitch, questionCount - 1);
    const triggerPoints = new Set([guaranteedFirstGlitch, middleGlitch, lateGlitch]);

    if (questionCount > 6 && Math.random() > 0.45) {
      triggerPoints.add(3 + Math.floor(Math.random() * Math.max(1, questionCount - 4)));
    }

    return [...triggerPoints].sort((left, right) => left - right);
  };

  // Full-screen flashes are intentionally brief; they should read like a visual
  // fault, not a modal or a horror-game interruption.
  const showSystemGlitch = () => {
    const notices = getSystemNotices(language);
    const message = notices[Math.floor(Math.random() * notices.length)];

    if (systemGlitchTimeoutRef.current) {
      clearTimeout(systemGlitchTimeoutRef.current);
    }

    setSystemGlitch({
      id: Date.now(),
      message,
      side: Math.random() > 0.5 ? 'right' : 'left',
    });

    systemGlitchTimeoutRef.current = setTimeout(() => {
      setSystemGlitch(null);
    }, 720);
  };

  // Starting a category resets all quiz-local state so switching categories does
  // not carry old answers, result data, or glitch timing into the next run.
  const startCategory = async (category) => {
    try {
      setGlobalMessage('');
      setSelectedCategory(category);
      const response = await authApi.getQuestions(token, category);
      const nextQuestions = response.data || [];
      const profile = getCategoryProfile(category);

      setQuestions(nextQuestions);
      setAnswers({});
      setCurrentQuestionIndex(0);
      setResult(null);
      setSystemGlitch(null);
      setSystemGlitchSeen([]);
      setSystemGlitchPlan(profile?.theme === 'system' ? createSystemGlitchPlan(nextQuestions.length) : []);
      setStep('questions');
    } catch (error) {
      setGlobalMessage(error.message);
    }
  };

  // Answers are stored by question id so users can go back without losing their
  // previous choices, even though only one question is visible at a time.
  const chooseAnswer = (questionId, option) => {
    const nextAnswers = { ...answers, [questionId]: option };
    const nextAnsweredCount = Object.keys(nextAnswers).length;
    const profile = getCategoryProfile(selectedCategory);
    const nextTrigger = systemGlitchPlan.find(
      (triggerPoint) => nextAnsweredCount >= triggerPoint && !systemGlitchSeen.includes(triggerPoint)
    );

    setAnswers(nextAnswers);

    if (profile?.theme === 'system' && nextTrigger) {
      setSystemGlitchSeen((current) => [...current, nextTrigger]);
      showSystemGlitch();
    }
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((current) => Math.max(0, current - 1));
    setGlobalMessage('');
  };

  const goToNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
      return;
    }

    if (answers[currentQuestion._id] === undefined) {
      setGlobalMessage(language === 'zh' ? '请先选择一个答案。' : 'Please choose an answer first.');
      return;
    }

    setGlobalMessage('');
    setCurrentQuestionIndex((current) => Math.min(questions.length - 1, current + 1));
  };

  // The backend still receives the selected answer text to stay compatible with
  // the existing scoring model.
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
  const categoryTheme = getCategoryTheme(selectedProfile, themeMode);
  const answeredCount = questions.reduce(
    (count, question) => (answers[question._id] !== undefined ? count + 1 : count),
    0
  );
  const currentQuestion = questions[currentQuestionIndex] || null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
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
    setCurrentQuestionIndex(0);
    setResult(null);
    setSystemGlitch(null);
    setSystemGlitchPlan([]);
    setSystemGlitchSeen([]);
    setGlobalMessage('');
    setStep('categories');
  };

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {step === 'categories' ? (
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
              {copy.choosePattern}
            </h2>
          </div>
          <button onClick={onBack} style={secondaryButtonStyle}>
            {copy.backToProfile}
          </button>
        </section>
      ) : null}

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

      {selectedProfile?.theme === 'system' && step === 'questions' && systemGlitch ? (
        <div
          key={systemGlitch.id}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            display: 'grid',
            placeItems: 'center',
            background:
              'repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 6px, rgba(236,236,236,0.95) 7px, rgba(255,255,255,1) 9px)',
            animation: 'systemPageBlink 720ms steps(2, end) both',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'repeating-linear-gradient(90deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 7px)',
              mixBlendMode: 'multiply',
              opacity: 0.55,
              animation: 'systemNoiseSlide 720ms steps(4, end) both',
            }}
          />
          <div
            style={{
              position: 'relative',
              color: '#c40000',
              fontSize: 'clamp(1.15rem, 3vw, 2rem)',
              fontWeight: 800,
              letterSpacing: '0.02em',
              textAlign: 'center',
              animation: 'systemNoticeBlink 720ms ease-out both',
            }}
          >
            {systemGlitch.message}
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
          {selectedProfile.theme !== 'system' ? (
            <div style={{ color: categoryTheme.accent, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {selectedProfile.departmentCode}
            </div>
          ) : null}
          <div style={{ display: 'grid', gap: 6 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.8rem', letterSpacing: '-0.04em', color: categoryTheme.text }}>
                {getTextByLanguage(selectedProfile.title, selectedProfile.titleEn, language)}
              </h3>
              <button onClick={onBack} style={secondaryButtonStyle}>
                {copy.backToProfile}
              </button>
            </div>
            <p style={{ margin: 0, color: categoryTheme.text, lineHeight: 1.75 }}>
              {getTextByLanguage(selectedProfile.intro, selectedProfile.introEn, language)}
            </p>
          </div>
          {selectedProfile.theme !== 'system' ? (
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
          ) : null}
          <p style={{ margin: 0, color: categoryTheme.subtext, lineHeight: 1.75 }}>
            {step === 'questions'
              ? getTextByLanguage(selectedProfile.questionLeadZh, selectedProfile.questionLead, language)
              : getTextByLanguage(selectedProfile.categoryHintZh, selectedProfile.categoryHint, language)}
          </p>
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
              const theme = getCategoryTheme(profile, themeMode);

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
                  {profile && profile.theme !== 'system' ? (
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
                  {language === 'zh' ? '你还没退出。' : 'You still have not left.'}
                </strong>
                <span style={{ color: categoryTheme.subtext, fontSize: '0.9rem' }}>{answeredCount} / {questions.length}</span>
              </div>
              <div
                style={{
                  height: 12,
                  borderRadius: 999,
                  border: categoryTheme.chipBorder,
                  background: 'rgba(255,255,255,0.035)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%`,
                    maxWidth: questions.length && answeredCount < questions.length ? 'calc(100% - 14px)' : '100%',
                    height: '100%',
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, rgba(29,29,31,0.28) 0%, rgba(29,29,31,0.82) 100%)',
                  }}
                />
              </div>
            </div>
          ) : null}

          <QuizQuestionCard
            answers={answers}
            categoryTheme={categoryTheme}
            copy={copy}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            language={language}
            onChooseAnswer={chooseAnswer}
            questions={questions}
          />

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              style={{ ...secondaryButtonStyle, opacity: currentQuestionIndex === 0 ? 0.45 : 1 }}
            >
              {copy.previousQuestion}
            </button>
            <button
              onClick={isLastQuestion ? handleSubmit : goToNextQuestion}
              disabled={submitting}
              style={{ ...primaryButtonStyle, opacity: submitting ? 0.72 : 1, justifySelf: 'start' }}
            >
              {submitting
                ? copy.submitting
                : isLastQuestion
                  ? selectedProfile
                  ? getTextByLanguage(selectedProfile.submitLabelZh, selectedProfile.submitLabel, language)
                  : copy.finishQuiz
                  : copy.nextQuestion}
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
