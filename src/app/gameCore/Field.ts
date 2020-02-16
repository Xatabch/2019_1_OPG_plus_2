import { Coordinates } from './Coordinates';
import { Player } from './Player';

export interface IField {
    matrix: string[][];
    width: number;
    height: number;

    /**
     * Сделать шаг игроком
     */
    setStep(coordinates: Coordinates, player: Player): any;

    /**
     * Возвращает ячейку из матрицы ходов
     */
    getCell(coordinates: Coordinates): string;
}

export class Field implements IField {
    public matrix: string[][] = [['*', '*', '*', '*', '*'],
                                 ['*', '*', '*', '*', '*'],
                                 ['*', '*', '*', '*', '*'],
                                 ['*', '*', '*', '*', '*'],
                                 ['*', '*', '*', '*', '*']];
    public width: number = 5;
    public height: number = 5;

    setStep(coordinates: Coordinates, player: Player): boolean {
        if (this.matrix[coordinates.x][coordinates.y] === '*') {
            this.matrix[coordinates.x][coordinates.y] = player.symbol;

            return true;
        }

        return false;
    }

    getCell(coordinates: Coordinates): string {
        return this.matrix[coordinates.x][coordinates.y];
    }
}