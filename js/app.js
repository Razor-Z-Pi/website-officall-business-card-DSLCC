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
    { icon: "./image/icon/html5-original.svg", name: "HTML5", desc: "Семантическая вёрстка" },
    { icon: "./image/icon/css3-original.svg", name: "CSS3", desc: "Адаптивный дизайн" },
    { icon: "./image/icon/tailwindcss-original.svg", name: "Tailwind CSS", desc: "CSS-фреймворк" },
    { icon: "./image/icon/bootstrap-original.svg", name: "Bootstrap", desc: "CSS-библиотека" },
    { icon: "./image/icon/less-plain-wordmark.svg", name: "LESS", desc: "CSS препроцессор" },
    { icon: "./image/icon/sass-original.svg", name: "SASS", desc: "CSS препроцессор" },
    { icon: "./image/icon/", name: "SCSS", desc: "CSS препроцессор" },
    { icon: "./image/icon/javascript-original.svg", name: "JavaScript", desc: "ES6+, автоматизация, скрипты, интерактивность" },
    { icon: "./image/icon/jquery-original.svg", name: "jQuery", desc: "Cкрипты, автоматизация, интерактивность" },
    { icon: "./image/icon/typescript-original.svg", name: "TypeScript", desc: "Frontend" },
    { icon: "./image/icon/react-original-wordmark.svg", name: "React", desc: "Frontend / SPA" },
    { icon: "./image/icon/redux-original.svg", name: "Redax", desc: "Управления состоянием приложения" },
    { icon: "./image/icon/vuejs-original.svg", name: "Vue.js", desc: "Frontend / SPA" },
    { icon: "./image/icon/", name: "Vuex", desc: "Управления состоянием приложения" },
    { icon: "./image/icon/backbonejs-original.svg", name: "Backbone.js", desc: "Frontend" },
];

// Данные для Backend
const backendTech = [
    { icon: "./image/icon/php-original.svg", name: "PHP", desc: "Backend, плагины, скрипты" },
    { icon: "./image/icon/python-original.svg", name: "Python", desc: "Backend / скрипты / боты / анализ данных, автоматизация" },
    { icon: "./image/icon/ruby-original.svg", name: "Ruby", desc: "Backend" },
    { icon: "./image/icon/csharp-original.svg", name: "C#", desc: "Backend" },
    { icon: "./image/icon/laravel-original.svg", name: "Laravel", desc: "PHP Framework" },
    { icon: "./image/icon/yii-original.svg", name: "Yii", desc: "PHP Framework" },
    { icon: "./image/icon/nodejs-original.svg", name: "Node.js", desc: "Backend / Scripts" },
    { icon: "./image/icon/nextjs-line.svg", name: "Next.js", desc: "Full-stack / React" },

];

// Данные для Базы данных
const databaseTech = [
    { icon: "./image/icon/postgresql-original.svg", name: "PostgreSQL", desc: "Объектно-реляционная БД" },
    { icon: "./image/icon/mysql-original-wordmark.svg", name: "MySQL", desc: "Реляционная БД" },
    { icon: "./image/icon/mariadb-original-wordmark", name: "MariaDB", desc: "Реляционная БД" },
    { icon: "./image/icon/", name: "MSSQLServer", desc: "Реляционная БД" },
    { icon: "./image/icon/mongodb-original.svg", name: "MongoDB", desc: "NoSQL / Документо-ориентированная" },
    { icon: "./image/icon/redis-original.svg", name: "Redis", desc: "In-memory / Кэширование" },
    { icon: "./image/icon/cassandra-original.svg", name: "Cassandra", desc: "СУБД / NoSQL-система" },
];

// Данные для CMS / Движки / Конструкторы / Сервера
const cmsTech = [
    { icon: "./image/icon/wordpress-original.svg", name: "WordPress", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/woocommerce-original.svg", name: "WooCommerce", desc: "Инструмент в электронной коммерции" },
    { icon: "./image/icon/", name: "1С-Битрикс", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/", name: "UMI.CMS", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/", name: "OctoberCMS", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/", name: "HostCMS", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/", name: "NetCat CMS", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/drupal-original.svg", name: "Drupal", desc: "Enterprise CMS" },
    { icon: "./image/icon/", name: "Joomla", desc: "CMS / Портал" },
    { icon: "./image/icon/", name: "OpenCart", desc: "E-commerce платформа" },
    { icon: "./image/icon/magento-line-wordmark.svg", name: "Magento", desc: "E-commerce платформа" },
    { icon: "./image/icon/modx-original.svg", name: "Modx", desc: "CMF / Конструктор сайтов" },
    { icon: "./image/icon/", name: "phpBB", desc: "Конструктор веб-форум" },
];

function renderTechGrid(containerId, itemsArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = itemsArray.map(tech => `
      <div class="tech-item">
        <div class="tech-icon"><img src="${tech.icon}"></img></div>
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