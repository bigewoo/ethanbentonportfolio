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

// ==========================================
// COMMAND DEFINITIONS
// ==========================================
const commands = {
    help: {
        description: "Displays all available commands or details about a specific command.",
        usage: "help [command]"
    },
    ls: {
        description: "Lists files and directories in the current directory.",
        usage: "ls [directory]"
    },
    cd: {
        description: "Changes the current directory.",
        usage: "cd [directory]"
    },
    clear: {
        description: "Clears the terminal output.",
        usage: "clear"
    },
    whoami: {
        description: "Displays user information.",
        usage: "whoami"
    },
    exit: {
        description: "Closes the terminal window.",
        usage: "exit"
    }
};

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

// ==========================================
// Cube Logic
// ==========================================
let isDragging = false;
let startMouseX, startMouseY;
let currX = -20, currY = 30;

cube.style.transform = `rotateX(${currX}deg) rotateY(${currY}deg)`;

document.addEventListener('mousedown', (e) => {
    isDragging = true;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currY += (e.clientX - startMouseX) * 0.5;
    currX -= (e.clientY - startMouseY) * 0.5;
    cube.style.transform = `rotateX(${currX}deg) rotateY(${currY}deg)`;
    startMouseX = e.clientX;
    startMouseY = e.clientY;
});

document.addEventListener('mouseup', () => isDragging = false);

// ==========================================
// TERMINAL LOGIC
// ==========================================
const terminalIcon = document.getElementById('terminal-icon');
const terminalWindow = document.getElementById('terminal-window');
const closeTerminal = document.getElementById('close-terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const promptElement = document.getElementById('prompt');
const terminalBody = document.getElementById('terminal-body');

let currentDir = "~";
let tabCount = 0;
let lastTabInput = "";

const fileSystem = {
    "~": ["about/", "education/", "work/", "contact/"],
    "about": ["bio.txt", "tech_stack.json"],
    "education": ["degree.txt", "certs.txt"],
    "work": ["experience.yaml", "projects.txt"],
    "contact": ["socials.txt"]
};

terminalIcon.addEventListener('click', () => {
    terminalWindow.classList.toggle('hidden');
    if (!terminalWindow.classList.contains('hidden')) terminalInput.focus();
});

closeTerminal.addEventListener('click', () => {
    terminalWindow.classList.add('hidden');
});

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        handleTabAutocomplete();
        return;
    }

    // Reset tab count if any other key is pressed
    tabCount = 0;

    if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        const [cmd, ...args] = input.toLowerCase().split(' ');

        if (input !== "") {
            processCommand(cmd, args, input);
        } else {
            // Just print a new prompt line if they press enter on an empty line
            const displayDir = currentDir === "~" ? "~" : "/" + currentDir;
            terminalOutput.innerHTML += `\nethanbenton@portfolio:${displayDir}$ \n`;
        }

        // Clear the input immediately so it's not prefilled
        terminalInput.value = '';

        // Auto-scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

function handleTabAutocomplete() {
    const input = terminalInput.value; 
    
    // Reset tab cycle if the input string changes
    if (input !== lastTabInput) {
        tabCount = 0;
    }
    lastTabInput = input;
    
    const parts = input.split(" ");
    let matches = [];

    if (parts.length === 1) {
        // 1. Autocompleting commands
        matches = Object.keys(commands).filter(cmd => cmd.startsWith(parts[0].toLowerCase()));

        if (matches.length === 1) {
            terminalInput.value = matches[0] + " ";
            tabCount = 0;
        }
    } else if (parts.length === 2 && (parts[0] === "cd" || parts[0] === "ls")) {
        // 2. Autocompleting directories/files
        const items = fileSystem[currentDir]
            ? fileSystem[currentDir].map(item => item.replace('/', ''))
            : [];

        matches = items.filter(item => item.startsWith(parts[1]));

        if (matches.length === 1) {
            terminalInput.value = `${parts[0]} ${matches[0]}`;
            
            // Automatically add a trailing slash back if it's a directory
            if (fileSystem["~"].includes(matches[0] + "/")) {
                terminalInput.value += "/";
            }
            tabCount = 0;
        }
    }

    // Handle double-tab to show options
    if (matches.length > 1) {
        tabCount++;
        if (tabCount >= 2) {
            const displayDir = currentDir === "~" ? "~" : "/" + currentDir;
            terminalOutput.innerHTML += `\n${matches.join("   ")}\nethanbenton@portfolio:${displayDir}$ ${input}`;
            tabCount = 0; 
        }
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
    
    // Force focus back to the input to prevent the browser from jumping to page links
    setTimeout(() => terminalInput.focus(), 0);
}

function processCommand(cmd, args, originalInput) {
    // Determine how the path should look for the history log
    const displayDir = currentDir === "~" ? "~" : "/" + currentDir;
    let response = `\nethanbenton@portfolio:${displayDir}$ ${originalInput}\n`;

    switch (cmd) {
        case 'help':
            if (args[0]) {
                const command = commands[args[0]];
                response += command
                    ? `${args[0]} - ${command.description}\nUsage: ${command.usage}`
                    : `No help found for '${args[0]}'`;
            } else {
                Object.entries(commands).forEach(([name, info]) => {
                    response += `${name.padEnd(10)} - ${info.description}\n`;
                });
            }
            break;

        case 'ls':
            let targetDirLs = args[0] || currentDir;
            
            // Strip trailing slash so lookup doesn't fail
            if (targetDirLs !== "~" && targetDirLs !== "/") {
                targetDirLs = targetDirLs.replace(/\/$/, ""); 
            }
            
            if (fileSystem[targetDirLs]) {
                response += fileSystem[targetDirLs].join("  ");
            } else {
                response += `ls: cannot access '${args[0]}': No such directory`;
            }
            break;

        case 'whoami':
            response += "Ethan Benton - System Administrator | DevOps | Generative AI";
            break;

        case 'clear':
            terminalOutput.innerHTML = "Terminal cleared. Type 'help' for commands.";
            return;

        case 'cd':
            let targetDirCd = args[0];
            
            // Strip trailing slash here too
            if (targetDirCd && targetDirCd !== "~" && targetDirCd !== "/" && targetDirCd !== "..") {
                targetDirCd = targetDirCd.replace(/\/$/, "");
            }

            if (!targetDirCd || targetDirCd === "~" || targetDirCd === "..") {
                currentDir = "~";
                response += "Returned to root directory.";
                // Scroll back to the top of the page
                document.body.scrollIntoView({ behavior: 'smooth' });
            } else if (fileSystem[targetDirCd]) {
                currentDir = targetDirCd;
                // Scroll to the specific section on the page
                const section = document.getElementById(targetDirCd);
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            } else {
                response += `bash: cd: ${args[0]}: No such directory`;
            }

            // UPDATE THE UI PROMPT dynamically
            const newDisplayDir = currentDir === "~" ? "~" : "/" + currentDir;
            promptElement.innerText = `ethanbenton@portfolio:${newDisplayDir}$`;
            break;

        case 'exit':
            terminalWindow.classList.add('hidden');
            return;

        default:
            response += `bash: ${cmd}: command not found`;
    }

    terminalOutput.innerHTML += response;
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Keep focus on input if clicking anywhere inside the terminal
terminalBody.addEventListener('click', () => {
    // Only focus the input if the user isn't trying to highlight/copy text
    if (window.getSelection().toString() === '') {
        terminalInput.focus();
    }
});

window.onload = typeEffect;