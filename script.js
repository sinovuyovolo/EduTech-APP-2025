document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL STATE & DOM ELEMENTS ---
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const themeToggle = document.getElementById('theme-toggle');
    const langSelect = document.getElementById('language-select');
    const loginForm = document.getElementById('login-form');
    let currentLang = 'en';

    // --- TRANSLATIONS OBJECT ---
    const translations = {
        loginTitle: { en: "Welcome Back", af: "Welkom Terug", zu: "Wamukelekile Emuva", xh: "Wamkelekile Kwakhona" },
        loginSubtitle: { en: "Please enter your details to sign in.", af: "Voer asseblief jou besonderhede in om aan te meld.", zu: "Sicela ufake imininingwane yakho ukuze ungene.", xh: "Nceda faka iinkcukacha zakho ukuze ungene." },
        emailLabel: { en: "Email Address", af: "E-posadres", zu: "Ikheli le-imeyili", xh: "Idilesi ye-imeyile" },
        passwordLabel: { en: "Password", af: "Wagwoord", zu: "Iphasiwedi", xh: "Iphasiwedi" },
        forgotPassword: { en: "Forgot your password?", af: "Wagwoord vergeet?", zu: "Ukhohlwe iphasiwedi yakho?", xh: "Ulibele iphasiwedi yakho?" },
        signInButton: { en: "Sign In", af: "Meld Aan", zu: "Ngena", xh: "Ngena" },
        noAccount: { en: "Don't have an account?", af: "Nog nie 'n rekening nie?", zu: "Awunayo i-akhawunti?", xh: "Awunayo i-akhawunti?" },
        signUpLink: { en: "Sign Up", af: "Teken In", zu: "Bhalisa", xh: "Bhalisa" },
        errorMessage: { en: "Wrong email or password. Please try again.", af: "Verkeerde e-pos of wagwoord. Probeer asseblief weer.", zu: "I-imeyili noma iphasiwedi engalungile. Sicela uzame futhi.", xh: "I-imeyile okanye igama lokugqitha elingachanekanga. Nceda uzame kwakhona."},
        navDashboard: { en: "Dashboard", af: "Kontroleskerm", zu: "Ideshibhodi", xh: "Ideshibhodi" },
        navSubjects: { en: "Subjects", af: "Vakke", zu: "Izifundo", xh: "Izifundo" },
        navTasks: { en: "Tasks", af: "Take", zu: "Imisebenzi", xh: "Imisebenzi" },
        navTutors: { en: "Tutors", af: "Tutors", zu: "Abafundisi", xh: "Abahlohli" },
        navMfundo: { en: "Mfundo AI", af: "Mfundo KI", zu: "Mfundo AI", xh: "Mfundo AI" },
        navAchievements: { en: "Achievements", af: "Prestasies", zu: "Izimpumelelo", xh: "Impumelelo" },
        welcomeBack: { en: "Welcome back, {name}!", af: "Welkom terug, {name}!", zu: "Siyakwamukela futhi, {name}!", xh: "Wamkelekile kwakhona, {name}!" },
        expandUniverse: { en: "Ready to expand your universe?", af: "Gereed om jou heelal uit te brei?", zu: "Ulungele ukwandisa umkhathi wakho?", xh: "Ukulungele ukwandisa indalo yakho?" },
        level: { en: "Level", af: "Vlak", zu: "Izinga", xh: "Inqanaba" },
        continueLearning: { en: "Continue Learning", af: "Gaan voort met leer", zu: "Qhubeka Nokufunda", xh: "Qhubeka Nokufunda" },
        jumpBackIn: { en: "Jump Back In", af: "Spring Terug In", zu: "Buyela Emuva", xh: "Ngena Kwakhona" },
        yourStats: { en: "Your Stats", af: "Jou Statistieke", zu: "Izibalo Zakho", xh: "Izibalo Zakho" },
        dayStreak: { en: "Day Streak", af: "Dag Rits", zu: "Uchungechunge Lwezinsuku", xh: "Intsuku Ezilandelelanayo" },
        totalXP: { en: "Total XP", af: "Totale XP", zu: "I-XP Ibonke", xh: "I-XP Iyonke" },
        subjectsDone: { en: "Subjects Done", af: "Vakke Voltooi", zu: "Izifundo Ezenziwe", xh: "Izifundo Ezigqityiweyo" },
        badgesEarned: { en: "Badges Earned", af: "Wapens Verdien", zu: "Amabheji Azuziwe", xh: "Iibheji Ozifumeneyo" },
        recentBadges: { en: "Recent Badges", af: "Onlangse Wapens", zu: "Amabheji Asanda Kutholwa", xh: "Iibheji Zamva Nje" },
        subjectsTitle: { en: "Subjects", af: "Vakke", zu: "Izifundo", xh: "Izifundo" },
        tasksTitle: { en: "Upcoming Tasks", af: "Opkomende Take", zu: "Imisebenzi Ezayo", xh: "Imisebenzi Ezayo" },
        tutorsTitle: { en: "Find a Tutor", af: "Vind 'n Tutor", zu: "Thola Umfundisi", xh: "Fumana uMhlohli" },
        mfundoTitle: { en: "Mfundo AI Assistant", af: "Mfundo KI Assistent", zu: "Umsizi we-Mfundo AI", xh: "Umncedisi we-Mfundo AI" },
        achievementsTitle: { en: "All Achievements", af: "Alle Prestasies", zu: "Zonke Izimpumelelo", xh: "Zonke Impumelelo" },
        mfundoWelcome: { en: "<strong>Mfundo:</strong> Sawubona! How can I help you with your lessons today?", af: "<strong>Mfundo:</strong> Hallo! Hoe kan ek jou vandag met jou lesse help?", zu: "<strong>Mfundo:</strong> Sawubona! Ngingakusiza ngani ngezifundo zakho namhlanje?", xh: "<strong>Mfundo:</strong> Molo! Ndingakunceda ngantoni kwizifundo zakho namhlanje?" },
        mfundoPlaceholder: { en: "Ask Mfundo anything...", af: "Vra Mfundo enigiets...", zu: "Buza uMfundo noma yini...", xh: "Buza uMfundo nantoni na..." },
        sendButton: { en: "Send", af: "Stuur", zu: "Thumela", xh: "Thumela" },
        completed: { en: "Completed", af: "Voltooi", zu: "Kuqediwe", xh: "Kugqityiwe" },
        complete: { en: "Complete", af: "Voltooi", zu: "Qedela", xh: "Gqibezela" },
        locked: { en: "Locked", af: "Gesluit", zu: "Kukhiyiwe", xh: "Kutshixiwe" },
        start: { en: "Start", af: "Begin", zu: "Qala", xh: "Qala" },
        continue: { en: "Continue", af: "Gaan voort", zu: "Qhubeka", xh: "Qhubeka" },
    };

    // --- DASHBOARD DATA OBJECT ---
    const appData = {
        user: { name: "Snow", avatarUrl: "https://placehold.co/100x100/818cf8/1c1917?text=S", xp: 1850, level: 7, streak: 5 },
        subjects: [
            { id: 1, title: "Mathematics: Functions & Graphs", description: "Covering parabolas, hyperbolas, and exponential graphs as per the CAPS curriculum.", progress: 75, status: "current", xp: 150, type: 'video', videoId: 'ZyD9J69g444', thumbnailUrl: 'https://placehold.co/600x400/312e81/ffffff?text=Functions' },
            { id: 2, title: "Physical Sciences: Mechanics", description: "Introduction to vectors, motion in one dimension, and energy calculations.", progress: 40, status: "active", xp: 150, type: 'interactive', thumbnailUrl: 'https://placehold.co/600x400/064e3b/ffffff?text=Mechanics' },
            { id: 3, title: "Life Sciences: The Cell", description: "Exploring the basic unit of life, cell structures, and the process of mitosis.", progress: 90, status: "completed", xp: 100, type: 'quiz', thumbnailUrl: 'https://placehold.co/600x400/15803d/ffffff?text=The+Cell' },
            { id: 4, title: "English HL: Analysing Poetry", description: "Learn to identify and analyse poetic devices in prescribed DBE poems.", progress: 60, status: "active", xp: 100, type: 'video', videoId: 'JkaxUblCGz0', thumbnailUrl: 'https://placehold.co/600x400/7f1d1d/ffffff?text=Poetry' },
            { id: 5, title: "History: The French Revolution", description: "Causes, key events, and consequences of the revolution in France.", progress: 85, status: "completed", xp: 120, type: 'video', videoId: '5pXxoyk5wOo', thumbnailUrl: 'https://placehold.co/600x400/854d0e/ffffff?text=History' },
            { id: 6, title: "Geography: Geomorphology", description: "The structure of the Earth and the concept of plate tectonics.", progress: 25, status: "locked", xp: 120, type: 'interactive', thumbnailUrl: 'https://placehold.co/600x400/581c87/ffffff?text=Geography' },
        ],
        tasks: [ { id: 1, text: "Maths: Complete Ex 2.4 on hyperbolas.", done: false }, { id: 2, text: "Physics: Practice vector diagrams.", done: false }, { id: 3, text: "Life Science: Draw and label an animal cell.", done: true }, { id: 4, text: "English: Find examples of metaphors in 'Sonnet 18'.", done: false }, ],
        tutors: [ { id: 1, name: "Thabo Molefe", subject: "Mathematics", rate: "R250/hr", imageUrl: "https://placehold.co/200x200/a78bfa/1c1917?text=TM" }, { id: 2, name: "Anelisa Van Wyk", subject: "Physical Sciences", rate: "R280/hr", imageUrl: "https://placehold.co/200x200/f472b6/1c1917?text=AVW" }, { id: 3, name: "Sipho Ndlovu", subject: "Life Sciences", rate: "R220/hr", imageUrl: "https://placehold.co/200x200/34d399/1c1917?text=SN" }, { id: 4, name: "Emily Smith", subject: "English HL", rate: "R300/hr", imageUrl: "https://placehold.co/200x200/fbbf24/1c1917?text=ES" }, ],
        achievements: [ { id: 1, name: "Trailblazer", description: "Complete your first lesson.", unlocked: true, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }, { id: 2, name: "Adept Learner", description: "Reach 1000 XP.", unlocked: true, icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 6v4m-2-2h4M17 3l-4.5 4.5M17 17l-4.5-4.5M7 3l4.5 4.5M7 17l4.5-4.5' }, { id: 3, name: "5-Day Streak", description: "Learn for 5 days in a row.", unlocked: true, icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10s5 2 5 2a8 8 0 013.657 6.657z'}, { id: 4, name: "Polyglot", description: "Use the language selector.", unlocked: true, icon: 'M3 5h12M9 3v2m0 4V5m0 4a2 2 0 11-4 0 2 2 0 014 0zm11 9h-4M19 21v-2m0-4v2m0 4a2 2 0 10-4 0 2 2 0 004 0z'}, { id: 5, name: "Cell Biologist", description: "Complete 'The Cell' module.", unlocked: true, icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 8h.01M15 8h.01M15 5h.01M12 5h.01M9 5h.01M4 7h1v11h-1zM16 7h1v11h-1z'}, ],
        navigation: [
            { view: 'dashboard', key: 'navDashboard', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>' },
            { view: 'subjects', key: 'navSubjects', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-9-5.747h18"></path>' },
            { view: 'tasks', key: 'navTasks', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>' },
            { view: 'tutors', key: 'navTutors', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>'},
            { view: 'mfundo', key: 'navMfundo', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>' },
            { view: 'achievements', key: 'navAchievements', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>' },
        ]
    };

    // --- SHARED FUNCTIONS (THEME & LANGUAGE) ---
    function applyTheme(isDark) {
        const sunIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
        const moonIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
        if (isDark) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = sunIcon;
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = moonIcon;
        }
    }
    
    function getTranslation(key, lang = currentLang, replacements = {}) {
        let text = (translations[key] && translations[key][lang]) || translations[key]['en'] || `[${key}]`;
        for (const placeholder in replacements) {
            text = text.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return text;
    }

    function setLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            const translation = getTranslation(key, lang);
            if (el.tagName === 'INPUT' && el.placeholder) {
                el.placeholder = translation;
            } else {
                el.innerHTML = translation;
            }
        });
        if (!dashboardScreen.classList.contains('hidden')) {
            renderAllDashboardComponents();
        }
    }

    // --- DASHBOARD RENDER FUNCTIONS ---
    function createIcon(pathData, size = 'w-6 h-6') { return `<svg class="${size}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${pathData}"></path></svg>`; }
    function renderNavigation() { document.getElementById('nav-list').innerHTML = appData.navigation.map(item => `<li><a href="#" class="nav-item ${item.view === 'dashboard' ? 'active' : ''}" data-view="${item.view}"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">${item.icon}</svg><span class="hidden lg:block">${getTranslation(item.key)}</span></a></li>`).join(''); }
    function renderUserProfile() { const { user } = appData; const xpForNextLevel = (user.level + 1) * 250; document.getElementById('user-greeting').innerHTML = `<h1 class="text-3xl font-bold">${getTranslation('welcomeBack', currentLang, {name: user.name})}</h1><p class="text-gray-500 dark:text-gray-400">${getTranslation('expandUniverse')}</p>`; document.getElementById('user-profile').innerHTML = `<div class="text-right"><p class="font-semibold text-indigo-600 dark:text-indigo-400">${getTranslation('level')} ${user.level}</p><p class="text-sm text-gray-500 dark:text-gray-400">${user.xp} / ${xpForNextLevel} XP</p></div><img src="${user.avatarUrl}" alt="User Avatar" class="w-12 h-12 rounded-full border-2 border-indigo-500">`; }
    function renderCurrentLesson() { const currentLesson = appData.subjects.find(l => l.status === 'current'); const container = document.getElementById('current-lesson-container'); if (!currentLesson) { container.innerHTML = ''; return; } container.innerHTML = `<div class="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"><h3 class="text-xl font-bold mb-1">${getTranslation('continueLearning')}</h3><p class="text-gray-500 dark:text-gray-400 mb-4">${currentLesson.title}</p><div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4 bg-black"><iframe class="w-full h-full" src="https://www.youtube.com/embed/${currentLesson.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><button class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 glow-on-hover">${getTranslation('jumpBackIn')}</button></div>`; }
    function renderStats() { const { user } = appData; const unlockedAchievements = appData.achievements.filter(a => a.unlocked).length; document.getElementById('stats-container').innerHTML = `<h3 class="text-xl font-bold mb-4">${getTranslation('yourStats')}</h3><div class="grid grid-cols-2 gap-4 text-center"><div class="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg"><p class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${user.streak}</p><p class="text-sm text-gray-500 dark:text-gray-400">${getTranslation('dayStreak')}</p></div><div class="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg"><p class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${user.xp}</p><p class="text-sm text-gray-500 dark:text-gray-400">${getTranslation('totalXP')}</p></div><div class="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg"><p class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${appData.subjects.filter(l => l.status === 'completed').length}</p><p class="text-sm text-gray-500 dark:text-gray-400">${getTranslation('subjectsDone')}</p></div><div class="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg"><p class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${unlockedAchievements}</p><p class="text-sm text-gray-500 dark:text-gray-400">${getTranslation('badgesEarned')}</p></div></div>`; }
    function renderRecentAchievements() { const recent = appData.achievements.filter(a => a.unlocked).slice(-3).reverse(); document.getElementById('recent-achievements-container').innerHTML = `<h3 class="text-xl font-bold mb-4">${getTranslation('recentBadges')}</h3>` + recent.map(ach => `<div class="flex items-center bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg mt-2"><div class="w-10 h-10 flex items-center justify-center rounded-md bg-yellow-500/20 text-yellow-400 mr-4">${createIcon(ach.icon)}</div><div><p class="font-semibold">${ach.name}</p><p class="text-sm text-gray-500 dark:text-gray-400">${ach.description}</p></div></div>`).join(''); }
    function renderAllSubjects() { document.getElementById('subjects-list-container').innerHTML = appData.subjects.map(subject => { const statusText = subject.status === 'current' ? getTranslation('continue') : subject.status === 'completed' ? getTranslation('completed') : subject.status === 'locked' ? getTranslation('locked') : getTranslation('start'); return `<div class="subject-card card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 ${subject.status === 'locked' ? 'opacity-50' : 'glow-on-hover shadow-md'}"><div class="relative"><img src="${subject.thumbnailUrl}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/1e293b/ffffff?text=Error';" alt="${subject.title}" class="w-full h-40 object-cover">${subject.status === 'locked' ? `<div class="absolute inset-0 bg-black/60 flex items-center justify-center">${createIcon('M12 15v2m-6.364-3.636l-1.414 1.414M21 12h-2M4 12H2m15.636-6.364l-1.414-1.414M6.364 6.364L4.95 4.95M12 3v2m0 14v2m-6.364-3.636l1.414-1.414M17.636 17.636l1.414 1.414m-10.272-5.007a5 5 0 017.072 0', 'w-10 h-10 text-white')}</div>` : ''}${subject.status === 'completed' ? `<div class="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full">${createIcon('M5 13l4 4L19 7', 'w-5 h-5')}</div>` : ''}</div><div class="p-5 flex flex-col flex-grow"><h4 class="font-bold text-lg mb-1 flex-grow">${subject.title}</h4><p class="text-sm text-gray-500 dark:text-gray-400 mb-3">${subject.description}</p><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2"><div class="bg-green-500 h-2.5 rounded-full" style="width: ${subject.progress}%"></div></div><div class="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm mb-4"><span>${subject.progress}% ${getTranslation('complete')}</span><span>${subject.xp} XP</span></div><button class="mt-auto w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${subject.status === 'current' || subject.status === 'active' ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'} ${subject.status === 'locked' ? 'cursor-not-allowed' : ''} ${subject.status === 'completed' ? 'cursor-default' : ''}">${statusText}</button></div></div>`}).join(''); }
    function renderAllTasks() { document.getElementById('task-list').innerHTML = appData.tasks.map(task => `<li class="task-item flex items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md shadow-sm transition-all duration-300 ${task.done ? 'opacity-50' : ''}"><input type="checkbox" id="task${task.id}" class="form-checkbox h-5 w-5 text-indigo-600 rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-indigo-500" ${task.done ? 'checked' : ''}><label for="task${task.id}" class="ml-3 text-lg ${task.done ? 'line-through text-gray-500' : ''}">${task.text}</label></li>`).join(''); }
    function renderAllTutors() { document.getElementById('tutors-list-container').innerHTML = appData.tutors.map(tutor => `<div class="card bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md text-center flex flex-col items-center transition-transform duration-300 hover:scale-105"><img src="${tutor.imageUrl}" onerror="this.onerror=null;this.src='https://placehold.co/200x200/cccccc/1c1917?text=Error';" alt="Tutor ${tutor.name}" class="w-24 h-24 rounded-full mb-4 border-4 border-indigo-200 dark:border-indigo-800"><h4 class="font-bold text-lg">${tutor.name}</h4><span class="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold my-2 px-2.5 py-0.5 rounded-full">${tutor.subject}</span><p class="text-gray-700 dark:text-gray-300 font-semibold">${tutor.rate}</p></div>`).join(''); }
    function renderAllAchievements() { document.getElementById('achievements-list-container').innerHTML = appData.achievements.map(ach => `<div class="achievement-card text-center card bg-white dark:bg-gray-800 p-6 rounded-2xl flex flex-col items-center justify-center shadow-md ${ach.unlocked ? 'opacity-100' : 'opacity-40'}"><div class="w-20 h-20 flex items-center justify-center rounded-full mb-4 ${ach.unlocked ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}">${createIcon(ach.icon, 'w-10 h-10')}</div><h4 class="font-bold text-lg mb-1">${ach.name}</h4><p class="text-gray-500 dark:text-gray-400 text-sm">${ach.description}</p></div>`).join(''); }
    function renderAllDashboardComponents() { renderNavigation(); renderUserProfile(); renderCurrentLesson(); renderStats(); renderRecentAchievements(); renderAllSubjects(); renderAllTasks(); renderAllTutors(); renderAllAchievements(); }
    
    // --- DASHBOARD EVENT LISTENERS ---
    function setupDashboardListeners() {
        document.getElementById('nav-list').addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-item');
            if (!navLink) return;
            e.preventDefault();
            const viewName = navLink.dataset.view;
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            navLink.classList.add('active');
            document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
            document.getElementById(`view-${viewName}`).classList.remove('hidden');
        });
        const mfundoInput = document.getElementById('mfundo-input');
        const mfundoSendBtn = document.getElementById('mfundo-send');
        mfundoSendBtn.addEventListener('click', () => sendChatMessage(mfundoInput));
        mfundoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(mfundoInput); });
    }

    async function sendChatMessage(inputElement) {
        const userMessage = inputElement.value.trim();
        if (userMessage === '') return;
        const chatHistory = document.getElementById('chat-history');
        chatHistory.innerHTML += `<p class="mb-2 text-right text-indigo-700 dark:text-indigo-400 text-sm"><strong>You:</strong> ${userMessage}</p>`;
        inputElement.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;
        const loadingMsgDiv = document.createElement('p');
        loadingMsgDiv.classList.add('mb-2', 'text-sm', 'text-gray-500', 'dark:text-gray-400');
        loadingMsgDiv.innerHTML = '<strong>Mfundo:</strong> Thinking...';
        chatHistory.appendChild(loadingMsgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        try {
            const prompt = `You are Mfundo, an expert AI tutor specializing in the South African DBE (CAPS) curriculum. Your goal is to provide accurate, helpful, and context-aware answers to students. Answer the following question in English: ${userMessage}`;
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = ""; // This will be provided by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const result = await response.json();
            chatHistory.removeChild(loadingMsgDiv);
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) { chatHistory.innerHTML += `<p class="mb-2 text-sm text-gray-600 dark:text-gray-300"><strong>Mfundo:</strong> ${text.replace(/\n/g, '<br>')}</p>`; } 
            else { throw new Error('Invalid response'); }
        } catch (error) {
            if(chatHistory.contains(loadingMsgDiv)) chatHistory.removeChild(loadingMsgDiv);
            chatHistory.innerHTML += `<p class="mb-2 text-sm text-red-500"><strong>Mfundo:</strong> There was an error. Please try again.</p>`;
        }
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // --- LOGIN LOGIC ---
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;
        const errorMessageDiv = document.getElementById('error-message');
        if (emailInput === 'sinovuyomlambo529@gmail.com' && passwordInput === 'Mpumelelo') {
            loginScreen.classList.add('hidden');
            dashboardScreen.classList.remove('hidden');
            dashboardScreen.classList.add('flex');
            renderAllDashboardComponents();
            setupDashboardListeners();
        } else {
            errorMessageDiv.textContent = getTranslation('errorMessage');
            setTimeout(() => { errorMessageDiv.textContent = ''; }, 3000);
        }
    });

    // --- INITIALIZATION ---
    function init() {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark);
        setLanguage('en');
        themeToggle.addEventListener('click', () => applyTheme(!document.body.classList.contains('dark-mode')));
        langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
    }

    init();
});
