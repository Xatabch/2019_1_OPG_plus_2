import { User, UserData } from '../../modules/user';
import { StringBlock } from './Block';

export class Player<B = StringBlock> extends User {
    public stepSymbol: string;
    protected steps: B[] = [];

    constructor(data: UserData, symbol: string) {
        super(data);
        this.stepSymbol = symbol;
    }

    get lastStep(): B {
        return this.steps[this.steps.length - 1];
    }

    set step(block: B) {
        this.steps.push(block);
    }
}