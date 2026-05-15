import { CATEGORY_PROFILES } from '../data/categoryProfiles.js';

// Content helpers centralize category lookup, localization, theme selection, and
// persona scoring so React components can stay mostly presentational.
export const normalizeCategory = (value = '') => value.trim().toLowerCase();

export const getCategoryProfile = (category = '') =>
  CATEGORY_PROFILES.find((profile) =>
    profile.matches.some((entry) => normalizeCategory(entry) === normalizeCategory(category))
  ) || null;

export const getDepartmentOrder = (profile) => {
  if (!profile?.departmentCode) {
    return Number.MAX_SAFE_INTEGER;
  }

  const match = profile.departmentCode.match(/(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

export const getTextByLanguage = (zh, en, language) => {
  if (language === 'zh') {
    return zh || en || '';
  }

  return en || zh || '';
};

export const getLocalizedQuestionText = (question, language) => {
  if (language === 'zh') {
    return question.textZh || question.text || question.textEn || '';
  }

  return question.textEn || question.text || question.textZh || '';
};

export const getLocalizedOptions = (question, language) => {
  if (language === 'zh' && Array.isArray(question.optionsZh) && question.optionsZh.length === 4) {
    return question.optionsZh;
  }

  if (language === 'en' && Array.isArray(question.optionsEn) && question.optionsEn.length === 4) {
    return question.optionsEn;
  }

  return question.options || [];
};

export const replaceParam = (template, key, value) => template.replace(`{${key}}`, value);

export const getLocalizedArray = (zh, en, language) => {
  if (language === 'zh') {
    return Array.isArray(zh) && zh.length ? zh : Array.isArray(en) ? en : [];
  }

  return Array.isArray(en) && en.length ? en : Array.isArray(zh) ? zh : [];
};

export const SYSTEM_INTERSTITIAL_NOTICES = {
  zh: [
    '你还在做。',
    '不是所有人都会做到这里。',
    '停留时间已记录。',
    '你开始认真了。',
    '记录成功。',
    '继续。',
  ],
  en: [
    'You are still doing this.',
    'Not everyone makes it this far.',
    'Time on page recorded.',
    'You started taking this seriously.',
    'Recorded.',
    'You still have not left.',
    'Continue.',
  ],
};

export const getSystemNotices = (language) => SYSTEM_INTERSTITIAL_NOTICES[language] || SYSTEM_INTERSTITIAL_NOTICES.en;

// Category themes preserve each department's identity while still respecting
// the global light/dark mode.
export const getCategoryTheme = (profile, themeMode = 'light') => {
  const isDark = themeMode === 'dark';

  if (profile?.theme === 'observation') {
    return {
      accent: isDark ? '#ff6961' : '#d70015',
      accentSoft: isDark ? 'rgba(255, 105, 97, 0.13)' : 'rgba(215, 0, 21, 0.08)',
      text: isDark ? '#f5f5f7' : '#1d1d1f',
      subtext: isDark ? '#b8b8bd' : '#6e6e73',
      cardBackground: isDark
        ? 'linear-gradient(180deg, rgba(34,28,30,0.94) 0%, rgba(22,22,24,0.92) 100%)'
        : 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,246,246,0.86) 100%)',
      cardBorder: isDark ? '1px solid rgba(255,105,97,0.16)' : '1px solid rgba(215,0,21,0.12)',
      chipBackground: isDark ? 'rgba(255,105,97,0.08)' : 'rgba(215,0,21,0.05)',
      chipBorder: isDark ? '1px solid rgba(255,105,97,0.14)' : '1px solid rgba(215,0,21,0.12)',
      optionActive: isDark ? 'rgba(255,105,97,0.16)' : 'rgba(255,228,230,0.88)',
      optionBorder: isDark ? '1px solid rgba(255,255,255,0.11)' : '1px solid rgba(15,23,42,0.10)',
      shadow: isDark ? '0 22px 54px rgba(0,0,0,0.36)' : '0 18px 42px rgba(215, 0, 21, 0.08)',
    };
  }

  if (profile?.theme === 'cosmic') {
    return {
      accent: isDark ? '#c084fc' : '#7e22ce',
      accentSoft: isDark ? 'rgba(192, 132, 252, 0.13)' : 'rgba(126, 34, 206, 0.08)',
      text: isDark ? '#f5f3ff' : '#20142d',
      subtext: isDark ? '#c4b5fd' : '#6b5a78',
      cardBackground: isDark
        ? 'linear-gradient(180deg, rgba(35,28,46,0.94) 0%, rgba(20,18,26,0.92) 100%)'
        : 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(247,241,255,0.88) 100%)',
      cardBorder: isDark ? '1px solid rgba(192,132,252,0.16)' : '1px solid rgba(126,34,206,0.14)',
      chipBackground: isDark ? 'rgba(192,132,252,0.08)' : 'rgba(126,34,206,0.06)',
      chipBorder: isDark ? '1px solid rgba(192,132,252,0.14)' : '1px solid rgba(126,34,206,0.14)',
      optionActive: isDark ? 'rgba(192,132,252,0.16)' : 'rgba(243,232,255,0.92)',
      optionBorder: isDark ? '1px solid rgba(255,255,255,0.11)' : '1px solid rgba(126,34,206,0.12)',
      shadow: isDark ? '0 22px 54px rgba(0,0,0,0.36)' : '0 22px 48px rgba(126, 34, 206, 0.10)',
    };
  }

  if (profile?.theme === 'internet') {
    return {
      accent: isDark ? '#64d2ff' : '#007aff',
      accentSoft: isDark ? 'rgba(100, 210, 255, 0.12)' : 'rgba(0, 122, 255, 0.08)',
      text: isDark ? '#f1f8ff' : '#0b1b34',
      subtext: isDark ? '#a9bed1' : '#526272',
      cardBackground: isDark
        ? 'linear-gradient(180deg, rgba(23,31,40,0.94) 0%, rgba(16,20,26,0.92) 100%)'
        : 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(239,248,255,0.88) 100%)',
      cardBorder: isDark ? '1px solid rgba(100,210,255,0.15)' : '1px solid rgba(0,122,255,0.14)',
      chipBackground: isDark ? 'rgba(100,210,255,0.075)' : 'rgba(0,122,255,0.06)',
      chipBorder: isDark ? '1px solid rgba(100,210,255,0.13)' : '1px solid rgba(0,122,255,0.14)',
      optionActive: isDark ? 'rgba(100,210,255,0.15)' : 'rgba(219,234,254,0.92)',
      optionBorder: isDark ? '1px solid rgba(255,255,255,0.11)' : '1px solid rgba(0,122,255,0.12)',
      shadow: isDark ? '0 22px 54px rgba(0,0,0,0.36)' : '0 22px 48px rgba(0, 122, 255, 0.10)',
    };
  }

  if (profile?.theme === 'system') {
    return {
      accent: isDark ? '#f5f5f7' : '#1d1d1f',
      accentSoft: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(29, 29, 31, 0.06)',
      text: isDark ? '#f5f5f7' : '#1d1d1f',
      subtext: isDark ? '#a1a1aa' : '#6e6e73',
      cardBackground: isDark
        ? 'linear-gradient(180deg, rgba(35,35,37,0.94) 0%, rgba(22,22,24,0.92) 100%)'
        : 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,246,247,0.92) 100%)',
      cardBorder: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(29,29,31,0.12)',
      chipBackground: isDark ? 'rgba(255,255,255,0.055)' : 'rgba(29,29,31,0.035)',
      chipBorder: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(29,29,31,0.10)',
      optionActive: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(29,29,31,0.10)',
      optionBorder: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(29,29,31,0.10)',
      shadow: isDark ? '0 22px 54px rgba(0,0,0,0.36)' : '0 18px 44px rgba(0, 0, 0, 0.08)',
    };
  }

  return {
    accent: isDark ? '#5de6ff' : '#00a6d6',
    accentSoft: isDark ? 'rgba(93,230,255,0.12)' : 'rgba(0,166,214,0.08)',
    text: isDark ? '#edfaff' : '#102027',
    subtext: isDark ? '#a5bec7' : '#61727c',
    cardBackground: isDark
      ? 'linear-gradient(180deg, rgba(21,31,35,0.94) 0%, rgba(16,20,22,0.92) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(235,250,255,0.86) 100%)',
    cardBorder: isDark ? '1px solid rgba(93,230,255,0.14)' : '1px solid rgba(0,166,214,0.14)',
    chipBackground: isDark ? 'rgba(93,230,255,0.075)' : 'rgba(0,166,214,0.06)',
    chipBorder: isDark ? '1px solid rgba(93,230,255,0.13)' : '1px solid rgba(0,166,214,0.14)',
    optionActive: isDark ? 'rgba(93,230,255,0.15)' : 'rgba(207,250,254,0.88)',
    optionBorder: isDark ? '1px solid rgba(255,255,255,0.11)' : '1px solid rgba(0,166,214,0.12)',
    shadow: isDark ? '0 22px 54px rgba(0,0,0,0.36)' : '0 22px 48px rgba(0, 166, 214, 0.10)',
  };
};

export const getPersonaResult = (result, category, language) => {
  const ratio = result.total ? result.score / result.total : 0;
  const profile = getCategoryProfile(category);

  // Each known category owns its own scoring bands, so result writing can stay
  // tailored without branching inside the quiz UI.
  if (profile) {
    return profile.scoreBands.find((band) => ratio <= band.max) || profile.scoreBands[profile.scoreBands.length - 1];
  }

  if (ratio < 0.2) {
    return {
      code: 'S-00',
      title: 'Steel Plate',
      note: 'The questions touched nothing. Your mind remained completely unstirred.',
      analysis:
        'You carry the rare ability to look directly at pointless information and refuse emotional involvement. Admirable. Slightly alarming.',
      verdict: 'You are the kind of person who opens the fridge, forgets why, and still leaves with dignity.',
    };
  }

  if (ratio < 0.45) {
    return {
      code: 'L-14',
      title: 'Late Reactor',
      note: 'You were unconvinced at first, then quietly started participating.',
      analysis:
        'Your responses suggest a cautious relationship with absurdity. You resist nonsense until it becomes strangely personal.',
      verdict: 'You are the kind of person who says “one more question” and then notices it is somehow 1:17 AM.',
    };
  }

  if (ratio < 0.7) {
    return {
      code: 'C-27',
      title: 'Concernedly Curious',
      note: 'You know more than you should, but not enough to feel safe.',
      analysis:
        'Your profile indicates healthy curiosity, mild damage from internet culture, and an unsettling tolerance for useless facts.',
      verdict: `You are the kind of person who treats ${category || 'trivia'} as a personality event.`,
    };
  }

  if (ratio < 0.9) {
    return {
      code: 'B-88',
      title: 'Brainrot Scholar',
      note: 'You answered with confidence no responsible adult should have.',
      analysis:
        'The system detects strong pattern recognition, high joke absorption, and a suspiciously developed memory for information with no practical value.',
      verdict: 'You are the kind of person who laughs once, remembers forever, and cannot explain either.',
    };
  }

  return {
    code: 'O-∞',
    title: 'Absurd Oracle',
    note: 'At this point the test may be learning from you.',
    analysis:
      'Your score suggests full synchronisation with the emotional logic of pointless knowledge. You did not simply play the quiz. You understood its intentions.',
    verdict: 'You are the kind of person who gets a fake personality result and somehow makes it feel medically true.',
  };
};
