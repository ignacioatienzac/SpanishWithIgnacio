// Adivina la Palabra - Game Logic JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded. Initializing game...");

    const gameContainer = document.querySelector('.game-container');
    const grid = document.querySelector('.game-grid');
    const allTiles = Array.from(grid.children);
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const toastContainer = document.querySelector('.toast-container');

    if (!gameContainer || !grid || !keyboardKeys.length || !toastContainer) {
        console.error("Error: Could not find essential game elements in the HTML.");
        return;
    }

    let wordList = []; // Lista para las RESPUESTAS (wordle-a1-palabras.json)
    let validationList = []; // Lista para VALIDAR (05.json)
    let targetWord = "";
    let currentRowIndex = 0;
    let currentColIndex = 0;
    let isGameActive = true;
    let currentLevel = null;

    // --- INICIO DEL JUEGO AL CARGAR LA PÁGINA game.html ---

    function initializeGame() {
        console.log("Initializing game setup...");
        const urlParams = new URLSearchParams(window.location.search);
        currentLevel = urlParams.get('level');

        if (!currentLevel) {
            showToast('Nivel no especificado.');
            console.error("Level parameter missing from URL");
            return;
        }
        console.log("Level detected:", currentLevel);

        if (currentLevel === 'A1') {
             loadWordLists('A1');
        } else {
             showToast(`Nivel ${currentLevel} no disponible todavía.`);
             console.warn(`Word list for level ${currentLevel} not implemented yet.`);
        }
    }

    /**
     * Normaliza una palabra: la convierte a mayúsculas,
     * quita las tildes y diéresis, pero mantiene la Ñ.
     */
    function normalizeWord(word) {
        if (typeof word !== 'string') return ''; // Evita errores si hay datos nulos
        return word
            .toUpperCase()
            .normalize("NFD") // Separa las tildes de las letras (ej: "Á" -> "A" + "´")
            .replace(/[\u0300-\u036f]/g, ""); // Elimina los caracteres diacríticos (las tildes)
    }


    async function loadWordLists(levelIdentifier) {
        console.log(`Loading word lists for ${levelIdentifier}...`);
        
        // Definimos las rutas de los dos archivos que necesitamos
        const answerListFilename = `../data/wordle-a1-palabras.json`; // Lista de respuestas
        const validationListFilename = `../data/05.json`; // Diccionario de validación

        try {
            // Cargamos ambos archivos al mismo tiempo
            const [answerResponse, validationResponse] = await Promise.all([
                fetch(answerListFilename),
                fetch(validationListFilename)
            ]);

            if (!answerResponse.ok) throw new Error(`No se pudo cargar ${answerListFilename}`);
            if (!validationResponse.ok) throw new Error(`No se pudo cargar ${validationListFilename}`);

            const answerWords = await answerResponse.json();
            const validationWords = await validationResponse.json(); // Esta lista tiene tildes

            // 1. Procesar la lista de RESPUESTAS (wordList)
            wordList = answerWords
                .map(word => normalizeWord(word.trim()))
                .filter(word => word.length === 5);
            
            console.log("Lista de respuestas (5 letras) cargada:", wordList.length, "palabras");

            // 2. Procesar la lista de VALIDACIÓN (validationList)
            validationList = validationWords
                .map(word => normalizeWord(word.trim())) // Quitamos tildes
                .filter(word => word.length === 5); // Nos aseguramos que sean de 5 letras

            // 3. (Opcional pero recomendado) Asegurarnos de que todas las respuestas
            //    estén en la lista de validación, usando un Set para eficiencia.
            const combinedSet = new Set([...validationList, ...wordList]);
            validationList = Array.from(combinedSet);
            
            console.log("Lista de validación (5 letras) cargada:", validationList.length, "palabras");

            if (wordList.length === 0) {
                showToast('No se encontraron palabras de respuesta.');
                console.error("La lista de respuestas (wordle-a1-palabras.json) está vacía o falló.");
                return;
            }

            // 4. Elegir la palabra del día de la lista de RESPUESTAS
            targetWord = getWordOfTheDay(wordList);
            console.log("Palabra del día:", targetWord); // Para pruebas

            // 5. Iniciar interacción
            startInteraction();

        } catch (error) {
            console.error("Error al cargar las listas de palabras:", error);
            showToast('Error al iniciar el juego.');
        }
    }

     function getWordOfTheDay(list) {
        const epoch = new Date('2025-01-01');
        const today = new Date();
        const diffTime = Math.max(0, today - epoch);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const wordIndex = diffDays % list.length;
        console.log(`Epoch: ${epoch}, Today: ${today}, DiffDays: ${diffDays}, Index: ${wordIndex}`);
        return list[wordIndex];
    }
    
    // --- LÓGICA DEL JUEGO ---

    function startInteraction() {
        console.log("Starting input interaction listeners.");
        document.removeEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.removeEventListener('click', handleKeyClick));

        document.addEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.addEventListener('click', handleKeyClick));
        isGameActive = true;
    }

    function stopInteraction() {
        console.log("Stopping input interaction listeners.");
        document.removeEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.removeEventListener('click', handleKeyClick));
        isGameActive = false;
    }

    function handleKeyClick(e) {
        if (!isGameActive) return;
        const key = e.target.dataset.key;
        console.log("Virtual key clicked:", key);
        handleKey(key);
    }

    function handleKeyPress(e) {
        if (!isGameActive) return;
        console.log("Physical key pressed:", e.key);

        if (e.key === 'Enter') {
            handleKey('ENTER');
        } else if (e.key === 'Backspace') {
            handleKey('BACKSPACE');
        } else {
            const key = e.key.toUpperCase();
            if (key.length === 1 && ((key >= 'A' && key <= 'Z') || key === 'Ñ')) {
                handleKey(key);
            } else {
                 console.log("Ignoring physical key:", e.key);
            }
        }
    }


    function handleKey(key) {
        console.log("Processing key:", key);
        if (!isGameActive) {
            console.log("Game not active, ignoring key.");
            return;
        }

        if (key === 'ENTER') {
            submitGuess();
        } else if (key === 'BACKSPACE') {
            deleteLetter();
        } else if (currentColIndex < 5) {
            addLetter(key);
        } else {
            console.log("Row is full, cannot add letter:", key);
        }
    }


    function addLetter(letter) {
        if (currentColIndex >= 5) return;
        const tileIndex = currentRowIndex * 5 + currentColIndex;
        console.log(`Adding letter '${letter}' to tile ${tileIndex} (Row: ${currentRowIndex}, Col: ${currentColIndex})`);
        const tile = allTiles[tileIndex];
        if (tile) {
            tile.textContent = letter;
            tile.classList.add('filled');
            currentColIndex++;
        } else {
            console.error("Could not find tile at index:", tileIndex);
        }
    }

    function deleteLetter() {
        if (currentColIndex === 0) return;
        currentColIndex--;
        const tileIndex = currentRowIndex * 5 + currentColIndex;
        console.log(`Deleting letter from tile ${tileIndex} (Row: ${currentRowIndex}, Col: ${currentColIndex})`);
        const tile = allTiles[tileIndex];
         if (tile) {
            tile.textContent = '';
            tile.classList.remove('filled');
        } else {
            console.error("Could not find tile at index:", tileIndex);
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
        // Comprobar si la palabra está en la LISTA DE VALIDACIÓN (05.json)
        if (!validationList.includes(guess)) {
            showToast('No está en la lista de palabras');
            shakeRow();
            console.log(`Submit failed: Word "${guess}" not in validation list.`);
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
        console.log(`Evaluating guess: ${guess} against target: ${targetWord}`);

        const feedback = Array(5).fill(null);

        // 1. Mark greens
        for (let i = 0; i < 5; i++) {
            if (guessArray[i] === targetArray[i]) {
                feedback[i] = 'correct';
                targetArray[i] = null;
                 console.log(`Letter ${guessArray[i]} at index ${i} is correct`);
            }
        }

        // 2. Mark yellows and grays
        for (let i = 0; i < 5; i++) {
            if (feedback[i] === 'correct') continue;

            const letterIndexInTarget = targetArray.indexOf(guessArray[i]);
            if (letterIndexInTarget > -1) {
                 feedback[i] = 'present';
                 targetArray[letterIndexInTarget] = null;
                 console.log(`Letter ${guessArray[i]} at index ${i} is present`);
            } else {
                 feedback[i] = 'absent';
                 console.log(`Letter ${guessArray[i]} at index ${i} is absent`);
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

        const totalAnimationTime = 800 + (4 * 300); // 2000ms (0.8s anim + 1.2s delay)
        setTimeout(() => {
            console.log("Flip animation complete, checking win/loss...");
            checkWinLoss(guess);
            if (guess !== targetWord && currentRowIndex < 6) { // Check < 6 (filas 0-5)
                 isGameActive = true;
                 console.log("Game continues, re-enabling input.");
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
             console.log(`Keyboard key ${letter} updated to ${status}`);
        }
    }


    function checkWinLoss(guess) {
        if (guess === targetWord) {
            showToast('¡Felicidades, has ganado!', 5000);
            stopInteraction();
            danceWin();
            console.log("Game outcome: WIN");
            return;
        }

        if (currentRowIndex === 5) { // Si estábamos en la última fila (índice 5)
            showToast(`La palabra era: ${targetWord}`, 5000);
            stopInteraction();
            console.log("Game outcome: LOSS");
            return;
        }

        currentRowIndex++;
        currentColIndex = 0;
        console.log(`Moving to next row: ${currentRowIndex}`);
    }


    // --- FUNCIONES DE FEEDBACK ---

    function showToast(message, duration = 2000) {
        // Limpiamos los toasts de "cargando" si existe
        const loadingToast = document.getElementById('toast-loading');
        if (loadingToast) {
            loadingToast.remove();
        }
        
        if (duration < 3000 && message !== 'Comprobando diccionario...') {
             const existingToasts = toastContainer.querySelectorAll('.toast:not(#toast-loading)');
             existingToasts.forEach(t => t.remove());
        }
        
        if (message === 'Comprobando diccionario...' && duration < 3000) {
            duration = 3000;
        }

        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.prepend(toast);

        if (message === 'Comprobando diccionario...') {
            toast.id = "toast-loading";
        } else {
            // Eliminar toast después de la duración
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
        void grid.offsetWidth;
        grid.classList.add('shake');
    }

    function danceWin() {
         console.log("Triggering win dance animation on row:", currentRowIndex);
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
