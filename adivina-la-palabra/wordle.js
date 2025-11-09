// Adivina la Palabra - Game Logic JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded. Initializing game...");

    // --- CONSTANTES DE CONFIGURACIÓN ---
    const MAX_TRIES = 6;
    const MIN_WORD_LENGTH = 3;
    const MAX_WORD_LENGTH = 6;
    
    // Simula que el usuario es premium (para probar el calendario)
    const IS_PREMIUM_USER = true; 

    // --- SELECTORES DEL DOM ---
    const gameContainer = document.querySelector('.game-container');
    const grid = document.querySelector('.game-grid');
    let allTiles = [];
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const toastContainer = document.querySelector('.toast-container');
    const calendarButton = document.getElementById('calendar-button');
    const levelTitle = document.getElementById('game-level-title');

    if (!gameContainer || !grid || !keyboardKeys.length || !toastContainer || !calendarButton || !levelTitle || !clueButton || !clueMessagesContainer) {
        console.error("Error: Could not find all essential game elements in the HTML.");
        return;
    }

    clueButton.addEventListener('click', handleClueClick);

    // --- ESTADO DEL JUEGO ---
    const answerListsByLength = new Map();
    const validationSetsByLength = new Map();
    let combinedAnswerList = [];
    let currentWordLength = 5;
    let wordDataLoaded = false;
    let targetWord = "";
    let currentRowIndex = 0;
    let currentColIndex = 0;
    let isGameActive = false;
    let currentDate = new Date();
    let currentLevel = null;
    const hintDictionary = new Map();
    let hintDataLoaded = false;
    let hintsForCurrentWord = [];
    let nextHintIndex = 0;
    let clueUsedThisRow = false;

    // --- INICIALIZACIÓN ---

    function initializeGame() {
        console.log("Initializing game setup...");
        const urlParams = new URLSearchParams(window.location.search);
        currentLevel = urlParams.get('level') || 'A1';
        levelTitle.textContent = `Level ${currentLevel}`;
        
        setupCalendar();
        loadGameForDate(new Date());
    }

    /**
     * Configura el calendario Flatpickr
     */
    function setupCalendar() {
        const today = new Date();
        const sixtyDaysAgo = new Date().fp_incr(-60);

        flatpickr(calendarButton, {
            maxDate: today,
            minDate: sixtyDaysAgo,
            defaultDate: today,
            disableMobile: "true",
            dateFormat: "Y-m-d",
            
            onChange: function(selectedDates, dateStr) {
                const selectedDate = selectedDates[0];
                if (!selectedDate) return;
                
                if (dateStr === normalizeDate(currentDate)) return;

                if (isToday(selectedDate)) {
                    console.log("Cargando juego para hoy.");
                    loadGameForDate(selectedDate);
                } else {
                    if (IS_PREMIUM_USER) {
                        console.log("Usuario premium, cargando día anterior:", dateStr);
                        loadGameForDate(selectedDate);
                    } else {
                        showToast('Solo los suscriptores pueden jugar días anteriores.');
                        this.setDate(currentDate); 
                    }
                }
            },
        });
    }

    /**
     * Carga las listas de palabras y prepara el juego para una fecha específica
     */
    async function loadGameForDate(date) {
        currentDate = date;
        showToast('Cargando juego...', 2000);

        stopInteraction();

        if (!wordDataLoaded) {
            const success = await loadWordLists(currentLevel);
            if (!success) return;
        }

        const selection = getWordForDate(date);
        if (!selection) {
            showToast('No se encontró una palabra para esta fecha.');
            console.error('No target word available for the selected date.');
            return;
        }

        targetWord = selection.word;
        currentWordLength = selection.length;

        resetBoard(currentWordLength);

        console.log(`Palabra para ${date.toDateString()}: ${targetWord}`);

        isGameActive = true;
        startInteraction();
        updateClueAvailability();
    }

    /**
     * Carga las listas de palabras (validación y respuestas) desde los archivos
     */
    async function loadWordLists(levelIdentifier) {
        console.log(`Loading word lists for ${levelIdentifier}...`);

        const answerListFilename = `../data/wordle-a1-palabras.json`;
        const validationFiles = [
            { length: 3, filename: `../data/03.json` },
            { length: 4, filename: `../data/04.json` },
            { length: 5, filename: `../data/05.json` },
            { length: 6, filename: `../data/06.json` },
        ];

        try {
            const answerResponse = await fetch(answerListFilename);
            if (!answerResponse.ok) throw new Error(`No se pudo cargar ${answerListFilename}`);

            const validationResponses = await Promise.all(validationFiles.map(file => fetch(file.filename)));
            validationResponses.forEach((response, index) => {
                if (!response.ok) {
                    throw new Error(`No se pudo cargar ${validationFiles[index].filename}`);
                }
            });

            const rawAnswerWords = await answerResponse.json();
            const normalizedAnswers = rawAnswerWords
                .map(word => normalizeWord(word.trim()))
                .filter(word => word.length >= MIN_WORD_LENGTH && word.length <= MAX_WORD_LENGTH);

            answerListsByLength.clear();
            validationSetsByLength.clear();

            for (let length = MIN_WORD_LENGTH; length <= MAX_WORD_LENGTH; length++) {
                answerListsByLength.set(length, []);
            }

            normalizedAnswers.forEach(word => {
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

                console.log(`Lista de validación (${length} letras) cargada:`, validationSet.size, "palabras");
            });

            combinedAnswerList = normalizedAnswers.filter(word => validationSetsByLength.has(word.length));
            combinedAnswerList = shuffleArrayDeterministic(Array.from(new Set(combinedAnswerList)));

            if (combinedAnswerList.length === 0) {
                showToast('No se encontraron palabras de respuesta.');
                console.error('La lista de respuestas no contiene palabras válidas.');
                return false;
            }

            [3, 4, 5, 6].forEach(length => {
                const answersForLength = answerListsByLength.get(length) || [];
                console.log(`Lista de respuestas (${length} letras) cargada:`, answersForLength.length, 'palabras');
            });

            console.log('Total de palabras disponibles:', combinedAnswerList.length);

            wordDataLoaded = true;
            return true; // Éxito

        } catch (error) {
            console.error("Error al cargar las listas de palabras:", error);
            showToast('Error al iniciar el juego.');
            return false;
        }
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
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
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
            showToast('Faltan letras');
            shakeRow();
            return;
        }

        const guess = getCurrentGuess();
        console.log("Current guess:", guess);
        
        // Limpiar el toast de "Comprobando..." si existiera
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
            showToast('¡Felicidades, has ganado!', 5000);
            stopInteraction();
            danceWin();
            console.log("Game outcome: WIN");
            updateClueAvailability();
            return true; // Juego terminado
        }

        // Comprobar si era el último intento
        if (currentRowIndex === MAX_TRIES - 1) { // 5 es el último índice (0-5)
            showToast('Want to try again?', 5000);
            stopInteraction();
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
        // Limpiar el toast de "cargando" si existe
        const loadingToast = document.getElementById('toast-loading');
        if (loadingToast) {
            loadingToast.remove();
        }
        
        if (duration < 3000 && message !== 'Comprobando diccionario...') {
             const existingToasts = toastContainer.querySelectorAll('.toast:not(#toast-loading)');
             existingToasts.forEach(t => t.remove());
        }
        
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.prepend(toast);

        if (message === 'Comprobando diccionario...') {
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
