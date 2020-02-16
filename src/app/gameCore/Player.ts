import { StringToIntBlock } from './Block';

export interface IPlayer {}

export class Player<B = StringToIntBlock> implements IPlayer {
    public nickname: string;
    public symbol: string;
    protected steps: B[] = [];

    constructor(nickname: string, symbol: string) {
        this.nickname = nickname;
        this.symbol = symbol;
    }

    get lastStep(): B {
        return this.steps[this.steps.length - 1];
    }

    set step(block: B) {
        this.steps.push(block);
    }
}