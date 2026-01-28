// ===================================
// GIOIX PORTFOLIO - Interactive Features
// ===================================

// Theme Toggle System
const ThemeManager = {
    currentTheme: 'matrix',

    init() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            this.setTheme(saved);
        }
        this.bindToggle();
    },

    bindToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }
    },

    toggle() {
        const newTheme = this.currentTheme === 'matrix' ? 'clean' : 'matrix';
        this.setTheme(newTheme);
    },

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.innerHTML = theme === 'matrix'
                ? '<span class="toggle-icon">&#9789;</span><span class="toggle-label">Clean</span>'
                : '<span class="toggle-icon">&#9783;</span><span class="toggle-label">Matrix</span>';
        }
    }
};

// Portfolio Filter System
const PortfolioFilter = {
    activeFilters: new Set(['all']),

    init() {
        this.bindFilters();
    },

    bindFilters() {
        const filters = document.querySelectorAll('.filter-tag');
        filters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                const tag = e.target.dataset.filter;
                this.handleFilter(tag, e.target);
            });
        });
    },

    handleFilter(tag, element) {
        const filters = document.querySelectorAll('.filter-tag');
        const projects = document.querySelectorAll('.project-card');

        // Reset all filters
        filters.forEach(f => f.classList.remove('active'));
        element.classList.add('active');

        // Filter projects
        projects.forEach(project => {
            const tags = project.dataset.tags ? project.dataset.tags.split(',') : [];

            if (tag === 'all' || tags.includes(tag)) {
                project.classList.remove('hidden');
                project.classList.add('visible');
            } else {
                project.classList.remove('visible');
                project.classList.add('hidden');
            }
        });
    }
};

// Interactive Terminal (Easter Egg)
const Terminal = {
    isOpen: false,
    history: [],
    historyIndex: -1,

    commands: {
        help: () => `
<span class="cmd-accent">Comandi disponibili:</span>
  <span class="cmd-cmd">whoami</span>      - Chi sono
  <span class="cmd-cmd">skills</span>      - Le mie competenze
  <span class="cmd-cmd">contact</span>     - Contattami
  <span class="cmd-cmd">projects</span>    - Lista progetti
  <span class="cmd-cmd">download cv</span> - Scarica il CV
  <span class="cmd-cmd">goto [section]</span> - Naviga (home, chi-sono, portfolio, competenze, contatti)
  <span class="cmd-cmd">theme [matrix|clean]</span> - Cambia tema
  <span class="cmd-cmd">clear</span>       - Pulisce il terminale
  <span class="cmd-cmd">exit</span>        - Chiude il terminale

<span class="cmd-muted">Premi L per aprire, ESC per chiudere</span>`,

        whoami: () => `
<span class="cmd-accent">Gioix</span> - Senior Full Stack Developer
<span class="cmd-muted">────────────────────────────────</span>
Specializzato in <span class="cmd-highlight">.NET</span> e <span class="cmd-highlight">Frontend Moderno</span>
Costruisco applicazioni scalabili, pulite e orientate al prodotto.

<span class="cmd-muted">Location:</span> Italia
<span class="cmd-muted">Focus:</span> Enterprise Applications, Clean Architecture, DDD`,

        skills: () => `
<span class="cmd-accent">Tech Stack</span>
<span class="cmd-muted">────────────────────────────────</span>
<span class="cmd-highlight">Backend:</span>   .NET, C#, SQL Server, PostgreSQL, REST APIs
<span class="cmd-highlight">Frontend:</span>  React, Angular, Vue, TypeScript, Tailwind
<span class="cmd-highlight">Cloud:</span>     Azure, Docker, Kubernetes, CI/CD
<span class="cmd-highlight">Arch:</span>      Microservizi, DDD, Clean Architecture, CQRS`,

        contact: () => `
<span class="cmd-accent">Contatti</span>
<span class="cmd-muted">────────────────────────────────</span>
<span class="cmd-highlight">Email:</span>    your@email.com
<span class="cmd-highlight">GitHub:</span>   github.com/gioix
<span class="cmd-highlight">LinkedIn:</span> linkedin.com/in/gioix

<span class="cmd-muted">Digita</span> <span class="cmd-cmd">goto contatti</span> <span class="cmd-muted">per la sezione contatti</span>`,

        projects: () => `
<span class="cmd-accent">Progetti</span>
<span class="cmd-muted">────────────────────────────────</span>
<span class="cmd-highlight">[1]</span> E-Commerce Platform    <span class="cmd-tag">.NET</span> <span class="cmd-tag">React</span> <span class="cmd-tag">Azure</span>
<span class="cmd-highlight">[2]</span> Task Management API    <span class="cmd-tag">.NET</span> <span class="cmd-tag">Docker</span> <span class="cmd-tag">PostgreSQL</span>
<span class="cmd-highlight">[3]</span> Dashboard Analytics    <span class="cmd-tag">Vue</span> <span class="cmd-tag">TypeScript</span> <span class="cmd-tag">D3.js</span>
<span class="cmd-highlight">[4]</span> Auth Microservice      <span class="cmd-tag">.NET</span> <span class="cmd-tag">JWT</span> <span class="cmd-tag">Redis</span>

<span class="cmd-muted">Digita</span> <span class="cmd-cmd">goto portfolio</span> <span class="cmd-muted">per i dettagli</span>`,

        clear: () => {
            const output = document.getElementById('terminal-output');
            if (output) output.innerHTML = '';
            return '';
        },

        exit: () => {
            Terminal.close();
            return '<span class="cmd-muted">Arrivederci!</span>';
        }
    },

    init() {
        this.createTerminal();
        this.bindKeys();
    },

    createTerminal() {
        const terminal = document.createElement('div');
        terminal.id = 'terminal';
        terminal.className = 'terminal';
        terminal.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-dots">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                </div>
                <span class="terminal-title">gioix@portfolio:~</span>
                <button class="terminal-close" onclick="Terminal.close()">&times;</button>
            </div>
            <div class="terminal-body">
                <div id="terminal-output" class="terminal-output">
<span class="cmd-accent">Welcome to Gioix Terminal v1.0</span>
<span class="cmd-muted">Digita</span> <span class="cmd-cmd">help</span> <span class="cmd-muted">per la lista dei comandi</span>
                </div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">guest@gioix:~$</span>
                    <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false">
                </div>
            </div>
        `;
        document.body.appendChild(terminal);

        const input = document.getElementById('terminal-input');
        input.addEventListener('keydown', (e) => this.handleInput(e));
    },

    bindKeys() {
        document.addEventListener('keydown', (e) => {
            // Only trigger if not typing in an input field
            if (e.key.toLowerCase() === 'l' && !this.isOpen &&
                !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                e.preventDefault();
                this.open();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    },

    toggle() {
        this.isOpen ? this.close() : this.open();
    },

    open() {
        const terminal = document.getElementById('terminal');
        terminal.classList.add('open');
        this.isOpen = true;
        document.getElementById('terminal-input').focus();
    },

    close() {
        const terminal = document.getElementById('terminal');
        terminal.classList.remove('open');
        this.isOpen = false;
    },

    handleInput(e) {
        const input = document.getElementById('terminal-input');

        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            if (cmd) {
                this.history.push(cmd);
                this.historyIndex = this.history.length;
                this.execute(cmd);
            }
            input.value = '';
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                input.value = this.history[this.historyIndex];
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                input.value = this.history[this.historyIndex];
            } else {
                this.historyIndex = this.history.length;
                input.value = '';
            }
        }
    },

    execute(cmd) {
        const output = document.getElementById('terminal-output');
        const parts = cmd.toLowerCase().split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        // Add command to output
        output.innerHTML += `\n<span class="cmd-prompt">guest@gioix:~$</span> ${cmd}\n`;

        let result = '';

        if (this.commands[command]) {
            result = this.commands[command](args);
        } else if (command === 'goto' && args[0]) {
            const section = args[0];
            const validSections = ['home', 'chi-sono', 'portfolio', 'competenze', 'contatti'];
            if (validSections.includes(section)) {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                result = `<span class="cmd-muted">Navigando a ${section}...</span>`;
                setTimeout(() => this.close(), 500);
            } else {
                result = `<span class="cmd-error">Sezione non trovata. Usa: ${validSections.join(', ')}</span>`;
            }
        } else if (command === 'download' && args[0] === 'cv') {
            result = `<span class="cmd-accent">Download CV in corso...</span>\n<span class="cmd-muted">(Funzionalità da implementare con il tuo CV)</span>`;
        } else if (command === 'theme') {
            if (args[0] === 'matrix' || args[0] === 'clean') {
                ThemeManager.setTheme(args[0]);
                result = `<span class="cmd-accent">Tema cambiato in ${args[0]}</span>`;
            } else {
                result = `<span class="cmd-error">Uso: theme [matrix|clean]</span>`;
            }
        } else {
            result = `<span class="cmd-error">Comando non riconosciuto: ${cmd}</span>\n<span class="cmd-muted">Digita</span> <span class="cmd-cmd">help</span> <span class="cmd-muted">per la lista comandi</span>`;
        }

        if (result) {
            output.innerHTML += result;
        }

        // Scroll to bottom
        output.scrollTop = output.scrollHeight;
    }
};

// Smooth scroll for navigation
const SmoothNav = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    PortfolioFilter.init();
    Terminal.init();
    SmoothNav.init();

    // Add terminal hint
    console.log('%c Press L to open the terminal ', 'background: #ccff00; color: #0f0f11; padding: 5px 10px; border-radius: 4px; font-family: monospace;');
});
