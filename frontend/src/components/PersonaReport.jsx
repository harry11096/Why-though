import React from 'react';
import { UI_COPY } from '../data/uiCopy.js';
import { getLocalizedArray, getTextByLanguage } from '../lib/quizContent.js';
import { glassCardStyle } from '../styles/appStyles.js';

// Shared result view for fresh quiz submissions and historical attempts. It
// receives a resolved persona so the scoring logic stays outside the UI layer.
export default function PersonaReport({ persona, result, language, categoryTheme, label }) {
  return (
    <section
      style={{
        ...glassCardStyle,
        background: categoryTheme.cardBackground,
        border: categoryTheme.cardBorder,
        boxShadow: categoryTheme.shadow,
        padding: '32px 30px 34px',
        display: 'grid',
        gap: 18,
        maxWidth: 720,
      }}
    >
      <div style={{ color: categoryTheme.subtext, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ display: 'grid', gap: 6 }}>
        <div style={{ color: categoryTheme.accent, fontSize: '0.92rem', fontWeight: 700 }}>
          {persona.code}
        </div>
        <h3 style={{ margin: 0, fontSize: '2.6rem', letterSpacing: '-0.05em', color: categoryTheme.text }}>
          {getTextByLanguage(persona.titleZh || '', persona.titleEn || persona.title, language)}
        </h3>
      </div>
      <p style={{ margin: 0, color: categoryTheme.text, lineHeight: 1.8, fontSize: '1.05rem' }}>
        {getTextByLanguage(persona.note, persona.noteEn || persona.note, language)}
      </p>
      <div
        style={{
          padding: '16px 18px',
          borderRadius: 22,
          border: categoryTheme.cardBorder,
          background: categoryTheme.chipBackground,
          color: categoryTheme.text,
          lineHeight: 1.75,
        }}
      >
        {getTextByLanguage(persona.analysis, persona.analysisEn || persona.analysis, language)}
      </div>
      <div style={{ color: categoryTheme.text, lineHeight: 1.8 }}>
        <strong>{UI_COPY[language].scoreLabel}:</strong> {result.score} / {result.total}
      </div>
      <p style={{ margin: 0, color: categoryTheme.subtext, lineHeight: 1.8 }}>
        {getTextByLanguage(persona.verdict, persona.verdictEn || persona.verdict, language)}
      </p>
      {(() => {
        // Optional arrays let each category decide how detailed its report feels.
        const reportBody = getLocalizedArray(persona.reportBodyZh, persona.reportBodyEn, language);
        const traits = getLocalizedArray(persona.traitsZh, persona.traitsEn, language);
        const systemEvaluation = getLocalizedArray(persona.systemEvaluationZh, persona.systemEvaluationEn, language);
        const hiddenNote = getLocalizedArray(persona.hiddenNoteZh, persona.hiddenNoteEn, language);

        return (
          <>
            {reportBody.length ? (
              <div style={{ display: 'grid', gap: 12 }}>
                {reportBody.map((paragraph) => (
                  <p key={paragraph} style={{ margin: 0, color: categoryTheme.text, lineHeight: 1.85 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {traits.length ? (
              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: 22,
                  border: categoryTheme.cardBorder,
                  background: categoryTheme.chipBackground,
                  display: 'grid',
                  gap: 10,
                }}
              >
                <strong style={{ color: categoryTheme.text }}>
                  {language === 'zh' ? '人格特点' : 'Personality Traits'}
                </strong>
                <div style={{ display: 'grid', gap: 8 }}>
                  {traits.map((item) => (
                    <div key={item} style={{ color: categoryTheme.subtext, lineHeight: 1.7 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {systemEvaluation.length ? (
              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: 22,
                  border: categoryTheme.cardBorder,
                  background: categoryTheme.chipBackground,
                  display: 'grid',
                  gap: 10,
                }}
              >
                <strong style={{ color: categoryTheme.text }}>
                  {language === 'zh' ? '系统评价' : 'System Evaluation'}
                </strong>
                <div style={{ display: 'grid', gap: 8 }}>
                  {systemEvaluation.map((item) => (
                    <div key={item} style={{ color: categoryTheme.subtext, lineHeight: 1.7 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {hiddenNote.length ? (
              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: 22,
                  border: categoryTheme.cardBorder,
                  background: categoryTheme.chipBackground,
                  display: 'grid',
                  gap: 10,
                }}
              >
                <strong style={{ color: categoryTheme.text }}>
                  {language === 'zh' ? '隐藏说明' : 'Hidden Note'}
                </strong>
                <div style={{ display: 'grid', gap: 8 }}>
                  {hiddenNote.map((item) => (
                    <div key={item} style={{ color: categoryTheme.subtext, lineHeight: 1.7 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        );
      })()}
    </section>
  );
}
