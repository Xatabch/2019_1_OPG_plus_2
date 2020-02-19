import { Player } from '../../../src/app/gameCore/player';
import { UserData } from '../../../src/modules/user';
import { StringBlock } from '../../../src/app/gameCore/block';

class StringBlockMock extends StringBlock { 
    constructor(value: string = '5') {
        super(value);
    }
}

describe('Тесты на класс Player', () => {
    const userData: UserData = {
        avatar: 'test.jpg',
        nickname: 'test',
        email: 'test@mail.ru',
        score: 100,
        games: 20,
        win: 10,
        lose: 10
    }
    const stepSymbol = 'x';

    describe('Тесты на сеттер step и геттер lastStep', () => {
        test('Если игрок сделал шаг, должен вернуться данный шаг', () => {
            const player = new Player<StringBlockMock>(userData, stepSymbol);
            const block: StringBlock = new StringBlockMock();
            player.step = block;

            expect(player.lastStep).toBe(block);
        });

        test('Если игрок не делал шагов, должен вернуться undefined', () => {
            const player = new Player<StringBlockMock>(userData, stepSymbol);

            expect(player.lastStep).toBeUndefined();
        });
    });
})