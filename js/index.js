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
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const promptElement = document.getElementById('prompt'); // The span for ethan@portfolio:~$

let currentDir = "~"; // Default root directory

// File system mapping for 'ls'
const fileSystem = {
    "~": ["about/", "education/", "work/", "contact/"],
    "about": ["bio.txt", "tech_stack.json", "goals.md"],
    "education": ["degree.pdf", "certs/", "courses.log"],
    "work": ["experience.yaml", "projects/", "references.txt"],
    "contact": ["email.url", "linkedin.url", "github.url"]
};

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim(); // Keep case-sensitive for display
        const [cmd, ...args] = input.toLowerCase().split(' '); 
        
        // 1. Process the command
        processCommand(cmd, args, input);

        // 2. Clear the input immediately
        terminalInput.value = '';
        
        // 3. Keep scrolled to bottom
        const body = document.getElementById('terminal-body');
        body.scrollTop = body.scrollHeight;
    }
});

function processCommand(cmd, args, originalInput) {
    let response = `\nethan@portfolio:${currentDir}$ ${originalInput}\n`;
    
    switch (cmd) {
        case 'help':
            response += "Available: ls, cd [dir], clear, whoami, exit, help";
            break;

        case 'ls':
            // Show content based on current directory
            const contents = fileSystem[currentDir === "~" ? "~" : currentDir];
            response += contents.join("  ");
            break;

        case 'whoami':
            response += "Ethan Benton - DevOps & SysAdmin Specialist";
            break;

        case 'clear':
            terminalOutput.innerHTML = "Terminal cleared. Type 'help' for commands.";
            return;

        case 'cd':
            const target = args[0];
            if (!target || target === "~" || target === "..") {
                currentDir = "~";
                response += "Returned to root.";
            } else if (fileSystem[target]) {
                currentDir = target;
                response += `Moved to ${target}.`;
                // Smooth scroll to the section
                const section = document.getElementById(target);
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            } else {
                response += `bash: cd: ${target}: No such directory`;
            }
            // Update the actual prompt text
            promptElement.innerText = `ethan@portfolio:${currentDir === "~" ? "~" : "/" + currentDir}$`;
            break;

        case 'exit':
            document.getElementById('terminal-window').classList.add('hidden');
            return;

        case '': // If user just hits enter
            break;

        default:
            response += `bash: ${cmd}: command not found`;
    }

    terminalOutput.innerHTML += response;
}

window.onload = typeEffect;