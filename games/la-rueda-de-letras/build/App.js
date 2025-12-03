import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback } from 'react';
import { generateCrosswordLogic } from './utils.js';
import CrosswordGrid from './components/CrosswordGrid.js';
import WordWheel from './components/WordWheel.js';
import CalendarButton from './components/CalendarButton.js';
import { playSound } from './audio.js';
const getTodayDateString = () => new Date().toISOString().split('T')[0];
function App() {
    const [gameState, setGameState] = useState(null);
    const [solvedWords, setSolvedWords] = useState(new Set());
    const [lastSolvedIds, setLastSolvedIds] = useState([]);
    const [showClues, setShowClues] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [flyingLetters, setFlyingLetters] = useState([]);
    const [gameDateStr, setGameDateStr] = useState(getTodayDateString());
    const startNewGame = useCallback((dateStr) => {
        setIsLoading(true);
        const targetDateStr = dateStr ?? getTodayDateString();
        setGameDateStr(targetDateStr);
        setTimeout(() => {
            const newState = generateCrosswordLogic(targetDateStr);
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
    useEffect(() => {
        startNewGame(getTodayDateString());
    }, [startNewGame]);
    const handleCalendarSelect = (dateStr) => {
        startNewGame(dateStr);
    };
    const handleRestartGame = () => {
        playSound('newGame');
        startNewGame(gameDateStr);
    };
    const handleWordSubmit = (wordAttempt, indicesFromWheel) => {
        if (!gameState)
            return false;
        let foundWords = [];
        const newSolved = new Set(solvedWords);
        let newlySolvedIds = [];
        gameState.words.forEach(w => {
            if (w.normalized === wordAttempt) {
                const wordId = `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
                if (!newSolved.has(wordId)) {
                    foundWords.push(w);
                    newlySolvedIds.push(wordId);
                    newSolved.add(wordId);
                }
                else {
                    foundWords.push(w);
                }
            }
        });
        if (foundWords.length > 0) {
            playSound('correct');
            const newFlyingLetters = [];
            foundWords.forEach(w => {
                const wordId = `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
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
                            delay: i * 80
                        });
                    }
                }
            });
            if (newFlyingLetters.length > 0) {
                setFlyingLetters(prev => [...prev, ...newFlyingLetters]);
                const totalAnimationTime = (newFlyingLetters.length * 80) + 500;
                setTimeout(() => {
                    setSolvedWords(newSolved);
                    setLastSolvedIds(newlySolvedIds);
                    setFlyingLetters([]);
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
    const gameTitle = `Juego del ${new Date(gameDateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`;
    return (_jsxs("div", { className: "min-h-screen flex flex-col font-sans text-slate-800 relative", children: [flyingLetters.map((item) => (_jsxs("div", { className: "fixed z-50 flex items-center justify-center bg-[#c0392b] text-white rounded-full font-bold shadow-lg pointer-events-none", style: {
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
                    ` }), item.char] }, item.id))), _jsxs("div", { className: "container mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-4", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("h2", { className: "text-xl md:text-2xl font-bold tracking-tight text-slate-700", children: gameTitle }) }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(CalendarButton, { onSelectDate: handleCalendarSelect, currentSelectedDate: gameDateStr }) })] }), _jsx("main", { className: "flex-1 w-full flex items-center justify-center", children: _jsxs("div", { className: "w-full max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center md:justify-between", children: [isLoading ? (_jsxs("div", { className: "flex flex-col items-center justify-center w-full h-64 text-slate-500", children: [_jsx("div", { className: "w-12 h-12 border-4 border-red-200 border-t-[#c0392b] rounded-full animate-spin mb-4" }), _jsx("p", { children: "Generando crucigrama..." })] })) : !gameState ? (_jsx("div", { className: "text-center w-full text-red-500", children: "Error al generar. Intenta de nuevo." })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex-1 md:flex-[1.25] flex flex-col items-center w-full", children: [_jsx(CrosswordGrid, { gameState: gameState, solvedWords: solvedWords, lastSolvedIds: lastSolvedIds }), allSolved && (_jsxs("div", { className: "mt-6 bg-green-100 text-green-800 px-6 py-4 rounded-xl border border-green-200 shadow-sm text-center animate-bounce", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "¡Felicidades! 🎉" }), _jsx("p", { children: "Has completado el crucigrama." }), _jsx("div", { className: "flex justify-center gap-4 mt-3", children: _jsx("button", { onClick: handleRestartGame, className: "bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700", children: "Reiniciar crucigrama" }) })] }))] }), _jsxs("div", { className: "flex-none w-full md:w-80 lg:w-96 flex flex-col items-center gap-6 md:pt-4", children: [_jsx("div", { className: "w-full flex justify-center", children: _jsx(WordWheel, { baseWord: gameState.baseWordNormalized, onWordSubmit: handleWordSubmit, onShake: () => { } }) }), _jsxs("div", { className: "w-full flex flex-col items-end gap-3", children: [_jsxs("div", { className: "bg-white/95 rounded-full shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-3", children: [_jsx("button", { onClick: handleSolveBaseWord, className: "text-xs md:text-sm font-bold text-[#c0392b] hover:text-[#a83221] flex items-center gap-2", children: [_jsx("span", { "aria-hidden": true, children: "💡" }), _jsx("span", { children: "Pista Palabra Base" })] }), _jsx("div", { className: "h-6 w-px bg-slate-200", "aria-hidden": true }), _jsx("button", { onClick: toggleClues, className: "text-sm font-semibold text-slate-700 hover:text-[#c0392b] flex items-center gap-2", children: [_jsx("span", { "aria-hidden": true, children: showClues ? '🙈' : '👀' }), _jsx("span", { children: showClues ? 'Ocultar Pistas' : 'Ver Pistas' })] })] }), showClues && (_jsxs("div", { className: "w-full bg-white rounded-2xl shadow-md border border-slate-100 p-4 max-h-60 overflow-y-auto space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2", children: "Horizontales" }), _jsx("ul", { className: "space-y-2", children: gameState.words.filter(w => w.dir === 'H').map((w, i) => {
                                                                const wordId = `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
                                                                const isSolved = solvedWords.has(wordId);
                                                                const globalIndex = gameState.words.indexOf(w) + 1;
                                                                return (_jsxs("li", { className: `text-sm ${isSolved ? 'text-green-600 line-through decoration-2' : 'text-slate-700'}`, children: [_jsx("span", { className: "inline-block bg-slate-200 text-slate-600 text-xs font-bold rounded px-1.5 mr-2", children: globalIndex }), w.wordObj.traduccion_ingles] }, i));
                                                            }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2", children: "Verticales" }), _jsx("ul", { className: "space-y-2", children: gameState.words.filter(w => w.dir === 'V').map((w, i) => {
                                                                const wordId = `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
                                                                const isSolved = solvedWords.has(wordId);
                                                                const globalIndex = gameState.words.indexOf(w) + 1;
                                                                return (_jsxs("li", { className: `text-sm ${isSolved ? 'text-green-600 line-through decoration-2' : 'text-slate-700'}`, children: [_jsx("span", { className: "inline-block bg-slate-200 text-slate-600 text-xs font-bold rounded px-1.5 mr-2", children: globalIndex }), w.wordObj.traduccion_ingles] }, i));
                                                            }) })] })] }))] })] })] }))] })] }));
}
export default App;
