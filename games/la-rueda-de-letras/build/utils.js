import { VOCABULARIO } from './data';
// --- SEEDED RNG LOGIC ---
class SeededRNG {
    constructor(seed) {
        this.seed = seed;
    }
    // Simple Linear Congruential Generator
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
}
// Helper to convert date string "YYYY-MM-DD" to a numeric seed
export function dateStringToSeed(dateStr) {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        const char = dateStr.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}
export function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
// Updated to accept an optional RNG function
function getRandomElement(arr, rng) {
    const randomVal = rng ? rng() : Math.random();
    return arr[Math.floor(randomVal * arr.length)];
}
function getCharFrequency(str) {
    const freq = {};
    for (const char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
}
// Updated to accept an optional RNG function
export function shuffleArray(array, rng) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const randomVal = rng ? rng() : Math.random();
        const j = Math.floor(randomVal * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}
function isStrictSubset(candidateStr, baseFreq) {
    const candFreq = getCharFrequency(candidateStr);
    for (const char in candFreq) {
        if (!baseFreq[char])
            return false;
        if (candFreq[char] > baseFreq[char])
            return false;
    }
    return true;
}
function canPlaceWord(candidateWord, x, y, dir, placedWords) {
    const len = candidateWord.length;
    for (let i = 0; i < len; i++) {
        const cx = dir === 'H' ? x + i : x;
        const cy = dir === 'V' ? y + i : y;
        const char = candidateWord[i];
        for (const pw of placedWords) {
            const pLen = pw.normalized.length;
            // Collision check
            let isIntersecting = false;
            let pChar = '';
            if (pw.dir === 'H') {
                if (cy === pw.y && cx >= pw.x && cx < pw.x + pLen) {
                    isIntersecting = true;
                    pChar = pw.normalized[cx - pw.x];
                }
            }
            else { // pw.dir === 'V'
                if (cx === pw.x && cy >= pw.y && cy < pw.y + pLen) {
                    isIntersecting = true;
                    pChar = pw.normalized[cy - pw.y];
                }
            }
            if (isIntersecting) {
                if (pChar !== char)
                    return false;
            }
            // Adjacency check
            if (pw.dir === dir) {
                if (dir === 'H') {
                    if (Math.abs(pw.y - cy) <= 1) {
                        const start1 = x, end1 = x + len;
                        const start2 = pw.x, end2 = pw.x + pLen;
                        if (Math.max(start1, start2) < Math.min(end1, end2)) {
                            return false;
                        }
                    }
                }
                else { // dir === 'V'
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
    // Check boundaries of placed words to avoid butt-ended words
    for (const pw of placedWords) {
        if (pw.dir === dir) {
            if (dir === 'H' && pw.y === y) {
                if (x === pw.x + pw.normalized.length || x + len === pw.x)
                    return false;
            }
            if (dir === 'V' && pw.x === x) {
                if (y === pw.y + pw.normalized.length || y + len === pw.y)
                    return false;
            }
        }
    }
    return true;
}
/**
 * Generate crossword logic.
 * @param dateSeedStr Optional date string "YYYY-MM-DD". If provided, generates a deterministic puzzle for that day.
 */
export function generateCrosswordLogic(dateSeedStr) {
    // Setup RNG
    let rng;
    if (dateSeedStr) {
        const seed = dateStringToSeed(dateSeedStr);
        const seededGen = new SeededRNG(seed);
        rng = () => seededGen.next();
    }
    else {
        rng = () => Math.random();
    }
    const singleWords = VOCABULARIO.filter(v => !v.palabra.includes(" ") && !v.palabra.includes("?"));
    // Filter words with length between 7 and 10 inclusive
    const longWords = singleWords.filter(v => v.palabra.length >= 7 && v.palabra.length <= 10);
    if (longWords.length === 0)
        return null;
    const MAX_ATTEMPTS = 500;
    let attempt = 0;
    while (attempt < MAX_ATTEMPTS) {
        attempt++;
        const baseWordObj = getRandomElement(longWords, rng);
        const baseWord = normalize(baseWordObj.palabra);
        const baseFreq = getCharFrequency(baseWord);
        const validPool = singleWords.filter(v => {
            const normV = normalize(v.palabra);
            if (normV.length >= baseWord.length)
                return false;
            if (normV.length < 3)
                return false;
            return isStrictSubset(normV, baseFreq);
        });
        if (validPool.length < 5)
            continue;
        let placedWords = [];
        let usedWords = new Set();
        placedWords.push({
            wordObj: baseWordObj,
            x: 0,
            y: 0,
            dir: 'H',
            normalized: baseWord
        });
        usedWords.add(baseWordObj.palabra);
        // Verticals
        let intersectCount = 0;
        let retries = 0;
        while (intersectCount < 4 && retries < 100) {
            retries++;
            const candidateObj = getRandomElement(validPool, rng);
            if (usedWords.has(candidateObj.palabra))
                continue;
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
                    placedWords.push({
                        wordObj: candidateObj,
                        x: pos.x,
                        y: pos.y,
                        dir: 'V',
                        normalized: candNorm
                    });
                    usedWords.add(candidateObj.palabra);
                    intersectCount++;
                }
            }
        }
        if (intersectCount < 2)
            continue;
        // Secondary Horizontals
        const verticalWords = placedWords.filter(w => w.dir === 'V');
        let secondaryCount = 0;
        let secRetries = 0;
        while (secondaryCount < 3 && secRetries < 200) {
            secRetries++;
            if (verticalWords.length === 0)
                break;
            const anchorWord = getRandomElement(verticalWords, rng);
            const anchorLen = anchorWord.normalized.length;
            const candidateObj = getRandomElement(validPool, rng);
            if (usedWords.has(candidateObj.palabra))
                continue;
            const candNorm = normalize(candidateObj.palabra);
            const validSecPlacements = [];
            for (let i = 0; i < candNorm.length; i++) {
                const charCand = candNorm[i];
                for (let j = 0; j < anchorLen; j++) {
                    const anchorAbsY = anchorWord.y + j;
                    if (anchorAbsY === 0)
                        continue;
                    if (anchorWord.normalized[j] === charCand) {
                        validSecPlacements.push({ x: anchorWord.x - i, y: anchorAbsY });
                    }
                }
            }
            if (validSecPlacements.length > 0) {
                const pos = getRandomElement(validSecPlacements, rng);
                if (canPlaceWord(candNorm, pos.x, pos.y, 'H', placedWords)) {
                    placedWords.push({
                        wordObj: candidateObj,
                        x: pos.x,
                        y: pos.y,
                        dir: 'H',
                        normalized: candNorm
                    });
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
            minX -= 1;
            maxX += 1;
            minY -= 1;
            maxY += 1;
            return {
                words: placedWords,
                baseWordNormalized: baseWord,
                gridWidth: maxX - minX + 1,
                gridHeight: maxY - minY + 1,
                gridOffsetX: minX,
                gridOffsetY: minY
            };
        }
    }
    return null;
}
