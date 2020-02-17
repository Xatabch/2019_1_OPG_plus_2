import { StringBlock } from '../../../src/app/gameCore/block';
import { Cordinates } from '../../../src/app/gameCore/cordinates';
import { Player } from '../../../src/app/gameCore/player';
import { UserData } from '../../../src/modules/user';
import { Field, FieldSize } from '../../../src/app/gameCore/field';

export const USER_DATA: UserData = {
    avatar: 'test.jpg',
    nickname: 'test',
    email: 'test@mail.ru',
    score: 100,
    games: 20,
    win: 10,
    lose: 10
}
export const FIELD_WIDTH = 5;
export const FIELD_HEIGHT = 5;
export const STEP_SYMBOL = 'x';

// export class PlayerMock implements Player {
//     constructor() {
//         super(USER_DATA, STEP_SYMBOL);
//     }
// }