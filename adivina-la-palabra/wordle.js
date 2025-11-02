// Adivina la Palabra - Game Logic JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded. Initializing game...");

    // --- CONSTANTES DE CONFIGURACIÓN ---
    const WORD_LENGTH = 5;
    const MAX_TRIES = 6;
    
    // Simula que el usuario es premium (para probar el calendario)
    // CAMBIA ESTO A 'false' PARA PROBAR EL BLOQUEO DE PAGO
    const IS_PREMIUM_USER = true; 

    // --- SELECTORES DEL DOM ---
    const gameContainer = document.querySelector('.game-container');
    const grid = document.querySelector('.game-grid');
    const allTiles = Array.from(grid.children);
    const keyboardKeys = document.querySelectorAll('.keyboard-key');
    const toastContainer = document.querySelector('.toast-container');
    const calendarButton = document.getElementById('calendar-button');
    const levelTitle = document.getElementById('game-level-title');

    // Comprobación de elementos
    if (!gameContainer || !grid || !keyboardKeys.length || !toastContainer || !calendarButton || !levelTitle) {
        console.error("Error: Could not find all essential game elements in the HTML.");
        return;
    }

    // --- ESTADO DEL JUEGO ---
    let validationList = []; // Lista para VALIDAR (de 05.json)
    let answerList = []; // Lista para RESPUESTAS (de wordle-a1-palabras.json)
    let targetWord = "";
    let currentRowIndex = 0;
    let currentColIndex = 0;
    let isGameActive = false; // El juego empieza inactivo hasta que se cargan las palabras
    let currentLevel = null;
    let currentDate = new Date(); // Guarda la fecha que se está jugando

    // --- INICIALIZACIÓN ---

    function initializeGame() {
        console.log("Initializing game setup...");
        const urlParams = new URLSearchParams(window.location.search);
        currentLevel = urlParams.get('level') || 'A1'; // Nivel A1 por defecto
        levelTitle.textContent = `Nivel ${currentLevel}`;
        
        setupCalendar(); // Configurar el calendario
        loadGameForDate(new Date()); // Cargar el juego para el día de hoy
    }

    /**
     * Configura el calendario Flatpickr
     */
    function setupCalendar() {
        const today = new Date();
        const sixtyDaysAgo = new Date().fp_incr(-60); // Límite de 60 días

        flatpickr(calendarButton, {
            maxDate: today, // No se pueden seleccionar días futuros
            minDate: sixtyDaysAgo, // Solo los últimos 60 días
            defaultDate: today,
            disableMobile: "true",
            dateFormat: "Y-m-d", // Formato de fecha estándar
            
            onChange: function(selectedDates, dateStr) {
                const selectedDate = selectedDates[0];
                if (!selectedDate) return;
                
                // Evitar recargar si se selecciona el mismo día
                if (dateStr === normalizeDate(currentDate)) return;

                if (isToday(selectedDate)) {
                    // El juego de hoy es gratis
                    console.log("Cargando juego para hoy.");
                    loadGameForDate(selectedDate);
                } else {
                    // Es un día anterior, comprobar si es premium
                    if (IS_PREMIUM_USER) {
                        console.log("Usuario premium, cargando día anterior:", dateStr);
                        loadGameForDate(selectedDate);
                    } else {
                        showToast('Solo los suscriptores pueden jugar días anteriores.');
                        // Devolver el calendario a la fecha actual
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
        currentDate = date; // Actualiza la fecha actual del juego
        showToast('Cargando juego...', 2000);
        
        resetBoard(); // Limpiar tablero y teclado

        // 1. Cargar listas (solo si no están cargadas)
        // (wordList es la de validación, answerList es la de respuestas)
        if (wordList.length === 0) {
            const success = await loadWordLists(currentLevel);
            if (!success) return; // Si falla la carga, detener
        }

        // 2. Obtener la palabra para la fecha seleccionada
        targetWord = getWordForDate(answerList, date);
        console.log(`Palabra para ${date.toDateString()}: ${targetWord}`); // Para pruebas

        // 3. Activar el juego
        isGameActive = true;
        startInteraction(); // (Re)activar los listeners del teclado
    }

    /**
     * Carga las listas de palabras (validación y respuestas) desde los archivos
     */
    async function loadWordLists(levelIdentifier) {
        console.log(`Loading word lists for ${levelIdentifier}...`);
        
        // Usamos el archivo 05.json como diccionario de validación
        const validationListFilename = `../data/05.json`; 
        // Y el wordle-a1-palabras.json como lista de respuestas
        const answerListFilename = `../data/wordle-a1-palabras.json`; 

        try {
            const [answerResponse, validationResponse] = await Promise.all([
                fetch(answerListFilename),
                fetch(validationListFilename)
            ]);

            if (!answerResponse.ok) throw new Error(`No se pudo cargar ${answerListFilename}`);
            if (!validationResponse.ok) throw new Error(`No se pudo cargar ${validationListFilename}`);

            const answerWords = await answerResponse.json();
            const validationWords = await validationResponse.json(); // Esta lista tiene tildes

            // 1. Procesar la lista de RESPUESTAS (A1_words.json)
            // Ya asumimos que esta lista está limpia (5 letras, mayúsculas, sin tildes)
            answerList = answerWords.filter(word => word.length === WORD_LENGTH);
            
            console.log(`Lista de respuestas (${WORD_LENGTH} letras) cargada:`, answerList.length, "palabras");

            // 2. Procesar la lista de VALIDACIÓN (05.json)
            const validationSet = new Set(validationWords
                .map(word => normalizeWord(word.trim())) // Quitamos tildes
                .filter(word => word.length === WORD_LENGTH) // Nos aseguramos que sean de 5 letras
            );
            
            // 3. Asegurarnos de que todas las respuestas también están en la lista de validación
            answerList.forEach(word => validationSet.add(word));
            wordList = Array.from(validationSet); // 'wordList' es ahora la lista de validación completa
            
            console.log(`Lista de validación (${WORD_LENGTH} letras) cargada:`, wordList.length, "palabras");

            if (answerList.length === 0) {
                showToast('No se encontraron palabras de respuesta.');
                console.error("La lista de respuestas (wordle-a1-palabras.json) está vacía o falló.");
                return false;
            }
            
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
    function resetBoard() {
        console.log("Reseteando tablero...");
        // Limpiar casillas
        allTiles.forEach(tile => {
            tile.textContent = '';
            tile.className = 'grid-tile'; // Resetea clases
        });

        // Limpiar teclado
        keyboardKeys.forEach(key => {
            key.className = 'keyboard-key'; // Resetea clases base
            if (key.dataset.key === 'ENTER' || key.dataset.key === 'BACKSPACE') {
                key.classList.add('large');
            }
        });

        // Resetear estado del juego
        currentRowIndex = 0;
        currentColIndex = 0;
        isGameActive = false; // Se (re)activa después de cargar la palabra
        stopInteraction(); // Detener listeners mientras se carga
    }

    /**
     * Obtiene la palabra del día (o de la fecha seleccionada)
     */
     function getWordForDate(list, date) {
        const epoch = new Date('2025-01-01');
        const selectedDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        
        const diffTime = Math.max(0, selectedDay - epoch);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const wordIndex = diffDays % list.length;
        
        console.log(`Fecha: ${selectedDay.toDateString()}, DiffDays: ${diffDays}, Index: ${wordIndex}`);
        return list[wordIndex];
    }
    
    /**
     * Función helper para normalizar palabras (quitar tildes, mayúsculas)
     */
    function normalizeWord(word) {
        if (typeof word !== 'string') return '';
        return word
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // Elimina tildes y diéresis
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


    // --- LÓGICA DE INTERACCIÓN DEL JUEGO ---

    function startInteraction() {
        console.log("Starting input interaction listeners.");
        document.removeEventListener('keydown', handleKeyPress); // Limpiar por si acaso
        keyboardKeys.forEach(key => key.removeEventListener('click', handleKeyClick)); // Limpiar por si acaso

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
        } else if (currentColIndex < WORD_LENGTH) {
            addLetter(key);
        }
    }


    function addLetter(letter) {
        if (currentColIndex >= WORD_LENGTH) return;
        const tileIndex = currentRowIndex * WORD_LENGTH + currentColIndex;
        const tile = allTiles[tileIndex];
        if (tile) {
            tile.textContent = letter;
            tile.classList.add('filled');
            currentColIndex++;
        }
    }

    function deleteLetter() {
        if (currentColIndex === 0) return;
        currentColIndex--;
        const tileIndex = currentRowIndex * WORD_LENGTH + currentColIndex;
        const tile = allTiles[tileIndex];
         if (tile) {
            tile.textContent = '';
            tile.classList.remove('filled');
        }
    }

    async function submitGuess() {
        if (!isGameActive) return; // Evitar envíos múltiples
        
        if (currentColIndex < WORD_LENGTH) {
            showToast('Faltan letras');
            shakeRow();
            return;
        }

        const guess = getCurrentGuess();
        console.log("Current guess:", guess);

        // Usamos la lista de validación completa (05.json)
        if (!wordList.includes(guess)) {
            showToast('No está en la lista de palabras');
            shakeRow();
            console.log(`Submit failed: Word "${guess}" not in validation list.`);
            return;
        }

        console.log("Word is valid, evaluating...");
        isGameActive = false; // Desactivar input durante la animación
        evaluateGuess(guess);
    }

    function getCurrentGuess() {
        let guess = '';
        const rowStart = currentRowIndex * WORD_LENGTH;
        for (let i = 0; i < WORD_LENGTH; i++) {
            guess += allTiles[rowStart + i].textContent;
        }
        return guess;
    }

    function evaluateGuess(guess) {
        const rowStart = currentRowIndex * WORD_LENGTH;
        const rowTiles = allTiles.slice(rowStart, rowStart + WORD_LENGTH);
        const targetArray = targetWord.split('');
        const guessArray = guess.split('');
        console.log(`Evaluating guess: ${guess} against target: ${targetWord}`);

        const feedback = Array(WORD_LENGTH).fill(null);

        // 1. Mark greens
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessArray[i] === targetArray[i]) {
                feedback[i] = 'correct';
                targetArray[i] = null;
            }
        }

        // 2. Mark yellows and grays
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (feedback[i] === 'correct') continue;

            const letterIndexInTarget = targetArray.indexOf(guessArray[i]);
            if (letterIndexInTarget > -1) {
                 feedback[i] = 'present';
                 targetArray[letterIndexInTarget] = null;
            } else {
                 feedback[i] = 'absent';
            }
        }

        // --- LÓGICA PARA @keyframes (Esta es la versión que querías) ---
        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                // Primero aplica el estado (color de fondo)
                tile.classList.add(feedback[index]);
                // Luego inicia la animación de volteo
                tile.classList.add('flip');
                // Actualiza el teclado
                updateKeyboard(guessArray[index], feedback[index]);
            }, index * 300); // Retardo escalonado
        });

        // Esperamos que terminen las animaciones keyframes
        // Duración (0.8s = 800ms) + último retardo (4 * 300ms = 1200ms)
        const totalAnimationTime = 800 + ((WORD_LENGTH - 1) * 300); // 800 + 1200 = 2000ms
        setTimeout(() => {
            console.log("Flip animation complete, checking win/loss...");
            checkWinLoss(guess);
            // Reactivar input SOLO si el juego no ha terminado
            if (guess !== targetWord && currentRowIndex < MAX_TRIES - 1) { // Comprobar < 5 (ya que 5 es la última fila)
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

        // Si se acabaron los intentos
        if (currentRowIndex === MAX_TRIES - 1) { // 5 es el último índice (0-5)
            showToast(`La palabra era: ${targetWord}`, 5000);
            stopInteraction();
            console.log("Game outcome: LOSS");
            return;
        }

        // Mover a la siguiente fila
        currentRowIndex++;
        currentColIndex = 0;
        console.log(`Moving to next row: ${currentRowIndex}`);
    }


    // --- FUNCIONES DE FEEDBACK ---

    function showToast(message, duration = 2000) {
        // Limpiar toasts anteriores
        const existingToasts = toastContainer.querySelectorAll('.toast');
        existingToasts.forEach(t => t.remove());
        
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.prepend(toast);

        // Auto-eliminar el toast
        setTimeout(() => {
            toast.style.transition = 'opacity 0.5s ease';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, duration);
    }


    function shakeRow() {
        console.log("Shaking current row:", currentRowIndex);
        grid.classList.remove('shake');
        void grid.offsetWidth; // Forzar reflow
        grid.classList.add('shake');
    }

    function danceWin() {
         console.log("Triggering win dance animation on row:", currentRowIndex);
         const rowStart = currentRowIndex * WORD_LENGTH;
         const rowTiles = allTiles.slice(rowStart, rowStart + WORD_LENGTH);
         rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.style.animation = '';
                void tile.offsetWidth;
                tile.style.animation = `dance 0.5s ease ${index * 0.1}s`;
            }, 100);
         });
    }

    // --- INYECCIÓN DE KEYFRAMES (Revisado para robustez) ---
    function injectKeyframes() {
        const styleSheetId = "wordle-animations";
        if (document.getElementById(styleSheetId)) return; // Ya existen

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
