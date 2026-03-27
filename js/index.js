// File: /js/index.js

const cube = document.getElementById('cube');
let isDragging = false;
let startMouseX, startMouseY;
let currentRotationX = -20;
let currentRotationY = 30;

// Set initial position
cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

document.addEventListener('mousedown', (e) => {
    isDragging = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startMouseX;
    const deltaY = e.clientY - startMouseY;

    // Adjust rotation based on mouse movement
    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;

    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

    startMouseX = e.clientX;
    startMouseY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});