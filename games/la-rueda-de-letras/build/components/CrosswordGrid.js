import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from 'react';
const CrosswordGrid = ({ gameState, solvedWords, lastSolvedIds }) => {
    const { words, gridWidth, gridHeight, gridOffsetX, gridOffsetY } = gameState;
    // Build the grid map for rendering
    const gridMap = useMemo(() => {
        const map = new Map();
        words.forEach((w, wIndex) => {
            const wordId = `${w.dir}-${w.x}-${w.y}-${w.wordObj.palabra}`;
            for (let i = 0; i < w.normalized.length; i++) {
                const cx = (w.dir === 'H' ? w.x + i : w.x);
                const cy = (w.dir === 'V' ? w.y + i : w.y);
                const key = `${cx},${cy}`;
                const cell = map.get(key) || { char: w.normalized[i], words: [] };
                cell.words.push({ id: wordId, index: wIndex });
                map.set(key, cell);
            }
        });
        return map;
    }, [words]);
    const renderCell = (x, y) => {
        const absX = x + gridOffsetX;
        const absY = y + gridOffsetY;
        const key = `${absX},${absY}`;
        const cellId = `cell-${absX}-${absY}`;
        const cellData = gridMap.get(key);
        // Responsive sizing:
        // Mobile: w-11 h-11 (44px)
        // Desktop (md): w-10 h-10 (40px)
        const sizeClasses = "w-11 h-11 md:w-10 md:h-10";
        if (!cellData) {
            return _jsx("div", { className: sizeClasses }, key);
        }
        const isRevealed = cellData.words.some(w => solvedWords.has(w.id));
        // Progressive animation delay logic
        let animationDelay = '0s';
        if (isRevealed) {
            // Find if this cell belongs to a recently solved word
            const recentWord = cellData.words.find(w => lastSolvedIds.includes(w.id));
            if (recentWord) {
                // Calculate index in the word for delay
                const wordInfo = words[recentWord.index];
                let charIndex = 0;
                if (wordInfo.dir === 'H') {
                    charIndex = absX - wordInfo.x;
                }
                else {
                    charIndex = absY - wordInfo.y;
                }
                // 150ms delay per letter for progressive effect
                animationDelay = `${charIndex * 150}ms`;
            }
        }
        const startNumbers = words
            .map((w, idx) => ({ ...w, idx: idx + 1 }))
            .filter(w => w.x === absX && w.y === absY)
            .map(w => w.idx)
            .join('/');
        return (_jsxs("div", { id: cellId, className: `
                    relative ${sizeClasses} flex items-center justify-center 
                    text-2xl md:text-xl font-bold uppercase rounded-md shadow-sm border border-slate-300
                    ${isRevealed ? 'bg-green-500 text-white border-green-600' : 'bg-white text-transparent'}
                    transition-colors duration-300
                `, children: [startNumbers && (_jsx("span", { className: "absolute top-0.5 left-0.5 text-[0.6rem] md:text-[0.55rem] leading-none text-slate-500 font-bold z-10", children: startNumbers })), _jsx("span", { className: isRevealed ? 'animate-flip' : '', style: { animationDelay: isRevealed ? animationDelay : '0s' }, children: isRevealed ? cellData.char : '' })] }, key));
    };
    return (_jsx("div", { className: "grid gap-1 p-2 bg-slate-300 rounded-lg shadow-inner overflow-auto max-w-full max-h-[60vh]", style: {
            gridTemplateColumns: `repeat(${gridWidth}, min-content)`,
            gridTemplateRows: `repeat(${gridHeight}, min-content)`
        }, children: Array.from({ length: gridHeight }).map((_, y) => (Array.from({ length: gridWidth }).map((_, x) => renderCell(x, y)))) }));
};
export default CrosswordGrid;
