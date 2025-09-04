const translations = {
  'en': {
    title: 'AI Generated Novel',
    header: 'AI Generated Novel'
  },
  'zh-Hant': {
    title: 'AI生成小說',
    header: 'AI生成小說'
  },
  'zh-Hans': {
    title: 'AI生成小说',
    header: 'AI生成小说'
  },
  'ja': {
    title: 'AI生成小説',
    header: 'AI生成小説'
  }
};

function detectLanguage() {
  const lang = navigator.language || 'en';
  if (lang.startsWith('zh')) {
    if (lang.includes('TW') || lang.includes('HK') || lang.includes('MO') || lang.includes('Hant')) {
      return 'zh-Hant';
    }
    return 'zh-Hans';
  }
  if (lang.startsWith('ja')) {
    return 'ja';
  }
  return 'en';
}

function setLanguage(lang) {
  document.title = translations[lang].title;
  document.getElementById('header').innerText = translations[lang].header;
  fetch(`novels/novel_${lang}.txt`).then(r => r.text()).then(text => {
    document.getElementById('novel').innerText = text;
  });
  document.getElementById('language-selector').value = lang;
}

document.getElementById('language-selector').addEventListener('change', (e) => {
  setLanguage(e.target.value);
});

setLanguage(detectLanguage());
