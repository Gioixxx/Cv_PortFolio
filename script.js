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
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            // Nessuna preferenza salvata: rispetta il tema chiaro del sistema alla prima visita.
            // Se il sistema preferisce dark (o non esprime preferenza) resta il default Matrix.
            this.setTheme('clean');
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
    gameActive: false,
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
  <span class="cmd-cmd">play</span>        - Mini-game bug-runner
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
<span class="cmd-highlight">Email:</span>    mantellogioele@gmail.com
<span class="cmd-highlight">GitHub:</span>   github.com/Gioixxx
<span class="cmd-highlight">LinkedIn:</span> linkedin.com/in/giuseppe-gioele-mantello-002a9aab

<span class="cmd-muted">Digita</span> <span class="cmd-cmd">goto contatti</span> <span class="cmd-muted">per la sezione contatti</span>`,

        projects: () => `
<span class="cmd-accent">Progetti</span>
<span class="cmd-muted">────────────────────────────────</span>
<span class="cmd-highlight">[1]</span> Sistema Gestionale Multi-Tenant    <span class="cmd-tag">ASP.NET Core</span> <span class="cmd-tag">Angular</span> <span class="cmd-tag">CQRS</span>
<span class="cmd-highlight">[2]</span> Sistema Integrazioni FTP/SFTP      <span class="cmd-tag">Hangfire</span> <span class="cmd-tag">Docker</span> <span class="cmd-tag">SFTP</span>
<span class="cmd-highlight">[3]</span> Gestionale Tabaccherie             <span class="cmd-tag">.NET/WPF</span> <span class="cmd-tag">SQLite</span> <span class="cmd-tag">OCR</span>
<span class="cmd-highlight">[4]</span> Gestionale Password                <span class="cmd-tag">Blazor</span> <span class="cmd-tag">IdentityServer</span> <span class="cmd-tag">Cryptography</span>
<span class="cmd-highlight">[5]</span> TimeSheet                          <span class="cmd-tag">Next.js</span> <span class="cmd-tag">Electron</span> <span class="cmd-tag">Prisma</span>
<span class="cmd-highlight">[6]</span> MonitorExtender                    <span class="cmd-tag">C#</span> <span class="cmd-tag">Kotlin</span> <span class="cmd-tag">MJPEG</span>
<span class="cmd-highlight">[7]</span> iAPi - Gateway LLM                 <span class="cmd-tag">FastAPI</span> <span class="cmd-tag">Docker</span> <span class="cmd-tag">Ollama</span>
<span class="cmd-highlight">[8]</span> My Road - L'Ascesa                <span class="cmd-tag">Next.js</span> <span class="cmd-tag">TypeScript</span> <span class="cmd-tag">Tailwind</span>
<span class="cmd-highlight">[9]</span> Vektor - SaaS a plugin             <span class="cmd-tag">.NET 8</span> <span class="cmd-tag">PostgreSQL</span> <span class="cmd-tag">Plugin</span>
<span class="cmd-highlight">[10]</span> InsideTrade - Bot di segnali      <span class="cmd-tag">Python</span> <span class="cmd-tag">Binance</span> <span class="cmd-tag">Telegram</span>
<span class="cmd-highlight">[11]</span> claude-libs - Tooling Claude Code <span class="cmd-tag">PowerShell</span> <span class="cmd-tag">Python</span> <span class="cmd-tag">MCP</span>

<span class="cmd-muted">Digita</span> <span class="cmd-cmd">goto portfolio</span> <span class="cmd-muted">per i dettagli</span>`,

        play: () => {
            setTimeout(() => TerminalGame.start(), 400);
            return `<span class="cmd-accent">Avvio bug-runner...</span>\n<span class="cmd-muted">SPAZIO per saltare, ESC per uscire</span>`;
        },

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
            if (e.key === 'Escape' && this.isOpen && !this.gameActive) {
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
        if (this.gameActive) TerminalGame.stop();
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
            link.download = 'Giuseppe-Gioele-Mantello-CV.pdf';
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

// Bug-runner mini-game, played inside the Terminal (canvas swapped in for the output/input while active)
const TerminalGame = {
    canvas: null,
    ctx: null,
    running: false,
    animationId: null,
    keyHandler: null,

    start() {
        const output = document.getElementById('terminal-output');
        const inputLine = document.querySelector('.terminal-input-line');
        if (!output) return;

        document.getElementById('terminal-input')?.blur();
        if (inputLine) inputLine.style.display = 'none';

        output.innerHTML = '';
        output.classList.add('terminal-game-active');

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'terminal-game-canvas';
        this.canvas.width = output.clientWidth;
        this.canvas.height = output.clientHeight;
        output.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.groundY = this.canvas.height - 30;
        this.player = { x: 30, y: this.groundY - 20, w: 18, h: 20, vy: 0, jumping: false };
        this.obstacles = [];
        this.frame = 0;
        this.lastObstacleFrame = 0;
        this.nextObstacleGap = 60;
        this.speed = 4;
        this.score = 0;
        this.running = true;
        Terminal.gameActive = true;

        // start() can be re-entered via the 'r' restart shortcut — never stack listeners
        if (this.keyHandler) document.removeEventListener('keydown', this.keyHandler);
        this.keyHandler = (e) => this.handleKey(e);
        document.addEventListener('keydown', this.keyHandler);

        this.loop();
    },

    handleKey(e) {
        if ((e.code === 'Space' || e.key === 'ArrowUp') && this.running && !this.player.jumping) {
            e.preventDefault();
            this.player.vy = -9;
            this.player.jumping = true;
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            this.stop();
        }
        if (!this.running && e.key.toLowerCase() === 'r') {
            this.start();
        }
    },

    loop() {
        if (!this.running) return;
        if (!this.canvas || !this.canvas.isConnected) {
            this.cleanup();
            return;
        }
        this.update();
        // update() may call gameOver(), which sets running=false and already drew the
        // end screen — re-check so this draw() doesn't immediately clear it
        if (!this.running) return;
        this.draw();
        this.animationId = requestAnimationFrame(() => this.loop());
    },

    update() {
        this.frame++;

        this.player.vy += 0.5;
        this.player.y += this.player.vy;
        if (this.player.y >= this.groundY - this.player.h) {
            this.player.y = this.groundY - this.player.h;
            this.player.vy = 0;
            this.player.jumping = false;
        }

        if (this.frame - this.lastObstacleFrame > this.nextObstacleGap) {
            this.obstacles.push({ x: this.canvas.width, w: 16, h: 18 });
            this.lastObstacleFrame = this.frame;
            this.nextObstacleGap = 45 + Math.random() * 50;
        }

        this.obstacles.forEach(o => o.x -= this.speed);
        this.obstacles = this.obstacles.filter(o => o.x + o.w > 0);

        for (const o of this.obstacles) {
            const obstacleTop = this.groundY - o.h;
            if (this.player.x < o.x + o.w && this.player.x + this.player.w > o.x &&
                this.player.y + this.player.h > obstacleTop) {
                this.gameOver();
                return;
            }
        }

        this.score += 1;
        this.speed += 0.0025;
    },

    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(204, 255, 0, 0.4)';
        ctx.beginPath();
        ctx.moveTo(0, this.groundY);
        ctx.lineTo(w, this.groundY);
        ctx.stroke();

        ctx.fillStyle = '#ccff00';
        ctx.font = '18px "Fira Code", monospace';
        ctx.fillText('>_', this.player.x, this.player.y + this.player.h);

        ctx.font = '16px monospace';
        this.obstacles.forEach(o => ctx.fillText('🐛', o.x, this.groundY));

        ctx.fillStyle = '#a1a1aa';
        ctx.font = '12px "Fira Code", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`Score: ${Math.floor(this.score / 5)}`, w - 10, 18);
        ctx.textAlign = 'left';
    },

    gameOver() {
        this.running = false;
        if (this.animationId) cancelAnimationFrame(this.animationId);

        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.fillStyle = 'rgba(10, 10, 12, 0.85)';
        ctx.fillRect(0, 0, w, h);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#ccff00';
        ctx.font = 'bold 16px "Fira Code", monospace';
        ctx.fillText('GAME OVER', w / 2, h / 2 - 10);

        ctx.fillStyle = '#a1a1aa';
        ctx.font = '12px "Fira Code", monospace';
        ctx.fillText(`Score: ${Math.floor(this.score / 5)} — R per rigiocare, ESC per uscire`, w / 2, h / 2 + 14);
        ctx.textAlign = 'left';
    },

    cleanup() {
        this.running = false;
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.keyHandler) document.removeEventListener('keydown', this.keyHandler);
        Terminal.gameActive = false;
    },

    stop() {
        const finalScore = Math.floor(this.score / 5);
        this.cleanup();

        const output = document.getElementById('terminal-output');
        const inputLine = document.querySelector('.terminal-input-line');
        if (output) {
            output.classList.remove('terminal-game-active');
            output.innerHTML = `\n<span class="cmd-accent">Bug-runner terminato.</span> <span class="cmd-muted">Score: ${finalScore}</span>\n`;
        }
        if (inputLine) {
            inputLine.style.display = '';
            document.getElementById('terminal-input')?.focus();
        }
    }
};

// Mobile hamburger navigation
const NavToggle = {
    init() {
        this.toggle = document.getElementById('nav-toggle');
        this.navLinks = document.getElementById('nav-links');
        if (!this.toggle || !this.navLinks) return;

        this.toggle.addEventListener('click', () => this.toggleMenu());
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },

    toggleMenu() {
        this.navLinks.classList.contains('open') ? this.close() : this.open();
    },

    open() {
        this.navLinks.classList.add('open');
        this.toggle.classList.add('active');
        this.toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.navLinks.classList.remove('open');
        this.toggle.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
};

// Scroll-triggered reveal for sections below the hero (reuses the fadeInUp keyframe via .reveal/.is-visible in CSS)
const ScrollReveal = {
    init() {
        const targets = document.querySelectorAll('.reveal');
        if (!targets.length) return;

        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        targets.forEach(el => observer.observe(el));
    }
};

// Highlights the nav link matching the section currently in view
const ScrollSpy = {
    init() {
        this.navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
        this.sections = this.navLinks
            .map(link => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        if (!this.sections.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const href = `#${entry.target.id}`;
                this.navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === href);
                });
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        this.sections.forEach(section => observer.observe(section));
    }
};

// Hover micro-interactions (card tilt, magnetic buttons) — skipped for touch devices and reduced-motion preference
const MicroInteractions = {
    cardLift: {
        'skill-card': -8,
        'project-card': -5,
        'competenza-card': -5,
        'info-card': -3
    },
    btnLift: {
        'btn-primary': -3,
        'btn-secondary': -2,
        'btn-outline': -2
    },

    init() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (prefersReducedMotion || !hasFinePointer) return;

        this.bindTilt();
        this.bindMagneticButtons();
    },

    bindTilt() {
        const cards = document.querySelectorAll('.skill-card, .project-card, .competenza-card, .info-card');
        cards.forEach(card => {
            const liftClass = Object.keys(this.cardLift).find(c => card.classList.contains(c));
            const lift = this.cardLift[liftClass] ?? -5;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width;
                const py = (e.clientY - rect.top) / rect.height;
                const rotateX = (0.5 - py) * 8;
                const rotateY = (px - 0.5) * 8;
                card.style.transition = 'transform 0.1s ease-out';
                card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${lift}px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform var(--transition-mid)';
                card.style.transform = '';
            });
        });
    },

    bindMagneticButtons() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            const liftClass = Object.keys(this.btnLift).find(c => btn.classList.contains(c));
            const lift = this.btnLift[liftClass] ?? -2;

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
                btn.style.transition = 'transform 0.1s ease-out';
                btn.style.transform = `translate(${x}px, ${y + lift}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transition = 'transform var(--transition-mid)';
                btn.style.transform = '';
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
            tags: ['.NET 8 / WPF', 'EF Core + SQLite', 'MVVM', 'OCR'],
            description: `
                Applicativo desktop Windows per la gestione di tabaccherie italiane, conforme alle normative ADM e Logista.
                Copre l'intero ciclo operativo: listino prodotti, magazzino, ordini in transito, vendite e inventari.

                Il listino ufficiale si scarica direttamente dal portale Logista e le consegne si caricano fotografando la fattura con lo smartphone: l'analisi avviene in locale con l'OCR nativo di Windows, senza servizi esterni.
            `,
            features: [
                'Sincronizzazione del listino dal portale Logista e import da Excel ADM/Logista',
                'Storico prezzi automatico e immutabile',
                'Barcode EAN-13 con doppio codice (stecca e pacchetto) e lettore USB',
                'Consegne da foto della fattura con OCR offline e pairing via QR code',
                'Dashboard con vendite degli ultimi 7 giorni, sottoscorte e ordini in transito',
                'Gratta e Vinci, valori bollati e inventari ciclici con calcolo delle varianze',
                'Backup manuale e automatico, con integrazione OneDrive / Google Drive',
                'Aggiornamento automatico con canale Stabile o Beta'
            ],
            tech: [
                '.NET 8', 'WPF', 'C#', 'CommunityToolkit.Mvvm', 'Entity Framework Core 8',
                'SQLite', 'MaterialDesignThemes', 'LiveCharts', 'HtmlAgilityPack',
                'ZXing.Net', 'Windows.Media.Ocr', 'Inno Setup'
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
        },
        'timesheet': {
            title: 'TimeSheet',
            tags: ['Next.js', 'Electron', 'Prisma', 'SQLite', 'AI locale'],
            description: `
                App desktop per il tracciamento delle ore lavorative pensata per essere completamente locale: il database SQLite sta sul disco dell'utente e anche l'AI opzionale gira su un gateway self-hosted nella rete locale, quindi nessun dato lascia la LAN.

                Si distribuisce come singolo .exe portabile per Windows, senza installer. Il codice è open source (MIT).
            `,
            features: [
                'Registrazione rapida con cliente, progetto, tag, tipo di attività e durata',
                'Input in linguaggio naturale: una frase come "2 ore di supporto al cliente Rossi ieri" compila il form',
                'Task board kanban e vista calendario con il riepilogo mensile delle ore',
                'Ricerca globale con risultati live e filtri per mese, attività e cliente',
                'Export CSV del timesheet di qualsiasi mese',
                'Automazione via email: polling IMAP che converte i messaggi in voci di timesheet',
                'Funzionamento completo anche senza gateway AI configurato'
            ],
            tech: [
                'Next.js 16', 'React 19', 'Electron 36', 'Prisma 6', 'SQLite',
                'React Hook Form', 'Zod', 'electron-builder', 'iAPi (Ollama)'
            ]
        },
        'monitorextender': {
            title: 'MonitorExtender',
            tags: ['C# / .NET', 'Kotlin', 'MJPEG', 'GitHub Actions'],
            description: `
                Trasforma un tablet Android nello schermo di un PC Windows, via cavo USB o via Wi-Fi, e permette di comandare il mouse del PC dal touchscreen. Nato per un caso d'uso preciso: un mini PC senza monitor con il tablet come unico schermo.

                Il PC cattura lo schermo, lo ridimensiona, lo codifica in JPEG e lo serve come stream multipart su HTTP: ogni frame è un'immagine indipendente, quindi lo stream si può guardare anche da un browser qualsiasi.
            `,
            features: [
                'Due collegamenti con parametri diversi: USB a 36,8 Mbit/s misurati (30 fps), Wi-Fi a 13,8 Mbit/s (720p, 20 fps)',
                'Controllo del mouse con gesti touch: click e trascinamento, rotella a due dita, tasto destro',
                'Comandi accettati solo da loopback: trasmettere lo schermo è passivo, accettare input è un telecomando',
                'Ricerca automatica del server in rete tramite UDP',
                'Modalità opzionale con un vero secondo monitor esteso, tramite un driver di display virtuale di terze parti',
                'Installer Windows, build e release automatizzate con GitHub Actions'
            ],
            tech: [
                'C# / .NET', 'Desktop Duplication', 'Kotlin (app Android)', 'HTTP MJPEG',
                'UDP', 'ADB', 'Inno Setup', 'GitHub Actions', 'PowerShell'
            ]
        },
        'iapi': {
            title: 'iAPi — Gateway LLM self-hosted',
            tags: ['Python', 'FastAPI', 'Docker', 'Ollama', 'LM Studio'],
            description: `
                Gateway HTTP che serve un modello IA piccolo su un Raspberry Pi 5, così che altri container Docker in LAN possano fare richieste di inferenza (scrittura di email, testi brevi) senza parlare direttamente con il backend.

                Il backend si sceglie in modo esplicito con una variabile di configurazione, mai in automatico: con due server attivi, quale modello risponde non deve dipendere da quale dei due ha risposto per primo.
            `,
            features: [
                'Endpoint di generazione e di streaming (NDJSON) con status HTTP distinti per modello non pronto, backend giù e timeout',
                'Provider selezionabile tra Ollama in container e LM Studio sull\'host, via API compatibile OpenAI',
                'Download del modello automatico al primo avvio e dopo il reset di un volume, in background e senza bloccare lo startup',
                'LM Studio in ascolto solo sull\'interfaccia del bridge Docker: raggiungibile dai container, non dalla LAN',
                'Disattivazione del "thinking" dei modelli reasoning: risposta misurata 3,6 volte più veloce su un testo di lunghezza email',
                'Il campo model riporta sempre il modello che ha davvero risposto, con warning se differisce da quello richiesto',
                'Interfaccia web per email, risposte e correzioni, servita dal gateway stesso'
            ],
            tech: [
                'Python', 'FastAPI', 'Uvicorn', 'httpx', 'Pydantic',
                'Docker Compose', 'Ollama', 'LM Studio', 'systemd', 'Raspberry Pi 5'
            ]
        },
        'myroad': {
            title: 'My Road — L\'Ascesa',
            tags: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
            description: `
                Simulatore testuale della carriera di un calciatore: scelte narrative, statistiche, trasferimenti, trofei e convocazioni in nazionale, tutto in italiano e con nomi reali di club e competizioni.

                Non c'è un backend: i salvataggi restano nel browser o nell'eseguibile locale. Il gioco si distribuisce anche come .exe per Windows tramite GitHub Release.
            `,
            features: [
                'Motore di simulazione puro, separato dalla UI, con eventi probabilistici: offerte di mercato, infortuni, crisi di club, nazionale',
                'Script di taratura che simula 2000 carriere per calibrare le probabilità del motore',
                '124 club in 9 paesi, archivio multi-carriera, Hall of Fame e record personali',
                'Tre ritmi di gioco e creazione del personaggio (ruolo, nazionalità, piede)',
                'Overlay celebrativi, dark mode, musica di sottofondo e salvataggio locale',
                'Launcher Windows che incapsula l\'export statico in una WebView2'
            ],
            tech: [
                'Next.js 16 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS v4',
                'Vitest', 'Testing Library', 'Static export', '.NET 10 + WebView2'
            ]
        },
        'vektor': {
            title: 'Vektor — SaaS a plugin',
            tags: ['.NET 8', 'PostgreSQL', 'Plugin architecture', 'NuGet'],
            description: `
                SaaS "tutto a plugin": un kernel headless che non implementa funzionalità di business, ma definisce gli standard di aggancio. Tutto ciò che non è nel kernel è, per definizione, un plugin. Ogni cliente riceve un'istanza dedicata, assemblata come distribuzione: kernel, insieme di plugin e configurazione.

                Progetto in sviluppo e repository privato. L'architettura è descritta in una specifica scritta prima del codice, e le decisioni sono tracciate come ADR.
            `,
            features: [
                'Kernel headless: nessuna UI e nessun protocollo di rete cablato, anche gateway REST, autenticazione e scheduler sono plugin di sistema',
                'Sei primitive di aggancio: esporre e consumare servizi, emettere e sottoscrivere eventi, intercettare con hook, contribuire in modo dichiarativo',
                'I plugin dipendono solo dal progetto dei contratti, mai dal core né da altri plugin: le dipendenze vivono nei manifest e si risolvono a runtime',
                'Manifest YAML validato con JSON Schema e distribuzioni per cliente',
                'Persistenza progettata su PostgreSQL con schema per plugin e outbox per gli eventi durevoli',
                'API del kernel versionata semanticamente fin dal primo giorno'
            ],
            tech: [
                '.NET 8', 'C#', 'PostgreSQL', 'NuGet (plugin come pacchetti)',
                'YAML + JSON Schema', 'Angular + Module Federation (pianificato)'
            ]
        },
        'insidetrade': {
            title: 'InsideTrade — Bot di segnali crypto',
            tags: ['Python', 'Binance API', 'Telegram', 'Docker'],
            description: `
                Bot di accumulo sui ribassi per acquisti manuali. Scarica le candele da Binance per BTC, ETH e SOL in euro e lavora su due timeframe: la SMA200 sul daily definisce il regime di trend, mentre RSI14 e prezzo sulla candela corta catturano il momentum intraday.

                Da regime e momentum assegna un tier e notifica su Telegram solo quando entra in un tier di acquisto, spiegando il perché. Non è trading automatico né consulenza finanziaria: la decisione e l'importo restano all'utente. Repository privato.
            `,
            features: [
                'Tre tier di segnale (A, B, C) con notifica solo all\'ingresso, mai al ritorno a neutro',
                'Isteresi sull\'RSI e filtro di convinzione basato su conferme indipendenti: da 37,2 a 4,5 messaggi al giorno su 1000 candele da 15 minuti',
                'Taratura dei filtri su storico reale con un comando di replay',
                'Il messaggio gradua la forza del segnale in base alla confluenza tra timeframe e segnala il volume di capitolazione',
                'Diario degli acquisti manuali via comandi Telegram, con prezzo medio di carico al netto della commissione e P&L',
                'Alert di uscita su stop loss, take profit e trailing; il bot risponde solo alla chat configurata'
            ],
            tech: [
                'Python', 'Binance API', 'Telegram Bot API', 'Docker', 'SMA / RSI'
            ]
        },
        'claude-libs': {
            title: 'claude-libs — Tooling per Claude Code',
            tags: ['PowerShell', 'Python', 'MCP', 'GitHub Actions'],
            description: `
                Libreria riusabile per Claude Code: moduli Markdown per stack, slash command, skill e template di memoria. Ogni progetto importa solo i moduli che gli servono e un motore di setup lo porta allo stato descritto nel suo file di configurazione.

                Include server MCP in Python e un client condiviso per usare un modello locale, scelto tra Ollama e LM Studio. Repository privato.
            `,
            features: [
                'Moduli Markdown a due livelli per stack (.NET, Angular, Next.js, Spring, FastAPI, Electron e altri)',
                'Setup dichiarativo: workspace.json descrive lo stato, reconcile lo applica in modo idempotente e con modalità dry-run per rilevare il drift',
                'Server MCP in Python: ricerca semantica dei moduli, sidecar per task meccanici su LLM locale, deploy e rilascio',
                'Provider LLM locale selezionabile tra Ollama e LM Studio, con client condiviso e test di non regressione',
                'Validazione e test automatizzati in CI; rilasci con versionamento semantico'
            ],
            tech: [
                'PowerShell', 'Python', 'Bash', 'MCP', 'GitHub Actions',
                'Ollama', 'LM Studio', 'C# / WPF (GUI)'
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
    NavToggle.init();
    ScrollReveal.init();
    ScrollSpy.init();
    MicroInteractions.init();

    // Add terminal hint
    console.log('%c Press L to open the terminal ', 'background: #ccff00; color: #0f0f11; padding: 5px 10px; border-radius: 4px; font-family: monospace;');

    // Dynamic Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
