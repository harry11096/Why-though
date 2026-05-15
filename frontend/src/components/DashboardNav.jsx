import React from 'react';
import { glassCardStyle, languageButton } from '../styles/appStyles.js';

// Compact navigation keeps the main dashboard minimal. It also holds language
// and theme controls after login so the header can stay visually calm.
export default function DashboardNav({
  activePanel,
  copy,
  language,
  navOpen,
  onLogout,
  onSelectPanel,
  setLanguage,
  setNavOpen,
  setThemeMode,
  themeMode,
}) {
  const navItems = [
    { id: 'home', icon: '⌂', label: language === 'zh' ? '主页' : 'Home' },
    { id: 'stats', icon: '◎', label: language === 'zh' ? '数据' : 'Stats' },
    { id: 'profile', icon: '◌', label: language === 'zh' ? '资料' : 'Profile' },
    { id: 'history', icon: '◷', label: language === 'zh' ? '历史' : 'History' },
  ];

  // The nav uses icon-first buttons because labels are supporting hints, not
  // the main visual structure of the dashboard.
  const navButton = (item) => ({
    width: '100%',
    border: '1px solid var(--card-border)',
    borderRadius: 18,
    padding: '12px 10px',
    display: 'grid',
    placeItems: 'center',
    gap: 6,
    cursor: 'pointer',
    background: activePanel === item.id ? 'var(--primary-bg)' : 'transparent',
    color: activePanel === item.id ? 'var(--primary-text)' : 'var(--muted)',
    fontWeight: 700,
  });

  const handleSelect = (panelId) => {
    onSelectPanel(panelId);
    setNavOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setNavOpen((current) => !current)}
        aria-label={language === 'zh' ? '打开导览' : 'Open navigation'}
        style={{
          ...glassCardStyle,
          width: 52,
          height: 52,
          borderRadius: 18,
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          position: 'absolute',
          top: -78,
          right: 0,
          zIndex: 3,
          color: 'var(--text)',
          fontSize: '1.35rem',
          fontWeight: 800,
        }}
      >
        {navOpen ? '×' : '☰'}
      </button>

      {navOpen ? (
        <aside
          style={{
            ...glassCardStyle,
            width: 92,
            padding: 12,
            display: 'grid',
            gap: 10,
            position: 'absolute',
            top: -16,
            right: 0,
            zIndex: 4,
          }}
        >
          <div style={{ display: 'grid', gap: 8, paddingBottom: 10, borderBottom: '1px solid var(--card-border)' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.72rem', fontWeight: 700, textAlign: 'center' }}>
              {copy.languageLabel}
            </span>
            <button onClick={() => setLanguage('zh')} style={languageButton(language === 'zh')}>
              中文
            </button>
            <button onClick={() => setLanguage('en')} style={languageButton(language === 'en')}>
              EN
            </button>
          </div>

          <div style={{ display: 'grid', gap: 8, paddingBottom: 10, borderBottom: '1px solid var(--card-border)' }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.72rem', fontWeight: 700, textAlign: 'center' }}>
              {copy.themeLabel}
            </span>
            <button onClick={() => setThemeMode('light')} style={languageButton(themeMode === 'light')}>
              {copy.lightMode}
            </button>
            <button onClick={() => setThemeMode('dark')} style={languageButton(themeMode === 'dark')}>
              {copy.darkMode}
            </button>
          </div>

          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleSelect(item.id)} title={item.label} style={navButton(item)}>
              <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: '0.72rem' }}>{item.label}</span>
            </button>
          ))}
          <button onClick={onLogout} title={copy.logout} style={{ ...navButton({ id: 'logout' }), marginTop: 10 }}>
            <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>↗</span>
            <span style={{ fontSize: '0.72rem' }}>{copy.logout}</span>
          </button>
        </aside>
      ) : null}
    </>
  );
}
