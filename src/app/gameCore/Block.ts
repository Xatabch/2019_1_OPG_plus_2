import { Cordinates } from './Cordinates';
import { FieldSize } from './Field';

export interface IBlock {}

export class Block<T> {
    protected value: T;

    constructor(value: T) {
        this.value = value;
    }
}

export class StringBlock extends Block<string> {
    constructor(value: string) {
        super(value);
        this.value = value;
    }

    get stringToInt(): number {
        const canConverToNumber = !isNaN(+this.value);

        if (canConverToNumber) {
            return parseInt(this.value, 10);
        }

        return 0;
    }

    /**
     * Возвращает значение блока в координатах поданного поля
     * @param fieldSize Размер поля
     */
    getCordinates(fieldSize: FieldSize): Cordinates {
        const width = fieldSize.width;
        const height = fieldSize.height;
        const intValue: number = this.stringToInt;

        return {
            x: Math.floor(intValue % width),
            y: Math.floor(intValue / height)
        }
    }
}
