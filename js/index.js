// File: /js/index.js

const heroName = document.getElementById('hero-name');
const heroTitle = document.getElementById('hero-title');
const emailLink = document.getElementById('email-link');
const resumeLink = document.getElementById('resume-link');
const navLinksContainer = document.getElementById('nav-links');
const cube = document.getElementById('cube');

const nameText = "Hello, I'm Ethan";
const titleText = "System Administrator | DevOps | Generative AI";
const userEmail = "ethanfbenton@gmail.com";
const resumeText = "RESUME 📄"; // Added the emoji here

const menuItems = [
    { name: "ABOUT", link: "#about" },
    { name: "EDUCATION", link: "#education" },
    { name: "WORK", link: "#work" },
    { name: "CONTACT", link: "#contact" }
];

async function typeEffect() {
    // 1. Type Name
    for (let i = 0; i <= nameText.length; i++) {
        heroName.innerHTML = nameText.slice(0, i) + '<span class="cursor">_</span>';
        await new Promise(r => setTimeout(r, 60));
    }
    heroName.innerHTML = nameText;

    // 2. Type Title
    for (let i = 0; i <= titleText.length; i++) {
        heroTitle.innerHTML = titleText.slice(0, i) + '<span class="cursor">_</span>';
        await new Promise(r => setTimeout(r, 40));
    }
    heroTitle.innerHTML = titleText;

    // 3. Type Email
    for (let i = 0; i <= userEmail.length; i++) {
        emailLink.innerHTML = userEmail.slice(0, i) + '<span class="cursor">_</span>';
        await new Promise(r => setTimeout(r, 30));
    }
    emailLink.innerHTML = userEmail;

    // 4. Type Resume (Bottom Right)
    for (let i = 0; i <= resumeText.length; i++) {
        resumeLink.innerHTML = resumeText.slice(0, i) + '<span class="cursor">_</span>';
        await new Promise(r => setTimeout(r, 50));
    }
    resumeLink.innerHTML = resumeText;

    // 5. Type Sidebar Links
    for (const item of menuItems) {
        const anchor = document.createElement('a');
        anchor.href = item.link;
        navLinksContainer.appendChild(anchor);
        for (let i = 0; i <= item.name.length; i++) {
            anchor.innerHTML = `> ${item.name.slice(0, i)}<span>_</span>`;
            await new Promise(r => setTimeout(r, 50));
        }
        anchor.innerHTML = `> ${item.name}`;
    }
}
// Cube Logic
let isDragging = false;
let startMouseX, startMouseY;
let currX = -20, currY = 30;

cube.style.transform = `rotateX(${currX}deg) rotateY(${currY}deg)`;

document.addEventListener('mousedown', (e) => { isDragging = true; startMouseX = e.clientX; startMouseY = e.clientY; });
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currY += (e.clientX - startMouseX) * 0.5;
    currX -= (e.clientY - startMouseY) * 0.5;
    cube.style.transform = `rotateX(${currX}deg) rotateY(${currY}deg)`;
    startMouseX = e.clientX; startMouseY = e.clientY;
});
document.addEventListener('mouseup', () => isDragging = false);

window.onload = typeEffect;