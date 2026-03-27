// File: /js/index.js

const cube = document.getElementById('cube');
const navLinksContainer = document.getElementById('nav-links');

// 1. Terminal Typing Effect for Navigation
const menuItems = [
    { name: "ABOUT", link: "#about" },
    { name: "EDUCATION", link: "#education" },
    { name: "WORK", link: "#work" },
    { name: "CONTACT", link: "#contact" }
];

async function typeNavbar() {
    for (const item of menuItems) {
        let anchor = document.createElement('a');
        anchor.href = item.itemLink; // Placeholder for logic
        navLinksContainer.appendChild(anchor);
        
        // Type out each letter
        for (let i = 0; i <= item.name.length; i++) {
            anchor.innerHTML = `> ${item.name.slice(0, i)}<span class="cursor">_</span>`;
            anchor.href = item.link; 
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        // Remove the underscore from previous word before starting next
        anchor.innerHTML = `> ${item.name}`;
    }
}

// 2. Cube Rotation Logic
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

// Start the typing effect when the page loads
window.onload = typeNavbar;