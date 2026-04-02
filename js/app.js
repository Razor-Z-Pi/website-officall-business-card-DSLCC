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

const techStackItems = [
    { icon: "fa-brands fa-html5", name: "HTML", desc: "Frontend" },
    { icon: "fa-brands fa-css3", name: "CSS", desc: "Frontend" },
    { icon: "fa-brands fa-less", name: "LESS", desc: "Frontend" },
    { icon: "fa-brands fa-js", name: "JS", desc: "Frontend" },
    { icon: "fab fa-react", name: "React", desc: "Frontend" },
    { icon: "fab fa-vuejs", name: "Vue.js", desc: "Frontend" },
    { icon: "fab fa-node-js", name: "Node.js", desc: "Backend" },
    { icon: "fab fa-node-js", name: "Next.js", desc: "Full-stack" },
    { icon: "fab fa-python", name: "Python", desc: "Scripts, backend, bots, AI/ML" },
    { icon: "fa-regular fa-gem", name: "Ruby", desc: "Backend" },
    { icon: "fab fa-php", name: "PHP", desc: "Backend" },
    { icon: "fa-brands fa-laravel", name: "Laravel", desc: "Backend" },
    { icon: "fab fa-php", name: "Yii", desc: "Backend" },
    { icon: "fa-brands fa-wordpress", name: "WordPress", desc: "Full-stack" },
    { icon: "fa-brands fa-drupal", name: "Drupal", desc: "Full-stack" },
    { icon: "fa-brands fa-joomla", name: "Joomla", desc: "Full-stack" },
    { icon: "fa-brands fa-opencart", name: "Opencart", desc: "Full-stack" },
    { icon: "fa-brands fa-modx", name: "Modx", desc: "Full-stack" },
    { icon: "fa-brands fa-postgresql", name: "PostgreSQL", desc: "Базы данных" },
    { icon: "fas fa-database", name: "MySQL", desc: "Базы данных" },
    { icon: "fas fa-database", name: "MariaDB", desc: "Базы данных" },
    { icon: "fas fa-database", name: "MongoDB", desc: "Базы данных" },
    { icon: "fab fa-figma", name: "Figma", desc: "UI/UX" }
];

function renderTechStack() {
    const container = document.getElementById('techGrid');
    if (container) {
        container.innerHTML = techStackItems.map(tech => `
        <div class="tech-item">
          <div class="tech-icon"><i class="${tech.icon}"></i></div>
          <h4>${tech.name}</h4>
          <p>${tech.desc}</p>
        </div>
      `).join('');
    }
}
renderTechStack();

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