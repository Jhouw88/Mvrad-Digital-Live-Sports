const translations = {
  en: {
    title: 'Mvrad Digital Live Sports',
    subtitle: 'Official free sports streams in one place.',
    install: 'Install in Stremio',
  },
  az: {
    title: 'Mvrad Digital Live Sports',
    subtitle: 'Rəsmi pulsuz canlı idman yayımları bir yerdə.',
    install: 'Stremio-da quraşdır',
  },
};

const lang = navigator.language.startsWith('az') ? 'az' : 'en';
const t = translations[lang];

if (t) {
  document.title = t.title;
  document.querySelector('h1').textContent = t.title;
  document.querySelector('p').textContent = t.subtitle;
  document.getElementById('install-link').textContent = t.install;
}
