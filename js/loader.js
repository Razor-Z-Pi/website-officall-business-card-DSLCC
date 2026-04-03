(function initLoader() {
    const loader = document.getElementById('loaderWrapper');
    if (!loader) return;

    // Функция скрытия лоадера
    function hideLoader() {
        loader.classList.add('hidden');
        setTimeout(() => {
            if (loader.parentNode) loader.remove();
        }, 700);
    }

    // Если страница уже загружена
    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 300);
    } else {
        window.addEventListener('load', () => {
            setTimeout(hideLoader, 400);
        });
    }

    // Запасной вариант — скрыть через 3 секунды (на случай проблем с загрузкой)
    setTimeout(hideLoader, 3000);
})();