export interface IBlock {}

export class Block<T> {
    protected value: T;

    constructor(value: T) {
        this.value = value;
    }
}

export class StringToIntBlock extends Block<number> {
    constructor(value: string) {
        const canConverToNumber = !isNaN(+value);

        if (canConverToNumber) {
            const num: number = parseInt(value, 10);
            super(num);
        } else {
            throw Error('Данное значение не является корректным');
        }
    }

    get value(): number {
        return this.value;
    }
}
