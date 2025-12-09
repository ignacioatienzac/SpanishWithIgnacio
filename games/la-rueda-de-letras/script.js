let vocabulary = null;

async function loadVocabulary() {
    if (vocabulary) return vocabulary;
    const response = await fetch('vocabulaio-a1.json');
    if (!response.ok) {
        throw new Error('No se pudo cargar el vocabulario.');
    }
    vocabulary = await response.json();
    return vocabulary;
}

function normalize(str) {
    const enyePlaceholder = '__NY__';
    const preserved = str.replace(/ñ/gi, enyePlaceholder);
    const normalized = preserved.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return normalized.replace(new RegExp(enyePlaceholder.toLowerCase(), 'g'), 'ñ');
}

function dateStringToSeed(dateStr) {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        const char = dateStr.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}

function shuffleArray(array, rng) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const randomVal = rng ? rng() : Math.random();
        const j = Math.floor(randomVal * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function dateToSeededRng(dateStr) {
    const seed = dateStringToSeed(dateStr);
    let current = seed;
    return function () {
        current = (current * 9301 + 49297) % 233280;
        return current / 233280;
    };
}

function normalizeDate(dateObj) {
    if (!(dateObj instanceof Date) || Number.isNaN(dateObj)) return '';
    const dateCopy = new Date(dateObj);
    dateCopy.setHours(0, 0, 0, 0);
    const year = dateCopy.getFullYear();
    const month = String(dateCopy.getMonth() + 1).padStart(2, '0');
    const day = String(dateCopy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseDateFromStr(dateStr) {
    if (!dateStr) return null;
    const parsed = new Date(`${dateStr}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function subtractDays(dateObj, days) {
    const copy = new Date(dateObj);
    copy.setDate(copy.getDate() - days);
    return copy;
}

function getCharFrequency(str) {
    const freq = {};
    for (const char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
}

function isStrictSubset(candidateStr, baseFreq) {
    const candFreq = getCharFrequency(candidateStr);
    for (const char in candFreq) {
        if (!baseFreq[char]) return false;
        if (candFreq[char] > baseFreq[char]) return false;
    }
    return true;
}

function getRandomElement(arr, rng) {
    const r = rng ? rng() : Math.random();
    return arr[Math.floor(r * arr.length)];
}

function canPlaceWord(candidateWord, x, y, dir, placedWords) {
    const len = candidateWord.length;

    for (let i = 0; i < len; i++) {
        const cx = dir === 'H' ? x + i : x;
        const cy = dir === 'V' ? y + i : y;
        const char = candidateWord[i];

        for (const pw of placedWords) {
            const pLen = pw.normalized.length;
            let isIntersecting = false;
            let pChar = '';

            if (pw.dir === 'H') {
                if (cy === pw.y && cx >= pw.x && cx < pw.x + pLen) {
                    isIntersecting = true;
                    pChar = pw.normalized[cx - pw.x];
                }
            } else {
                if (cx === pw.x && cy >= pw.y && cy < pw.y + pLen) {
                    isIntersecting = true;
                    pChar = pw.normalized[cy - pw.y];
                }
            }

            if (isIntersecting) {
                if (pChar !== char) return false;
            }

            if (pw.dir === dir) {
                if (dir === 'H') {
                    if (Math.abs(pw.y - cy) <= 1) {
                        const start1 = x, end1 = x + len;
                        const start2 = pw.x, end2 = pw.x + pLen;
                        if (Math.max(start1, start2) < Math.min(end1, end2)) {
                            return false;
                        }
                    }
                } else {
                    if (Math.abs(pw.x - cx) <= 1) {
                        const start1 = y, end1 = y + len;
                        const start2 = pw.y, end2 = pw.y + pLen;
                        if (Math.max(start1, start2) < Math.min(end1, end2)) {
                            return false;
                        }
                    }
                }
            }
        }
    }

    for (const pw of placedWords) {
        if (pw.dir === dir) {
            if (dir === 'H' && pw.y === y) {
                if (x === pw.x + pw.normalized.length || x + len === pw.x) return false;
            }
            if (dir === 'V' && pw.x === x) {
                if (y === pw.y + pw.normalized.length || y + len === pw.y) return false;
            }
        }
    }

    return true;
}

function generateCrosswordLogic(dateSeedStr, vocab) {
    const rng = dateSeedStr ? dateToSeededRng(dateSeedStr) : () => Math.random();
    const singleWords = vocab.filter(v => !v.palabra.includes(' ') && !v.palabra.includes('?'));
    const longWords = singleWords.filter(v => v.palabra.length >= 7 && v.palabra.length <= 10);
    if (longWords.length === 0) return null;

    const MAX_ATTEMPTS = 500;
    let attempt = 0;

    while (attempt < MAX_ATTEMPTS) {
        attempt++;
        const baseWordObj = getRandomElement(longWords, rng);
        const baseWord = normalize(baseWordObj.palabra);
        const baseFreq = getCharFrequency(baseWord);

        const validPool = singleWords.filter(v => {
            const normV = normalize(v.palabra);
            if (normV.length >= baseWord.length) return false;
            if (normV.length < 3) return false;
            return isStrictSubset(normV, baseFreq);
        });

        if (validPool.length < 5) continue;

        const placedWords = [];
        const usedWords = new Set();

        placedWords.push({ wordObj: baseWordObj, x: 0, y: 0, dir: 'H', normalized: baseWord });
        usedWords.add(baseWordObj.palabra);

        let intersectCount = 0;
        let retries = 0;

        while (intersectCount < 4 && retries < 100) {
            retries++;
            const candidateObj = getRandomElement(validPool, rng);
            if (usedWords.has(candidateObj.palabra)) continue;
            const candNorm = normalize(candidateObj.palabra);
            const validPlacements = [];

            for (let i = 0; i < candNorm.length; i++) {
                const charCand = candNorm[i];
                for (let j = 0; j < baseWord.length; j++) {
                    if (baseWord[j] === charCand) {
                        validPlacements.push({ x: j, y: -i });
                    }
                }
            }

            if (validPlacements.length > 0) {
                const pos = getRandomElement(validPlacements, rng);
                if (canPlaceWord(candNorm, pos.x, pos.y, 'V', placedWords)) {
                    placedWords.push({ wordObj: candidateObj, x: pos.x, y: pos.y, dir: 'V', normalized: candNorm });
                    usedWords.add(candidateObj.palabra);
                    intersectCount++;
                }
            }
        }

        if (intersectCount < 2) continue;

        const verticalWords = placedWords.filter(w => w.dir === 'V');
        let secondaryCount = 0;
        let secRetries = 0;

        while (secondaryCount < 3 && secRetries < 200) {
            secRetries++;
            if (verticalWords.length === 0) break;
            const anchorWord = getRandomElement(verticalWords, rng);
            const anchorLen = anchorWord.normalized.length;

            const candidateObj = getRandomElement(validPool, rng);
            if (usedWords.has(candidateObj.palabra)) continue;
            const candNorm = normalize(candidateObj.palabra);

            const validSecPlacements = [];
            for (let i = 0; i < candNorm.length; i++) {
                const charCand = candNorm[i];
                for (let j = 0; j < anchorLen; j++) {
                    const anchorAbsY = anchorWord.y + j;
                    if (anchorAbsY === 0) continue;
                    if (anchorWord.normalized[j] === charCand) {
                        validSecPlacements.push({ x: anchorWord.x - i, y: anchorAbsY });
                    }
                }
            }

            if (validSecPlacements.length > 0) {
                const pos = getRandomElement(validSecPlacements, rng);
                if (canPlaceWord(candNorm, pos.x, pos.y, 'H', placedWords)) {
                    placedWords.push({ wordObj: candidateObj, x: pos.x, y: pos.y, dir: 'H', normalized: candNorm });
                    usedWords.add(candidateObj.palabra);
                    secondaryCount++;
                }
            }
        }

        if (placedWords.length >= 3) {
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            placedWords.forEach(w => {
                const len = w.normalized.length;
                const xEnd = w.dir === 'H' ? w.x + len - 1 : w.x;
                const yEnd = w.dir === 'V' ? w.y + len - 1 : w.y;
                minX = Math.min(minX, w.x);
                maxX = Math.max(maxX, xEnd);
                minY = Math.min(minY, w.y);
                maxY = Math.max(maxY, yEnd);
            });

            minX -= 1; maxX += 1;
            minY -= 1; maxY += 1;

            return {
                words: placedWords,
                baseWordNormalized: baseWord,
                gridWidth: maxX - minX + 1,
                gridHeight: maxY - minY + 1,
                gridOffsetX: minX,
                gridOffsetY: minY,
            };
        }
    }
    return null;
}

// ---- UI Logic ----
const gridEl = document.getElementById('grid');
const wheelEl = document.getElementById('wheel');
const guessEl = document.getElementById('currentGuess');
const feedbackEl = document.getElementById('feedback');
const clueListEl = document.getElementById('clueList');
const clueWrapperEl = document.getElementById('cluesWrapper');
const victoryEl = document.getElementById('victory');
const progressEl = document.getElementById('progressBadge');
const puzzleTitleEl = document.getElementById('puzzleTitle');
const calendarButton = document.getElementById('calendar-button');
const revealBtn = document.getElementById('revealBase');
const toggleCluesBtn = document.getElementById('toggleClues');
const shuffleBtn = document.getElementById('shuffle');
const backspaceBtn = document.getElementById('backspace');
const submitBtn = document.getElementById('submit');

let gameState = null;
let solvedWords = new Set();
let guessStack = [];
let wheelOrder = [];
let cluesVisible = false;
let linePath = null;
let dragState = { active: false };
let currentDateStr = '';
let fallbackDateInput = null;
let shakeTimeout = null;
let successTimeout = null;

let audioCtx = null;
let confettiLoaded = false;

const WHEEL_CENTER = 120;
const WHEEL_RADIUS = 80;
const LETTER_SIZE = 48;

function getAudioContext() {
    if (audioCtx) return audioCtx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (typeof Ctx === 'function') {
        audioCtx = new Ctx();
    }
    return audioCtx;
}

function playTone({ frequency, duration, type = 'sine', volume = 0.2 }) {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
}

function playErrorSound() {
    playTone({ frequency: 220, duration: 0.12, type: 'sawtooth', volume: 0.25 });
    setTimeout(() => playTone({ frequency: 180, duration: 0.12, type: 'square', volume: 0.2 }), 50);
}

function playSuccessSound() {
    playTone({ frequency: 520, duration: 0.15, type: 'triangle', volume: 0.22 });
    setTimeout(() => playTone({ frequency: 660, duration: 0.18, type: 'sine', volume: 0.18 }), 80);
}

function playPopSound() {
    playTone({ frequency: 420, duration: 0.08, type: 'sine', volume: 0.15 });
}

async function triggerConfetti() {
    const fireConfetti = () => {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
    };

    if (typeof confetti === 'function') {
        fireConfetti();
        playSuccessSound();
        return;
    }

    if (!confettiLoaded) {
        try {
            const module = await import('https://cdn.skypack.dev/canvas-confetti');
            const confettiFn = module.default || module;
            if (typeof confettiFn === 'function') {
                window.confetti = confettiFn;
                confettiLoaded = true;
                fireConfetti();
                playSuccessSound();
                return;
            }
        } catch (err) {
            console.warn('No se pudo cargar canvas-confetti', err);
        }
    }

    playSuccessSound();
}

function animateElement(el, className, duration) {
    if (!el) return;
    el.classList.remove(className);
    // Force reflow so the animation can restart
    void el.offsetWidth;
    el.classList.add(className);
    if (duration) {
        setTimeout(() => el.classList.remove(className), duration);
    }
}

function wordId(w) {
    return `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
}

function buildGridMap(state) {
    const map = new Map();
    state.words.forEach((w, idx) => {
        const len = w.normalized.length;
        for (let i = 0; i < len; i++) {
            const x = w.dir === 'H' ? w.x + i : w.x;
            const y = w.dir === 'V' ? w.y + i : w.y;
            const key = `${x},${y}`;
            if (!map.has(key)) {
                map.set(key, { char: w.normalized[i].toUpperCase(), words: [], numbers: new Set() });
            }
            map.get(key).words.push(wordId(w));
            if (i === 0) map.get(key).numbers.add(idx + 1);
        }
    });
    return map;
}

function renderGrid() {
    if (!gameState) return;
    const map = buildGridMap(gameState);
    gridEl.innerHTML = '';
    gridEl.style.gridTemplateColumns = `repeat(${gameState.gridWidth}, 42px)`;

    for (let y = 0; y < gameState.gridHeight; y++) {
        for (let x = 0; x < gameState.gridWidth; x++) {
            const absX = x + gameState.gridOffsetX;
            const absY = y + gameState.gridOffsetY;
            const key = `${absX},${absY}`;
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = absX;
            cell.dataset.y = absY;
            if (map.has(key)) {
                const info = map.get(key);
                const solved = info.words.some(id => solvedWords.has(id));
                cell.classList.add('used');
                if (solved) cell.classList.add('solved');
                const letter = document.createElement('span');
                letter.className = 'cell-letter';
                letter.textContent = solved ? info.char : '';
                cell.appendChild(letter);
                const numbers = Array.from(info.numbers).sort((a, b) => a - b);
                if (numbers.length) {
                    const badge = document.createElement('span');
                    badge.className = 'number';
                    badge.textContent = numbers[0];
                    cell.appendChild(badge);
                }
            } else {
                cell.classList.add('inactive');
            }
            gridEl.appendChild(cell);
        }
    }
}

function renderWheel() {
    if (!gameState) return;
    wheelEl.innerHTML = '';
    const letters = gameState.baseWordNormalized.split('');
    if (wheelOrder.length !== letters.length) {
        const indices = letters.map((_, i) => i);
        wheelOrder = shuffleArray(indices);
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 240 240');
    svg.classList.add('wheel-lines');
    linePath = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    linePath.setAttribute('fill', 'none');
    linePath.setAttribute('stroke', 'var(--primary)');
    linePath.setAttribute('stroke-width', '6');
    linePath.setAttribute('stroke-linecap', 'round');
    linePath.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(linePath);
    wheelEl.appendChild(svg);

    wheelOrder.forEach((originalIndex, idx) => {
        const angle = (idx / letters.length) * Math.PI * 2;
        const x = WHEEL_CENTER + WHEEL_RADIUS * Math.cos(angle) - LETTER_SIZE / 2;
        const y = WHEEL_CENTER + WHEEL_RADIUS * Math.sin(angle) - LETTER_SIZE / 2;
        const btn = document.createElement('div');
        btn.className = 'letter';
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
        btn.dataset.index = originalIndex;
        btn.textContent = letters[originalIndex].toUpperCase();
        const isSelected = guessStack.some(item => item.index === originalIndex);
        if (countUsage(originalIndex) >= 1 && !isSelected) btn.style.opacity = 0.45;
        if (isSelected) {
            btn.classList.add('selected');
        }
        btn.addEventListener('pointerdown', (event) => startDrag(event, originalIndex));
        btn.addEventListener('pointerenter', () => continueDrag(originalIndex));
        btn.addEventListener('click', () => handleLetterClick(originalIndex));
        wheelEl.appendChild(btn);
    });

    drawConnectionLine();
}

function countUsage(index) {
    return guessStack.filter(item => item.index === index).length;
}

function getCellElement(x, y) {
    return gridEl.querySelector(`.cell[data-x="${x}"][data-y="${y}"] .cell-letter`);
}

function animateWordReveal(words) {
    if (!words || !words.length) return;
    const baseDelay = 140;
    const wordDelay = 200;

    words.forEach((word, wordIdx) => {
        const letters = word.normalized.toUpperCase().split('');
        letters.forEach((char, i) => {
            const x = word.dir === 'H' ? word.x + i : word.x;
            const y = word.dir === 'V' ? word.y + i : word.y;
            const letterEl = getCellElement(x, y);
            if (!letterEl) return;
            letterEl.textContent = char;
            letterEl.style.opacity = '0';
            letterEl.style.transform = 'translateY(6px) scale(0.95)';
            letterEl.classList.remove('revealing');
            void letterEl.offsetWidth;
            const delay = wordIdx * wordDelay + i * baseDelay;
            setTimeout(() => {
                letterEl.classList.add('revealing');
                setTimeout(() => {
                    letterEl.classList.remove('revealing');
                    letterEl.style.opacity = '';
                    letterEl.style.transform = '';
                }, 400);
            }, delay);
        });
    });
}

function animateLetterSelection(index) {
    const letterEl = wheelEl.querySelector(`.letter[data-index="${index}"]`);
    animateElement(letterEl, 'pop', 200);
    playPopSound();
}

function addLetterToGuess(index) {
    if (!gameState) return false;
    const letter = gameState.baseWordNormalized[index];
    const maxAllowed = gameState.baseWordNormalized.split('').filter(l => l === letter).length;
    if (countUsage(index) >= 1) return false; // each instance once
    if (guessStack.filter(item => item.char === letter).length >= maxAllowed) return false;
    guessStack.push({ index, char: letter });
    animateLetterSelection(index);
    updateGuess();
    return true;
}

function handleLetterClick(index) {
    if (dragState.active) return;
    addLetterToGuess(index);
}

function startDrag(event, index) {
    if (!gameState) return;
    dragState = { active: true };
    guessStack = [];
    addLetterToGuess(index);
    event.preventDefault();
}

function continueDrag(index) {
    if (!dragState.active) return;
    const stackLength = guessStack.length;
    const secondLast = guessStack[stackLength - 2];
    const isBacktracking = secondLast && secondLast.index === index;

    if (isBacktracking) {
        guessStack.pop();
        updateGuess();
        return;
    }

    addLetterToGuess(index);
}

function updateGuess() {
    guessEl.textContent = guessStack.map(l => l.char.toUpperCase()).join('') || '\u00a0';
    if (dragState.active) {
        updateLetterHighlights();
        drawConnectionLine();
    } else {
        renderWheel();
    }
}

function handleErrorFeedback() {
    if (shakeTimeout) clearTimeout(shakeTimeout);
    guessEl.classList.add('is-error');
    animateElement(guessEl, 'shake', 400);
    playErrorSound();

    shakeTimeout = setTimeout(() => {
        guessEl.classList.remove('is-error');
        resetGuess();
        renderWheel();
    }, 400);
}

function handleSuccessFeedback(newSolved, newlyFoundWords = []) {
    if (successTimeout) clearTimeout(successTimeout);
    animateElement(guessEl, 'success-pulse', 600);
    triggerConfetti();

    successTimeout = setTimeout(() => {
        guessEl.classList.remove('success-pulse');
        const previouslySolved = new Set(solvedWords);
        solvedWords = newSolved;
        resetGuess();
        renderAll();
        const wordsToAnimate = newlyFoundWords.filter(w => !previouslySolved.has(wordId(w)));
        animateWordReveal(wordsToAnimate);
    }, 600);
}

function getLanguage() {
    return document.documentElement.lang === 'es' ? 'es' : 'en';
}

const UI_COPY = {
    en: {
        successFeedback: 'Well done! Word found.',
        errorFeedback: 'That word is not in the crossword.',
        showClues: 'Show clues 👀',
        hideClues: 'Hide clues 🙈',
        letters: (count) => `${count} letters`,
        fallbackDateLabel: 'Choose another day',
        crosswordError: 'Could not generate the crossword.',
        puzzleTitle: (date) => `Puzzle for ${date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}`,
        victoryMessage: 'Congratulations! You solved the crossword 🎉',
    },
    es: {
        successFeedback: '¡Bien hecho! Palabra encontrada.',
        errorFeedback: 'Esa palabra no está en el crucigrama.',
        showClues: 'Mostrar pistas 👀',
        hideClues: 'Ocultar pistas 🙈',
        letters: (count) => `${count} letras`,
        fallbackDateLabel: 'Elige otro día',
        crosswordError: 'No se pudo generar el crucigrama.',
        puzzleTitle: (date) => `Juego del ${date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`,
        victoryMessage: '¡Felicidades! Has completado el crucigrama 🎉',
    },
};

function getCopy(key) {
    const lang = getLanguage();
    return UI_COPY[lang][key];
}

function formatPuzzleTitle(dateStr) {
    const date = new Date(dateStr);
    return getCopy('puzzleTitle')(date);
}

function formatLetters(count) {
    return getCopy('letters')(count);
}

function refreshFeedbackLanguage() {
    const text = feedbackEl.textContent.trim();
    const lang = getLanguage();
    if (text === UI_COPY.en.successFeedback || text === UI_COPY.es.successFeedback) {
        feedbackEl.textContent = UI_COPY[lang].successFeedback;
    } else if (text === UI_COPY.en.errorFeedback || text === UI_COPY.es.errorFeedback) {
        feedbackEl.textContent = UI_COPY[lang].errorFeedback;
    }
}

function ensureVictoryMessageLanguage() {
    if (victoryEl) {
        victoryEl.textContent = getCopy('victoryMessage');
    }
}

function getLetterCenter(index) {
    const el = wheelEl.querySelector(`.letter[data-index="${index}"]`);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const wheelRect = wheelEl.getBoundingClientRect();
    return {
        x: rect.left - wheelRect.left + rect.width / 2,
        y: rect.top - wheelRect.top + rect.height / 2,
    };
}

function drawConnectionLine() {
    if (!linePath) return;
    const points = guessStack.map(item => getLetterCenter(item.index)).filter(Boolean);
    if (!points.length) {
        linePath.setAttribute('points', '');
        return;
    }
    const str = points.map(p => `${p.x},${p.y}`).join(' ');
    linePath.setAttribute('points', str);
}

function updateLetterHighlights() {
    const selected = new Set(guessStack.map(item => item.index));
    wheelEl.querySelectorAll('.letter').forEach(letterEl => {
        const idx = Number(letterEl.dataset.index);
        letterEl.classList.toggle('selected', selected.has(idx));
        const dimmed = countUsage(idx) >= 1;
        letterEl.style.opacity = dimmed && !selected.has(idx) ? 0.45 : 1;
    });
}

function resetGuess() {
    guessStack = [];
    updateGuess();
}

function finishDrag() {
    if (!dragState.active) return;
    dragState.active = false;
    submitGuess();
}

function findAvailableIndex(letter) {
    const letters = gameState.baseWordNormalized;
    for (let i = 0; i < letters.length; i++) {
        if (letters[i] === letter && !guessStack.some(g => g.index === i)) {
            return i;
        }
    }
    return -1;
}

function submitGuess() {
    if (!gameState) return;
    const attempt = normalize(guessStack.map(l => l.char).join(''));
    if (!attempt) return;
    let found = false;
    const newSolved = new Set(solvedWords);
    const newlyFoundWords = [];

    gameState.words.forEach(w => {
        if (w.normalized === attempt) {
            const id = wordId(w);
            if (!newSolved.has(id)) {
                newlyFoundWords.push(w);
            }
            newSolved.add(id);
            found = true;
        }
    });

    if (found) {
        feedbackEl.textContent = getCopy('successFeedback');
        feedbackEl.style.color = 'var(--success)';
        handleSuccessFeedback(newSolved, newlyFoundWords);
    } else {
        feedbackEl.textContent = getCopy('errorFeedback');
        feedbackEl.style.color = 'var(--primary)';
        handleErrorFeedback();
    }
}

function renderClues() {
    if (!gameState) return;
    clueListEl.innerHTML = '';
    const fragment = document.createDocumentFragment();
    gameState.words.forEach((w, idx) => {
        const item = document.createElement('div');
        item.className = 'clue';
        if (solvedWords.has(wordId(w))) item.classList.add('solved');
        const left = document.createElement('div');
        left.innerHTML = `<span class="index">${idx + 1}</span> ${w.wordObj.traduccion_ingles}`;
        const right = document.createElement('div');
        right.textContent = formatLetters(w.normalized.length);
        item.appendChild(left);
        item.appendChild(right);
        fragment.appendChild(item);
    });
    clueListEl.appendChild(fragment);
    clueWrapperEl.classList.toggle('expanded', cluesVisible);
    toggleCluesBtn.textContent = cluesVisible ? getCopy('hideClues') : getCopy('showClues');
}

function updateProgress() {
    if (!gameState) return;
    progressEl.textContent = `${solvedWords.size} / ${gameState.words.length}`;
    const allSolved = solvedWords.size === gameState.words.length;
    ensureVictoryMessageLanguage();
    victoryEl.classList.toggle('hidden', !allSolved);
}

function renderAll() {
    renderGrid();
    renderWheel();
    renderClues();
    updateProgress();
}

function setupCalendar() {
    if (!calendarButton) return;

    const calendarLabel = getCopy('fallbackDateLabel');
    calendarButton.title = calendarLabel;
    calendarButton.setAttribute('aria-label', calendarLabel);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sixtyDaysAgo = subtractDays(today, 60);

    const handleDateSelection = (selectedDate, revertSelection) => {
        if (!selectedDate) return;
        const normalized = normalizeDate(selectedDate);
        if (!normalized) return;
        if (normalized === currentDateStr) {
            if (revertSelection) revertSelection();
            return;
        }

        loadPuzzle(normalized);
    };

    if (typeof flatpickr === 'function') {
        flatpickr(calendarButton, {
            maxDate: today,
            minDate: sixtyDaysAgo,
            defaultDate: parseDateFromStr(currentDateStr) || today,
            disableMobile: "true",
            dateFormat: "Y-m-d",
            onChange(selectedDates, _dateStr, instance) {
                const selectedDate = selectedDates[0];
                handleDateSelection(selectedDate, () => instance.setDate(currentDateStr));
            },
        });
        return;
    }

    console.warn('flatpickr is not available. Using the native date picker.');
    fallbackDateInput = document.createElement('input');
    fallbackDateInput.type = 'date';
    fallbackDateInput.min = normalizeDate(sixtyDaysAgo);
    fallbackDateInput.max = normalizeDate(today);
    fallbackDateInput.value = currentDateStr;
    fallbackDateInput.setAttribute('aria-label', calendarButton.getAttribute('title') || getCopy('fallbackDateLabel'));

    fallbackDateInput.style.position = 'absolute';
    fallbackDateInput.style.opacity = '0';
    fallbackDateInput.style.pointerEvents = 'none';
    fallbackDateInput.style.width = '0';
    fallbackDateInput.style.height = '0';

    calendarButton.parentNode.insertBefore(fallbackDateInput, calendarButton.nextSibling);

    calendarButton.addEventListener('click', () => {
        if (typeof fallbackDateInput.showPicker === 'function') {
            fallbackDateInput.showPicker();
        } else {
            fallbackDateInput.focus();
        }
    });

    fallbackDateInput.addEventListener('change', (event) => {
        const dateStr = event.target.value;
        if (!dateStr) return;
        const parsed = parseDateFromStr(dateStr);
        handleDateSelection(parsed, () => {
            event.target.value = currentDateStr;
        });
    });
}

async function loadPuzzle(dateStr) {
    currentDateStr = dateStr;
    if (fallbackDateInput) {
        fallbackDateInput.value = dateStr;
    }
    let vocab = [];
    try {
        vocab = await loadVocabulary();
    } catch (err) {
        gridEl.innerHTML = `<p>${getCopy('crosswordError')}</p>`;
        console.error(err);
        return;
    }

    const state = generateCrosswordLogic(dateStr, vocab);
    gameState = state;
    solvedWords = new Set();
    guessStack = [];
    wheelOrder = [];
    if (!state) {
        gridEl.innerHTML = `<p>${getCopy('crosswordError')}</p>`;
        return;
    }
    puzzleTitleEl.textContent = formatPuzzleTitle(dateStr);
    renderAll();
}

function revealBaseWord() {
    if (!gameState) return;
    const base = gameState.words[0];
    solvedWords.add(wordId(base));
    renderAll();
}

function shuffleWheel() {
    if (!gameState) return;
    const indices = gameState.baseWordNormalized.split('').map((_, i) => i);
    wheelOrder = shuffleArray(indices);
    renderWheel();
}

revealBtn.addEventListener('click', revealBaseWord);

toggleCluesBtn.addEventListener('click', () => {
    cluesVisible = !cluesVisible;
    clueWrapperEl.classList.toggle('expanded', cluesVisible);
    toggleCluesBtn.textContent = cluesVisible ? getCopy('hideClues') : getCopy('showClues');
});

shuffleBtn.addEventListener('click', shuffleWheel);

backspaceBtn.addEventListener('click', () => {
    guessStack.pop();
    updateGuess();
});

submitBtn.addEventListener('click', submitGuess);

document.addEventListener('pointerup', finishDrag);
document.addEventListener('pointercancel', finishDrag);

document.addEventListener('keydown', (e) => {
    if (!gameState) return;
    if (e.key === 'Backspace') {
        e.preventDefault();
        guessStack.pop();
        updateGuess();
    } else if (e.key === 'Enter') {
        submitGuess();
    } else if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]$/.test(e.key)) {
        const letter = normalize(e.key);
        const idx = findAvailableIndex(letter);
        if (idx !== -1) handleLetterClick(idx);
    }
});

async function initGame() {
    currentDateStr = normalizeDate(new Date());
    setupCalendar();
    await loadPuzzle(currentDateStr);
}

initGame();

const languageObserver = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.attributeName === 'lang')) {
        ensureVictoryMessageLanguage();
        refreshFeedbackLanguage();
        const label = getCopy('fallbackDateLabel');
        calendarButton.title = label;
        calendarButton.setAttribute('aria-label', label);
        if (fallbackDateInput) {
            fallbackDateInput.setAttribute('aria-label', label);
        }
        if (gameState) {
            puzzleTitleEl.textContent = formatPuzzleTitle(currentDateStr);
            renderAll();
        }
    }
});

languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
