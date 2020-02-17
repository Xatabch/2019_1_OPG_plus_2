import { StringBlock } from '../../../src/app/gameCore/block';
import { FieldSize } from '../../../src/app/gameCore/field';
import { Cordinates } from '../../../src/app/gameCore/cordinates';

describe('Тесты на класс StringBlock', () => {
    describe('Тесты на метод stringToInt', () => {
        test('Поданный строкой блок должен корректно возвращать число', () => {
            const block: string = '5';
            const expectValue: number = 5;
            const stringBlock = new StringBlock(block);

            expect(stringBlock.stringToInt).toBe(expectValue);
        });

        test('Поданное некорректное значение строкой должно возвращать число 0', () => {
            const block: string = 'lol';
            const expectValue: number = -1;
            const stringBlock = new StringBlock(block);

            expect(stringBlock.stringToInt).toBe(expectValue);
        });

        test('Поданное отрицательное значение строкой должно возвращать число 0', () => {
            const block: string = '-5';
            const expectValue: number = -1;
            const stringBlock = new StringBlock(block);

            expect(stringBlock.stringToInt).toBe(expectValue);
        });
    });

    describe('Тесты на метод getCordinates с полем размера 5 на 5', () => {
        const fieldSize: FieldSize = {
            width: 5,
            height: 5
        };

        test(`При поданном значении поля ${fieldSize.width} на ${fieldSize.height} и блока 5, координаты должны быть 0 и 1`, () => {
            const cordinates: Cordinates = {
                x: 0,
                y: 1
            };
            const block = '5';
            const stringBlock = new StringBlock(block);
            
            expect(stringBlock.getCordinates(fieldSize)).toMatchObject(cordinates);
        });

        test(`При поданном значении поля ${fieldSize.width} на ${fieldSize.height} и блока 12, координаты должны быть 2 и 2`, () => {
            const cordinates: Cordinates = {
                x: 2,
                y: 2
            };
            const block = '12';
            const stringBlock = new StringBlock(block);
            
            expect(stringBlock.getCordinates(fieldSize)).toMatchObject(cordinates);
        });

        test(`При поданном значении поля ${fieldSize.width} на ${fieldSize.height} и блока 30(выходит за рамки поля), координаты должны быть -1 и -1`, () => {
            const cordinates: Cordinates = {
                x: -1,
                y: -1
            };
            const block = '30';
            const stringBlock = new StringBlock(block);
            
            expect(stringBlock.getCordinates(fieldSize)).toMatchObject(cordinates);
        });
    });
});
