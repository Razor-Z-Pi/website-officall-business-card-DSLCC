(function () {
    const partnersData = [
        { href: "https://arda.digital/", imgSrc: "./image/partners/arda.svg", alt: "ARDA", height: "", extraClass: "partners-logo-img" },
        { href: "https://yandex.ru/company", imgSrc: "./image/partners/Yandex_icon.png", alt: "Yandex", height: "110px", extraStyle: "height:110px;" },
        { href: "https://moibiz42.ru/", imgSrc: "./image/partners/myBisnes.png", alt: "myBisnes", height: "110px", extraStyle: "height:110px;" },
        { href: "https://xn----btbub0agfgbeg3k.xn--p1ai/", imgSrc: "./image/clients/strop.png", alt: "Строп-Сибирь", height: "110px", extraStyle: "height:110px;" },
        { href: "https://1c.ru/", imgSrc: "./image/partners/1С.png", alt: "1C", height: "100px", extraStyle: "height:100px;" },
        { href: "https://1cfresh.com/", imgSrc: "./image/icon/1cfresh.png", alt: "1Cfresh", height: "110px", extraStyle: "height:110px;" },
        { href: "https://www.bitrix24.ru/", imgSrc: "./image/partners/Bitrix24-logo.png", alt: "Битрикс24", height: "110px", extraStyle: "height:110px;" }
    ];

    // Соберем контейнер
    const container = document.getElementById('logosContainer');
    const trackWrapper = document.getElementById('carouselTrack');

    // Функция создания DOM-элемента логотипа
    function createLogoElement(data) {
        const link = document.createElement('a');
        link.href = data.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.classList.add('logo-link');

        const img = document.createElement('img');
        img.src = data.imgSrc;
        img.alt = data.alt;
        img.loading = "lazy";
        if (data.extraStyle) {
            img.style.cssText = data.extraStyle + "; max-height:90px; width:auto;";
        } else {
            img.style.cssText = "max-height:90px; width:auto;";
        }
        img.classList.add('partner-img');
        // резерв на случай отсутствия картинок
        img.onerror = function () { this.style.opacity = '0.6'; this.src = 'https://placehold.co/200x100?text=Logo'; };

        link.appendChild(img);

        const logoDiv = document.createElement('div');
        logoDiv.classList.add('logo-item');
        logoDiv.appendChild(link);
        return logoDiv;
    }

    // Построим оригинальный список
    const originalItems = [];
    partnersData.forEach(data => {
        originalItems.push(createLogoElement(data));
    });

    const cloneCount = 3; // кратность для бесконечности
    function buildInfiniteCarousel() {
        container.innerHTML = '';
        for (let i = 0; i < cloneCount; i++) {
            originalItems.forEach(item => {
                const cloned = item.cloneNode(true);
                container.appendChild(cloned);
            });
        }
        // дополнительно сохраним ширину для вычислений
    }
    buildInfiniteCarousel();

    // получаем общее количество элементов в контейнере
    let totalItemsCount = originalItems.length * cloneCount;
    let oneItemWidth = 0; // заполним позже
    let containerWidth = 0;

    // Функция обновления размеров и установка начальной позиции (центрируем на исходной копии)
    function setInitialScroll() {
        if (!trackWrapper) return;
        const firstSetWidth = getItemsWidthRange(0, originalItems.length);
        const targetElement = container.children[0];
        if (targetElement) {
            // прокрутим так, чтобы первый логотип был слева с небольшим отступом 20px
            const scrollLeft = targetElement.offsetLeft - 20;
            trackWrapper.scrollLeft = scrollLeft > 0 ? scrollLeft : 0;
        }
        // Сохраняем начальную позицию для авто-прокрутки
        lastScrollLeft = trackWrapper.scrollLeft;
    }

    function getItemsWidthRange(startIdx, length) {
        let w = 0;
        for (let i = startIdx; i < startIdx + length && i < container.children.length; i++) {
            if (container.children[i]) w += container.children[i].offsetWidth;
            const gap = parseFloat(getComputedStyle(container).gap) || 0;
            if (i < startIdx + length - 1) w += gap;
        }
        return w;
    }

    let autoScrollInterval = null;
    let autoScrollActive = true;
    let scrollSpeed = 1.2; // пикселей за кадр (плавно)
    let animationFrameId = null;
    let lastTimestamp = 0;
    let lastScrollLeft = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;
    let velocity = 0;           // инерция после ручного перетаскивания
    let lastDragTime = 0;
    let lastDragX = 0;
    let lastDragScroll = 0;
    let inertiaFrame = null;
    let isUserInteracting = false;  // после отпускания мыши плавно замедляем и возвращаем авто
    let autoScrollAfterInertia = null;

    // функция авто-смещения (шаг)
    function autoScrollStep() {
        if (!autoScrollActive) return;
        if (isDragging) return;
        if (velocity !== 0) return; // если есть инерция после перетаскивания - не мешаем
        if (!trackWrapper) return;
        let newScrollLeft = trackWrapper.scrollLeft + scrollSpeed;
        // сброс для бесконечности: если докрутили до границ - телепортируем в середину
        const maxScroll = container.scrollWidth - trackWrapper.clientWidth;
        if (newScrollLeft >= maxScroll - 5) {
            // почти конец - перекидываем на начало + смещение относительно первой копии оригиналов
            const firstSetStart = 0; // смещение первого набора
            const targetScroll = firstSetStart + 20;
            trackWrapper.scrollLeft = targetScroll;
            newScrollLeft = targetScroll;
        } else if (newScrollLeft <= 5) {
            const targetFromEnd = container.scrollWidth - trackWrapper.clientWidth - 20;
            trackWrapper.scrollLeft = Math.max(0, targetFromEnd);
            newScrollLeft = trackWrapper.scrollLeft;
        } else {
            trackWrapper.scrollLeft = newScrollLeft;
        }
    }

    // запуск авто-прокрутки через requestAnimationFrame (плавно)
    let animAutoId = null;
    function startAutoScrollAnimation() {
        if (animAutoId) cancelAnimationFrame(animAutoId);
        let lastAutoTime = performance.now();
        function stepAuto(now) {
            if (!autoScrollActive || isDragging || velocity !== 0) {
                // если инерция или перетаскивание, пауза авто
                if (velocity === 0 && !isDragging && autoScrollActive) {
                    // если инерция закончилась и не перетаскивание, возобновим через секунду
                    if (autoScrollAfterInertia === null) {
                        autoScrollAfterInertia = setTimeout(() => {
                            if (!isDragging && velocity === 0 && autoScrollActive) {
                                animAutoId = requestAnimationFrame(stepAuto);
                            }
                            autoScrollAfterInertia = null;
                        }, 400);
                    }
                    return;
                }
                animAutoId = requestAnimationFrame(stepAuto);
                return;
            }
            const delta = Math.min(100, now - lastAutoTime);
            if (delta > 16) {
                autoScrollStep();
                lastAutoTime = now;
            }
            animAutoId = requestAnimationFrame(stepAuto);
        }
        animAutoId = requestAnimationFrame(stepAuto);
    }

    function stopAutoScroll() { /* временно останавливаем */ }

    // Инерция после ручного отпускания мыши
    function startInertia(initialVelocity) {
        if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
        let vel = initialVelocity;
        const friction = 0.96;
        const minVel = 0.2;
        function inertiaStep() {
            if (!trackWrapper) return;
            if (Math.abs(vel) < minVel || isDragging) {
                velocity = 0;
                inertiaFrame = null;
                // после инерции включим авто через небольшую задержку
                if (autoScrollActive) {
                    if (autoScrollAfterInertia) clearTimeout(autoScrollAfterInertia);
                    autoScrollAfterInertia = setTimeout(() => {
                        velocity = 0;
                        autoScrollActive = true;
                        if (animAutoId) cancelAnimationFrame(animAutoId);
                        startAutoScrollAnimation();
                    }, 300);
                }
                return;
            }
            let newLeft = trackWrapper.scrollLeft - vel;
            const maxLeft = container.scrollWidth - trackWrapper.clientWidth;
            if (newLeft <= 0) {
                newLeft = 0;
                vel = -vel * 0.5;
            } else if (newLeft >= maxLeft) {
                newLeft = maxLeft;
                vel = -vel * 0.5;
            }
            trackWrapper.scrollLeft = newLeft;
            vel *= friction;
            velocity = vel;
            inertiaFrame = requestAnimationFrame(inertiaStep);
        }
        inertiaFrame = requestAnimationFrame(inertiaStep);
    }

    // Обработчики мыши / touch для перетаскивания
    function onDragStart(e) {
        if (!trackWrapper) return;
        // отменяем авто во время взаимодействия
        autoScrollActive = false;
        if (animAutoId) cancelAnimationFrame(animAutoId);
        if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
        velocity = 0;
        isDragging = true;
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        dragStartX = clientX;
        dragStartScrollLeft = trackWrapper.scrollLeft;
        lastDragX = clientX;
        lastDragScroll = trackWrapper.scrollLeft;
        lastDragTime = performance.now();
        trackWrapper.style.cursor = 'grabbing';
        e.preventDefault();
    }

    function onDragMove(e) {
        if (!isDragging || !trackWrapper) return;
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - dragStartX;
        let newScroll = dragStartScrollLeft - deltaX;
        // ограничения (без ограничений, но для бесконечности позже)
        const maxLeft = container.scrollWidth - trackWrapper.clientWidth;
        newScroll = Math.min(maxLeft, Math.max(0, newScroll));
        trackWrapper.scrollLeft = newScroll;

        const nowTime = performance.now();
        const dt = nowTime - lastDragTime;
        if (dt > 10) {
            const dx = clientX - lastDragX;
            const scrollDiff = trackWrapper.scrollLeft - lastDragScroll;
            velocity = (scrollDiff / dt) * 16; // скорость в пикселях на "кадр" 16ms
            lastDragX = clientX;
            lastDragScroll = trackWrapper.scrollLeft;
            lastDragTime = nowTime;
        }
        e.preventDefault();
    }

    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        trackWrapper.style.cursor = 'grab';
        if (Math.abs(velocity) > 0.3) {
            startInertia(velocity);
        } else {
            velocity = 0;
            autoScrollActive = true;
            if (animAutoId) cancelAnimationFrame(animAutoId);
            startAutoScrollAnimation();
        }
        e.preventDefault();
    }

    // подключение событий мыши
    trackWrapper.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    trackWrapper.addEventListener('touchstart', onDragStart, { passive: false });
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('touchend', onDragEnd);
    trackWrapper.style.cursor = 'grab';

    // Кнопки Prev / Next с плавным скроллом и сохранением бесконечности
    function smoothScrollBy(offsetPx) {
        if (!trackWrapper) return;
        autoScrollActive = false;
        if (animAutoId) cancelAnimationFrame(animAutoId);
        if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
        velocity = 0;
        let target = trackWrapper.scrollLeft + offsetPx;
        const maxLeft = container.scrollWidth - trackWrapper.clientWidth;
        target = Math.min(maxLeft, Math.max(0, target));
        trackWrapper.scrollTo({ left: target, behavior: 'smooth' });
        // после завершения скролла возобновляем авто через задержку
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

    // сброс позиций для бесконечности при скролле (телепорт без рывков)
    trackWrapper.addEventListener('scroll', function () {
        if (isDragging) return;
        const maxScroll = container.scrollWidth - trackWrapper.clientWidth;
        const scrollLeft = trackWrapper.scrollLeft;
        const threshold = originalItems.length * 120; // ширина блока оригиналов примерно
        if (scrollLeft <= 10) {
            const newPos = maxScroll - threshold - 20;
            if (newPos > 10) trackWrapper.scrollLeft = newPos;
        } else if (scrollLeft >= maxScroll - 10) {
            const newPos = threshold + 20;
            if (newPos < maxScroll) trackWrapper.scrollLeft = newPos;
        }
    });

    // Ресайз для пересчета
    window.addEventListener('resize', () => {
        setInitialScroll();
    });

    setTimeout(() => {
        setInitialScroll();
        autoScrollActive = true;
        startAutoScrollAnimation();
    }, 100);
})();