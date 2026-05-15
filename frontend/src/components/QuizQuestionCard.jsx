import React from 'react';
import {
  getLocalizedOptions,
  getLocalizedQuestionText,
  replaceParam,
} from '../lib/quizContent.js';
import { glassCardStyle } from '../styles/appStyles.js';

// Renders a single question at a time. The parent owns navigation so this card
// can stay focused on localized question text and answer selection.
export default function QuizQuestionCard({
  answers,
  categoryTheme,
  copy,
  currentQuestion,
  currentQuestionIndex,
  language,
  onChooseAnswer,
  questions,
}) {
  if (!currentQuestion) {
    return null;
  }

  return (
    <div
      key={currentQuestion._id}
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
      <div style={{ color: categoryTheme.subtext, fontWeight: 600 }}>
        {replaceParam(copy.questionLabel, 'number', String(currentQuestionIndex + 1))} / {questions.length}
      </div>
      <div style={{ fontSize: '1.3rem', fontWeight: 700, lineHeight: 1.5, color: categoryTheme.text }}>
        {getLocalizedQuestionText(currentQuestion, language)}
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {getLocalizedOptions(currentQuestion, language).map((option, optionIndex) => {
          const active = answers[currentQuestion._id] === optionIndex;

          return (
            <button
              key={`${currentQuestion._id}-${optionIndex}`}
              onClick={() => onChooseAnswer(currentQuestion._id, optionIndex)}
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
  );
}
