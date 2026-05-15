import { CATEGORY_PROFILES } from '../data/categoryProfiles.js';

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
    '系统已记录你的进入时间。',
    '正在分析你的停留意愿。',
    '正在判断你是否意识到异常。',
    '系统正在记录……',
    '请继续。你已经开始了。',
  ],
  en: [
    'The system has recorded your entry time.',
    'Analyzing your willingness to remain.',
    'Determining whether you have noticed the abnormality.',
    'The system is recording…',
    'Please continue. You have already begun.',
  ],
};

export const getSystemNotices = (language) => SYSTEM_INTERSTITIAL_NOTICES[language] || SYSTEM_INTERSTITIAL_NOTICES.en;

export const getScanlineOverlay = (borderRadius = 24) => ({
  position: 'absolute',
  inset: 0,
  borderRadius,
  backgroundImage:
    'repeating-linear-gradient(180deg, rgba(255,255,255,0.00) 0px, rgba(255,255,255,0.00) 8px, rgba(255,255,255,0.035) 9px, rgba(255,255,255,0.00) 10px)',
  opacity: 0.22,
  pointerEvents: 'none',
  mixBlendMode: 'screen',
});

export const getCategoryTheme = (profile) => {
  if (profile?.theme === 'observation') {
    return {
      accent: '#d70015',
      accentSoft: 'rgba(215, 0, 21, 0.08)',
      text: '#1d1d1f',
      subtext: '#6e6e73',
      cardBackground: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,246,246,0.86) 100%)',
      cardBorder: '1px solid rgba(215,0,21,0.12)',
      chipBackground: 'rgba(215,0,21,0.05)',
      chipBorder: '1px solid rgba(215,0,21,0.12)',
      optionActive: 'rgba(255,228,230,0.88)',
      optionBorder: '1px solid rgba(15,23,42,0.10)',
      shadow: '0 18px 42px rgba(215, 0, 21, 0.08)',
    };
  }

  if (profile?.theme === 'cosmic') {
    return {
      accent: '#7e22ce',
      accentSoft: 'rgba(126, 34, 206, 0.08)',
      text: '#20142d',
      subtext: '#6b5a78',
      cardBackground: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(247,241,255,0.88) 100%)',
      cardBorder: '1px solid rgba(126,34,206,0.14)',
      chipBackground: 'rgba(126,34,206,0.06)',
      chipBorder: '1px solid rgba(126,34,206,0.14)',
      optionActive: 'rgba(243,232,255,0.92)',
      optionBorder: '1px solid rgba(126,34,206,0.12)',
      shadow: '0 22px 48px rgba(126, 34, 206, 0.10)',
    };
  }

  if (profile?.theme === 'internet') {
    return {
      accent: '#007aff',
      accentSoft: 'rgba(0, 122, 255, 0.08)',
      text: '#0b1b34',
      subtext: '#526272',
      cardBackground: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(239,248,255,0.88) 100%)',
      cardBorder: '1px solid rgba(0,122,255,0.14)',
      chipBackground: 'rgba(0,122,255,0.06)',
      chipBorder: '1px solid rgba(0,122,255,0.14)',
      optionActive: 'rgba(219,234,254,0.92)',
      optionBorder: '1px solid rgba(0,122,255,0.12)',
      shadow: '0 22px 48px rgba(0, 122, 255, 0.10)',
    };
  }

  if (profile?.theme === 'system') {
    return {
      accent: '#f87171',
      accentSoft: 'rgba(248, 113, 113, 0.12)',
      text: '#fafafa',
      subtext: '#b4b4b8',
      cardBackground: 'linear-gradient(180deg, rgba(8,8,10,0.98) 0%, rgba(2,2,4,0.96) 100%)',
      cardBorder: '1px solid rgba(255,255,255,0.10)',
      chipBackground: 'rgba(255,255,255,0.03)',
      chipBorder: '1px solid rgba(248,113,113,0.18)',
      optionActive: 'rgba(80,14,20,0.62)',
      optionBorder: '1px solid rgba(255,255,255,0.11)',
      shadow: '0 28px 68px rgba(0, 0, 0, 0.52)',
    };
  }

  return {
    accent: '#00a6d6',
    accentSoft: 'rgba(0,166,214,0.08)',
    text: '#102027',
    subtext: '#61727c',
    cardBackground: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(235,250,255,0.86) 100%)',
    cardBorder: '1px solid rgba(0,166,214,0.14)',
    chipBackground: 'rgba(0,166,214,0.06)',
    chipBorder: '1px solid rgba(0,166,214,0.14)',
    optionActive: 'rgba(207,250,254,0.88)',
    optionBorder: '1px solid rgba(0,166,214,0.12)',
    shadow: '0 22px 48px rgba(0, 166, 214, 0.10)',
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
