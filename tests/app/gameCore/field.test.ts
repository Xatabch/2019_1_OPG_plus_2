import { Field } from '../../../src/app/gameCore/field';
import { Cordinates } from '../../../src/app/gameCore/cordinates';
import { 
    STEP_SYMBOL, 
    FIELD_HEIGHT, 
    FIELD_WIDTH, 
    USER_DATA, 
    ENEMY_STEP_SYMBOL,
    DISABLE_BLOCK_SYMBOL,
    FIELD_SIZE } from './utils';
import { Player } from '../../../src/app/gameCore/player';
import { StringBlock } from '../../../src/app/gameCore/block';

jest.mock('../../../src/app/gameCore/player');
jest.mock('../../../src/app/gameCore/block');

describe('Тесты на класс Field', () => {
    describe('Тесты на метод setStep', () => {
        test(`При попытке сходить на свободную ячейку, вернется true и поле проставится на ${STEP_SYMBOL}`, () => {
            const player = new Player(USER_DATA, STEP_SYMBOL);
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const coordinates: Cordinates = {
                x: 3,
                y: 4
            }

            const canStep = field.setStep(coordinates, player);

            expect(canStep).toBeTruthy();
            expect(field.matrix[coordinates.y][coordinates.x]).toBe(STEP_SYMBOL);
        });

        test(`При попытке сходить на ячейку занятую противником, вернется false и поле не изменится`, () => {
            const player = new Player(USER_DATA, STEP_SYMBOL);
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const coordinates: Cordinates = {
                x: 3,
                y: 4
            }
            field.matrix[coordinates.y][coordinates.x] = ENEMY_STEP_SYMBOL;

            const canStep = field.setStep(coordinates, player);

            expect(canStep).toBeFalsy();
            expect(field.matrix[coordinates.y][coordinates.x]).toBe(ENEMY_STEP_SYMBOL);
        });

        test(`При попытке сходить на ячейку, на которую я уже ходил, вернется false и поле не изменится`, () => {
            const player = new Player(USER_DATA, STEP_SYMBOL);
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const coordinates: Cordinates = {
                x: 3,
                y: 4
            }
            field.matrix[coordinates.y][coordinates.x] = STEP_SYMBOL;

            const canStep = field.setStep(coordinates, player);

            expect(canStep).toBeFalsy();
            expect(field.matrix[coordinates.y][coordinates.x]).toBe(STEP_SYMBOL);
        });

        test(`При попытке сходить на заблокированную ячейку, вернется false и поле не изменится`, () => {
            const player = new Player(USER_DATA, STEP_SYMBOL);
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const coordinates: Cordinates = {
                x: 3,
                y: 4
            }
            field.matrix[coordinates.y][coordinates.x] = DISABLE_BLOCK_SYMBOL;

            const canStep = field.setStep(coordinates, player);

            expect(canStep).toBeFalsy();
            expect(field.matrix[coordinates.y][coordinates.x]).toBe(DISABLE_BLOCK_SYMBOL);
        });

        test(`При попытке сходить на ячейку, которой не существует вернется false`, () => {
            const player = new Player(USER_DATA, STEP_SYMBOL);
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const coordinates: Cordinates = {
                x: -1,
                y: -1
            }

            const canStep = field.setStep(coordinates, player);

            expect(canStep).toBeFalsy();
        });
    });

    describe('Тесты на метод getCell и getCellByBlock', () => {
        test('При запросе ячейки с ходом игрока по координатам, возвращается символ хода игрока', () => {
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const coordinates: Cordinates = {
                x: 3,
                y: 4
            }
            field.matrix[coordinates.y][coordinates.x] = STEP_SYMBOL;

            const cell = field.getCell(coordinates);

            expect(cell).toBe(STEP_SYMBOL);
        });

        test('При запросе ячейки с ходом игрока по блоку, возвращается символ хода игрока', () => {
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const cellBlock = new StringBlock('23');
            const coordinates: Cordinates = {
                x: 3,
                y: 4
            }
            field.matrix[coordinates.y][coordinates.x] = STEP_SYMBOL;

            const cell = field.getCellByBlock(cellBlock);

            expect(cell).toBe(STEP_SYMBOL);
        });
    });

    describe('Тесты на геттеры и сеттеры', () => {
        test('При запросе widthAndHeight вернется объект с width и height', () => {
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const fieldSize = field.widthAndHeight;

            expect(fieldSize).toMatchObject(FIELD_SIZE);
        });

        test('При установке недоступных блоков через setDisableBlocks, все блоки будут с "d"', () => {
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const disableBlocks = [
                new StringBlock('0'), 
                new StringBlock('1'), 
                new StringBlock('2')];

            field.setDisableBlocks = disableBlocks;
            const expectMatrix = [ [ 'd', 'd', 'd', '*', '*' ],
                                   [ '*', '*', '*', '*', '*' ],
                                   [ '*', '*', '*', '*', '*' ],
                                   [ '*', '*', '*', '*', '*' ],
                                   [ '*', '*', '*', '*', '*' ] ];

            expect(field.matrix).toMatchObject(expectMatrix);
        });

        test('При получении недоступных блоков, они будут соответствовать поданным в сеттер', () => {
            const field = new Field(FIELD_WIDTH, FIELD_HEIGHT);
            const disableBlocks = [
                new StringBlock('0'), 
                new StringBlock('1'), 
                new StringBlock('2')];

            field.setDisableBlocks = disableBlocks;

            expect(field.getDisableBlocks).toMatchObject(disableBlocks);
        });
    })
})