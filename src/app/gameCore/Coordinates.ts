import { StringToIntBlock } from './Block';

export class Coordinates {
    public x: number = 0;
    public y: number = 0;
}

export class BlockToCoordinates extends Coordinates {
    public x: number;
    public y: number;

    constructor(block: StringToIntBlock, fieldSize: number[] = [5, 5]) {
        super();

        const width = fieldSize[0];
        const height = fieldSize[1];
        
        this.x = block.value % width;
        this.y = block.value / height;
    }
}