document.addEventListener('DOMContentLoaded', () => {
    const carouselEl = document.getElementById('partnersCarousel');
    if (!carouselEl || typeof bootstrap === 'undefined') return;

    const carousel = new bootstrap.Carousel(carouselEl, {
        interval: 4000,      // каждые 4 секунды переключаем слайд
        ride: 'carousel',    // автозапуск
        pause: false,        // не пауза при ховере
        touch: true,         // свайпы
        wrap: true           // бесконечный цикл
    });

    // Плавный переход между слайдами (fade вместо slide)
    // Раскомментируйте, если хотите эффект "растворения" вместо сдвига
    // carouselEl.classList.add('carousel-fade');
});