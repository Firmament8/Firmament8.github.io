const languageButton = document.querySelector('.language-toggle');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const translatedElements = document.querySelectorAll('[data-cn][data-en]');
let language = localStorage.getItem('portfolio-language') || 'cn';

function applyLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language === 'cn' ? 'zh-CN' : 'en';
  translatedElements.forEach((element) => {
    element.textContent = element.dataset[language];
  });
  languageButton.innerHTML = language === 'cn'
    ? '<span class="lang-active">中</span><span>EN</span>'
    : '<span>中</span><span class="lang-active">EN</span>';
  languageButton.setAttribute('aria-label', language === 'cn' ? 'Switch to English' : '切换至中文');
  localStorage.setItem('portfolio-language', language);
}

languageButton.addEventListener('click', () => applyLanguage(language === 'cn' ? 'en' : 'cn'));

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const sectionLinks = [...navLinks.querySelectorAll('a')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  sectionLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .2, .5] });

observedSections.forEach((section) => sectionObserver.observe(section));
document.getElementById('year').textContent = new Date().getFullYear();
applyLanguage(language);
window.addEventListener('DOMContentLoaded', () => window.lucide?.createIcons());
