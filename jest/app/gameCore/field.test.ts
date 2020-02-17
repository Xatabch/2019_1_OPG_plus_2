import { Field } from '../../../src/app/gameCore/field';
import { Cordinates } from '../../../src/app/gameCore/cordinates';
import { STEP_SYMBOL, FIELD_HEIGHT, FIELD_WIDTH } from './utils';
import { Player } from '../../../src/app/gameCore/player';

describe('Тесты на класс Field', () => {
    describe('Тесты на метод setStep', () => {
        test(`При попытке сходить на свободное поле, вернется true и поле проставится на ${STEP_SYMBOL}`, () => {
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const coordinates: Cordinates = {
                x: 3,
                y: 3
            }

            const canStep = field.setStep(coordinates, Player);

            expect(canStep).toBeTruthy();
            expect(field.matrix[coordinates.y][coordinates.x]).toBe(STEP_SYMBOL);
        })
    })
})