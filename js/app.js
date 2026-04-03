const portfolioData = [
    {
        title: "Интернет-магазин «Строп-Сибирь»",
        desc: "Высоконагруженный e-commerce с фильтрами. <br> Разработка html, css, js, php, Wordpress, Woocommerce",
        icon: "fas fa-store",
        link: "https://xn----btbub0agfgbeg3k.xn--p1ai/",
        external: true
    },
    {
        title: "Сайт Автопрокат-42",
        desc: "Аренда автомобилей. <br> Разработка html, css, js, php, Wordpress, Woocommerce.",
        icon: "fas fa-chart-line",
        link: "https://xn--42-6kcaj2c1aaiktg.xn--p1ai/",
        external: true
    },
    {
        title: "Сайт БТИ-19",
        desc: "Оффициальный сайт для ГУП РХ УТИ. <br> Разработка html, css, js, php, Wordpress.",
        icon: "fas fa-landmark",
        link: "https://bti19.ru/",
        external: true
    },
];

// Данные для Frontend
const frontendTech = [
    { icon: "fab fa-html5", name: "HTML5", desc: "Семантическая вёрстка" },
    { icon: "fab fa-css3-alt", name: "CSS3", desc: "Адаптивный дизайн" },
    { icon: "fab fa-less", name: "LESS", desc: "CSS препроцессор" },
    { icon: "fab fa-js", name: "JavaScript", desc: "ES6+, TypeScript" },
    { icon: "fab fa-react", name: "React", desc: "Frontend / SPA" },
    { icon: "fab fa-vuejs", name: "Vue.js", desc: "Frontend / SPA" }
];

// Данные для Backend
const backendTech = [
    { icon: "fab fa-node-js", name: "Node.js", desc: "Backend / Scripts" },
    { icon: "fab fa-python", name: "Python", desc: "Backend / AI / ML" },
    { icon: "fab fa-php", name: "PHP", desc: "Backend" },
    { icon: "fab fa-laravel", name: "Laravel", desc: "PHP Framework" },
    { icon: "fas fa-gem", name: "Ruby", desc: "Backend" },
    { icon: "fab fa-js", name: "Next.js", desc: "Full-stack / React" }
];

// Данные для Базы данных
const databaseTech = [
    { icon: "fas fa-database", name: "PostgreSQL", desc: "Объектно-реляционная БД" },
    { icon: "fas fa-database", name: "MySQL", desc: "Реляционная БД" },
    { icon: "fas fa-leaf", name: "MongoDB", desc: "NoSQL / Документо-ориентированная" },
    { icon: "fas fa-fire", name: "Redis", desc: "In-memory / Кэширование" },
    { icon: "fas fa-chart-line", name: "Elasticsearch", desc: "Поиск / Аналитика" },
    { icon: "fas fa-cloud", name: "Firebase", desc: "Realtime / Cloud" }
];

// Данные для CMS / Движки
const cmsTech = [
    { icon: "fab fa-wordpress", name: "WordPress", desc: "CMS / Блоги / Магазины" },
    { icon: "fab fa-drupal", name: "Drupal", desc: "Enterprise CMS" },
    { icon: "fab fa-joomla", name: "Joomla", desc: "CMS / Портал" },
    { icon: "fas fa-shopping-cart", name: "OpenCart", desc: "E-commerce платформа" },
    { icon: "fas fa-code-branch", name: "Modx", desc: "CMF / Конструктор сайтов" },
    { icon: "fas fa-cubes", name: "Yii", desc: "PHP Framework" }
];

function renderTechGrid(containerId, itemsArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = itemsArray.map(tech => `
      <div class="tech-item">
        <div class="tech-icon"><i class="${tech.icon}"></i></div>
        <h4>${tech.name}</h4>
        <p>${tech.desc}</p>
      </div>
    `).join('');
}

// Запуск отрисовки всех блоков
function renderAllTechStacks() {
    renderTechGrid('frontendGrid', frontendTech);
    renderTechGrid('backendGrid', backendTech);
    renderTechGrid('databaseGrid', databaseTech);
    renderTechGrid('cmsGrid', cmsTech);
}

function initTechTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Убираем активный класс у всех кнопок и контента
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Добавляем активный класс текущей кнопке и контенту
            btn.classList.add('active');
            const activeContent = document.getElementById(tabId);
            if (activeContent) activeContent.classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllTechStacks();
    initTechTabs();
});

const portfolioGrid = document.getElementById('portfolioGrid');
function buildPortfolio() {
    portfolioGrid.innerHTML = '';
    portfolioData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'portfolio-item reveal';
        card.innerHTML = `
        <div class="portfolio-img">
          <i class="${project.icon}"></i>
        </div>
        <div class="portfolio-info">
          <h3>${project.title}</h3>
          <p>${project.desc}</p>
          <a href="${project.link}" target="_blank" class="project-link">
            Посмотреть проект <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      `;
        portfolioGrid.appendChild(card);
    });
}
buildPortfolio();

const burger = document.getElementById('burgerMenu');
const navLinksEl = document.getElementById('navLinks');
burger.addEventListener('click', () => {
    navLinksEl.classList.toggle('show');
});

const navLinksA = document.querySelectorAll('.nav-link');
navLinksA.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinksEl.classList.remove('show');
        navLinksA.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Скролл
const sections = document.querySelectorAll('section');
const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
revealElements.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinksA.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMessage');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formMsg.innerHTML = '<span style="color:#2DD4BF;">Спасибо!!! Мы свяжемся с вами в ближайшее время.</span>';
    contactForm.reset();
    setTimeout(() => { formMsg.innerHTML = ''; }, 4000);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
            e.preventDefault();
            targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

document.querySelector('.nav-link[href="#home"]').classList.add('active');
window.dispatchEvent(new Event('scroll'));