const novels = ['1', '2'];

const translations = {
  'en': {
    indexTitle: 'AI Novel Library',
    indexHeader: 'AI Novel Library',
    novels: {
      '1': 'Voyant',
      '2': 'The Last Bastion'
    }
  },
  'zh-Hant': {
    indexTitle: 'AI小說庫',
    indexHeader: 'AI小說庫',
    novels: {
      '1': '觀者',
      '2': '最後堡壘'
    }
  },
  'zh-Hans': {
    indexTitle: 'AI小说库',
    indexHeader: 'AI小说库',
    novels: {
      '1': '观者',
      '2': '最后堡垒'
    }
  },
  'ja': {
    indexTitle: 'AI小説ライブラリ',
    indexHeader: 'AI小説ライブラリ',
    novels: {
      '1': '観者',
      '2': '最後の砦'
    }
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

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  const novelId = document.body.dataset.novelId;
  if (novelId) {
    const title = translations[lang].novels[novelId];
    document.title = title;
    document.getElementById('header').innerText = title;
    fetch(`${novelId}_${lang}.txt`).then(r => r.text()).then(text => {
      document.getElementById('novel').innerText = text;
    });
  } else {
    document.title = translations[lang].indexTitle;
    document.getElementById('header').innerText = translations[lang].indexHeader;
    const list = document.getElementById('novel-list');
    list.innerHTML = '';
    novels.forEach(id => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `novels/${id}/${id}.html`;
      a.textContent = translations[lang].novels[id];
      li.appendChild(a);
      list.appendChild(li);
    });
  }
  const selector = document.getElementById('language-selector');
  if (selector) {
    selector.value = lang;
  }
}

const defaultLang = detectLanguage();
const savedLang = getCookie('lang');
const initialLang = savedLang || defaultLang;
setLanguage(initialLang);

const selector = document.getElementById('language-selector');
selector.addEventListener('change', (e) => {
  const lang = e.target.value;
  setLanguage(lang);
  if (lang !== defaultLang) {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
  } else {
    document.cookie = 'lang=; path=/; max-age=0';
  }
});
