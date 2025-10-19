// Adivina la Palabra - Main JavaScript File
document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE NIVEL ---
    const levelButtons = document.querySelectorAll('.level-button');
    const gameIntro = document.querySelector('.game-intro');
    const gameContainer = document.querySelector('.game-container');

    let wordList = [];
    let targetWord = "";
    
    // Asignar evento a cada botón de nivel
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.dataset.level;
            
            // Por ahora, solo iniciamos A1
            if (level === 'A1') {
                startGame('A1');
            } else {
                showToast(`Nivel ${level} no disponible todavía.`);
            }
        });
    });

    function startGame(level) {
        // Ocultar la intro y mostrar el juego
        gameIntro.classList.add('hidden');
        gameContainer.removeAttribute('hidden');

        // Cargar las palabras
        loadWordListAndStart(level);
    }

    async function loadWordListAndStart(level) {
        try {
            // Cargamos la lista de palabras A1
            const response = await fetch(`../data/wordle-a1-palabras.json`);
            if (!response.ok) throw new Error('No se pudo cargar la lista de palabras.');
            
            const allWords = await response.json();
            
            // IMPORTANTE: Filtramos solo palabras de 5 letras
            wordList = allWords.filter(word => word.length === 5);
            
            if (wordList.length === 0) {
                showToast('No se encontraron palabras de 5 letras para este nivel.');
                return;
            }

            // Lógica de "Palabra del Día"
            targetWord = getWordOfTheDay(wordList);
            // console.log("Palabra del día:", targetWord); // Para pruebas

            // Iniciar los detectores de teclado
            startInteraction();

        } catch (error) {
            console.error(error);
            showToast('Error al iniciar el juego.');
        }
    }

    function getWordOfTheDay(list) {
        // 1. Crear una fecha de inicio (epoch) para el juego
        const epoch = new Date('2025-01-01');
        const today = new Date();
        
        // 2. Calcular cuántos días han pasado desde el inicio
        const diffTime = Math.abs(today - epoch);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // 3. Usar el número de días para elegir una palabra
        // El % (módulo) asegura que el índice vuelva a 0 si se acaba la lista (ciclo)
        const wordIndex = diffDays % list.length;
        
        return list[wordIndex];
    }


    // --- LÓGICA DEL JUEGO ---

    const grid = document.querySelector('.game-grid');
    const allTiles = Array.from(grid.children);
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const toastContainer = document.querySelector('.toast-container');

    let currentRowIndex = 0;
    let currentColIndex = 0;
    let isGameActive = true;

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
        } else if (key === 'BACKSPACE') {
            handleKey('BACKSPACE');
        } else if (key.match(/^[A-ZÑ]$/i) && key.length === 1) {
            handleKey(key);
        }
    }

    function handleKey(key) {
        if (key === 'ENTER') {
            submitGuess();
        } else if (key === 'BACKSPACE') {
            deleteLetter();
        } else if (currentColIndex < 5) {
            addLetter(key);
        }
    }

    function addLetter(letter) {
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

        // Comprobar si la palabra está en nuestra lista de A1
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
            // Si ya está marcada como verde, saltar
            if (rowTiles[i].classList.contains('correct')) continue;

            if (targetArray.includes(guessArray[i])) {
                rowTiles[i].classList.add('present');
                updateKeyboard(guessArray[i], 'present');
                // Marcar como usada para no repetirla (ej: si la palabra es "GATO" y pones "TOTO", solo la primera T es 'present')
                targetArray[targetArray.indexOf(guessArray[i])] = null;
            } else {
                rowTiles[i].classList.add('absent');
                updateKeyboard(guessArray[i], 'absent');
            }
        }

        // Aplicar animación de volteo
        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add('flip');
            }, index * 300); // Volteo escalonado
        });

        // Esperar a que termine la animación para comprobar victoria
        setTimeout(() => {
            checkWinLoss(guess);
        }, 5 * 300);
    }

    function updateKeyboard(letter, status) {
        const key = document.querySelector(`.keyboard-key[data-key="${letter}"]`);
        if (!key) return;

        // No sobrescribir un estado mejor (verde > naranja > gris)
        if (key.classList.contains('correct')) return;
        if (key.classList.contains('present') && status === 'absent') return;

        key.classList.remove('present', 'absent'); // Limpiar estados anteriores
        key.classList.add(status);
    }

    function checkWinLoss(guess) {
        if (guess === targetWord) {
            showToast('¡Felicidades, has ganado!', 5000);
            stopInteraction();
            return;
        }

        if (currentRowIndex === 5) {
            showToast(`La palabra era: ${targetWord}`, 5000);
            stopInteraction();
            return;
        }

        // Mover a la siguiente fila
        currentRowIndex++;
        currentColIndex = 0;
    }


    // --- FUNCIONES DE FEEDBACK ---

    function showToast(message, duration = 2000) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.prepend(toast);

        setTimeout(() => {
            toast.remove();
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

});
