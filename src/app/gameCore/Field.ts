import { Cordinates } from './cordinates';
import { StringBlock } from './block';  
import { Player } from './player';

export type FieldSize = {
    width: number;
    height: number;
}

export interface IField {
    matrix: string[][];
    width: number;
    height: number;

    /**
     * Сделать шаг игроком
     */
    setStep(cordinates: Cordinates, player: Player): any;

    /**
     * Возвращает ячейку из матрицы ходов
     */
    getCell(cordinates: Cordinates): string;
}

export class Field implements IField {
    public matrix: string[][] = [['*', '*', '*', '*', '*'],
                                 ['*', '*', '*', '*', '*'],
                                 ['*', '*', '*', '*', '*'],
                                 ['*', '*', '*', '*', '*'],
                                 ['*', '*', '*', '*', '*']];
    public width: number = 5;
    public height: number = 5;
    private disableBlocks: StringBlock[] = [];

    constructor(width: number = 5, height: number = 5) {
        this.matrix = [...Array(width)].map(() => 
                                    [...Array(height)].map(() => '*'));
        this.width = width;
        this.height = height;
    }

    setStep(cordinates: Cordinates, player: Player): boolean {
        const {x, y} = cordinates;

        if (this.matrix[y][x] === '*') {
            this.matrix[y][x] = player.stepSymbol;

            return true;
        }

        return false;
    }

    set setDisableBlocks(blocks: StringBlock[]) {
        blocks.forEach(block => {
            const {x, y} = block.getCordinates(this.widthAndHeight);
            this.matrix[y][x] = 'd'; 
        })

        this.disableBlocks = blocks;
    }

    get getDisableBlocks(): StringBlock[] {
        return this.disableBlocks;
    }

    getCell(cordinates: Cordinates): string {
        const {x, y} = cordinates;

        return this.matrix[x][y];
    }

    get widthAndHeight(): FieldSize {
        return {
            width: this.width,
            height: this.height
        }
    }
}