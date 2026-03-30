// File: /js/index.js

const heroName = document.getElementById('hero-name');
const heroTitle = document.getElementById('hero-title');
const emailLink = document.getElementById('email-link');
const resumeLink = document.getElementById('resume-link');
const navLinksContainer = document.getElementById('nav-links');
const socialLinksContainer = document.getElementById('social-links');
const cube = document.getElementById('cube');

const nameText = "Hello, I'm Ethan Benton";
const titleText = "System Administrator | DevOps | Generative AI";
const userEmail = "ethanfbenton@gmail.com";
const resumeText = "RESUME 📄";

const socialItems = [
    { name: "GITHUB", link: "https://github.com/bigewoo", icon: "fa-brands fa-github" },
    { name: "LINKEDIN", link: "https://www.linkedin.com/in/ethan-benton-a08a14313/", icon: "fa-brands fa-linkedin" }
];

const menuItems = [
    { name: "ABOUT", link: "#about" },
    { name: "EDUCATION", link: "#education" },
    { name: "WORK", link: "#work" },
    { name: "CONTACT", link: "#contact" }
];

async function typeEffect() {
    // 1. Type Name & Title
    await typeText(heroName, nameText, 60);
    await typeText(heroTitle, titleText, 40);

    // 2. Type Email
    await typeText(emailLink, userEmail, 30);

    // 3. Type Social Links (Bottom Left)
    for (const soc of socialItems) {
        const anchor = document.createElement('a');
        anchor.href = soc.link;
        anchor.target = "_blank";
        anchor.innerHTML = `<i class="${soc.icon}"></i> `; // Add icon first
        socialLinksContainer.appendChild(anchor);
        
        const textSpan = document.createElement('span');
        anchor.appendChild(textSpan);

        for (let i = 0; i <= soc.name.length; i++) {
            textSpan.innerHTML = soc.name.slice(0, i) + '<span>_</span>';
            await new Promise(r => setTimeout(r, 50));
        }
        textSpan.innerHTML = soc.name;
    }

    // 4. Type Resume (Bottom Right)
    await typeText(resumeLink, resumeText, 50);

    // 5. Type Sidebar Links
    for (const item of menuItems) {
        const anchor = document.createElement('a');
        anchor.href = item.link;
        navLinksContainer.appendChild(anchor);
        await typeText(anchor, `> ${item.name}`, 50);
    }
}

// Helper function to keep the code clean
async function typeText(element, text, speed) {
    for (let i = 0; i <= text.length; i++) {
        element.innerHTML = text.slice(0, i) + '<span class="cursor">_</span>';
        await new Promise(r => setTimeout(r, speed));
    }
    element.innerHTML = text;
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

// Terminal Logic
const terminalIcon = document.getElementById('terminal-icon');
const terminalWindow = document.getElementById('terminal-window');
const closeTerminal = document.getElementById('close-terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// Toggle Terminal
terminalIcon.addEventListener('click', () => {
    terminalWindow.classList.toggle('hidden');
    if (!terminalWindow.classList.contains('hidden')) terminalInput.focus();
});

closeTerminal.addEventListener('click', () => {
    terminalWindow.classList.add('hidden');
});

// Command Logic
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim().toLowerCase();
        processCommand(input);
        terminalInput.value = '';
    }
});

function processCommand(cmd) {
    let response = `\nethan@portfolio:~$ ${cmd}\n`;
    
    if (cmd === 'help') {
        response += "Available commands: help, ls, cd [section], clear, whoami, exit";
    } else if (cmd === 'ls') {
        response += "about  education  work  contact";
    } else if (cmd === 'whoami') {
        response += "Ethan Benton - SysAdmin | DevOps | GenAI Enthusiast";
    } else if (cmd === 'clear') {
        terminalOutput.innerHTML = "Terminal cleared.";
        return;
    } else if (cmd.startsWith('cd ')) {
        const section = cmd.split(' ')[1];
        const target = document.getElementById(section);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            response += `Navigating to ${section}...`;
        } else {
            response += `Directory not found: ${section}`;
        }
    } else if (cmd === 'exit') {
        terminalWindow.classList.add('hidden');
        return;
    } else {
        response += `Command not found: ${cmd}. Type 'help' for options.`;
    }

    terminalOutput.innerHTML += response;
    terminalBody.scrollTop = terminalBody.scrollHeight; // Auto-scroll to bottom
}

window.onload = typeEffect;