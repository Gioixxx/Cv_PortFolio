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
            const link = document.createElement('a');
            link.href = 'cv.pdf';
            link.download = 'cv.pdf';
            link.click();
            result = `<span class="cmd-accent">Download CV avviato...</span>`;
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

// Project Modal System
const ProjectModal = {
    projects: {
        'multitenant': {
            title: 'Sistema Gestionale Multi-Tenant',
            tags: ['ASP.NET Core', 'Angular', 'PostgreSQL', 'CQRS', 'Event Sourcing'],
            description: `
                Una piattaforma enterprise completa progettata per gestire le operazioni di diverse aziende all'interno di un'unica istanza applicativa. 
                L'obiettivo principale era garantire la totale separazione dei dati mantenendo la flessibilità di configurazione per ogni tenant.
                
                Il sistema gestisce l'intero ciclo di vita degli ordini, l'anagrafica clienti, la fatturazione elettronica e reportistica avanzata.
                L'architettura a microservizi (modulare) permette di scalare le singole componenti in base al carico.
            `,
            features: [
                'Separazione logica e fisica dei dati per Tenant',
                'Sistema di autenticazione centralizzato (IdentityServer)',
                'Gestione ruoli e permessi granulari',
                'Audit Log immutabile per compliance legale',
                'Motore di reportistica personalizzabile',
                'API Gateway per integrazioni esterne'
            ],
            tech: [
                '.NET 8', 'C#', 'Angular 17', 'TypeScript', 'RxJS', 
                'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'Azure DevOps'
            ]
        },
        'ftp-sftp': {
            title: 'Sistema Integrazioni FTP/SFTP',
            tags: ['ASP.NET Core', 'Hangfire', 'Docker', 'SFTP', 'AS400'],
            description: `
                Un middleware robusto per l'automazione del trasferimento file tra sistemi legacy (AS400, Mainframe) e piattaforme cloud moderne.
                Il sistema risolve il problema della gestione manuale dei flussi dati, offrendo una dashboard centralizzata per il monitoraggio e la configurazione.
                
                Supporta protocolli multipli (FTP, SFTP, FTPS, SMB) e implementa logiche di retry intelligenti in caso di fallimento della rete.
            `,
            features: [
                'Dashboard di monitoraggio in tempo reale',
                'Configurazione flussi via UI (senza codice)',
                'Sistema di notifiche proattivo (Email, Teams, Slack)',
                'Gestione sicura delle credenziali (Vault)',
                'Compressione e crittografia automatica dei file',
                'Logging strutturato con ElasticSearch'
            ],
            tech: [
                '.NET Core', 'Hangfire', 'SignalR', 'FluentValidation',
                'Docker Compose', 'SSH.NET', 'Serilog', 'ELK Stack'
            ]
        },
        'tabaccherie': {
            title: 'Gestionale Tabaccherie',
            tags: ['.NET / WPF', 'SQL Server', 'Entity Framework', 'MVVM'],
            description: `
                Software desktop per la gestione completa del punto vendita, ottimizzato per schermi touch-screen.
                L'applicazione semplifica le operazioni quotidiane del tabaccaio, dall'emissione dello scontrino alla gestione automatica degli ordini verso i monopoli.
                
                Particolare attenzione è stata data all'usabilità (UX) per permettere operazioni veloci anche nei momenti di picco.
            `,
            features: [
                'Interfaccia Touch-First ad alto contrasto',
                'Lettura codici a barre e QR Code',
                'Integrazione Registratori Telematici (RT)',
                'Calcolo automatico aggio e ricavi',
                'Algoritmo predittivo per il riordino scorte',
                'Backup automatico in cloud'
            ],
            tech: [
                'WPF', 'XAML', 'C#', 'MVVM Toolkit', 
                'SQL Server LocalDB', 'Dapper', 'Syncfusion Controls'
            ]
        },
        'password': {
            title: 'Gestionale Password (Vault)',
            tags: ['.NET Core', 'Blazor', 'IdentityServer', 'Cryptography'],
            description: `
                Soluzione di sicurezza per la gestione centralizzata delle credenziali aziendali. 
                Progettata con architettura "Zero-Knowledge", garantisce che nemmeno gli amministratori del server possano accedere ai dati decifrati.
                
                Ideale per team di sviluppo che devono condividere accessi a server, database e servizi cloud in modo sicuro e tracciato.
            `,
            features: [
                'Crittografia AES-256 Client-Side',
                'Condivisione sicura tramite link a tempo',
                'Autenticazione a due fattori (2FA)',
                'Rilevamento password compromesse (HaveIBeenPwned)',
                'Estensione browser per auto-fill',
                'Integrazione Active Directory'
            ],
            tech: [
                'Blazor WebAssembly', '.NET 8', 'IdentityServer4', 
                'Web Crypto API', 'SignalR', 'SQL Server'
            ]
        }
    },

    init() {
        this.bindEvents();
    },

    bindEvents() {
        // Close on overlay click
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.close();
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },

    open(projectId) {
        const project = this.projects[projectId];
        if (!project) return;

        // Populate content
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').innerText = project.description;
        
        // Tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = project.tags.map(tag => 
            `<span class="project-tag">${tag}</span>`
        ).join('');

        // Features
        const featuresContainer = document.getElementById('modal-features');
        featuresContainer.innerHTML = project.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');

        // Tech
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = project.tech.map(t => 
            `<span class="tech-tag">${t}</span>`
        ).join('');

        // Show modal
        const modal = document.getElementById('project-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    },

    close() {
        const modal = document.getElementById('project-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    ProjectModal.init();
    ThemeManager.init();
    PortfolioFilter.init();
    Terminal.init();
    SmoothNav.init();

    // Add terminal hint
    console.log('%c Press L to open the terminal ', 'background: #ccff00; color: #0f0f11; padding: 5px 10px; border-radius: 4px; font-family: monospace;');

    // Dynamic Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
