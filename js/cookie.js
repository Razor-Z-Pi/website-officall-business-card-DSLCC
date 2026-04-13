(function initCookieConsent() {
    const STORAGE_KEY = 'cookie_consent_accepted';
    const CONSENT_VALUE = 'true';

    const cookieBanner = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    const privacyLink = document.getElementById('privacyPolicyLink');

    // Проверяем, было ли уже дано согласие
    function hasUserConsented() {
        return localStorage.getItem(STORAGE_KEY) === CONSENT_VALUE;
    }

    // Сохраняем согласие и скрываем баннер
    function setConsent(accepted) {
        if (accepted) {
            localStorage.setItem(STORAGE_KEY, CONSENT_VALUE);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
        hideBanner();

        // if (accepted) {
        //     console.log('Cookies accepted — можно загружать аналитику');
        //     // Здесь можно инициализировать Google Analytics, Яндекс.Метрику и т.д.
        // }
    }

    // Скрываем баннер с анимацией
    function hideBanner() {
        if (cookieBanner) {
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                if (cookieBanner.parentNode) cookieBanner.remove();
            }, 500);
        }
    }

    // Показываем баннер, если согласия ещё не было
    function checkAndShowBanner() {
        if (!hasUserConsented()) {
            setTimeout(() => {
                if (cookieBanner) cookieBanner.classList.add('show');
            }, 500);
        } else {
            // Если согласие уже есть, баннер не показываем и удаляем из DOM
            if (cookieBanner && cookieBanner.parentNode) cookieBanner.remove();
        }
    }

    // Обработчики событий
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => setConsent(true));
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => setConsent(false));
    }

    // Политика конфиденциальности — показываем уведомление
    // if (privacyLink) {
    //     privacyLink.addEventListener('click', (e) => {
    //         e.preventDefault(); 
    //     });
    // }

    // Запускаем проверку после загрузки страницы
    if (document.readyState === 'complete') {
        checkAndShowBanner();
    } else {
        window.addEventListener('load', checkAndShowBanner);
    }
})();