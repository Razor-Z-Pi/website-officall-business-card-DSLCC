const fullProjects = [
    {
        id: 1,
        title: "Плагин Бронирование отелей и услуг на WordPress",
        shortDesc: "Плагин для автоматизации контента в сфере услуг и продаж",
        fullDesc: "Данный система-модуль позволяет автоматизировать процесс бронирования и учёт отелей, различных услуг отдыха. Настроить вручную характеристики услуг и признаки работы для автоматизации. Плагин предоставляет удобный интерфейс как для администраторов, так и для клиентов, автоматизируя процесс бронирования, управления ценами и обработки заказов.",
        tech: ["PHP", "WordPress", "CSS", "JavaScript", "REST API", "MySQL/MariaDB"],
        link: "#",
        icon: "fa-building",
        linkText: "Посмотреть демо плагина"
    },
    {
        id: 2,
        title: "Плагин калькулятор расчетов аренды автомабилей",
        shortDesc: "Плагин для расчёта стоимости (по дням, неделям) аренды автомабилей",
        fullDesc: "Данный плагин предоставляет календарь, настройку цен и расчетов в зависмости от стоимости автомабиля, совместим с WooCommerce",
        tech: ["PHP", "WordPress", "CSS", "JavaScript", "AJAX", "WooCommerce"],
        link: "#",
        icon: "fa-calculator",
        linkText: "Посмотреть демо плагина"
    },
    {
        id: 3,
        title: "Плагин для генерации яндекс фидов YML",
        shortDesc: "Оптимальное и качественное решение, также дешевле по цене, среди конкурентов",
        fullDesc: "Плагин собираест статистику и позволяет генерировать фиды",
        tech: ["PHP", "WordPress", "CSS", "JavaScript", "AJAX"],
        link: "#",
        icon: "fa-file",
        linkText: "Скачать приложение"
    },
    {
        id: 4,
        title: "Плагин Баннеров на товары в WooCommerce",
        shortDesc: "Плагин для добавление баннеров на карточки товаров в WooCommerce ",
        fullDesc: "Данное решение позволить сделать кастомный баннер и добавить на карточку товара, сам баннер в любую область отображения!!!",
        tech: ["PHP", "WordPress", "CSS", "JavaScript", "AJAX", "WooCommerce"],
        link: "#",
        icon: "fa-flag",
        linkText: "Запросить демо"
    },
];

let isRendered = false;

function renderProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container || isRendered) return;

    container.innerHTML = fullProjects.map(project => `
      <div class="project-detail-card reveal" id="project-${project.id}">
        <div class="project-content">
          <div class="project-icon">
            <i class="fas ${project.icon}"></i>
          </div>
          <div class="project-info">
            <h2>${project.title}</h2>
            <div class="project-short-desc">${project.shortDesc}</div>
            <div class="project-full-desc">${project.fullDesc}</div>
            <div class="tech-badges">
              ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank" class="project-link-btn">
              ${project.linkText} <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    `).join('');

    isRendered = true;

    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }
}

function initRevealAnimation() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    // DOM уже загружен — отрисовываем сразу
    renderProjects();
}

// Дополнительная страховка — отрисовка после полной загрузки страницы
window.addEventListener('load', function () {
    // Если по какой-то причине не отрисовалось — отрисовываем
    if (!isRendered) {
        console.log('Повторная отрисовка проектов (load)');
        renderProjects();
    }
});

// MutationObserver на случай динамических изменений
const observer = new MutationObserver(function (mutations) {
    if (!isRendered && document.getElementById('projectsGrid')) {
        console.log('Отрисовка проектов (MutationObserver)');
        renderProjects();
    }
});
observer.observe(document.body, { childList: true, subtree: true });

setTimeout(() => {
    if (!isRendered) {
        console.log('Принудительная отрисовка проектов (timeout)');
        renderProjects();
    }
}, 1000);

const burger = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');
if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.opacity = '0.6';
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});
document.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = '0';
});

renderProjects();

setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
}, 100);