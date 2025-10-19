// Adivina la Palabra - Game Logic JavaScript File

document.addEventListener('DOMContentLoaded', () => {

    const gameContainer = document.querySelector('.game-container');
    const grid = document.querySelector('.game-grid');
    const allTiles = Array.from(grid.children);
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const toastContainer = document.querySelector('.toast-container');

    let wordList = [];
    let targetWord = "";
    let currentRowIndex = 0;
    let currentColIndex = 0;
    let isGameActive = true;
    let currentLevel = null;

    // --- INICIO DEL JUEGO AL CARGAR LA PÁGINA game.html ---

    function initializeGame() {
        // 1. Obtener el nivel desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        currentLevel = urlParams.get('level');

        if (!currentLevel) {
            showToast('Nivel no especificado.');
            // Opcional: Redirigir de vuelta a index.html
            // window.location.href = 'index.html';
            return;
        }

        // Por ahora, solo cargamos la lista A1 independientemente del parámetro
        // TODO: En el futuro, cargar el JSON según currentLevel
        if (currentLevel.startsWith('A')) { // O la lógica que decidas para A1/A2
             loadWordListAndStart('A1');
        } else {
             showToast(`Nivel ${currentLevel} no disponible todavía.`);
             // Opcional: Redirigir
             // window.location.href = 'index.html';
        }
    }

    async function loadWordListAndStart(levelIdentifier) { // levelIdentifier podría ser 'A1', 'B1', etc.
        try {
            // Construir el nombre del archivo JSON basado en el identificador
            // TODO: Ajustar esto cuando tengas los JSON para otros niveles
            let filename = '';
            if (levelIdentifier === 'A1') {
                filename = `../data/wordle-a1-palabras.json`;
            } else {
                throw new Error(`Lista de palabras para ${levelIdentifier} no encontrada.`);
            }

            const response = await fetch(filename);
            if (!response.ok) throw new Error(`No se pudo cargar ${filename}.`);

            const allWords = await response.json();

            // Filtramos solo palabras de 5 letras (como antes)
            wordList = allWords.filter(word => word.length === 5);

            if (wordList.length === 0) {
                showToast('No se encontraron palabras de 5 letras para este nivel.');
                return;
            }

            // Lógica de "Palabra del Día"
            targetWord = getWordOfTheDay(wordList);
            console.log("Palabra del día:", targetWord); // Para pruebas

            // Iniciar los detectores de teclado
            startInteraction();

        } catch (error) {
            console.error(error);
            showToast('Error al iniciar el juego.');
        }
    }

    function getWordOfTheDay(list) {
        const epoch = new Date('2025-01-01');
        const today = new Date();
        const diffTime = Math.abs(today - epoch);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const wordIndex = diffDays % list.length;
        return list[wordIndex];
    }

    // --- LÓGICA DEL JUEGO (Igual que antes) ---

    function startInteraction() {
        document.addEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.addEventListener('click', handleKeyClick));
    }

    function stopInteraction() {
        document.removeEventListener('keydown', handleKeyPress);
        keyboardKeys.forEach(key => key.removeEventListener('click', handleKeyClick));
        isGameActive = false;
    }

    function handleKeyClick(e) {
        if (!isGameActive) return;
        const key = e.target.dataset.key;
        handleKey(key);
    }

    function handleKeyPress(e) {
        if (!isGameActive) return;
        const key = e.key.toUpperCase();

        if (key === 'ENTER') {
            handleKey('ENTER');
        } else if (key === 'BACKSPACE' || e.key === 'Backspace') { // Añadir e.key para compatibilidad
            handleKey('BACKSPACE');
        } else if (key.match(/^[A-ZÑ]$/i) && key.length === 1) { // Acepta A-Z y Ñ
            handleKey(key);
        }
    }


    function handleKey(key) {
        if (key === 'ENTER') {
            submitGuess();
        } else if (key === 'BACKSPACE') {
            deleteLetter();
        } else if (currentColIndex < 5) { // Solo añadir si no hemos llegado a 5 letras
            addLetter(key);
        }
    }


    function addLetter(letter) {
        if (currentColIndex >= 5) return; // Seguridad extra
        const tile = allTiles[currentRowIndex * 5 + currentColIndex];
        tile.textContent = letter;
        tile.classList.add('filled');
        currentColIndex++;
    }

    function deleteLetter() {
        if (currentColIndex === 0) return;
        currentColIndex--;
        const tile = allTiles[currentRowIndex * 5 + currentColIndex];
        tile.textContent = '';
        tile.classList.remove('filled');
    }

    async function submitGuess() {
        if (currentColIndex < 5) {
            showToast('Faltan letras');
            shakeRow();
            return;
        }

        const guess = getCurrentGuess();

        // Comprobar si la palabra está en nuestra lista de A1 cargada
        if (!wordList.includes(guess)) {
            showToast('No está en la lista de palabras');
            shakeRow();
            return;
        }

        // Evaluar el intento
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

        // 1. Marcar las correctas (verdes)
        for (let i = 0; i < 5; i++) {
            if (guessArray[i] === targetArray[i]) {
                rowTiles[i].classList.add('correct');
                updateKeyboard(guessArray[i], 'correct');
                targetArray[i] = null; // Marcar como usada
            }
        }

        // 2. Marcar las presentes (naranjas) y ausentes (grises)
        for (let i = 0; i < 5; i++) {
            if (rowTiles[i].classList.contains('correct')) continue;

            if (targetArray.includes(guessArray[i])) {
                rowTiles[i].classList.add('present');
                updateKeyboard(guessArray[i], 'present');
                targetArray[targetArray.indexOf(guessArray[i])] = null;
            } else {
                rowTiles[i].classList.add('absent');
                updateKeyboard(guessArray[i], 'absent');
            }
        }

        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add('flip');
            }, index * 300);
        });

        setTimeout(() => {
            checkWinLoss(guess);
        }, 5 * 300 + 100); // Dar un poco más de tiempo
    }

    function updateKeyboard(letter, status) {
        const key = document.querySelector(`.keyboard-key[data-key="${letter}"]`);
        if (!key) return;

        if (key.classList.contains('correct')) return;
        if (key.classList.contains('present') && status === 'absent') return;

        key.classList.remove('present', 'absent');
        key.classList.add(status);
    }

    function checkWinLoss(guess) {
        if (guess === targetWord) {
            showToast('¡Felicidades, has ganado!', 5000);
            stopInteraction();
            danceWin(); // Añadir animación de victoria
            return;
        }

        if (currentRowIndex === 5) { // Si estábamos en la última fila (índice 5)
            showToast(`La palabra era: ${targetWord}`, 5000);
            stopInteraction();
            return;
        }

        // Mover a la siguiente fila si no se ha ganado ni perdido aún
        currentRowIndex++;
        currentColIndex = 0;
    }


    // --- FUNCIONES DE FEEDBACK ---

    function showToast(message, duration = 2000) {
        // Limpiar toasts anteriores rápidamente si son mensajes cortos
        if (duration < 3000) {
             const existingToasts = toastContainer.querySelectorAll('.toast');
             existingToasts.forEach(t => t.remove());
        }

        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.prepend(toast); // Usar prepend para que el último mensaje aparezca arriba

        setTimeout(() => {
            // Animación de salida (opcional)
             toast.style.transition = 'opacity 0.5s ease';
             toast.style.opacity = '0';
             setTimeout(() => toast.remove(), 500); // Eliminar después de la animación
        }, duration);
    }


    function shakeRow() {
        const rowStart = currentRowIndex * 5;
        const rowTiles = allTiles.slice(rowStart, rowStart + 5);

        // Añadir clase de sacudir a la fila (al <div> de la rejilla)
        grid.classList.add('shake');

        // Quitar la clase después de la animación
        setTimeout(() => {
            grid.classList.remove('shake');
        }, 500); // Duración de la animación en CSS
    }

    // Animación de victoria (opcional)
    function danceWin() {
         const rowStart = currentRowIndex * 5;
         const rowTiles = allTiles.slice(rowStart, rowStart + 5);
         rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.style.animation = `dance 0.5s ease ${index * 0.1}s`;
            }, 100); // Pequeño retraso inicial
         });
    }

    // Añadir keyframe para dance si no está en CSS
    if (!document.styleSheets[0].cssRules.find(rule => rule.name === 'dance')) {
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(`
            @keyframes dance {
                20%, 80% { transform: translateY(-8px); }
                40%, 60% { transform: translateY(0px); }
            }
        `, styleSheet.cssRules.length);
    }


    // --- INICIAR EL JUEGO ---
    initializeGame();

});
