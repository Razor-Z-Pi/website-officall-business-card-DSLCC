import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('bulb3d-container');
if (!container) {
    console.warn('Контейнер #bulb3d-container не найден');
} else {
    initBulb3D();
}

function initBulb3D() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0.3, 6.5);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Основной мягкий свет
    const ambient = new THREE.AmbientLight(0x4d7cff, 0.6);
    scene.add(ambient);

    // Ключевой свет сверху
    const keyLight = new THREE.PointLight(0xa5b8ff, 3, 15);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    // Заполняющий свет снизу
    const fillLight = new THREE.PointLight(0x2d5bff, 2, 15);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);

    // Контровой свет сзади (для бликов на стекле)
    const rimLight = new THREE.PointLight(0xffffff, 1.5, 20);
    rimLight.position.set(0, 2, -5);
    scene.add(rimLight);

    // Свет изнутри лампочки (светящийся мозг)
    const innerLight = new THREE.PointLight(0x4d7cff, 5, 4);
    innerLight.position.set(0, 0.5, 0);
    scene.add(innerLight);

    const bulbGroup = new THREE.Group();
    scene.add(bulbGroup);

    const glassGeometry = new THREE.SphereGeometry(1.4, 64, 64);
    
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xc8d4ff,
        metalness: 0,
        roughness: 0.05,
        transmission: 0.95,        // Прозрачность
        thickness: 0.8,            // Толщина стекла
        ior: 1.5,                  // Коэффициент преломления
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 0.6,
        emissive: 0x1a2a5a,
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide
    });
    
    const glassSphere = new THREE.Mesh(glassGeometry, glassMaterial);
    glassSphere.position.y = 0.3;
    // Вытягиваем сферу, чтобы получилась форма лампочки
    glassSphere.scale.set(1, 1.15, 1);
    bulbGroup.add(glassSphere);

    const neckGeometry = new THREE.CylinderGeometry(0.55, 0.75, 0.5, 32);
    const neckMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xc8d4ff,
        transmission: 0.8,
        thickness: 0.5,
        roughness: 0.15,
        transparent: true,
        opacity: 0.5,
        emissive: 0x1a2a5a,
        emissiveIntensity: 0.2
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.y = -1.1;
    bulbGroup.add(neck);

    const baseGroup = new THREE.Group();
    baseGroup.position.y = -1.6;
    bulbGroup.add(baseGroup);

    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a5a7a,
        metalness: 0.95,
        roughness: 0.3,
        emissive: 0x1a2a4a,
        emissiveIntensity: 0.2
    });

    // 4 кольца цоколя
    for (let i = 0; i < 4; i++) {
        const ringGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.13, 32);
        const ring = new THREE.Mesh(ringGeo, baseMaterial);
        ring.position.y = i * 0.18;
        baseGroup.add(ring);
    }

    // Пятачок (нижняя часть)
    const bottomGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.15, 32);
    const bottom = new THREE.Mesh(bottomGeo, baseMaterial);
    bottom.position.y = 4 * 0.18;
    baseGroup.add(bottom);

    const brainGroup = new THREE.Group();
    brainGroup.position.y = 0.4;
    bulbGroup.add(brainGroup);

    // Материал мозга — светящийся
    const brainMaterial = new THREE.MeshStandardMaterial({
        color: 0x4d7cff,
        emissive: 0x4d7cff,
        emissiveIntensity: 2.5,
        roughness: 0.4,
        metalness: 0.1
    });

    // Два полушария (две сферы с неровной поверхностью через шум)
    const hemiGeo = new THREE.SphereGeometry(0.55, 32, 32);

    // Левое полушарие
    const leftHemi = new THREE.Mesh(hemiGeo, brainMaterial);
    leftHemi.position.set(-0.28, 0, 0);
    leftHemi.scale.set(0.75, 1, 0.9);
    brainGroup.add(leftHemi);

    // Правое полушарие
    const rightHemi = new THREE.Mesh(hemiGeo, brainMaterial);
    rightHemi.position.set(0.28, 0, 0);
    rightHemi.scale.set(0.75, 1, 0.9);
    brainGroup.add(rightHemi);

    // Извилины — светящиеся линии на поверхности мозга
    const curveMaterial = new THREE.LineBasicMaterial({
        color: 0xa5b8ff,
        transparent: true,
        opacity: 0.9
    });

    // Создаём извилины из случайных кривых
    function createWrinkle(startX, startY, startZ, side) {
        const points = [];
        let x = startX;
        let y = startY;
        let z = startZ;
        
        for (let i = 0; i < 8; i++) {
            points.push(new THREE.Vector3(x, y, z));
            x += (Math.random() - 0.5) * 0.3 * side;
            y += (Math.random() - 0.5) * 0.25;
            z += (Math.random() - 0.5) * 0.3;
        }
        
        const curve = new THREE.CatmullRomCurve3(points);
        const curvePoints = curve.getPoints(40);
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const line = new THREE.Line(geometry, curveMaterial);
        brainGroup.add(line);
    }

    // Левое полушарие извилины
    createWrinkle(-0.4, 0.2, 0.3, -1);
    createWrinkle(-0.35, -0.15, 0.35, -1);
    createWrinkle(-0.3, 0.05, -0.3, -1);
    createWrinkle(-0.45, 0.3, -0.1, -1);
    createWrinkle(-0.2, -0.3, 0.2, -1);

    // Правое полушарие извилины
    createWrinkle(0.4, 0.2, 0.3, 1);
    createWrinkle(0.35, -0.15, 0.35, 1);
    createWrinkle(0.3, 0.05, -0.3, 1);
    createWrinkle(0.45, 0.3, -0.1, 1);
    createWrinkle(0.2, -0.3, 0.2, 1);

    // Точки-нейроны на мозге
    const neuronMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.06,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    const neuronPositions = [];
    for (let i = 0; i < 80; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 0.65;
        neuronPositions.push(
            Math.sin(phi) * Math.cos(theta) * r,
            Math.cos(phi) * r * 1.2,
            Math.sin(phi) * Math.sin(theta) * r
        );
    }
    const neuronGeo = new THREE.BufferGeometry();
    neuronGeo.setAttribute('position', new THREE.Float32BufferAttribute(neuronPositions, 3));
    const neurons = new THREE.Points(neuronGeo, neuronMaterial);
    brainGroup.add(neurons);

    // Создаём радиальный градиент через canvas
    function createGlowTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, 'rgba(120, 146, 231, 0.8)');
        gradient.addColorStop(0.4, 'rgba(77, 124, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(77, 124, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(canvas);
    }

    const glowTexture = createGlowTexture();
    const glowSprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: glowTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })
    );
    glowSprite.scale.set(5, 5, 1);
    glowSprite.position.y = 0.3;
    bulbGroup.add(glowSprite);

    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 4;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        particleVelocities.push({
            x: (Math.random() - 0.5) * 0.005,
            y: Math.random() * 0.01 + 0.005,
            z: (Math.random() - 0.5) * 0.005
        });
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xa5b8ff,
        size: 0.04,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    bulbGroup.add(particles);

    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;
    let velocityY = 0;
    let velocityX = 0;
    let hasInteracted = false;

    const canvas = renderer.domElement;

    function onPointerDown(e) {
        isDragging = true;
        hasInteracted = true;
        previousMouseX = e.clientX || e.touches[0].clientX;
        previousMouseY = e.clientY || e.touches[0].clientY;
        canvas.style.cursor = 'grabbing';
        velocityX = 0;
        velocityY = 0;
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        if (clientX === undefined) return;

        const deltaX = clientX - previousMouseX;
        const deltaY = clientY - previousMouseY;

        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));

        velocityY = deltaX * 0.01;
        velocityX = deltaY * 0.01;

        previousMouseX = clientX;
        previousMouseY = clientY;
    }

    function onPointerUp() {
        isDragging = false;
        canvas.style.cursor = 'grab';
    }

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Колёсико — вращение вокруг Y
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        hasInteracted = true;
        targetRotY += e.deltaY * 0.005;
    }, { passive: false });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Инерция
        if (!isDragging) {
            targetRotY += velocityY;
            targetRotX += velocityX;
            targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
            velocityY *= 0.94;
            velocityX *= 0.94;

            // Если пользователь не взаимодействовал — авто-покачивание
            if (!hasInteracted) {
                targetRotY = Math.sin(elapsed * 0.5) * 0.4;
            }
        }

        // Плавное сглаживание
        currentRotY += (targetRotY - currentRotY) * 0.08;
        currentRotX += (targetRotX - currentRotX) * 0.08;

        bulbGroup.rotation.y = currentRotY;
        bulbGroup.rotation.x = currentRotX;

        // Пульсация света внутри
        innerLight.intensity = 4 + Math.sin(elapsed * 3) * 1.5;
        
        // Пульсация свечения мозга
        brainMaterial.emissiveIntensity = 2 + Math.sin(elapsed * 2) * 0.8;

        // Пульсация ореола
        glowSprite.material.opacity = 0.7 + Math.sin(elapsed * 2) * 0.2;
        glowSprite.scale.setScalar(5 + Math.sin(elapsed * 2) * 0.3);

        // Анимация нейронов
        neurons.rotation.y = elapsed * 0.3;

        // Анимация частиц — поднимаются вверх
        const positions = particleGeo.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] += particleVelocities[i].x;
            positions[i * 3 + 1] += particleVelocities[i].y;
            positions[i * 3 + 2] += particleVelocities[i].z;

            // Если улетела слишком высоко — сбрасываем вниз
            if (positions[i * 3 + 1] > 2.5) {
                positions[i * 3] = (Math.random() - 0.5) * 4;
                positions[i * 3 + 1] = -2.5;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
            }
        }
        particleGeo.attributes.position.needsUpdate = true;

        // Медленное вращение мозга внутри (эффект жизни)
        brainGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.15;

        renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', handleResize);

    // Начальная установка
    canvas.style.cursor = 'grab';
}