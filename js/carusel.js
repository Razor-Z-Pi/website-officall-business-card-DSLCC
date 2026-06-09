(function () {
    const partnersData = [
        { href: "https://arda.digital/", imgSrc: "./image/partners/arda.svg", alt: "ARDA" },
        { href: "https://yandex.ru/company", imgSrc: "./image/partners/Yandex_icon.png", alt: "Yandex" },
        { href: "https://moibiz42.ru/", imgSrc: "./image/partners/myBisnes.png", alt: "Мой бизнес" },
        { href: "https://xn----btbub0agfgbeg3k.xn--p1ai/", imgSrc: "./image/clients/strop.png", alt: "СТРОП-СИБИРЬ" },
        { href: "https://1c.ru/", imgSrc: "./image/partners/1С.png", alt: "1С Фирма 1С" },
        { href: "https://1cfresh.com/", imgSrc: "./image/icon/1cfresh.png", alt: "1С FRESH" },
        { href: "https://www.bitrix24.ru/", imgSrc: "./image/partners/Bitrix24-logo.png", alt: "Битрикс24" }
    ];

    const container = document.getElementById('logosContainer');
    const trackWrapper = document.getElementById('carouselTrack');

    // Функция создания элемента логотипа
    function createLogoElement(data) {
        const link = document.createElement('a');
        link.href = data.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const img = document.createElement('img');
        img.src = data.imgSrc;
        img.alt = data.alt;
        img.loading = "lazy";
        img.style.cssText = "max-height: 90px; width: auto;";
        img.onerror = function () {
            this.style.opacity = '0.6';
            this.src = 'https://placehold.co/200x100?text=Logo';
        };

        link.appendChild(img);
        const logoDiv = document.createElement('div');
        logoDiv.classList.add('logo-item');
        logoDiv.appendChild(link);
        return logoDiv;
    }

    // Создаём оригинальные элементы
    const originalItems = [];
    partnersData.forEach(data => {
        originalItems.push(createLogoElement(data));
    });

    // Бесконечная карусель (клонирование для плавности)
    const cloneCount = 3;
    function buildInfiniteCarousel() {
        container.innerHTML = '';
        for (let i = 0; i < cloneCount; i++) {
            originalItems.forEach(item => {
                container.appendChild(item.cloneNode(true));
            });
        }
    }
    buildInfiniteCarousel();

    // Установка начальной позиции скролла
    function setInitialScrollPosition() {
        if (!trackWrapper) return;
        const firstOriginal = container.children[originalItems.length];
        if (firstOriginal) {
            trackWrapper.scrollLeft = firstOriginal.offsetLeft - 30;
        } else {
            trackWrapper.scrollLeft = 20;
        }
    }

    let autoScrollActive = true;
    let scrollSpeed = 1.2;           // Скорость авто-прокрутки
    let animationId = null;
    let isDragging = false;         
    let dragStartX = 0;
    let dragStartScrollLeft = 0;
    let velocity = 0;                  // Скорость для инерции
    let lastDragX = 0;
    let lastDragScroll = 0;
    let lastDragTime = 0;
    let inertiaFrameId = null;
    let autoRestartTimeout = null;

    // Шаг авто-прокрутки
    function autoScrollStep() {
        if (!autoScrollActive) return;
        if (isDragging) return;        // Если пользователь перетаскивает — не мешаем
        if (Math.abs(velocity) > 0.05) return;
        if (!trackWrapper) return;

        let newScrollLeft = trackWrapper.scrollLeft + scrollSpeed;
        const maxScroll = container.scrollWidth - trackWrapper.clientWidth;

        if (newScrollLeft >= maxScroll - 10) {
            const resetPosition = originalItems.length * 120;
            trackWrapper.scrollLeft = resetPosition;
            newScrollLeft = resetPosition;
        }
        else if (newScrollLeft <= 5) {
            const resetToEnd = maxScroll - (originalItems.length * 120);
            trackWrapper.scrollLeft = Math.max(0, resetToEnd);
            newScrollLeft = trackWrapper.scrollLeft;
        }
        else {
            trackWrapper.scrollLeft = newScrollLeft;
        }
    }

    // Запуск анимации авто-прокрутки
    function startAutoScrollAnimation() {
        if (animationId) cancelAnimationFrame(animationId);
        let lastTime = performance.now();

        function animate(now) {
            if (!autoScrollActive || isDragging || Math.abs(velocity) > 0.2) {
                if (!isDragging && autoScrollActive && Math.abs(velocity) <= 0.2) {
                    if (autoRestartTimeout) clearTimeout(autoRestartTimeout);
                    autoRestartTimeout = setTimeout(() => {
                        if (!isDragging && autoScrollActive && Math.abs(velocity) <= 0.2) {
                            animationId = requestAnimationFrame(animate);
                        }
                    }, 400);
                }
                return;
            }

            const delta = Math.min(50, now - lastTime);
            if (delta > 16) {
                autoScrollStep();
                lastTime = now;
            }
            animationId = requestAnimationFrame(animate);
        }
        animationId = requestAnimationFrame(animate);
    }

    function startInertia(initialVelocity) {
        if (inertiaFrameId) cancelAnimationFrame(inertiaFrameId);
        let vel = initialVelocity;
        const friction = 0.95;
        const minVel = 0.2;

        function inertiaStep() {
            if (!trackWrapper) {
                inertiaFrameId = null;
                return;
            }
            if (Math.abs(vel) < minVel || isDragging) {
                velocity = 0;
                inertiaFrameId = null;
                if (autoScrollActive) {
                    if (autoRestartTimeout) clearTimeout(autoRestartTimeout);
                    autoRestartTimeout = setTimeout(() => {
                        if (!isDragging && autoScrollActive && velocity === 0) {
                            startAutoScrollAnimation();
                        }
                    }, 250);
                }
                return;
            }

            let newLeft = trackWrapper.scrollLeft - vel;
            const maxLeft = container.scrollWidth - trackWrapper.clientWidth;
            if (newLeft <= 0) {
                newLeft = 5;
                vel = -vel * 0.5;
            } else if (newLeft >= maxLeft) {
                newLeft = maxLeft - 5;
                vel = -vel * 0.5;
            }
            trackWrapper.scrollLeft = newLeft;
            vel *= friction;
            velocity = vel;
            inertiaFrameId = requestAnimationFrame(inertiaStep);
        }
        inertiaFrameId = requestAnimationFrame(inertiaStep);
    }

    function onDragStart(e) {
        if (!trackWrapper) return;
        // Останавливаем авто-прокрутку и инерцию
        autoScrollActive = false;
        if (animationId) cancelAnimationFrame(animationId);
        if (inertiaFrameId) cancelAnimationFrame(inertiaFrameId);
        velocity = 0;
        isDragging = true;

        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        dragStartX = clientX;
        dragStartScrollLeft = trackWrapper.scrollLeft;
        lastDragX = clientX;
        lastDragScroll = trackWrapper.scrollLeft;
        lastDragTime = performance.now();

        trackWrapper.style.cursor = 'grabbing'; // Меняем курсор на "сжатая рука"
        e.preventDefault();
    }

    function onDragMove(e) {
        if (!isDragging || !trackWrapper) return;
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - dragStartX;
        // Двигаем скролл: чем дальше ушёл курсор от начальной точки, тем сильнее скролл
        let newScrollLeft = dragStartScrollLeft - deltaX;
        const maxLeft = container.scrollWidth - trackWrapper.clientWidth;
        newScrollLeft = Math.min(maxLeft, Math.max(0, newScrollLeft));
        trackWrapper.scrollLeft = newScrollLeft;

        // Вычисляем скорость для последующей инерции
        const nowTime = performance.now();
        const dt = nowTime - lastDragTime;
        if (dt > 12) {
            const dx = clientX - lastDragX;
            const scrollDelta = trackWrapper.scrollLeft - lastDragScroll;
            velocity = (scrollDelta / dt) * 16;
            lastDragX = clientX;
            lastDragScroll = trackWrapper.scrollLeft;
            lastDragTime = nowTime;
        }
        e.preventDefault();
    }

    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;                     // Сбрасываем флаг перетаскивания
        trackWrapper.style.cursor = 'grab';     // Возвращаем курсор "рука"

        if (Math.abs(velocity) > 0.3) {
            startInertia(velocity);
        } else {
            velocity = 0;
            autoScrollActive = true;
            if (autoRestartTimeout) clearTimeout(autoRestartTimeout);
            autoRestartTimeout = setTimeout(() => {
                if (!isDragging && autoScrollActive && velocity === 0) {
                    startAutoScrollAnimation();
                }
            }, 300);
        }
        e.preventDefault();
    }

    // mousedown — начало перетаскивания
    // mousemove — движение мыши (перетаскивание)
    // mouseup — окончание перетаскивания
    trackWrapper.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    // Поддержка сенсорных устройств (touch)
    trackWrapper.addEventListener('touchstart', onDragStart, { passive: false });
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('touchend', onDragEnd);
    trackWrapper.style.cursor = 'grab';

    function smoothScrollBy(offsetPx) {
        if (!trackWrapper) return;
        autoScrollActive = false;
        if (animationId) cancelAnimationFrame(animationId);
        if (inertiaFrameId) cancelAnimationFrame(inertiaFrameId);
        velocity = 0;

        let target = trackWrapper.scrollLeft + offsetPx;
        const maxLeft = container.scrollWidth - trackWrapper.clientWidth;
        target = Math.min(maxLeft, Math.max(0, target));
        trackWrapper.scrollTo({ left: target, behavior: 'smooth' });

        setTimeout(() => {
            if (!isDragging) {
                autoScrollActive = true;
                startAutoScrollAnimation();
            }
        }, 600);
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.addEventListener('click', () => smoothScrollBy(-280));
    nextBtn.addEventListener('click', () => smoothScrollBy(280));

    // Эффект бесконечности при скролле
    trackWrapper.addEventListener('scroll', function () {
        if (isDragging) return;
        const maxScroll = container.scrollWidth - trackWrapper.clientWidth;
        const scrollLeft = trackWrapper.scrollLeft;
        const threshold = originalItems.length * 140;
        if (scrollLeft <= 10) {
            const newPos = maxScroll - threshold - 20;
            if (newPos > 10 && newPos < maxScroll) trackWrapper.scrollLeft = newPos;
        } else if (scrollLeft >= maxScroll - 10) {
            const newPos = threshold + 20;
            if (newPos < maxScroll && newPos > 0) trackWrapper.scrollLeft = newPos;
        }
    });

    // Запуск карусели
    setTimeout(() => {
        setInitialScrollPosition();
        autoScrollActive = true;
        startAutoScrollAnimation();
    }, 100);

    window.addEventListener('resize', () => {
        setInitialScrollPosition();
    });
})();