import React, { useState, useRef, useEffect } from 'react';
import { shuffleArray } from '../utils';
import { playSound } from '../audio';

interface WordWheelProps {
    baseWord: string;
    onWordSubmit: (word: string, indicesFromWheel: number[]) => boolean;
    onShake: () => void;
}

const WordWheel: React.FC<WordWheelProps> = ({ baseWord, onWordSubmit, onShake }) => {
    const [letters, setLetters] = useState<{ char: string, id: number }[]>([]);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [shakeIndices, setShakeIndices] = useState<Set<number>>(new Set());
    
    // Responsive sizing state
    const [containerSize, setContainerSize] = useState(240);
    const [isMobile, setIsMobile] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    
    // Handle resizing logic
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768; // Tailwind 'md' breakpoint
            setIsMobile(mobile);
            // Mobile keeps generous sizing; desktop version is expanded for better visibility
            setContainerSize(mobile ? 360 : 340);
        };

        // Initial set
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize/Re-initialize when baseWord changes
    useEffect(() => {
        const chars = baseWord.toUpperCase().split('').map((char, index) => ({ char, id: index }));
        setLetters(shuffleArray(chars));
        setSelectedIndices([]);
        setShakeIndices(new Set());
    }, [baseWord]);

    const getLetterPosition = (index: number, total: number, radius: number, centerX: number, centerY: number) => {
        const angleStep = (2 * Math.PI) / total;
        const angle = index * angleStep - Math.PI / 2;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    };

    const handleStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
        e.preventDefault(); // Prevent scroll
        setIsDragging(true);
        setSelectedIndices([index]);
        setFeedbackMessage(null);
        setShakeIndices(new Set());
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPos({ x: clientX - rect.left, y: clientY - rect.top });
        
        const element = document.elementFromPoint(clientX, clientY);
        if (element) {
            const letterIndex = element.getAttribute('data-index');
            if (letterIndex !== null) {
                const idx = parseInt(letterIndex);
                if (!selectedIndices.includes(idx)) {
                     setSelectedIndices(prev => [...prev, idx]);
                } else if (selectedIndices.length > 1 && idx === selectedIndices[selectedIndices.length - 2]) {
                    // Backtrack
                    setSelectedIndices(prev => prev.slice(0, -1));
                }
            }
        }
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const word = selectedIndices.map(i => letters[i].char).join('').toLowerCase();
        
        if (word.length < 2) {
            setSelectedIndices([]);
            return;
        }

        const success = onWordSubmit(word, selectedIndices);
        
        if (success) {
            setSelectedIndices([]);
        } else {
            // Error effect
            playSound('incorrect');
            setFeedbackMessage("La palabra no está en el crucigrama");
            const newShakeSet = new Set(selectedIndices);
            setShakeIndices(newShakeSet);
            onShake(); // Trigger global shake if needed (haptic?)
            
            setTimeout(() => {
                setSelectedIndices([]);
                setShakeIndices(new Set());
                setFeedbackMessage(null);
            }, 800);
        }
    };

    // Global event listeners for drag outside the buttons
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (isDragging) handleMove(e.clientX, e.clientY);
        };
        const onTouchMove = (e: TouchEvent) => {
            if (isDragging) handleMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onUp = () => handleEnd();

        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('touchmove', onTouchMove, { passive: false });
            window.addEventListener('mouseup', onUp);
            window.addEventListener('touchend', onUp);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchend', onUp);
        };
    }, [isDragging, selectedIndices, letters]);


    // Adjust radius based on container size and letter size offset
    // Mobile letters are bigger, so we need more padding
    const letterOffset = isMobile ? 48 : 50;
    const radius = containerSize / 2 - letterOffset;
    const center = containerSize / 2;

    // Dynamic styles for letters based on device size
    const letterSizeClass = isMobile ? 'w-14 h-14 text-2xl' : 'w-12 h-12 text-xl';
    const letterOffsetPos = isMobile ? 28 : 24; // Half of width/height

    const currentWordDisplay = selectedIndices.map(i => letters[i].char).join('');

    return (
        <div className="relative flex flex-col items-center">
            {/* Selection Display Bubble */}
            <div className={`absolute -top-14 bg-slate-800 text-white px-6 py-3 rounded-full font-bold text-xl md:text-lg md:px-4 md:py-2 md:-top-12 transition-opacity duration-200 ${selectedIndices.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
                {currentWordDisplay}
            </div>

             {/* Feedback Message */}
             <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600/90 text-white px-4 py-2 rounded-lg text-sm font-bold text-center transition-opacity duration-300 pointer-events-none z-30 w-48 ${feedbackMessage ? 'opacity-100' : 'opacity-0'}`}>
                {feedbackMessage}
            </div>

            <div
                ref={containerRef}
                className="relative word-wheel-shell select-none touch-none transition-all duration-300"
                style={{ width: containerSize, height: containerSize }}
            >
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                    {selectedIndices.length > 0 && (
                         <polyline
                            points={
                                selectedIndices.map(i => {
                                    const pos = getLetterPosition(i, letters.length, radius, center, center);
                                    return `${pos.x},${pos.y}`;
                                }).join(' ') + (isDragging ? ` ${cursorPos.x},${cursorPos.y}` : '')
                            }
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth={isMobile ? "12" : "8"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-70"
                         />
                    )}
                </svg>

                {letters.map((item, index) => {
                    const pos = getLetterPosition(index, letters.length, radius, center, center);
                    const isSelected = selectedIndices.includes(index);
                    const isShaking = shakeIndices.has(index);

                    return (
                        <div
                            key={item.id}
                            id={`wheel-letter-${index}`}
                            data-index={index}
                            className={`absolute ${letterSizeClass} word-wheel-letter flex items-center justify-center font-bold cursor-pointer transition-transform duration-150 z-20
                                ${isSelected ? 'word-wheel-letter--selected scale-110' : ''}
                                ${isShaking ? 'animate-shake word-wheel-letter--error' : ''}
                            `}
                            style={{ 
                                left: pos.x - letterOffsetPos, 
                                top: pos.y - letterOffsetPos,
                            }}
                            onMouseDown={(e) => handleStart(e, index)}
                            onTouchStart={(e) => handleStart(e, index)}
                        >
                            {item.char}
                        </div>
                    );
                })}
            </div>
            
            <button 
                onClick={() => setLetters(shuffleArray(letters))}
                className="mt-6 p-3 md:p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                title="Shuffle"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-6 md:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>
        </div>
    );
};

export default WordWheel;