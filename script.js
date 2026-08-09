const languageButton = document.querySelector('.language-toggle');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const translatedElements = document.querySelectorAll('[data-cn][data-en]');
let language = localStorage.getItem('portfolio-language') || 'en';

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
const awardImages = [
  ['national-road.jpg', 'national-logistics.jpg', 'national-model.png', 'national-aigc.jpg', 'national-ai-creative.jpg', 'national-warehouse.jpg'],
  ['provincial-road.jpg', 'provincial-engineering.png', 'provincial-internet-plus.jpg', 'provincial-aigc.jpg', 'provincial-model-2023.jpg', 'provincial-logistics.png', 'provincial-warehouse.jpg', 'provincial-model-2022.png', 'provincial-pioneer.png', 'provincial-creative.png', 'provincial-robot-ai.png', 'provincial-gold-seed.png']
];
document.querySelectorAll('.award-group').forEach((group, groupIndex) => {
  const list = group.querySelector('.award-list');
  const rank = (item) => {
    const text = item.textContent;
    if (text.includes('一等奖') || text.includes('1st Prize')) return 1;
    if (text.includes('二等奖') || text.includes('2nd Prize')) return 2;
    if (text.includes('三等奖') || text.includes('3rd Prize')) return 3;
    return 4;
  };
  [...list.children].sort((a, b) => rank(a) - rank(b)).forEach((item) => list.appendChild(item));
  [...list.children].forEach((item, index) => {
    item.dataset.awardImage = `assets/awards/${awardImages[groupIndex][index]}`;
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    const thumbnail = document.createElement('img');
    thumbnail.className = 'award-thumbnail';
    thumbnail.src = item.dataset.awardImage;
    thumbnail.alt = '获奖证书缩略图';
    thumbnail.loading = 'lazy';
    item.appendChild(thumbnail);
  });
});
const awardModal = document.querySelector('[data-award-modal]');
const awardImage = document.querySelector('[data-award-modal-image]');
document.querySelectorAll('.award-list li').forEach((item) => {
  const openAward = () => { awardImage.src = item.dataset.awardImage; awardModal.showModal(); };
  item.addEventListener('click', openAward);
  item.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openAward(); } });
});
document.querySelector('[data-award-close]').addEventListener('click', () => awardModal.close());
const wechatModal = document.querySelector('[data-wechat-modal]');
document.querySelector('[data-wechat-open]').addEventListener('click', () => wechatModal.showModal());
document.querySelector('[data-wechat-close]').addEventListener('click', () => wechatModal.close());
window.addEventListener('DOMContentLoaded', () => window.lucide?.createIcons());
