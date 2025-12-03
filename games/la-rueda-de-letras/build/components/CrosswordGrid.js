import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
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
        // Mobile: w-12 h-12 (48px)
        // Desktop (md): w-14 h-14 (56px)
        const sizeClasses = "w-12 h-12 md:w-14 md:h-14";
        if (!cellData) {
            return _jsx("div", { className: `${sizeClasses} pointer-events-none opacity-0` }, key);
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
        const baseCellStyle = {
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(226, 232, 240, 0.85)'
        };
        const unrevealedStyle = {
            background: 'rgba(255, 255, 255, 0.7)',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
            color: 'transparent'
        };
        const revealedStyle = {
            background: '#ffffff',
            boxShadow: 'none',
            filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.12))',
            color: '#0f172a',
            fontFamily: '"Baloo 2", "Poppins", "Inter", sans-serif'
        };
        return (_jsxs("div", { id: cellId, className: `
                    relative ${sizeClasses} flex items-center justify-center
                    text-2xl md:text-xl font-semibold uppercase
                `, style: {
                ...baseCellStyle,
                ...(isRevealed ? revealedStyle : unrevealedStyle)
            }, children: [startNumbers && (_jsx("span", { className: "absolute top-0.5 left-0.5 text-[0.6rem] md:text-[0.7rem] leading-none text-slate-500 font-bold z-10", children: startNumbers })), _jsx("span", { className: isRevealed ? 'animate-flip' : '', style: { animationDelay: isRevealed ? animationDelay : '0s' }, children: isRevealed ? cellData.char : '' })] }, key));
    };
    return (_jsx("div", { className: "grid gap-1.5 md:gap-2 p-3 bg-transparent rounded-lg overflow-auto max-w-full max-h-[70vh]", style: {
            gridTemplateColumns: `repeat(${gridWidth}, min-content)`,
            gridTemplateRows: `repeat(${gridHeight}, min-content)`,
            maxWidth: 'min(96vw, 1100px)'
        }, children: Array.from({ length: gridHeight }).map((_, y) => (Array.from({ length: gridWidth }).map((_, x) => renderCell(x, y)))) }));
};
export default CrosswordGrid;
