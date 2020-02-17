import { Cordinates } from './cordinates';
import { FieldSize } from './field';

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

    /**
     * Возвращает значение блока в "int"
     */
    get stringToInt(): number {
        const canConverToNumber = !isNaN(+this.value);

        if (canConverToNumber) {
            const val: number = parseInt(this.value, 10);
            return val > 0 ? val : -1;
        }

        return -1;
    }

    /**
     * Возвращает значение блока в координатах поданного поля
     * @param fieldSize Размер поля
     */
    getCordinates(fieldSize: FieldSize): Cordinates {
        const width = fieldSize.width;
        const height = fieldSize.height;
        const intValue: number = this.stringToInt;

        if (intValue < width * height - 1) {
            return {
                x: Math.floor(intValue % width),
                y: Math.floor(intValue / height)
            }
        }

        return {
            x: -1,
            y: -1
        }
    }
}
