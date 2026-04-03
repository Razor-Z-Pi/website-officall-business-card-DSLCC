const fullProjects = [
    {
        id: 1,
        title: "Разработка AI-плагина для WordPress",
        shortDesc: "Интеллектуальный плагин для автоматической генерации контента и SEO-оптимизации",
        fullDesc: "Плагин использует GPT-4 для автоматической генерации уникальных статей, мета-тегов и перевода контента на 12 языков. Реализована кэширующая прослойка на Redis, админ-панель с настройкой промптов и мультисайтовость. Решение обработало более 5000 запросов в день, увеличив скорость наполнения контента в 10 раз. Клиент — крупное медиа-агентство с сетью из 50+ сайтов.",
        tech: ["PHP", "WordPress", "OpenAI API", "Redis", "JavaScript", "REST API"],
        link: "https://example.com/ai-plugin",
        icon: "fa-plug",
        linkText: "Посмотреть демо плагина"
    },
    {
        id: 2,
        title: "Корпоративный портал «Цифровой офис»",
        shortDesc: "Единая платформа для управления задачами, документами и коммуникацией",
        fullDesc: "Полноценная экосистема для компаний с численностью 2000+ сотрудников. Включает модули: управление проектами, документооборот, HR-портал, бухгалтерский учет, складской учет. Интеграция с 1С и Active Directory. Разработана система аналитики на базе Power BI с 50+ дашбордами. Автоматизация бизнес-процессов сократила операционные затраты на 30%.",
        tech: ["React", "Node.js", "PostgreSQL", "Docker", "Kafka", "Power BI"],
        link: "https://example.com/digitaloffice",
        icon: "fa-building",
        linkText: "Посмотреть кейс"
    },
    {
        id: 3,
        title: "Мобильное приложение для доставки «ExpressEats»",
        shortDesc: "Кроссплатформенное приложение с трекингом курьера и системой лояльности",
        fullDesc: "Приложение для заказа еды с геолокацией в реальном времени. Реализованы push-уведомления о статусе заказа, интеграция с платежными системами (Stripe, PayPal), чат поддержки с AI-ассистентом. Система лояльности с накоплением баллов. Приложение установлено более 100 000 раз, средний рейтинг в App Store и Google Play — 4.8. Время доставки сократилось на 25% за счет оптимизации маршрутов.",
        tech: ["Flutter", "Firebase", "Google Maps API", "Stripe", "Node.js"],
        link: "https://example.com/expresseats",
        icon: "fa-motorcycle",
        linkText: "Скачать приложение"
    },
    {
        id: 4,
        title: "CRM-система для ритейла «SmartRetail»",
        shortDesc: "Облачная CRM с AI-аналитикой поведения покупателей и прогнозированием спроса",
        fullDesc: "Интеллектуальная CRM для розничных сетей с функцией прогнозирования спроса на основе машинного обучения. Анализирует историю покупок, сезонность и поведенческие факторы. Интеграция с кассовым ПО (более 20 форматов). 50+ интерактивных дашбордов для топ-менеджмента. Помогла увеличить конверсию на 35% за 6 месяцев. Масштабируется до 1 млн активных клиентов.",
        tech: ["Vue.js", "Django", "MongoDB", "TensorFlow", "Redis", "Celery"],
        link: "https://example.com/smartretail",
        icon: "fa-chart-line",
        linkText: "Запросить демо"
    },
    {
        id: 5,
        title: "Платформа для онлайн-образования «EduSpace»",
        shortDesc: "LMS с видеоконференциями, тестированием и системой сертификации",
        fullDesc: "Полноценная образовательная платформа для проведения вебинаров, курсов и экзаменов. Встроенная видео-конференция на WebRTC, система автоматической проверки тестов, конструктор курсов. Поддержка до 10 000 одновременных пользователей. Интеграция с 1С для учета обучения сотрудников. Выдано более 50 000 сертификатов.",
        tech: ["Next.js", "WebRTC", "Python", "PostgreSQL", "AWS S3", "Redis"],
        link: "https://example.com/eduspace",
        icon: "fa-graduation-cap",
        linkText: "Посмотреть платформу"
    }
];

function renderProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

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