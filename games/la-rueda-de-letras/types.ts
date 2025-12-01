export interface WordEntry {
    palabra: string;
    traduccion_ingles: string;
}

export interface PlacedWord {
    wordObj: WordEntry;
    x: number;
    y: number;
    dir: 'H' | 'V';
    normalized: string;
}

export interface GridCell {
    char: string;
    x: number;
    y: number;
    isStartOfWord?: boolean;
    wordIndex?: number;
    partOfWords: number[]; // Indices of words this cell belongs to
    barrierRight: boolean;
    barrierBottom: boolean;
}

export interface GameState {
    words: PlacedWord[];
    baseWordNormalized: string;
    gridWidth: number;
    gridHeight: number;
    gridOffsetX: number;
    gridOffsetY: number;
}

export interface FlyingLetter {
    id: string;
    char: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    delay: number;
}