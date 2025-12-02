import React, { useMemo } from 'react';
import { GameState, PlacedWord } from '../types';

interface CrosswordGridProps {
    gameState: GameState;
    solvedWords: Set<string>;
    lastSolvedIds: string[];
}

const CrosswordGrid: React.FC<CrosswordGridProps> = ({ gameState, solvedWords, lastSolvedIds }) => {
    const { words, gridWidth, gridHeight, gridOffsetX, gridOffsetY } = gameState;

    // Build the grid map for rendering
    const gridMap = useMemo(() => {
        const map = new Map<string, { char: string, words: {id: string, index: number}[] }>();
        
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

    const renderCell = (x: number, y: number) => {
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
            return <div key={key} className={`${sizeClasses} pointer-events-none opacity-0`}></div>;
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
                } else {
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

        return (
            <div 
                key={key} 
                id={cellId}
                className={`
                    relative ${sizeClasses} flex items-center justify-center 
                    text-2xl md:text-xl font-bold uppercase rounded-md shadow-sm border border-slate-300
                    ${isRevealed ? 'bg-green-500 text-white border-green-600' : 'bg-white text-transparent'}
                    transition-colors duration-300
                `}
            >
                {startNumbers && (
                    <span className="absolute top-0.5 left-0.5 text-[0.6rem] md:text-[0.7rem] leading-none text-slate-500 font-bold z-10">
                        {startNumbers}
                    </span>
                )}
                <span 
                    className={isRevealed ? 'animate-flip' : ''} 
                    style={{ animationDelay: isRevealed ? animationDelay : '0s' }}
                >
                    {isRevealed ? cellData.char : ''}
                </span>
            </div>
        );
    };

    return (
        <div
            className="grid gap-1.5 md:gap-2 p-3 bg-transparent rounded-lg overflow-auto max-w-full max-h-[70vh]"
            style={{
                gridTemplateColumns: `repeat(${gridWidth}, min-content)`,
                gridTemplateRows: `repeat(${gridHeight}, min-content)`,
                maxWidth: 'min(96vw, 1100px)'
            }}
        >
            {Array.from({ length: gridHeight }).map((_, y) => (
                Array.from({ length: gridWidth }).map((_, x) => renderCell(x, y))
            ))}
        </div>
    );
};

export default CrosswordGrid;