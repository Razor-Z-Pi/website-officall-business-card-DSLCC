const portfolioData = [
    {
        title: "Интернет-магазин «Строп-Сибирь»",
        desc: "Высоконагруженный e-commerce с фильтрами. <br> Разработка html, css, js, php, WordPress, Woocommerce",
        icon: "./image/project/strop.png",
        link: "https://xn----btbub0agfgbeg3k.xn--p1ai/",
        external: true
    },
    {
        title: "Сайт Автопрокат-42",
        desc: "Аренда автомобилей. <br> Разработка html, css, js, php, WordPress, Woocommerce.",
        icon: "./image/project/autopr.png",
        link: "https://xn--42-6kcaj2c1aaiktg.xn--p1ai/",
        external: true
    },
    {
        title: "Сайт БТИ-19",
        desc: "Оффициальный сайт для ГУП РХ УТИ. <br> Разработка html, css, js, php, WordPress.",
        icon: "./image/project/bti19.png",
        link: "https://bti19.ru/",
        external: true
    },
    {
        title: "Сайт Сервис-центр «Админ»",
        desc: "Оффициальный сайт для Сервис-центра «Админ». <br> Разработка html, css, js",
        icon: "./image/project/admin-center.png",
        link: "https://scadmin.ru/",
        external: true
    },
    {
        title: "Сайт «Сибиряк»",
        desc: "Оффициальный сайт для МБУ ДО СШ «Сибиряк». <br> Разработка WordPress",
        icon: "./image/project/Sibir.png",
        link: "https://sibiryak19.ru/",
        external: true
    },
    {
        title: "Сайт «Колосок»",
        desc: "Оффициальный сайт для детского сайта «Колосок». <br> Разработка WordPress",
        icon: "./image/project/Colosok.png",
        link: "https://dou.dskolosok.ru/",
        external: true
    },
    {
        title: "Сайт «Рябинка»",
        desc: "Оффициальный сайт для детского сайта «Рябинка». <br> Разработка WordPress",
        icon: "./image/project/Ribinka.png",
        link: "https://dsryabinka.ru/",
        external: true
    },
    {
        title: "Сайт Клиника-Титова.рф",
        desc: "Оффициальный сайт для медицинской клиники. <br> Разработка WordPress",
        icon: "./image/project/Medic-Titov.png",
        link: "https://xn----7sbbh1aaclchxr4cb.xn--p1ai/",
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
    { icon: "./image/icon/scss.webp", name: "SCSS", desc: "CSS препроцессор" },
    { icon: "./image/icon/javascript-original.svg", name: "JavaScript", desc: "ES6+, автоматизация, скрипты, интерактивность" },
    { icon: "./image/icon/jquery-original.svg", name: "jQuery", desc: "Cкрипты, автоматизация, интерактивность" },
    { icon: "./image/icon/typescript-original.svg", name: "TypeScript", desc: "Frontend / API" },
    { icon: "./image/icon/react-original-wordmark.svg", name: "React", desc: "Frontend / SPA" },
    { icon: "./image/icon/redux-original.svg", name: "Redax", desc: "Управления состоянием приложения" },
    { icon: "./image/icon/vuejs-original.svg", name: "Vue.js", desc: "Frontend / SPA" },
    { icon: "./image/icon/vuex.png", name: "Vuex", desc: "Управления состоянием приложения" },
    { icon: "./image/icon/backbonejs-original.svg", name: "Backbone.js", desc: "Frontend" },
];

// Данные для Backend
const backendTech = [
    { icon: "./image/icon/php-original.svg", name: "PHP", desc: "Backend, плагины, скрипты" },
    { icon: "./image/icon/python-original.svg", name: "Python", desc: "Backend / скрипты / боты / анализ данных / автоматизация" },
    { icon: "./image/icon/ruby-original.svg", name: "Ruby", desc: "Backend" },
    { icon: "./image/icon/csharp-original.svg", name: "C#", desc: "Backend" },
    { icon: "./image/icon/laravel-original.svg", name: "Laravel", desc: "Full-stack / PHP Framework" },
    { icon: "./image/icon/yii-original.svg", name: "Yii", desc: "Full-stack / PHP Framework" },
    { icon: "./image/icon/nodejs-original.svg", name: "Node.js", desc: "Backend / Scripts" },
    { icon: "./image/icon/nextjs-original.svg", name: "Next.js", desc: "Full-stack / React" },
    { icon: "./image/icon/django-plain.svg", name: "Django", desc: "Full-stack / Python Framework" },
    { icon: "./image/icon/flask-original.svg", name: "Flask", desc: "Full-stack / Python Framework" },

];

// Данные для Базы данных
const databaseTech = [
    { icon: "./image/icon/postgresql-original.svg", name: "PostgreSQL", desc: "Объектно-реляционная БД" },
    { icon: "./image/icon/mysql-original-wordmark.svg", name: "MySQL", desc: "Реляционная БД" },
    { icon: "./image/icon/mariadb-original-wordmark.svg", name: "MariaDB", desc: "Реляционная БД" },
    { icon: "./image/icon/microsoft-sql-server.svg", name: "MSSQLServer", desc: "Реляционная БД" },
    { icon: "./image/icon/mongodb-original.svg", name: "MongoDB", desc: "NoSQL / Документо-ориентированная" },
    { icon: "./image/icon/redis-original.svg", name: "Redis", desc: "In-memory / Кэширование" },
    { icon: "./image/icon/cassandra-original.svg", name: "Cassandra", desc: "СУБД / NoSQL-система" },
];

// Данные для CMS / Движки / Конструкторы / Сервера
const cmsTech = [
    { icon: "./image/icon/wordpress-original.svg", name: "WordPress", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/woocommerce-original.svg", name: "WooCommerce", desc: "Инструмент в электронной коммерции" },
    { icon: "./image/icon/1c_bitrix.png", name: "1С-Битрикс", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/umi-cms.png", name: "UMI.CMS", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/OcteberCMS.png", name: "OctoberCMS", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/Host_CMS.png", name: "HostCMS", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/Netcat_logo.png", name: "NetCat CMS", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/drupal-original.svg", name: "Drupal", desc: "Enterprise CMS" },
    { icon: "./image/icon/joomla.png", name: "Joomla", desc: "CMS / Портал" },
    { icon: "./image/icon/opencart.svg", name: "OpenCart", desc: "E-commerce платформа" },
    { icon: "./image/icon/magento-line-wordmark.svg", name: "Magento", desc: "E-commerce платформа" },
    { icon: "./image/icon/modx-original.svg", name: "Modx", desc: "CMF / Конструктор сайтов" },
    { icon: "./image/icon/PhpBB.png", name: "phpBB", desc: "Конструктор веб-форум" },
    { icon: "./image/icon/tilda.png", name: "Tilda", desc: "Конструктор сайтов" },
];

const OneCTech = [
    { icon: "./image/icon/1c.png", name: "1C", desc: "Настройка предприятий и конфигураций / программирование модулей" },
    { icon: "./image/icon/1c_bitrix.png", name: "1С-Битрикс", desc: "CMS / Блоги / Магазины" },
    { icon: "./image/icon/1cfresh.png", name: "1C-Fresh", desc: "Облако хранения" },
    { icon: "./image/icon/Bitrix24.png", name: "Битрикс24", desc: "CRM" },
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
    renderTechGrid("OneCTech", OneCTech);
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
          <img width='500px' heigth='500px' src="${project.icon}"></img>
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
// Полноэкранное меню
(function() {
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');
    if (!burger || !nav) return;

    function openMenu() {
        nav.classList.add('show');
        if (overlay) overlay.style.display = 'block';
        burger.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        nav.classList.remove('show');
        if (overlay) overlay.style.display = 'none';
        burger.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }
    burger.onclick = (e) => {
        e.stopPropagation();
        if (nav.classList.contains('show')) closeMenu();
        else openMenu();
    };
    if (overlay) overlay.onclick = closeMenu;
    nav.querySelectorAll('a').forEach(link => link.onclick = closeMenu);
    window.onresize = () => { if (window.innerWidth > 880) closeMenu(); };
})();

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

(function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    function showMessage(text, isError = false) {
        formMsg.innerHTML = `<span style="color: ${isError ? '#ff6b6b' : '#2DD4BF'};">${text}</span>`;
        setTimeout(() => {
            if (formMsg.innerHTML) formMsg.innerHTML = '';
        }, 5000);
    }

    function setButtonLoading(isLoading) {
        if (!submitBtn) return;
        submitBtn.disabled = isLoading;
        submitBtn.style.opacity = isLoading ? '0.6' : '1';
        submitBtn.innerHTML = isLoading ? 'Отправка... <i class="fas fa-spinner fa-pulse"></i>' : 'Отправить запрос →';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('userName')?.value.trim();
        const email = document.getElementById('userEmail')?.value.trim();
        const message = document.getElementById('userMessage')?.value.trim();

        // Валидация
        if (!name) {
            showMessage('Пожалуйста, введите ваше имя', true);
            return;
        }

        if (!email) {
            showMessage('Пожалуйста, введите ваш email', true);
            return;
        }

        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Пожалуйста, введите корректный email', true);
            return;
        }

        if (!message) {
            showMessage('Пожалуйста, напишите ваше сообщение', true);
            return;
        }

        if (message.length < 10) {
            showMessage('Сообщение должно содержать хотя бы 10 символов', true);
            return;
        }

        setButtonLoading(true);

        try {
            const formData = new URLSearchParams();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);

            const response = await fetch('sendmail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showMessage('Спасибо!!! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
                form.reset();
            } else {
                showMessage('Ошибка!!! ' + (result.message || 'Ошибка отправки'), true);
            }

        } catch (error) {
            console.error('Ошибка:', error);
            showMessage('Ошибка соединения. Пожалуйста, попробуйте позже или напишите нам на e@digital19.ru', true);
        } finally {
            setButtonLoading(false);
        }
    });
})();

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