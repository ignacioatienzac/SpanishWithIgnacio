import React, { useState } from 'react';
import { playSound } from '../audio';

interface CalendarButtonProps {
    onSelectDate: (dateStr: string) => void;
    currentSelectedDate?: string;
}

const CalendarButton: React.FC<CalendarButtonProps> = ({ onSelectDate, currentSelectedDate }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCalendar = () => {
        playSound('hint'); // Reusing hint sound for UI interaction
        setIsOpen(!isOpen);
    };

    // Generate last 60 days
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 60; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            dates.push(d);
        }
        return dates;
    };

    const dates = generateDates();

    const formatDateForID = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    };

    const handleDateClick = (dateStr: string) => {
        onSelectDate(dateStr);
        setIsOpen(false);
        playSound('newGame');
    };

    return (
        <>
            <button 
                onClick={toggleCalendar}
                className="bg-white text-[#c0392b] p-3 rounded-full hover:bg-red-50 transition-all active:scale-95 shadow-sm border border-red-200 flex items-center justify-center group"
                aria-label="Juego Diario"
                title="Calendario de Juegos"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    <circle cx="12" cy="14" r="1.5" fill="currentColor" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="p-4 bg-[#c0392b] text-white flex justify-between items-center shadow-md z-10">
                            <h3 className="text-xl font-bold font-oswald flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Selecciona un Día
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-[#a93226] p-1 rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto bg-slate-50">
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                {dates.map((date, index) => {
                                    const dateStr = formatDateForID(date);
                                    const isSelected = currentSelectedDate === dateStr;
                                    const today = isToday(date);
                                    
                                    return (
                                        <button
                                            key={dateStr}
                                            onClick={() => handleDateClick(dateStr)}
                                            className={`
                                                relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                                                ${isSelected 
                                                    ? 'bg-[#c0392b] border-[#c0392b] text-white shadow-lg scale-105' 
                                                    : 'bg-white border-slate-200 text-slate-700 hover:border-red-300 hover:bg-red-50'
                                                }
                                                ${today ? 'ring-2 ring-offset-1 ring-yellow-400' : ''}
                                            `}
                                        >
                                            {today && (
                                                <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                                                    HOY
                                                </span>
                                            )}
                                            <span className="text-lg font-bold font-oswald">{date.getDate()}</span>
                                            <span className="text-xs uppercase opacity-80">
                                                {date.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '')}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CalendarButton;