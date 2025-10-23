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
        const epoch = new Date('2025-01-01'); // Asegúrate que la fecha sea válida
        const today = new Date();
        // Asegúrate que today > epoch para evitar números negativos si la fecha es futura
        const diffTime = Math.max(0, today - epoch);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const wordIndex = diffDays % list.length;
        console.log(`Epoch: ${epoch}, Today: ${today}, DiffDays: ${diffDays}, Index: ${wordIndex}`); // Debug log
        return list[wordIndex];
    }


    // --- LÓGICA DEL JUEGO ---

    function startInteraction() {
        console.log("Starting input interaction listeners."); // Debug log
        // Clear previous listeners just in case
        document.removeEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.removeEventListener('click', handleKeyClick));

        // Attach new listeners
        document.addEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.addEventListener('click', handleKeyClick));
        isGameActive = true; // Ensure game is active
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

        // Use e.key for special keys
        if (e.key === 'Enter') {
            handleKey('ENTER');
        } else if (e.key === 'Backspace') {
            handleKey('BACKSPACE');
        } else {
            // For letters, standardize to uppercase
            const key = e.key.toUpperCase();
            // Check if it's a single valid letter (A-Z or Ñ)
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
        } else if (currentColIndex < 5) { // Only add if row is not full
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

    async function submitGuess() {
        console.log(`Attempting to submit guess (Row: ${currentRowIndex}, Col: ${currentColIndex})`); // Debug log
        if (currentColIndex < 5) {
            showToast('Faltan letras');
            shakeRow();
            console.log("Submit failed: Not enough letters."); // Debug log
            return;
        }

        const guess = getCurrentGuess();
        console.log("Current guess:", guess); // Debug log

        // Check word validity immediately
        if (!wordList.includes(guess)) {
            showToast('No está en la lista de palabras');
            shakeRow();
            console.log("Submit failed: Word not in list."); // Debug log
            return;
        }

        console.log("Word is valid, evaluating..."); // Debug log
        isGameActive = false; // Disable input during evaluation/animation
        evaluateGuess(guess);
    }

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

        // Create temporary feedback array to handle duplicates correctly
        const feedback = Array(5).fill(null); // correct, present, absent

        // 1. Mark greens (correct position)
        for (let i = 0; i < 5; i++) {
            if (guessArray[i] === targetArray[i]) {
                feedback[i] = 'correct';
                targetArray[i] = null; // Mark target letter as used
                 console.log(`Letter ${guessArray[i]} at index ${i} is correct`); // Debug log
            }
        }

        // 2. Mark yellows (present) and grays (absent)
        for (let i = 0; i < 5; i++) {
            if (feedback[i] === 'correct') continue; // Skip greens

            const letterIndexInTarget = targetArray.indexOf(guessArray[i]);
            if (letterIndexInTarget > -1) { // Letter exists elsewhere in target
                 feedback[i] = 'present';
                 targetArray[letterIndexInTarget] = null; // Mark target letter as used
                 console.log(`Letter ${guessArray[i]} at index ${i} is present`); // Debug log
            } else {
                 feedback[i] = 'absent';
                 console.log(`Letter ${guessArray[i]} at index ${i} is absent`); // Debug log
            }
        }

        // Apply feedback to tiles and keyboard with animation
        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add(feedback[index]); // Add color class
                tile.classList.add('flip'); // Start flip animation
                updateKeyboard(guessArray[index], feedback[index]); // Update keyboard state
            }, index * 300); // Stagger animation start
        });

        // Wait for all animations to roughly finish before checking win/loss
        setTimeout(() => {
            console.log("Flip animation complete, checking win/loss..."); // Debug log
            checkWinLoss(guess);
             // Re-enable input ONLY if the game hasn't ended
            if (guess !== targetWord && currentRowIndex < 6) {
                 isGameActive = true;
                 console.log("Game continues, re-enabling input."); // Debug log
            }
        }, 5 * 300 + 100); // Wait slightly longer than the last animation starts
    }

    function updateKeyboard(letter, status) {
        const key = document.querySelector(`.keyboard-key[data-key="${letter}"]`);
        if (!key) return;

        const currentStatus = key.classList.contains('correct') ? 'correct' :
                              key.classList.contains('present') ? 'present' :
                              key.classList.contains('absent') ? 'absent' : null;

        // Determine the best status (correct > present > absent)
        const newStatusPriority = status === 'correct' ? 3 : status === 'present' ? 2 : 1;
        const currentStatusPriority = currentStatus === 'correct' ? 3 : currentStatus === 'present' ? 2 : currentStatus === 'absent' ? 1 : 0;

        // Only update if the new status is better or equal (handles initial state)
        if (newStatusPriority >= currentStatusPriority) {
            // Remove previous status classes if they exist
            if (currentStatus) key.classList.remove(currentStatus);
            // Add the new status class
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

        // Check if it was the last row
        if (currentRowIndex === 5) { // Row indices are 0-5
            showToast(`La palabra era: ${targetWord}`, 5000);
            stopInteraction();
            console.log("Game outcome: LOSS"); // Debug log
            return;
        }

        // Move to the next row if the game is still ongoing
        currentRowIndex++;
        currentColIndex = 0;
        console.log(`Moving to next row: ${currentRowIndex}`); // Debug log
    }


    // --- FUNCIONES DE FEEDBACK ---

    function showToast(message, duration = 2000) {
        // Clear short-lived toasts immediately
        if (duration < 3000) {
             const existingToasts = toastContainer.querySelectorAll('.toast');
             existingToasts.forEach(t => t.remove());
        }

        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.prepend(toast);

        // Auto remove toast
        setTimeout(() => {
            toast.style.transition = 'opacity 0.5s ease';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, duration);
    }


    function shakeRow() {
        console.log("Shaking current row:", currentRowIndex); // Debug log
        grid.classList.remove('shake'); // Remove first to allow re-triggering
        // Force reflow
        void grid.offsetWidth;
        grid.classList.add('shake');
    }

    function danceWin() {
         console.log("Triggering win dance animation on row:", currentRowIndex); // Debug log
         const rowStart = currentRowIndex * 5;
         const rowTiles = allTiles.slice(rowStart, rowStart + 5);
         rowTiles.forEach((tile, index) => {
            // Use a slight delay and stagger to ensure animation plays
            setTimeout(() => {
                tile.style.animation = `dance 0.5s ease ${index * 0.1}s`;
            }, 100);
         });
    }

    // Ensure the dance animation keyframes are injected
    // Check if the rule already exists to avoid duplicates
    let danceExists = false;
    for (const sheet of document.styleSheets) {
        try {
            for (const rule of sheet.cssRules) {
                if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'dance') {
                    danceExists = true;
                    break;
                }
            }
        } catch (e) {
            // Ignore CORS errors from external stylesheets
        }
        if (danceExists) break;
    }

    if (!danceExists) {
        try {
            // Find the first modifiable stylesheet (likely wordle.css)
            let targetSheet = null;
            for(const sheet of document.styleSheets){
                if(sheet.href && sheet.href.includes('wordle.css')){
                    targetSheet = sheet;
                    break;
                }
            }
            if(!targetSheet) targetSheet = document.styleSheets[0]; // Fallback

            if(targetSheet){
                 targetSheet.insertRule(`
                    @keyframes dance {
                        20%, 80% { transform: translateY(-8px); }
                        40%, 60% { transform: translateY(0px); }
                    }
                `, targetSheet.cssRules.length);
                 console.log("Inserted @keyframes dance rule."); // Debug log
            } else {
                 console.warn("Could not find a stylesheet to insert @keyframes."); // Debug log
            }

        } catch (e) {
            console.error("Failed to insert @keyframes rule:", e); // Debug log
        }
    }


    // --- INICIAR EL JUEGO ---
    initializeGame();

});
