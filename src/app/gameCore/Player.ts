import { User } from '../../modules/user';
import { StringToIntBlock } from './Block';

export class Player<B = StringToIntBlock> extends User {
    public symbol: string;
    protected steps: B[] = [];

    constructor(symbol: string) {
        super();
        this.symbol = symbol;
    }

    get lastStep(): B {
        return this.steps[this.steps.length - 1];
    }

    set step(block: B) {
        this.steps.push(block);
    }
}