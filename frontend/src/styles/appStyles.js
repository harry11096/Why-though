export const shellStyle = {
  minHeight: '100vh',
  background: 'var(--app-bg)',
  color: 'var(--text)',
  fontFamily:
    '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  padding: '28px 16px 48px',
  position: 'relative',
  overflow: 'hidden',
};

export const pageStyle = {
  maxWidth: 1180,
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
};

export const glassCardStyle = {
  background: 'var(--card-bg)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid var(--card-border)',
  boxShadow: 'var(--card-shadow)',
  borderRadius: 28,
};

export const inputStyle = {
  width: '100%',
  padding: '15px 16px',
  borderRadius: 14,
  border: '1px solid var(--input-border)',
  background: 'var(--input-bg)',
  boxSizing: 'border-box',
  fontSize: '0.98rem',
  color: 'var(--text)',
  outline: 'none',
  boxShadow: 'var(--input-inset-shadow)',
};

export const labelStyle = {
  display: 'grid',
  gap: 8,
};

export const fieldTitleStyle = {
  fontSize: '0.88rem',
  fontWeight: 600,
  color: 'var(--muted)',
};

export const primaryButtonStyle = {
  border: '1px solid var(--primary-bg)',
  borderRadius: 999,
  padding: '15px 18px',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '0.98rem',
  color: 'var(--primary-text)',
  background: 'var(--primary-bg)',
  boxShadow: 'var(--button-shadow)',
};

export const secondaryButtonStyle = {
  border: '1px solid var(--input-border)',
  borderRadius: 999,
  padding: '13px 18px',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '0.95rem',
  color: 'var(--text)',
  background: 'var(--secondary-bg)',
  backdropFilter: 'blur(20px)',
};

export const getThemeVariables = (themeMode) => {
  const isDark = themeMode === 'dark';

  // The app shell uses CSS variables so light/dark mode can switch without
  // threading theme props through every quiz component.
  return {
    '--app-bg': isDark
      ? 'linear-gradient(180deg, #111113 0%, #18181b 48%, #0b0b0d 100%)'
      : 'linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 48%, #eef1f5 100%)',
    '--text': isDark ? '#f5f5f7' : '#1d1d1f',
    '--muted': isDark ? '#a1a1aa' : '#6e6e73',
    '--card-bg': isDark ? 'rgba(28, 28, 30, 0.76)' : 'rgba(255, 255, 255, 0.78)',
    '--card-strong-bg': isDark ? 'rgba(36, 36, 38, 0.86)' : 'rgba(255, 255, 255, 0.88)',
    '--card-border': isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(29, 29, 31, 0.08)',
    '--card-shadow': isDark ? '0 22px 60px rgba(0, 0, 0, 0.42)' : '0 22px 60px rgba(0, 0, 0, 0.08)',
    '--input-bg': isDark ? 'rgba(44, 44, 46, 0.82)' : 'rgba(255, 255, 255, 0.82)',
    '--input-border': isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(29, 29, 31, 0.12)',
    '--input-inset-shadow': isDark
      ? 'inset 0 1px 0 rgba(255, 255, 255, 0.08)'
      : 'inset 0 1px 0 rgba(255, 255, 255, 0.55)',
    '--primary-bg': isDark ? '#f5f5f7' : '#1d1d1f',
    '--primary-text': isDark ? '#111113' : '#ffffff',
    '--secondary-bg': isDark ? 'rgba(44, 44, 46, 0.72)' : 'rgba(255, 255, 255, 0.72)',
    '--button-shadow': isDark ? '0 14px 34px rgba(0, 0, 0, 0.34)' : '0 14px 34px rgba(0, 0, 0, 0.16)',
    '--accent': isDark ? '#0a84ff' : '#007aff',
    '--accent-soft': isDark ? 'rgba(10, 132, 255, 0.16)' : 'rgba(0, 122, 255, 0.08)',
    '--auth-hero-bg': isDark
      ? 'linear-gradient(180deg, rgba(35, 35, 38, 0.94) 0%, rgba(20, 20, 22, 0.88) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(247,247,249,0.78) 100%)',
    '--auth-hero-border': isDark ? 'rgba(255, 255, 255, 0.13)' : 'rgba(29, 29, 31, 0.08)',
    '--auth-badge-bg': isDark ? 'rgba(10, 132, 255, 0.18)' : 'rgba(0, 122, 255, 0.08)',
    '--auth-badge-text': isDark ? '#8ecbff' : '#007aff',
    '--tab-rail-bg': isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(29, 29, 31, 0.05)',
    '--warning-bg': isDark ? 'rgba(146, 82, 16, 0.22)' : 'rgba(245,158,11,0.12)',
    '--warning-text': isDark ? '#fbbf24' : '#b45309',
  };
};


export const tabButton = (active) => ({
  flex: 1,
  border: 'none',
  borderRadius: 999,
  padding: '12px 14px',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '0.96rem',
  transition: 'all 180ms ease',
  background: active ? 'var(--card-strong-bg)' : 'transparent',
  color: active ? 'var(--text)' : 'var(--muted)',
  boxShadow: active ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
});

export const languageButton = (active) => ({
  border: 'none',
  borderRadius: 999,
  padding: '8px 12px',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '0.9rem',
  background: active ? 'var(--primary-bg)' : 'rgba(127,127,127,0.10)',
  color: active ? 'var(--primary-text)' : 'var(--muted)',
});

export const appAnimationStyles = `
  @keyframes systemPageBlink {
    0% { opacity: 0; transform: translateX(0); filter: brightness(1); }
    6% { opacity: 1; transform: translateX(-2px); filter: brightness(1.25) contrast(1.12); }
    14% { opacity: 0.92; transform: translateX(3px); filter: brightness(0.98) contrast(1.22); }
    24% { opacity: 1; transform: translateX(-1px); filter: brightness(1.18) contrast(1.1); }
    38% { opacity: 0.88; transform: translateX(2px); filter: brightness(1.05) contrast(1.28); }
    52% { opacity: 1; transform: translateX(0); filter: brightness(1.2) contrast(1.08); }
    68% { opacity: 0.34; transform: translateX(-1px); filter: brightness(1); }
    100% { opacity: 0; transform: translateX(0); filter: brightness(1); }
  }

  @keyframes systemNoticeBlink {
    0% { opacity: 0; transform: translateX(0) scale(0.98); }
    10% { opacity: 1; transform: translateX(-3px) scale(1); }
    18% { opacity: 0.78; transform: translateX(4px) scale(1); }
    30% { opacity: 1; transform: translateX(-1px) scale(1); }
    50% { opacity: 1; transform: translateX(2px) scale(1); }
    72% { opacity: 0; transform: translateX(0) scale(1.01); }
    100% { opacity: 0; transform: translateX(0) scale(1.01); }
  }

  @keyframes systemNoiseSlide {
    0% { transform: translateX(-8px); opacity: 0; }
    8% { transform: translateX(9px); opacity: 0.55; }
    22% { transform: translateX(-14px); opacity: 0.35; }
    40% { transform: translateX(12px); opacity: 0.5; }
    60% { transform: translateX(-6px); opacity: 0.25; }
    100% { transform: translateX(0); opacity: 0; }
  }
`;
