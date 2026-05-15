import React from 'react';
import { glassCardStyle } from '../styles/appStyles.js';

export default function StatCard({ eyebrow, value, note, tint }) {
  return (
    <div
      style={{
        ...glassCardStyle,
        padding: '24px 24px 22px',
        background: tint,
      }}
    >
      <div style={{ color: 'var(--muted)', fontSize: '0.88rem', fontWeight: 600, marginBottom: 10 }}>
        {eyebrow}
      </div>
      <div style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.05em' }}>{value}</div>
      <div style={{ marginTop: 10, color: 'var(--muted)', lineHeight: 1.55 }}>{note}</div>
    </div>
  );
}
