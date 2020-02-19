import { UserData } from '../../../src/modules/user';
import { FieldSize } from '../../../src/app/gameCore/field';
import { StringBlock } from '../../../src/app/gameCore/block';

jest.mock('../../../src/app/gameCore/block');

export const USER_DATA: UserData = {
    avatar: 'test.jpg',
    nickname: 'test',
    email: 'test@mail.ru',
    score: 100,
    games: 20,
    win: 10,
    lose: 10
}
export const FIELD_WIDTH: number = 5;
export const FIELD_HEIGHT: number = 5;
export const FIELD_SIZE: FieldSize = {
    width: 5,
    height: 5
}
export const STEP_SYMBOL: string = 'x';
export const ENEMY_STEP_SYMBOL: string = 'o';
export const DISABLE_BLOCK_SYMBOL: string = 'd';