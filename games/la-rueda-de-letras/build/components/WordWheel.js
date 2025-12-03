import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { shuffleArray } from '../utils';
import { playSound } from '../audio';
const WordWheel = ({ baseWord, onWordSubmit, onShake }) => {
    const [letters, setLetters] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [shakeIndices, setShakeIndices] = useState(new Set());
    const [containerSize, setContainerSize] = useState(240);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setContainerSize(mobile ? 360 : 340);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        const chars = baseWord.toUpperCase().split('').map((char, index) => ({ char, id: index }));
        setLetters(shuffleArray(chars));
        setSelectedIndices([]);
        setShakeIndices(new Set());
    }, [baseWord]);
    const getLetterPosition = (index, total, radius, centerX, centerY) => {
        const angleStep = (2 * Math.PI) / total;
        const angle = index * angleStep - Math.PI / 2;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    };
    const handleStart = (e, index) => {
        e.preventDefault();
        setIsDragging(true);
        setSelectedIndices([index]);
        setFeedbackMessage(null);
        setShakeIndices(new Set());
    };
    const handleMove = (clientX, clientY) => {
        if (!containerRef.current)
            return;
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPos({ x: clientX - rect.left, y: clientY - rect.top });
        const element = document.elementFromPoint(clientX, clientY);
        if (element) {
            const letterIndex = element.getAttribute('data-index');
            if (letterIndex !== null) {
                const idx = parseInt(letterIndex);
                if (!selectedIndices.includes(idx)) {
                    setSelectedIndices(prev => [...prev, idx]);
                }
                else if (selectedIndices.length > 1 && idx === selectedIndices[selectedIndices.length - 2]) {
                    setSelectedIndices(prev => prev.slice(0, -1));
                }
            }
        }
    };
    const handleEnd = () => {
        if (!isDragging)
            return;
        setIsDragging(false);
        const word = selectedIndices.map(i => letters[i].char).join('').toLowerCase();
        if (word.length < 2) {
            setSelectedIndices([]);
            return;
        }
        const success = onWordSubmit(word, selectedIndices);
        if (success) {
            setSelectedIndices([]);
        }
        else {
            playSound('incorrect');
            setFeedbackMessage("La palabra no está en el crucigrama");
            const newShakeSet = new Set(selectedIndices);
            setShakeIndices(newShakeSet);
            onShake();
            setTimeout(() => {
                setSelectedIndices([]);
                setShakeIndices(new Set());
                setFeedbackMessage(null);
            }, 800);
        }
    };
    useEffect(() => {
        const onMouseMove = (e) => {
            if (isDragging)
                handleMove(e.clientX, e.clientY);
        };
        const onTouchMove = (e) => {
            if (isDragging)
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
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
    const letterOffset = isMobile ? 48 : 50;
    const radius = containerSize / 2 - letterOffset;
    const center = containerSize / 2;
    const letterSizeClass = isMobile ? 'w-14 h-14 text-2xl' : 'w-12 h-12 text-xl';
    const letterOffsetPos = isMobile ? 28 : 24;
    const currentWordDisplay = selectedIndices.map(i => letters[i].char).join('');
    return (_jsxs("div", { className: "relative flex flex-col items-center", children: [_jsx("div", { className: `absolute -top-14 bg-slate-800 text-white px-6 py-3 rounded-full font-bold text-xl md:text-lg md:px-4 md:py-2 md:-top-12 transition-opacity duration-200 ${selectedIndices.length > 0 ? 'opacity-100' : 'opacity-0'}`, children: currentWordDisplay }), _jsx("div", { className: `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600/90 text-white px-4 py-2 rounded-lg text-sm font-bold text-center transition-opacity duration-300 pointer-events-none z-30 w-48 ${feedbackMessage ? 'opacity-100' : 'opacity-0'}`, children: feedbackMessage }), _jsxs("div", { ref: containerRef, className: "relative word-wheel-shell select-none touch-none transition-all duration-300", style: { width: containerSize, height: containerSize }, children: [_jsx("svg", { className: "absolute top-0 left-0 w-full h-full pointer-events-none z-10", children: selectedIndices.length > 0 && (_jsx("polyline", { points: selectedIndices.map(i => {
                                const pos = getLetterPosition(i, letters.length, radius, center, center);
                                return `${pos.x},${pos.y}`;
                            }).join(' ') + (isDragging ? ` ${cursorPos.x},${cursorPos.y}` : ''), fill: "none", stroke: "#f59e0b", strokeWidth: isMobile ? "12" : "8", strokeLinecap: "round", strokeLinejoin: "round", className: "opacity-70" })) }), letters.map((item, index) => {
                        const pos = getLetterPosition(index, letters.length, radius, center, center);
                        const isSelected = selectedIndices.includes(index);
                        const isShaking = shakeIndices.has(index);
                        return (_jsx("div", { id: `wheel-letter-${index}`, "data-index": index, className: `absolute ${letterSizeClass} word-wheel-letter flex items-center justify-center font-bold cursor-pointer transition-transform duration-150 z-20
                                ${isSelected ? 'word-wheel-letter--selected scale-110' : ''}
                                ${isShaking ? 'animate-shake word-wheel-letter--error' : ''}
                            `, style: {
                                left: pos.x - letterOffsetPos,
                                top: pos.y - letterOffsetPos,
                            }, onMouseDown: (e) => handleStart(e, index), onTouchStart: (e) => handleStart(e, index), children: item.char }, item.id));
                    })] }), _jsx("button", { onClick: () => setLetters(shuffleArray(letters)), className: "word-wheel-shuffle mt-6 md:mt-4 w-12 h-12 md:w-11 md:h-11 flex items-center justify-center", title: "Shuffle", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7 md:h-6 md:w-6 text-[#c0392b]", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }) })] }));
};
export default WordWheel;
