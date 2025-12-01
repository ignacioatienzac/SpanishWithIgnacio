const AudioContextClass = (window.AudioContext || window.webkitAudioContext);
let audioCtx = null;
export const playSound = (type) => {
    // Check if browser supports AudioContext
    if (!AudioContextClass)
        return;
    if (!audioCtx) {
        audioCtx = new AudioContextClass();
    }
    // Try to resume if suspended (browsers block audio until user interaction)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => { });
    }
    // If still suspended (no user interaction yet), we can't play sound
    if (audioCtx.state === 'suspended')
        return;
    const ctx = audioCtx;
    const now = ctx.currentTime;
    // Helper to create oscillator
    const createOscillator = (type, freq, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(gain);
        gain.connect(ctx.destination);
        return { osc, gain };
    };
    switch (type) {
        case 'correct':
            // Pleasant major third chord chime (C5 + E5)
            const root = createOscillator('sine', 523.25, 0.4);
            const third = createOscillator('sine', 659.25, 0.4);
            // Envelope for root
            root.gain.gain.setValueAtTime(0, now);
            root.gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
            root.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            root.osc.start(now);
            root.osc.stop(now + 0.4);
            // Envelope for third
            third.gain.gain.setValueAtTime(0, now);
            third.gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
            third.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            third.osc.start(now);
            third.osc.stop(now + 0.4);
            break;
        case 'incorrect':
            // Low, short "thud" or "buzz"
            const thud = createOscillator('triangle', 150, 0.2);
            thud.osc.frequency.linearRampToValueAtTime(100, now + 0.2); // Pitch drop
            thud.gain.gain.setValueAtTime(0.08, now);
            thud.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            thud.osc.start(now);
            thud.osc.stop(now + 0.2);
            break;
        case 'newGame':
            // Ascending "Swoosh" / Magical sweep
            const sweep = createOscillator('sine', 300, 0.5);
            sweep.osc.frequency.exponentialRampToValueAtTime(600, now + 0.4);
            sweep.gain.gain.setValueAtTime(0, now);
            sweep.gain.gain.linearRampToValueAtTime(0.1, now + 0.2);
            sweep.gain.gain.linearRampToValueAtTime(0, now + 0.5);
            sweep.osc.start(now);
            sweep.osc.stop(now + 0.5);
            break;
        case 'hint':
            // High pitched "Ping"
            const ping = createOscillator('sine', 880, 0.3); // A5
            ping.gain.gain.setValueAtTime(0, now);
            ping.gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
            ping.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            ping.osc.start(now);
            ping.osc.stop(now + 0.3);
            break;
    }
};
