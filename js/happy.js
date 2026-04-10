const trigger = document.getElementById('trigger');
const object = document.getElementById('object');
let timeoutId;

trigger.addEventListener('mouseenter', function () {
    // Добавляем небольшую задержку перед появлением
    timeoutId = setTimeout(() => {
        object.classList.add('show');
    }, 100);
});

trigger.addEventListener('mouseleave', function () {
    clearTimeout(timeoutId);
    object.classList.remove('show');
});