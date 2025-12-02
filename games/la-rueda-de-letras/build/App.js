import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback } from 'react';
import { generateCrosswordLogic } from './utils.js';
import CrosswordGrid from './components/CrosswordGrid.js';
import WordWheel from './components/WordWheel.js';
import CalendarButton from './components/CalendarButton.js';
import { playSound } from './audio.js';
function App() {
    const [gameState, setGameState] = useState(null);
    const [solvedWords, setSolvedWords] = useState(new Set());
    const [lastSolvedIds, setLastSolvedIds] = useState([]);
    const [showClues, setShowClues] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [flyingLetters, setFlyingLetters] = useState([]);
    // Date state: undefined means "Random Mode", string means "Daily Mode"
    const [gameDateStr, setGameDateStr] = useState(undefined);
    const startNewGame = useCallback((dateStr) => {
        setIsLoading(true);
        setGameDateStr(dateStr); // If undefined, it's random
        // Small timeout to allow UI to show loading state if needed
        setTimeout(() => {
            const newState = generateCrosswordLogic(dateStr);
            if (newState) {
                setGameState(newState);
                setSolvedWords(new Set());
                setLastSolvedIds([]);
                setShowClues(false);
                setFlyingLetters([]);
            }
            setIsLoading(false);
        }, 50);
    }, []);
    // Initial load: Start with Today's game or Random? 
    // Let's start with Random as per original flow, or Today if we want Daily focus.
    // Let's stick to initial random load to not change default behavior abruptly, 
    // unless user selects calendar.
    useEffect(() => {
        startNewGame();
    }, [startNewGame]);
    const handleCalendarSelect = (dateStr) => {
        startNewGame(dateStr);
    };
    const handleRandomGame = () => {
        playSound('newGame');
        startNewGame(undefined); // undefined triggers random seed
    };
    const handleWordSubmit = (wordAttempt, indicesFromWheel) => {
        if (!gameState)
            return false;
        let foundWords = [];
        const newSolved = new Set(solvedWords);
        let newlySolvedIds = [];
        // Find all instances of this word in the grid
        gameState.words.forEach(w => {
            if (w.normalized === wordAttempt) {
                const wordId = `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
                if (!newSolved.has(wordId)) {
                    foundWords.push(w);
                    newlySolvedIds.push(wordId);
                    newSolved.add(wordId);
                }
                else {
                    // Already solved, but we return true for feedback
                    foundWords.push(w);
                }
            }
        });
        if (foundWords.length > 0) {
            // Correct word found
            playSound('correct');
            // Trigger Animation
            const newFlyingLetters = [];
            // For every instance of the word found in the grid (usually just 1)
            foundWords.forEach(w => {
                const wordId = `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
                // Only animate if it's new
                if (!newlySolvedIds.includes(wordId))
                    return;
                for (let i = 0; i < w.normalized.length; i++) {
                    const char = w.normalized[i];
                    const wheelIndex = indicesFromWheel[i];
                    const wheelEl = document.getElementById(`wheel-letter-${wheelIndex}`);
                    const cx = (w.dir === 'H' ? w.x + i : w.x);
                    const cy = (w.dir === 'V' ? w.y + i : w.y);
                    const cellEl = document.getElementById(`cell-${cx}-${cy}`);
                    if (wheelEl && cellEl) {
                        const startRect = wheelEl.getBoundingClientRect();
                        const endRect = cellEl.getBoundingClientRect();
                        newFlyingLetters.push({
                            id: `fly-${Date.now()}-${i}-${cx}-${cy}`,
                            char: char.toUpperCase(),
                            startX: startRect.left,
                            startY: startRect.top,
                            endX: endRect.left,
                            endY: endRect.top,
                            delay: i * 80 // Faster flying delay
                        });
                    }
                }
            });
            if (newFlyingLetters.length > 0) {
                setFlyingLetters(prev => [...prev, ...newFlyingLetters]);
                // Wait for animation to finish before showing the letters in the grid
                const totalAnimationTime = (newFlyingLetters.length * 80) + 500;
                setTimeout(() => {
                    setSolvedWords(newSolved);
                    setLastSolvedIds(newlySolvedIds);
                    setFlyingLetters([]); // Clear animation items
                }, totalAnimationTime);
            }
            else {
                setSolvedWords(newSolved);
            }
            return true;
        }
        return false;
    };
    const handleSolveBaseWord = () => {
        if (!gameState)
            return;
        playSound('hint');
        const baseWord = gameState.words[0];
        const wordId = `${baseWord.dir}-${baseWord.x}-${baseWord.y}-${baseWord.wordObj.palabra}`;
        setSolvedWords(prev => new Set(prev).add(wordId));
        setLastSolvedIds([wordId]);
    };
    const toggleClues = () => {
        if (!showClues)
            playSound('hint');
        setShowClues(!showClues);
    };
    const allSolved = gameState && gameState.words.length === solvedWords.size;
    // Formatting title based on mode
    const gameTitle = gameDateStr
        ? `Juego del ${new Date(gameDateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`
        : "Juego Aleatorio";
    return (_jsxs("div", { className: "min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 relative", children: [flyingLetters.map((item) => (_jsxs("div", { className: "fixed z-50 flex items-center justify-center bg-[#c0392b] text-white rounded-full font-bold shadow-lg pointer-events-none", style: {
                    width: '40px',
                    height: '40px',
                    left: 0,
                    top: 0,
                    transform: `translate(${item.startX}px, ${item.startY}px)`,
                    animation: `flyToTarget 0.5s ease-in-out forwards ${item.delay}ms`,
                }, children: [_jsx("style", { children: `
                        @keyframes flyToTarget {
                            0% {
                                transform: translate(${item.startX}px, ${item.startY}px) scale(1);
                            }
                            90% {
                                transform: translate(${item.endX}px, ${item.endY}px) scale(0.8);
                                opacity: 1;
                            }
                            100% {
                                transform: translate(${item.endX}px, ${item.endY}px) scale(0.8);
                                opacity: 0;
                            }
                        }
                    ` }), item.char] }, item.id))), _jsxs("div", { className: "container mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-4", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("h2", { className: "text-xl md:text-2xl font-bold tracking-tight text-slate-700", children: gameTitle }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CalendarButton, { onSelectDate: handleCalendarSelect, currentSelectedDate: gameDateStr }), _jsxs("button", { onClick: handleRandomGame, className: "bg-[#c0392b] text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-[#a93226] transition-transform active:scale-95 shadow-md flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDD04" }), _jsx("span", { className: "hidden md:inline", children: "Aleatorio" })] })] })] }), _jsx("main", { className: "flex-1 overflow-y-auto w-full max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-8 items-start justify-center", children: isLoading ? (_jsxs("div", { className: "flex flex-col items-center justify-center w-full h-64 text-slate-500", children: [_jsx("div", { className: "w-12 h-12 border-4 border-red-200 border-t-[#c0392b] rounded-full animate-spin mb-4" }), _jsx("p", { children: "Generando crucigrama..." })] })) : !gameState ? (_jsx("div", { className: "text-center w-full text-red-500", children: "Error al generar. Intenta de nuevo." })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex-1 flex flex-col items-center w-full", children: [_jsx(CrosswordGrid, { gameState: gameState, solvedWords: solvedWords, lastSolvedIds: lastSolvedIds }), allSolved && (_jsxs("div", { className: "mt-6 bg-green-100 text-green-800 px-6 py-4 rounded-xl border border-green-200 shadow-sm text-center animate-bounce", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "\u00A1Felicidades! \uD83C\uDF89" }), _jsx("p", { children: "Has completado el crucigrama." }), _jsx("div", { className: "flex justify-center gap-4 mt-3", children: _jsx("button", { onClick: handleRandomGame, className: "bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700", children: "Jugar otro nivel" }) })] }))] }), _jsxs("div", { className: "flex-none w-full md:w-80 flex flex-col items-center gap-6", children: [_jsx("div", { className: "mt-16 mb-4", children: _jsx(WordWheel, { baseWord: gameState.baseWordNormalized, onWordSubmit: handleWordSubmit, onShake: () => { } }) }), _jsxs("div", { className: "w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", children: [_jsxs("div", { className: "p-4 bg-red-50 border-b border-red-100 flex justify-between items-center", children: [_jsx("button", { onClick: handleSolveBaseWord, className: "text-xs font-bold text-[#c0392b] hover:underline", children: "\uD83D\uDCA1 Pista Palabra Base" }), _jsx("button", { onClick: toggleClues, className: "text-sm font-bold text-slate-600 hover:text-[#c0392b] flex items-center gap-1", children: showClues ? '🙈 Ocultar' : '👀 Ver Pistas' })] }), showClues && (_jsxs("div", { className: "p-4 max-h-60 overflow-y-auto space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2", children: "Horizontales" }), _jsx("ul", { className: "space-y-2", children: gameState.words.filter(w => w.dir === 'H').map((w, i) => {
                                                                const wordId = `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
                                                                const isSolved = solvedWords.has(wordId);
                                                                const globalIndex = gameState.words.indexOf(w) + 1;
                                                                return (_jsxs("li", { className: `text-sm ${isSolved ? 'text-green-600 line-through decoration-2' : 'text-slate-700'}`, children: [_jsx("span", { className: "inline-block bg-slate-200 text-slate-600 text-xs font-bold rounded px-1.5 mr-2", children: globalIndex }), w.wordObj.traduccion_ingles] }, i));
                                                            }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2", children: "Verticales" }), _jsx("ul", { className: "space-y-2", children: gameState.words.filter(w => w.dir === 'V').map((w, i) => {
                                                                const wordId = `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
                                                                const isSolved = solvedWords.has(wordId);
                                                                const globalIndex = gameState.words.indexOf(w) + 1;
                                                                return (_jsxs("li", { className: `text-sm ${isSolved ? 'text-green-600 line-through decoration-2' : 'text-slate-700'}`, children: [_jsx("span", { className: "inline-block bg-slate-200 text-slate-600 text-xs font-bold rounded px-1.5 mr-2", children: globalIndex }), w.wordObj.traduccion_ingles] }, i));
                                                            }) })] })] }))] })] })] })) })] }));
}
export default App;
