// Adivina la Palabra - Game Logic JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded. Initializing game..."); // Debug log

    const gameContainer = document.querySelector('.game-container');
    const grid = document.querySelector('.game-grid');
    const allTiles = Array.from(grid.children);
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const toastContainer = document.querySelector('.toast-container');

    // Check if elements were found
    if (!gameContainer || !grid || !keyboardKeys.length || !toastContainer) {
        console.error("Error: Could not find essential game elements in the HTML.");
        return; // Stop if elements are missing
    }

    let wordList = [];
    let targetWord = "";
    let currentRowIndex = 0;
    let currentColIndex = 0;
    let isGameActive = true;
    let currentLevel = null;

    // --- INICIO DEL JUEGO AL CARGAR LA PÁGINA game.html ---

    function initializeGame() {
        console.log("Initializing game setup..."); // Debug log
        const urlParams = new URLSearchParams(window.location.search);
        currentLevel = urlParams.get('level');

        if (!currentLevel) {
            showToast('Nivel no especificado.');
            console.error("Level parameter missing from URL"); // Debug log
            return;
        }
        console.log("Level detected:", currentLevel); // Debug log

        // TODO: Adaptar para cargar JSON según currentLevel cuando estén listos
        if (currentLevel.startsWith('A')) {
             loadWordListAndStart('A1');
        } else {
             showToast(`Nivel ${currentLevel} no disponible todavía.`);
             console.warn(`Word list for level ${currentLevel} not implemented yet.`); // Debug log
        }
    }

    async function loadWordListAndStart(levelIdentifier) {
        console.log(`Loading word list for ${levelIdentifier}...`); // Debug log
        try {
            let filename = '';
            if (levelIdentifier === 'A1') {
                filename = `../data/wordle-a1-palabras.json`;
            } else {
                throw new Error(`Lista de palabras para ${levelIdentifier} no encontrada.`);
            }

            const response = await fetch(filename);
            if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status} while fetching ${filename}`);
            }

            const allWords = await response.json();
            console.log("Raw word list loaded:", allWords.length, "words"); // Debug log

            wordList = allWords.filter(word => word.length === 5);
            console.log("Filtered 5-letter word list:", wordList.length, "words"); // Debug log

            if (wordList.length === 0) {
                showToast('No se encontraron palabras de 5 letras para este nivel.');
                console.error("No 5-letter words found in the list."); // Debug log
                return;
            }

            targetWord = getWordOfTheDay(wordList);
            console.log("Word of the day:", targetWord); // Debug log (essential!)

            startInteraction(); // <-- Start listening for input AFTER loading words

        } catch (error) {
            console.error("Error loading or processing word list:", error); // Debug log
            showToast('Error al iniciar el juego.');
        }
    }

     function getWordOfTheDay(list) {
        const epoch = new Date('2025-01-01');
        const today = new Date();
        const diffTime = Math.max(0, today - epoch);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const wordIndex = diffDays % list.length;
        console.log(`Epoch: ${epoch}, Today: ${today}, DiffDays: ${diffDays}, Index: ${wordIndex}`); // Debug log
        return list[wordIndex];
    }
    
    // --- NUEVA FUNCIÓN PARA LA API ---
    async function checkWordWithAPI(word) {
        console.log(`Checking API for word: ${word}`);
        try {
            // Llama a la API gratuita para la palabra en español
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/es/${word}`);
            
            // Si la respuesta es "OK" (status 200), la palabra existe
            if (response.ok) {
                console.log("API check: Word exists.");
                return true;
            } else {
                // Si la respuesta es 404, la palabra no existe
                console.log("API check: Word does not exist (404).");
                return false;
            }
        } catch (error) {
            // Si hay un error de red, asumimos que no es válida para evitar problemas
            console.error("Error fetching from API:", error);
            return false;
        }
    }
    // --- FIN DE NUEVA FUNCIÓN ---


    // --- LÓGICA DEL JUEGO ---

    function startInteraction() {
        console.log("Starting input interaction listeners."); // Debug log
        document.removeEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.removeEventListener('click', handleKeyClick));

        document.addEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.addEventListener('click', handleKeyClick));
        isGameActive = true;
    }

    function stopInteraction() {
        console.log("Stopping input interaction listeners."); // Debug log
        document.removeEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.removeEventListener('click', handleKeyClick));
        isGameActive = false;
    }

    function handleKeyClick(e) {
        if (!isGameActive) return;
        const key = e.target.dataset.key;
        console.log("Virtual key clicked:", key); // Debug log
        handleKey(key);
    }

    function handleKeyPress(e) {
        if (!isGameActive) return;
        console.log("Physical key pressed:", e.key); // Debug log

        if (e.key === 'Enter') {
            handleKey('ENTER');
        } else if (e.key === 'Backspace') {
            handleKey('BACKSPACE');
        } else {
            const key = e.key.toUpperCase();
            if (key.length === 1 && ((key >= 'A' && key <= 'Z') || key === 'Ñ')) {
                handleKey(key);
            } else {
                 console.log("Ignoring physical key:", e.key); // Debug log for ignored keys
            }
        }
    }


    function handleKey(key) {
        console.log("Processing key:", key); // Debug log
        if (!isGameActive) {
            console.log("Game not active, ignoring key."); // Debug log
            return;
        }

        if (key === 'ENTER') {
            submitGuess();
        } else if (key === 'BACKSPACE') {
            deleteLetter();
        } else if (currentColIndex < 5) {
            addLetter(key);
        } else {
            console.log("Row is full, cannot add letter:", key); // Debug log
        }
    }


    function addLetter(letter) {
        if (currentColIndex >= 5) return;
        const tileIndex = currentRowIndex * 5 + currentColIndex;
        console.log(`Adding letter '${letter}' to tile ${tileIndex} (Row: ${currentRowIndex}, Col: ${currentColIndex})`); // Debug log
        const tile = allTiles[tileIndex];
        if (tile) {
            tile.textContent = letter;
            tile.classList.add('filled');
            currentColIndex++;
        } else {
            console.error("Could not find tile at index:", tileIndex); // Debug log
        }
    }

    function deleteLetter() {
        if (currentColIndex === 0) return;
        currentColIndex--;
        const tileIndex = currentRowIndex * 5 + currentColIndex;
        console.log(`Deleting letter from tile ${tileIndex} (Row: ${currentRowIndex}, Col: ${currentColIndex})`); // Debug log
        const tile = allTiles[tileIndex];
         if (tile) {
            tile.textContent = '';
            tile.classList.remove('filled');
        } else {
            console.error("Could not find tile at index:", tileIndex); // Debug log
        }
    }

    // --- FUNCIÓN SUBMITGUESS MODIFICADA ---
    async function submitGuess() {
        console.log(`Attempting to submit guess (Row: ${currentRowIndex}, Col: ${currentColIndex})`);
        if (currentColIndex < 5) {
            showToast('Faltan letras');
            shakeRow();
            console.log("Submit failed: Not enough letters.");
            return;
        }

        const guess = getCurrentGuess();
        console.log("Current guess:", guess);

        // --- INICIO DE LA MODIFICACIÓN ---
        
        // Comprobamos si la palabra es válida.
        // Primero mira en nuestra lista A1 (rápido) y si no, mira en la API (lento).
        let isValidWord = wordList.includes(guess);
        
        if (!isValidWord) {
            // Si no está en la lista A1, pregunta a la API
            isGameActive = false; // Desactivar input mientras carga
            showToast('Comprobando diccionario...'); // Mensaje de espera
            isValidWord = await checkWordWithAPI(guess);
            isGameActive = true; // Reactivar input
        }

        if (!isValidWord) {
            showToast('No está en la lista de palabras');
            shakeRow();
            console.log("Submit failed: Word not in A1 list or API.");
            return;
        }
        
        // --- FIN DE LA MODIFICACIÓN ---

        console.log("Word is valid, evaluating...");
        isGameActive = false; // Desactivar input durante la animación
        evaluateGuess(guess);
    }
    // --- FIN DE FUNCIÓN SUBMITGUESS ---

    function getCurrentGuess() {
        let guess = '';
        const rowStart = currentRowIndex * 5;
        for (let i = 0; i < 5; i++) {
            guess += allTiles[rowStart + i].textContent;
        }
        return guess;
    }

    function evaluateGuess(guess) {
        const rowStart = currentRowIndex * 5;
        const rowTiles = allTiles.slice(rowStart, rowStart + 5);
        const targetArray = targetWord.split('');
        const guessArray = guess.split('');
        console.log(`Evaluating guess: ${guess} against target: ${targetWord}`); // Debug log

        const feedback = Array(5).fill(null);

        // 1. Mark greens
        for (let i = 0; i < 5; i++) {
            if (guessArray[i] === targetArray[i]) {
                feedback[i] = 'correct';
                targetArray[i] = null;
                 console.log(`Letter ${guessArray[i]} at index ${i} is correct`); // Debug log
            }
        }

        // 2. Mark yellows and grays
        for (let i = 0; i < 5; i++) {
            if (feedback[i] === 'correct') continue;

            const letterIndexInTarget = targetArray.indexOf(guessArray[i]);
            if (letterIndexInTarget > -1) {
                 feedback[i] = 'present';
                 targetArray[letterIndexInTarget] = null;
                 console.log(`Letter ${guessArray[i]} at index ${i} is present`); // Debug log
            } else {
                 feedback[i] = 'absent';
                 console.log(`Letter ${guessArray[i]} at index ${i} is absent`); // Debug log
            }
        }

        // --- LÓGICA PARA @keyframes ---
        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add(feedback[index]); // Aplica color de fondo
                tile.classList.add('flip'); // Inicia animación
                updateKeyboard(guessArray[index], feedback[index]);
            }, index * 300); // Retardo escalonado
        });
        // --- FIN LÓGICA PARA @keyframes ---

        const totalAnimationTime = 800 + (4 * 300); // 2000ms
        setTimeout(() => {
            console.log("Flip animation complete, checking win/loss..."); // Debug log
            checkWinLoss(guess);
            if (guess !== targetWord && currentRowIndex < 6) {
                 isGameActive = true;
                 console.log("Game continues, re-enabling input."); // Debug log
            }
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
             console.log(`Keyboard key ${letter} updated to ${status}`); // Debug log
        }
    }


    function checkWinLoss(guess) {
        if (guess === targetWord) {
            showToast('¡Felicidades, has ganado!', 5000);
            stopInteraction();
            danceWin();
            console.log("Game outcome: WIN"); // Debug log
            return;
        }

        if (currentRowIndex === 5) {
            showToast(`La palabra era: ${targetWord}`, 5000);
            stopInteraction();
            console.log("Game outcome: LOSS"); // Debug log
            return;
        }

        currentRowIndex++;
        currentColIndex = 0;
        console.log(`Moving to next row: ${currentRowIndex}`); // Debug log
    }


    // --- FUNCIONES DE FEEDBACK ---

    function showToast(message, duration = 2000) {
        if (duration < 3000 && message !== 'Comprobando diccionario...') {
             const existingToasts = toastContainer.querySelectorAll('.toast');
             existingToasts.forEach(t => t.remove());
        }
        
        // Si es el mensaje de "Comprobando", no lo elimines tan rápido
        if (message === 'Comprobando diccionario...' && duration < 3000) {
            duration = 3000; // Darle más tiempo
        }

        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.prepend(toast);

        // Si es "Comprobando", no lo auto-elimines, lo haremos manualmente
        if (message === 'Comprobando diccionario...') {
            toast.id = "toast-loading"; // Darle un ID para encontrarlo
        } else {
            setTimeout(() => {
                toast.style.transition = 'opacity 0.5s ease';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 500);
            }, duration);
        }
    }


    function shakeRow() {
        console.log("Shaking current row:", currentRowIndex); // Debug log
        grid.classList.remove('shake');
        void grid.offsetWidth;
        grid.classList.add('shake');
    }

    function danceWin() {
         console.log("Triggering win dance animation on row:", currentRowIndex); // Debug log
         const rowStart = currentRowIndex * 5;
         const rowTiles = allTiles.slice(rowStart, rowStart + 5);
         rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.style.animation = '';
                void tile.offsetWidth;
                tile.style.animation = `dance 0.5s ease ${index * 0.1}s`;
            }, 100);
         });
    }


    // Asegurar que @keyframes dance exista
    let danceExists = false;
    for (const sheet of document.styleSheets) {
        try {
            if (sheet.href && sheet.href.startsWith(window.location.origin)) {
                for (const rule of sheet.cssRules) {
                    if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'dance') {
                        danceExists = true; break;
                    }
                }
            } else if (!sheet.href) {
                 for (const rule of sheet.cssRules) {
                    if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'dance') {
                        danceExists = true; break;
                    }
                }
            }
        } catch (e) { console.warn("Could not access CSS rules:", sheet.href, e); }
        if (danceExists) break;
    }

    if (!danceExists) {
        try {
            let targetSheet = null;
            for(const sheet of document.styleSheets){ if(sheet.href && sheet.href.includes('wordle.css')){ targetSheet = sheet; break; } }
            if(!targetSheet) { for(let i = document.styleSheets.length - 1; i >= 0; i--) { const sheet = document.styleSheets[i]; if (!sheet.href || sheet.href.startsWith(window.location.origin)) { targetSheet = sheet; break; } } }
            if(targetSheet){
                 targetSheet.insertRule(`@keyframes dance { 20%, 80% { transform: translateY(-8px); } 40%, 60% { transform: translateY(0px); } }`, targetSheet.cssRules.length);
                 console.log("Inserted @keyframes dance rule.");
            } else { console.warn("Could not find suitable stylesheet to insert @keyframes dance."); }
        } catch (e) { console.error("Failed to insert @keyframes dance rule:", e); }
    }

    // --- INICIAR EL JUEGO ---
    initializeGame();

});
