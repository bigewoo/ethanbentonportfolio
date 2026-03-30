// File: /js/index.js

const cube = document.getElementById('cube');
const navLinksContainer = document.getElementById('nav-links');
const emailLink = document.getElementById('email-link');

const userEmail = "USER@EXAMPLE.COM";
const menuItems = [
    { name: "ABOUT", link: "#about" },
    { name: "EDUCATION", link: "#education" },
    { name: "WORK", link: "#work" },
    { name: "CONTACT", link: "#contact" }
];

async function typeEffect() {
    // 1. Type the Email in the Center First
    for (let i = 0; i <= userEmail.length; i++) {
        emailLink.innerHTML = `${userEmail.slice(0, i)}<span style="opacity: ${i % 2 === 0 ? 1 : 0}">_</span>`;
        await new Promise(r => setTimeout(r, 50));
    }
    emailLink.innerHTML = userEmail;

    // 2. Type the Sidebar Links
    for (const item of menuItems) {
        const anchor = document.createElement('a');
        anchor.href = item.link;
        navLinksContainer.appendChild(anchor);
        
        for (let i = 0; i <= item.name.length; i++) {
            anchor.innerHTML = `> ${item.name.slice(0, i)}<span style="opacity: ${i % 2 === 0 ? 1 : 0}">_</span>`;
            await new Promise(r => setTimeout(r, 50));
        }
        anchor.innerHTML = `> ${item.name}`;
    }
}

// Cube Rotation logic
let isDragging = false;
let startMouseX, startMouseY;
let currentRotationX = -20;
let currentRotationY = 30;

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
    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;
    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
});

document.addEventListener('mouseup', () => isDragging = false);

window.onload = typeEffect;