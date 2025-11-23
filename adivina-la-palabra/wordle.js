// Adivina la Palabra - Game Logic JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded. Initializing game...");

    // --- CONSTANTES DE CONFIGURACIÓN ---
    const MAX_TRIES = 6;
    const MIN_WORD_LENGTH = 3;
    const MAX_WORD_LENGTH = 6;
    const TRIES_BEFORE_HINTS = 3;
    
    // Simula que el usuario es premium (para probar el calendario)
    const IS_PREMIUM_USER = true;

    const LEVEL_FILE_MAP = {
        A1: '../data/wordle-a1-palabras.json',
        A2: '../data/wordle-a2-palabras.json',
    };
    const SUPPORTED_LEVELS = Object.keys(LEVEL_FILE_MAP);
    const HINT_FILE_MAP = {
        A1: './pistas-a1.json',
        A2: './pistas-a2.json',
    };
    const ADVENTURE_VOCAB_PATH = '../mapa-aventura/vocabulary-a1.json';
    const ADVENTURE_BOSS_KEY_PREFIX = 'wordleQuestAdventureBoss';
    const ADVENTURE_PROGRESS_KEY = 'wordleQuestCurrentLevel';
    const ADVENTURE_COMPLETED_LEVEL_KEY = 'wordleQuestLastCompletedLevel';
    const ADVENTURE_TRANSITION_END_KEY = 'wordleQuestTransitionEnd';
    const ADVENTURE_TRANSITION_DURATION_MS = 700;


    // --- SELECTORES DEL DOM ---
    const gameContainer = document.querySelector('.game-container');
    const grid = document.querySelector('.game-grid');
    let allTiles = [];
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const toastContainer = document.querySelector('.toast-container');
    const calendarButton = document.getElementById('calendar-button');
    const levelTitle = document.getElementById('game-level-title');
    const clueButton = document.querySelector('.clue-button');
    const clueMessagesContainer = document.querySelector('.clue-messages');
    const instructionsButton = document.getElementById('instructions-button');
    const instructionsModal = document.getElementById('instructions-modal');
    const instructionsCloseButton = document.getElementById('instructions-close');
    const instructionsOverlay = instructionsModal ? instructionsModal.querySelector('.instructions-modal__overlay') : null;

    if (!gameContainer || !grid || !keyboardKeys.length || !toastContainer || !calendarButton || !levelTitle || !clueButton || !clueMessagesContainer || !instructionsButton || !instructionsModal || !instructionsCloseButton || !instructionsOverlay) {
        console.error("Error: Could not find all essential game elements in the HTML.");
        return;
    }

    clueButton.addEventListener('click', handleClueClick);
    instructionsButton.addEventListener('click', openInstructionsModal);
    instructionsCloseButton.addEventListener('click', closeInstructionsModal);
    instructionsOverlay.addEventListener('click', closeInstructionsModal);
    document.addEventListener('keydown', handleInstructionsKeydown);

    // --- ESTADO DEL JUEGO ---
    const answerListsByLength = new Map();
    const validationSetsByLength = new Map();
    let combinedAnswerList = [];
    let currentWordLength = 5;
    let wordDataLoaded = false;
    let loadedLevel = null;
    let targetWord = "";
    let currentRowIndex = 0;
    let currentColIndex = 0;
    let isGameActive = false;
    let currentDate = new Date();
    let currentLevel = null;
    const hintDictionary = new Map();
    let hintDataLoaded = false;
    let loadedHintLevel = null;
    let hintsForCurrentWord = [];
    let nextHintIndex = 0;
    let clueUsedThisRow = false;
    let guessesMade = 0;
    let isAdventureMode = false;
    let adventureMapId = 1;
    let adventureLevelNumber = 1;
    let adventureVocabulary = null;
    let adventureBossIndex = 0;
    let activeAdventureEntry = null;
    let adventureModal = null;
    let adventureTransition = null;

    function sanitizeWordForHints(word) {
        if (typeof word !== 'string') return '';
        return normalizeWord(word).replace(/[^A-ZÑ]/g, '');
    }

    function getAdventureMapUrl(mapId) {
        const sanitizedMap = Number.isFinite(mapId) && mapId > 0 ? mapId : 1;
        return `../mapa-aventura/mapas/pais-${sanitizedMap}.html`;
    }

    function getGeneralMapUrl() {
        return '../mapa-aventura/index.html';
    }

    function ensureAdventureModal() {
        if (adventureModal) return adventureModal;

        adventureModal = document.createElement('div');
        adventureModal.className = 'adventure-modal';
        adventureModal.innerHTML = `
            <div class="adventure-modal__dialog">
                <h3 class="adventure-modal__title"></h3>
                <p class="adventure-modal__message"></p>
                <div class="adventure-modal__actions"></div>
            </div>
        `;

        document.body.appendChild(adventureModal);
        return adventureModal;
    }

    function hideAdventureModal() {
        if (!adventureModal) return;
        adventureModal.classList.remove('is-visible');

        const actionsContainer = adventureModal.querySelector('.adventure-modal__actions');
        if (actionsContainer) {
            actionsContainer.innerHTML = '';
        }
    }

    function showAdventureModal({ title = '', message = '', actions = [] }) {
        const modal = ensureAdventureModal();
        const titleEl = modal.querySelector('.adventure-modal__title');
        const messageEl = modal.querySelector('.adventure-modal__message');
        const actionsContainer = modal.querySelector('.adventure-modal__actions');

        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;

        if (actionsContainer) {
            actionsContainer.innerHTML = '';
            actions.forEach(action => {
                const button = document.createElement('button');
                button.className = `adventure-modal__button ${action.variant === 'secondary' ? 'adventure-modal__button--secondary' : 'adventure-modal__button--primary'}`;
                button.type = 'button';
                button.textContent = action.label;
                button.addEventListener('click', () => {
                    if (action.dismiss !== false) hideAdventureModal();
                    if (typeof action.onClick === 'function') {
                        action.onClick();
                    }
                });
                actionsContainer.appendChild(button);
            });
        }

        requestAnimationFrame(() => modal.classList.add('is-visible'));
    }

    function getAdventureTransition() {
        if (adventureTransition) return adventureTransition;

        adventureTransition = document.createElement('div');
        adventureTransition.className = 'adventure-transition';
        document.body.appendChild(adventureTransition);
        return adventureTransition;
    }

    function startAdventureTransition(targetUrl) {
        const overlay = getAdventureTransition();
        document.body.classList.add('adventure-sliding');

        try {
            const expectedEnd = Date.now() + ADVENTURE_TRANSITION_DURATION_MS;
            localStorage.setItem(ADVENTURE_TRANSITION_END_KEY, String(expectedEnd));
        } catch (error) {
            console.warn('No se pudo guardar el final de la transición:', error);
        }

        requestAnimationFrame(() => overlay.classList.add('is-active'));

        setTimeout(() => {
            window.location.href = targetUrl;
        }, ADVENTURE_TRANSITION_DURATION_MS);
    }

    function recordAdventureCompletion() {
        try {
            const nextLevel = Math.min(adventureLevelNumber + 1, 10);
            localStorage.setItem(ADVENTURE_PROGRESS_KEY, String(nextLevel));
            localStorage.setItem(ADVENTURE_COMPLETED_LEVEL_KEY, String(adventureLevelNumber));
        } catch (error) {
            console.warn('No se pudo guardar el progreso de aventura:', error);
        }
    }

    function handleAdventureWin() {
        recordAdventureCompletion();

        if (adventureLevelNumber === 10) {
            showAdventureModal({
                title: '¡Felicidades, has completado el primer mapa!',
                message: '¿Qué deseas hacer a continuación?',
                actions: [
                    {
                        label: 'Continuar en este mapa',
                        variant: 'primary',
                        onClick: () => startAdventureTransition(getAdventureMapUrl(adventureMapId)),
                    },
                    {
                        label: 'Volver al mapa general',
                        variant: 'secondary',
                        onClick: () => startAdventureTransition(getGeneralMapUrl()),
                    },
                ],
            });
            return;
        }

        showAdventureModal({
            title: '¡Buen trabajo!',
            message: 'Has completado la palabra. Volviendo al mapa...',
            actions: [],
        });

        setTimeout(() => {
            startAdventureTransition(getAdventureMapUrl(adventureMapId));
        }, 2000);
    }

    function handleAdventureFailure() {
        stopInteraction();
        const nextAttemptWord = adventureLevelNumber === 10 && activeAdventureEntry
            ? advanceBossWord(activeAdventureEntry) || targetWord
            : targetWord;

        showAdventureModal({
            title: 'No acertaste esta vez',
            message: 'Elige una opción para continuar.',
            actions: [
                {
                    label: 'Repetir juego',
                    variant: 'primary',
                    onClick: () => restartAdventureAttempt(nextAttemptWord),
                },
                {
                    label: 'Volver al mapa',
                    variant: 'secondary',
                    onClick: () => startAdventureTransition(getAdventureMapUrl(adventureMapId)),
                },
            ],
        });
    }

    function getAdventureBossKey(mapId) {
        const id = Number.isFinite(mapId) ? mapId : 1;
        return `${ADVENTURE_BOSS_KEY_PREFIX}-${id}`;
    }

    function filterAdventureList(words) {
        if (!Array.isArray(words)) return [];
        return words
            .map(word => normalizeWord(word))
            .filter(word => word.length >= MIN_WORD_LENGTH && word.length <= MAX_WORD_LENGTH);
    }

    async function loadAdventureVocabulary(mapId) {
        if (adventureVocabulary) return adventureVocabulary;

        try {
            const response = await fetch(ADVENTURE_VOCAB_PATH);
            if (!response.ok) {
                throw new Error(`Could not load ${ADVENTURE_VOCAB_PATH}`);
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Vocabulary file is not an array');
            }

            adventureVocabulary = data;
            return adventureVocabulary;
        } catch (error) {
            console.error('Error loading adventure vocabulary:', error);
            showToast('No se pudo cargar el vocabulario de aventura.');
            return null;
        }
    }

    function findAdventureEntry(mapId) {
        if (!Array.isArray(adventureVocabulary)) return null;
        const paddedName = `nivel ${String(mapId || 1).padStart(2, '0')}`;

        return adventureVocabulary.find(entry => {
            if (!entry || typeof entry !== 'object') return false;
            const matchesId = Number(entry.id) === Number(mapId);
            const matchesName = typeof entry.nombre === 'string' && entry.nombre.toLowerCase() === paddedName;
            return matchesId || matchesName;
        }) || adventureVocabulary[0];
    }

    function getAdventureWord(entry, levelNumber) {
        if (!entry) return null;

        const vocabList = filterAdventureList(entry.vocabulario);
        const bossList = filterAdventureList(entry.jefe);

        if (levelNumber === 10) {
            if (!bossList.length) return null;
            adventureBossIndex = adventureBossIndex % bossList.length;
            return bossList[adventureBossIndex];
        }

        if (!vocabList.length) return null;
        const levelIndex = Math.max(0, (levelNumber || 1) - 1);
        const cappedIndex = levelIndex % vocabList.length;
        return vocabList[cappedIndex];
    }

    function saveBossProgress() {
        try {
            const key = getAdventureBossKey(adventureMapId);
            localStorage.setItem(key, String(adventureBossIndex));
        } catch (error) {
            console.warn('Could not save boss progress:', error);
        }
    }

    function loadBossProgress() {
        try {
            const key = getAdventureBossKey(adventureMapId);
            const stored = Number(localStorage.getItem(key));
            if (!Number.isNaN(stored) && stored >= 0) {
                adventureBossIndex = stored;
            }
        } catch (error) {
            console.warn('Could not load boss progress:', error);
        }
    }

    function advanceBossWord(entry) {
        const bossList = filterAdventureList(entry?.jefe);
        if (!bossList.length) return null;
        adventureBossIndex = (adventureBossIndex + 1) % bossList.length;
        saveBossProgress();
        return bossList[adventureBossIndex];
    }

    function restartAdventureAttempt(nextWord) {
        if (nextWord) {
            targetWord = nextWord;
            currentWordLength = nextWord.length;
        }

        guessesMade = 0;
        resetBoard(currentWordLength);
        prepareHintsForWord(targetWord, hintDataLoaded);
        isGameActive = true;
        startInteraction();
        updateClueAvailability();
    }

    async function loadAdventureGame() {
        stopInteraction();
        showToast('Cargando nivel de aventura...', 2000);

        const vocabData = await loadAdventureVocabulary(adventureMapId);
        if (!vocabData) return;

        activeAdventureEntry = findAdventureEntry(adventureMapId);
        loadBossProgress();

        const success = await loadWordLists(currentLevel);
        if (!success) return;

        const selectedWord = getAdventureWord(activeAdventureEntry, adventureLevelNumber);
        if (!selectedWord) {
            showToast('No hay palabra configurada para este nivel.');
            return;
        }

        targetWord = selectedWord;
        currentWordLength = selectedWord.length;
        if (adventureLevelNumber === 10) {
            saveBossProgress();
        }

        resetBoard(currentWordLength);
        const hintsReady = await ensureHintData();
        prepareHintsForWord(targetWord, hintsReady);

        isGameActive = true;
        startInteraction();
        updateClueAvailability();
    }

    function clearClueMessages() {
        if (clueMessagesContainer) {
            clueMessagesContainer.innerHTML = '';
        }
    }

    function handleClueClick() {
        if (!clueButton || clueButton.disabled) return;
        if (!clueMessagesContainer) return;

        if (nextHintIndex >= hintsForCurrentWord.length) {
            clueUsedThisRow = true;
            updateClueAvailability();
            return;
        }

        const clueNumber = nextHintIndex + 1;
        const hintText = hintsForCurrentWord[nextHintIndex];
        nextHintIndex++;
        clueUsedThisRow = true;

        const defaultMessage = clueMessagesContainer.querySelector('.clue-message-default');
        if (defaultMessage) {
            defaultMessage.remove();
        }

        const hintMessage = document.createElement('p');
        hintMessage.classList.add('clue-message');
        hintMessage.textContent = `Clue ${clueNumber}: ${hintText}`;
        clueMessagesContainer.appendChild(hintMessage);

        updateClueAvailability();
    }

    function openInstructionsModal() {
        if (!instructionsModal) return;
        instructionsModal.classList.add('is-visible');
        instructionsModal.setAttribute('aria-hidden', 'false');
        window.setTimeout(() => {
            if (instructionsCloseButton) {
                instructionsCloseButton.focus();
            }
        }, 0);
    }

    function closeInstructionsModal() {
        if (!instructionsModal) return;
        instructionsModal.classList.remove('is-visible');
        instructionsModal.setAttribute('aria-hidden', 'true');
        if (instructionsButton) {
            instructionsButton.focus();
        }
    }

    function handleInstructionsKeydown(event) {
        if (event.key === 'Escape' && instructionsModal && instructionsModal.classList.contains('is-visible')) {
            event.preventDefault();
            closeInstructionsModal();
        }
    }

    // --- INICIALIZACIÓN ---

    function initializeGame() {
        console.log("Initializing game setup...");
        const urlParams = new URLSearchParams(window.location.search);
        const requestedMode = (urlParams.get('mode') || '').toLowerCase();
        isAdventureMode = requestedMode === 'adventure';

        if (isAdventureMode) {
            adventureMapId = Number(urlParams.get('map')) || 1;
            adventureLevelNumber = Number(urlParams.get('level')) || 1;
            adventureBossIndex = 0;
            loadBossProgress();

            currentLevel = 'A1';
            levelTitle.textContent = `Mapa ${adventureMapId} · Nivel ${adventureLevelNumber}`;

            if (calendarButton) {
                calendarButton.style.display = 'none';
                calendarButton.setAttribute('aria-hidden', 'true');
                calendarButton.setAttribute('disabled', 'true');
            }

            loadAdventureGame();
            return;
        }

        const requestedLevel = (urlParams.get('level') || 'A1').toUpperCase();
        if (!SUPPORTED_LEVELS.includes(requestedLevel)) {
            showToast('That level is not available yet. Showing level A1.');
            currentLevel = 'A1';
        } else {
            currentLevel = requestedLevel;
        }

        levelTitle.textContent = `Level ${currentLevel}`;

        setupCalendar();
        loadGameForDate(new Date());
    }

    /**
     * Configura el calendario Flatpickr
     */
    function setupCalendar() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sixtyDaysAgo = subtractDays(today, 60);

        const handleDateSelection = (selectedDate, dateStr, revertSelection) => {
            if (!selectedDate) return;

            if (dateStr === normalizeDate(currentDate)) {
                if (revertSelection) revertSelection();
                return;
            }

            if (isToday(selectedDate)) {
                console.log("Loading today\"s game.");
                loadGameForDate(selectedDate);
                return;
            }

            if (IS_PREMIUM_USER) {
                console.log("Premium user detected, loading a previous day:", dateStr);
                loadGameForDate(selectedDate);
                return;
            }

            showToast('Only subscribers can play previous days.');
            if (revertSelection) revertSelection();
        };

        if (typeof flatpickr === 'function') {
            flatpickr(calendarButton, {
                maxDate: today,
                minDate: sixtyDaysAgo,
                defaultDate: today,
                disableMobile: "true",
                dateFormat: "Y-m-d",

                onChange(selectedDates, dateStr, instance) {
                    const selectedDate = selectedDates[0];
                    handleDateSelection(selectedDate, dateStr, () => instance.setDate(currentDate));
                },
            });
            return;
        }

        console.warn('flatpickr is not available. Using the native date picker.');
        const fallbackInput = document.createElement('input');
        fallbackInput.type = 'date';
        fallbackInput.id = calendarButton.id;
        fallbackInput.className = calendarButton.className || '';
        fallbackInput.min = normalizeDate(sixtyDaysAgo);
        fallbackInput.max = normalizeDate(today);
        fallbackInput.value = normalizeDate(today);
        fallbackInput.setAttribute('aria-label', calendarButton.getAttribute('title') || 'Choose another day');

        fallbackInput.style.position = 'absolute';
        fallbackInput.style.opacity = '0';
        fallbackInput.style.pointerEvents = 'none';
        fallbackInput.style.width = '0';
        fallbackInput.style.height = '0';

        calendarButton.parentNode.insertBefore(fallbackInput, calendarButton.nextSibling);

        calendarButton.addEventListener('click', () => {
            if (typeof fallbackInput.showPicker === 'function') {
                fallbackInput.showPicker();
            } else {
                fallbackInput.focus();
            }
        });

        fallbackInput.addEventListener('change', event => {
            const dateStr = event.target.value;
            if (!dateStr) return;
            const selectedDate = new Date(`${dateStr}T00:00:00`);
            handleDateSelection(selectedDate, dateStr, () => {
                event.target.value = normalizeDate(currentDate);
            });
        });
    }

    /**
     * Carga las listas de palabras y prepara el juego para una fecha específica
     */
    async function loadGameForDate(date) {
        currentDate = date;
        showToast('Loading game...', 2000);

        stopInteraction();

        if (!wordDataLoaded) {
            const success = await loadWordLists(currentLevel);
            if (!success) return;
        }

        const selection = getWordForDate(date);
        if (!selection) {
            showToast('No word was found for this date.');
            console.error('No target word available for the selected date.');
            return;
        }

        targetWord = selection.word;
        currentWordLength = selection.length;

        resetBoard(currentWordLength);
        const hintsReady = await ensureHintData();
        prepareHintsForWord(targetWord, hintsReady);

        console.log(`Word for ${date.toDateString()}: ${targetWord}`);

        isGameActive = true;
        startInteraction();
        updateClueAvailability();
    }

    /**
     * Carga las listas de palabras (validación y respuestas) desde los archivos
     */
    async function loadWordLists(levelIdentifier) {
        const normalizedLevel = (typeof levelIdentifier === 'string' ? levelIdentifier.toUpperCase() : 'A1');
        console.log(`Loading word lists for ${normalizedLevel}...`);

        if (wordDataLoaded && loadedLevel === normalizedLevel) {
            return true;
        }

        const answerListFilename = LEVEL_FILE_MAP[normalizedLevel];
        if (!answerListFilename) {
            console.error(`No answer file was found for level ${normalizedLevel}.`);
            showToast('That level is not available yet.');
            return false;
        }

        const validationFiles = [
            { length: 3, filename: `../data/03.json` },
            { length: 4, filename: `../data/04.json` },
            { length: 5, filename: `../data/05.json` },
            { length: 6, filename: `../data/06.json` },
        ];

        try {
            const answerResponse = await fetch(answerListFilename);
            if (!answerResponse.ok) throw new Error(`Could not load ${answerListFilename}`);

            const validationResponses = await Promise.all(validationFiles.map(file => fetch(file.filename)));
            validationResponses.forEach((response, index) => {
                if (!response.ok) {
                    throw new Error(`Could not load ${validationFiles[index].filename}`);
                }
            });

            const rawAnswerWords = await answerResponse.json();
            const normalizedAnswers = rawAnswerWords
                .map(word => normalizeWord(word.trim()))
                .filter(word => word.length >= MIN_WORD_LENGTH && word.length <= MAX_WORD_LENGTH);

            const uniqueNormalizedAnswers = Array.from(new Set(normalizedAnswers));

            answerListsByLength.clear();
            validationSetsByLength.clear();

            for (let length = MIN_WORD_LENGTH; length <= MAX_WORD_LENGTH; length++) {
                answerListsByLength.set(length, []);
            }

            uniqueNormalizedAnswers.forEach(word => {
                const length = word.length;
                if (answerListsByLength.has(length)) {
                    answerListsByLength.get(length).push(word);
                }
            });

            const validationData = await Promise.all(validationResponses.map(response => response.json()));

            validationFiles.forEach(({ length }, index) => {
                const rawList = validationData[index] || [];
                const normalizedList = rawList
                    .map(word => normalizeWord(word.trim()))
                    .filter(word => word.length === length);

                const validationSet = new Set(normalizedList);
                const answersForLength = answerListsByLength.get(length) || [];
                answersForLength.forEach(word => validationSet.add(word));

                if (validationSet.size > 0) {
                    validationSetsByLength.set(length, validationSet);
                }

                console.log(`Validation list (${length} letters) loaded:`, validationSet.size, "words");
            });

            combinedAnswerList = uniqueNormalizedAnswers.filter(word => validationSetsByLength.has(word.length));
            combinedAnswerList = shuffleArrayDeterministic(combinedAnswerList, getSeedForLevel(normalizedLevel));

            if (combinedAnswerList.length === 0) {
                showToast('No answer words were found.');
                console.error('The answer list does not contain valid words.');
                return false;
            }

            [3, 4, 5, 6].forEach(length => {
                const answersForLength = answerListsByLength.get(length) || [];
                console.log(`Lista de respuestas (${length} letras) cargada:`, answersForLength.length, 'palabras');
            });

            console.log('Total available words:', combinedAnswerList.length);

            wordDataLoaded = true;
            loadedLevel = normalizedLevel;
            hintDictionary.clear();
            hintDataLoaded = false;
            loadedHintLevel = null;
            return true; // Éxito

        } catch (error) {
            console.error("Error loading the word lists:", error);
            showToast('Error starting the game.');
            return false;
        }
    }

    async function ensureHintData() {
        const activeLevel = typeof currentLevel === 'string' ? currentLevel.toUpperCase() : 'A1';

        if (hintDataLoaded && loadedHintLevel === activeLevel) {
            return true;
        }

        const hintFile = HINT_FILE_MAP[activeLevel];
        if (!hintFile) {
            console.warn(`No hint file is configured for level ${activeLevel}.`);
            hintDictionary.clear();
            hintDataLoaded = false;
            loadedHintLevel = null;
            return false;
        }

        try {
            const response = await fetch(hintFile);
            if (!response.ok) {
                throw new Error(`Could not load ${hintFile}`);
            }

            const hintData = await response.json();

            hintDictionary.clear();

            const registerHints = (word, hintEntry) => {
                if (!word || typeof word !== 'string' || !hintEntry) return;

                const normalized = sanitizeWordForHints(word);
                if (!normalized) return;
                if (normalized.length < MIN_WORD_LENGTH || normalized.length > MAX_WORD_LENGTH) return;

                const hints = [hintEntry.pista1, hintEntry.pista2, hintEntry.pista3]
                    .filter(text => typeof text === 'string' && text.trim())
                    .map(text => text.trim());

                if (!hints.length) return;

                hintDictionary.set(normalized, hints.slice(0, 3));
            };

            if (Array.isArray(hintData)) {
                hintData.forEach(entry => {
                    if (!entry || typeof entry !== 'object') return;
                    registerHints(entry.palabra, entry);
                });
            } else if (hintData && typeof hintData === 'object') {
                Object.entries(hintData).forEach(([word, entry]) => {
                    if (!entry || typeof entry !== 'object') return;
                    registerHints(word, entry);
                });
            } else {
                throw new Error('Unrecognized hint format.');
            }

            hintDataLoaded = true;
            loadedHintLevel = activeLevel;
            console.log(`Loaded hints for ${hintDictionary.size} words from ${hintFile}.`);
            return true;
        } catch (error) {
            console.error('Error loading the hints:', error);
            showToast('The hints for this level could not be loaded.');
            hintDictionary.clear();
            hintDataLoaded = false;
            loadedHintLevel = null;
            return false;
        }
    }

    function prepareHintsForWord(word, hintsReady) {
        hintsForCurrentWord = [];
        nextHintIndex = 0;
        clearClueMessages();

        if (!word) {
            updateClueAvailability();
            return;
        }

        if (hintsReady && hintDictionary.size) {
            const normalized = sanitizeWordForHints(word);
            const storedHints = hintDictionary.get(normalized);
            if (Array.isArray(storedHints) && storedHints.length) {
                hintsForCurrentWord = storedHints.slice();
            }
        }

        if (!hintsForCurrentWord.length) {
            hintsForCurrentWord = ['No hints available for this word yet.'];
        }

        updateClueAvailability();
    }

    /**
     * Resetea el tablero y el teclado a su estado inicial
     */
    function buildBoard(wordLength) {
        const totalTilesNeeded = MAX_TRIES * wordLength;

        if (allTiles.length !== totalTilesNeeded) {
            grid.innerHTML = '';
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < totalTilesNeeded; i++) {
                const tile = document.createElement('div');
                tile.className = 'grid-tile';
                fragment.appendChild(tile);
            }
            grid.appendChild(fragment);
        }

        allTiles = Array.from(grid.children);

        grid.style.setProperty('--word-length', wordLength);
        grid.style.setProperty('--max-tries', MAX_TRIES);

        const gap = 5;
        const tileWidth = 60; // Mantener tamaño aproximado del diseño original
        const width = wordLength * tileWidth + (wordLength - 1) * gap;
        grid.style.setProperty('--grid-width', `${width}px`);
        grid.style.setProperty('--grid-height', `380px`);
    }

    function resetBoard(wordLength = currentWordLength) {
        console.log(`Reseteando tablero (${wordLength} letras)...`);
        buildBoard(wordLength);
        grid.classList.remove('shake');

        allTiles.forEach(tile => {
            tile.textContent = '';
            tile.className = 'grid-tile';
            tile.removeAttribute('data-letter');
        });

        keyboardKeys.forEach(key => {
            key.className = 'keyboard-key';
            if (key.dataset.key === 'ENTER' || key.dataset.key === 'BACKSPACE') {
                key.classList.add('large');
            }
        });

        currentRowIndex = 0;
        currentColIndex = 0;
        isGameActive = false;
        clueUsedThisRow = false;

        if (clueMessagesContainer) {
            clueMessagesContainer.innerHTML = '';
        }
    }

    /**
     * Obtiene la palabra del día (o de la fecha seleccionada)
     */
     function getWordForDate(date) {
        if (!combinedAnswerList.length) return null;

        const epoch = new Date('2025-01-01');
        const selectedDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const diffTime = Math.max(0, selectedDay - epoch);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const wordIndex = diffDays % combinedAnswerList.length;

        const word = combinedAnswerList[wordIndex];
        if (!word) return null;

        console.log(`Fecha: ${selectedDay.toDateString()}, DiffDays: ${diffDays}, Index: ${wordIndex}`);
        return {
            word,
            length: word.length
        };
    }
    
    /**
     * Función helper para normalizar palabras (quitar tildes, mayúsculas)
     */
    function normalizeWord(word) {
        if (typeof word !== 'string') return '';
        return word
            .toUpperCase()
            .replace(/Ñ/g, '__ENYE__')
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/__ENYE__/g, 'Ñ');
    }
    
    /**
     * Función helper para saber si una fecha es hoy
     */
    function isToday(someDate) {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear();
    }
    
    /**
     * Función helper para formatear una fecha como YYYY-MM-DD
     */
    function normalizeDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function subtractDays(date, amount) {
        const result = new Date(date);
        result.setDate(result.getDate() - amount);
        return result;
    }


    function mulberry32(a) {
        return function() {
            let t = a += 0x6D2B79F5;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function shuffleArrayDeterministic(array, seed = 0x1234ABCD) {
        const random = mulberry32(seed);
        const result = array.slice();
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    function getSeedForLevel(levelKey) {
        if (typeof levelKey !== 'string' || !levelKey.length) {
            return 0x1234ABCD;
        }

        let seed = 0x1234ABCD;
        for (let i = 0; i < levelKey.length; i++) {
            seed = ((seed << 5) - seed + levelKey.charCodeAt(i)) >>> 0; // seed * 31 + charCode
        }

        return seed >>> 0;
    }


    // --- LÓGICA DE INTERACCIÓN DEL JUEGO ---

    function startInteraction() {
        console.log("Starting input interaction listeners.");
        document.removeEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.removeEventListener('click', handleKeyClick));

        document.addEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.addEventListener('click', handleKeyClick));
        isGameActive = true;
        updateClueAvailability();
    }

    function stopInteraction() {
        console.log("Stopping input interaction listeners.");
        document.removeEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.removeEventListener('click', handleKeyClick));
        isGameActive = false;
        updateClueAvailability();
    }

    function handleKeyClick(e) {
        if (!isGameActive) return;
        const key = e.target.dataset.key;
        handleKey(key);
    }

    function handleKeyPress(e) {
        if (!isGameActive) return;

        if (e.key === 'Enter') {
            handleKey('ENTER');
        } else if (e.key === 'Backspace') {
            handleKey('BACKSPACE');
        } else {
            const key = e.key.toUpperCase();
            if (key.length === 1 && ((key >= 'A' && key <= 'Z') || key === 'Ñ')) {
                handleKey(key);
            }
        }
    }


    function handleKey(key) {
        if (!isGameActive) return;

        if (key === 'ENTER') {
            submitGuess();
        } else if (key === 'BACKSPACE') {
            deleteLetter();
        } else if (currentColIndex < currentWordLength) {
            addLetter(key);
        }
    }


    function addLetter(letter) {
        if (currentColIndex >= currentWordLength) return;
        const tileIndex = currentRowIndex * currentWordLength + currentColIndex;
        const tile = allTiles[tileIndex];
        if (tile) {
            tile.textContent = letter;
            tile.classList.add('filled');
            tile.dataset.letter = letter;
            currentColIndex++;
        }
    }

    function deleteLetter() {
        if (currentColIndex === 0) return;
        currentColIndex--;
        const tileIndex = currentRowIndex * currentWordLength + currentColIndex;
        const tile = allTiles[tileIndex];
         if (tile) {
            tile.textContent = '';
            tile.classList.remove('filled');
            tile.removeAttribute('data-letter');
        }
    }

    async function submitGuess() {
        if (!isGameActive) return;

        if (currentColIndex < currentWordLength) {
            showToast('Missing letters');
            shakeRow();
            return;
        }

        const guess = getCurrentGuess();
        console.log("Current guess:", guess);
        
        // Clear any existing "checking..." toast
        const loadingToast = document.getElementById('toast-loading');
        if (loadingToast) {
            loadingToast.remove();
        }

        // Usamos la lista de validación completa para la longitud actual
        const validationSet = validationSetsByLength.get(currentWordLength) || new Set();
        if (!validationSet.has(guess)) {
            showToast('Not in word list');
            shakeRow();
            console.log(`Submit failed: Word "${guess}" not in validation list.`);
            return;
        }

        console.log("Word is valid, evaluating...");
        guessesMade++;
        isGameActive = false; // Desactivar input durante la animación
        evaluateGuess(guess);
        updateClueAvailability();
    }

    function getCurrentGuess() {
        let guess = '';
        const rowStart = currentRowIndex * currentWordLength;
        for (let i = 0; i < currentWordLength; i++) {
            guess += allTiles[rowStart + i].textContent;
        }
        return guess;
    }

    function evaluateGuess(guess) {
        const rowStart = currentRowIndex * currentWordLength;
        const rowTiles = allTiles.slice(rowStart, rowStart + currentWordLength);
        const targetArray = targetWord.split('');
        const guessArray = guess.split('');
        console.log(`Evaluating guess: ${guess} against target: ${targetWord}`);

        const feedback = Array(currentWordLength).fill(null);

        // 1. Mark greens
        for (let i = 0; i < currentWordLength; i++) {
            if (guessArray[i] === targetArray[i]) {
                feedback[i] = 'correct';
                targetArray[i] = null;
            }
        }

        // 2. Mark yellows and grays
        for (let i = 0; i < currentWordLength; i++) {
            if (feedback[i] === 'correct') continue;

            const letterIndexInTarget = targetArray.indexOf(guessArray[i]);
            if (letterIndexInTarget > -1) {
                 feedback[i] = 'present';
                 targetArray[letterIndexInTarget] = null;
            } else {
                 feedback[i] = 'absent';
            }
        }

        // --- LÓGICA PARA @keyframes ---
        const FLIP_ANIMATION_DURATION = 800;

        rowTiles.forEach((tile, index) => {
            tile.dataset.letter = guessArray[index];
            setTimeout(() => {
                tile.classList.add(feedback[index]);
                tile.classList.add('flip');
                tile.style.color = '#ffffff';
                updateKeyboard(guessArray[index], feedback[index]);
                setTimeout(() => {
                    tile.style.color = '#ffffff';
                }, FLIP_ANIMATION_DURATION);
            }, index * 300); // Retardo escalonado
        });

        // Duración (0.8s = 800ms) + último retardo (4 * 300ms = 1200ms)
        const totalAnimationTime = 800 + ((currentWordLength - 1) * 300); // 2000ms
        setTimeout(() => {
            console.log("Flip animation complete, checking win/loss...");
            
            // --- INICIO DE LA CORRECCIÓN ---
            const gameEnded = checkWinLoss(guess);

            // Si el juego NO ha terminado (gameEnded es false), reactivamos el input
            if (!gameEnded) {
                 isGameActive = true;
                 console.log("Game continues, re-enabling input.");
            }
            updateClueAvailability();
            // --- FIN DE LA CORRECCIÓN ---

        }, totalAnimationTime + 100);
    }

    function updateKeyboard(letter, status) {
        const key = document.querySelector(`.keyboard-key[data-key="${letter}"]`);
        if (!key) return;

        const currentStatus = key.classList.contains('correct') ? 'correct' :
                              key.classList.contains('present') ? 'present' :
                              key.classList.contains('absent') ? 'absent' : null;

        const newStatusPriority = status === 'correct' ? 3 : status === 'present' ? 2 : 1;
        const currentStatusPriority = currentStatus === 'correct' ? 3 : currentStatus === 'present' ? 2 : currentStatus === 'absent' ? 1 : 0;

        if (newStatusPriority >= currentStatusPriority) {
            if (currentStatus) key.classList.remove(currentStatus);
            key.classList.add(status);
        }
    }

    // --- FUNCIÓN CHECKWINLOSS MODIFICADA ---
    // Devuelve 'true' si el juego ha terminado (gana o pierde)
    // y 'false' si el juego debe continuar.
    function checkWinLoss(guess) {
        if (guess === targetWord) {
            stopInteraction();
            danceWin();
            console.log("Game outcome: WIN");
            updateClueAvailability();

            if (isAdventureMode) {
                handleAdventureWin();
            } else {
                showToast('Well done! 🥳', 5000);
            }

            return true; // Juego terminado
        }

        // Comprobar si era el último intento
        if (currentRowIndex === MAX_TRIES - 1) { // 5 es el último índice (0-5)
            stopInteraction();

            if (isAdventureMode) {
                handleAdventureFailure();
                return true;
            }

            showToast('Want to try again?', 5000);
            console.log("Game outcome: LOSS");
            updateClueAvailability();
            return true; // Juego terminado
        }

        // Si no ha ganado ni perdido, el juego continúa
        currentRowIndex++;
        currentColIndex = 0;
        clueUsedThisRow = false;
        updateClueAvailability();
        console.log(`Moving to next row: ${currentRowIndex}`);
        return false; // Juego NO terminado
    }
    // --- FIN DE MODIFICACIÓN ---


    // --- FUNCIONES DE FEEDBACK ---

    function showToast(message, duration = 2000) {
        // Clear any "loading" toast if it exists
        const loadingToast = document.getElementById('toast-loading');
        if (loadingToast) {
            loadingToast.remove();
        }

        if (duration < 3000 && message !== 'Checking dictionary...') {
             const existingToasts = toastContainer.querySelectorAll('.toast:not(#toast-loading)');
             existingToasts.forEach(t => t.remove());
        }
        
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.prepend(toast);

        if (message === 'Checking dictionary...') {
            toast.id = "toast-loading";
        } else {
            setTimeout(() => {
                toast.style.transition = 'opacity 0.5s ease';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 500);
            }, duration);
        }
    }


    function shakeRow() {
        console.log("Shaking current row:", currentRowIndex);
        grid.classList.remove('shake');
        void grid.offsetWidth; // Forzar reflow
        grid.classList.add('shake');
    }

    function updateClueAvailability() {
        if (!clueButton) return;

        const hintsUnlocked = currentRowIndex >= TRIES_BEFORE_HINTS;
        const hintsRemaining = nextHintIndex < hintsForCurrentWord.length;
        const canUseClue = hintsUnlocked && hintsRemaining && isGameActive && !clueUsedThisRow;

        clueButton.disabled = !canUseClue;
        clueButton.classList.toggle('active', canUseClue);
        clueButton.textContent = canUseClue ? 'GET A CLUE' : (hintsUnlocked ? 'GET A CLUE' : 'try more words to activate clues');

        if (!clueMessagesContainer) return;

        const existingDefault = clueMessagesContainer.querySelector('.clue-message-default');

        if (!hintsUnlocked) {
            if (existingDefault) {
                existingDefault.textContent = 'try more words to activate clues';
                existingDefault.dataset.state = 'locked';
            } else {
                clueMessagesContainer.innerHTML = '';
                const lockedMessage = document.createElement('p');
                lockedMessage.classList.add('clue-message', 'clue-message-default');
                lockedMessage.dataset.state = 'locked';
                lockedMessage.textContent = 'try more words to activate clues';
                clueMessagesContainer.appendChild(lockedMessage);
            }
            return;
        }

        if (!hintsRemaining) {
            if (existingDefault) {
                existingDefault.remove();
            }
            return;
        }

        const promptText = `Press "GET A CLUE" to see hint ${nextHintIndex + 1}.`;
        if (existingDefault) {
            existingDefault.textContent = promptText;
            existingDefault.dataset.state = 'unlocked';
        } else {
            const defaultMessage = document.createElement('p');
            defaultMessage.classList.add('clue-message', 'clue-message-default');
            defaultMessage.dataset.state = 'unlocked';
            defaultMessage.textContent = promptText;
            clueMessagesContainer.appendChild(defaultMessage);
        }
    }

    function danceWin() {
         console.log("Triggering win dance animation on row:", currentRowIndex);
         const rowStart = currentRowIndex * currentWordLength;
         const rowTiles = allTiles.slice(rowStart, rowStart + currentWordLength);
         rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.style.animation = '';
                void tile.offsetWidth;
                tile.style.animation = `dance 0.5s ease ${index * 0.1}s`;
            }, 100);
         });
    }

    // --- INYECCIÓN DE KEYFRAMES ---
    function injectKeyframes() {
        const styleSheetId = "wordle-animations";
        if (document.getElementById(styleSheetId)) return;

        const style = document.createElement("style");
        style.id = styleSheetId;
        style.innerHTML = `
            @keyframes dance {
                20%, 80% { transform: translateY(-8px); }
                40%, 60% { transform: translateY(0px); }
            }
        `;
        document.head.appendChild(style);
        console.log("Inserted @keyframes dance rule.");
    }
    
    injectKeyframes();

    // --- INICIAR EL JUEGO ---
    initializeGame();

});
