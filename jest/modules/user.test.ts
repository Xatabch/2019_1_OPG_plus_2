import { User, UserData } from '../../src/modules/user';

describe('Тесты на класс User', () => {
    describe('Тесты на get()', () => {
        test('Возвращает объект с дефолтными полями', () => {
            const expectUserData: UserData = {
                avatar: '',
                nickname: '',
                email: '',
                score: 0,
                games: 0,
                win: 0,
                lose: 0
            }
            const user = new User();
            const userData: UserData = user.get();
            
            expect(expectUserData).toMatchObject(userData);
        });
    
        test('Возвращает объект с переданными в конструктор полями', () => {
            const expectUserData: UserData = {
                avatar: 'img.jpg',
                nickname: 'test',
                email: 'test@example.com',
                score: 12,
                games: 5,
                win: 2,
                lose: 0
            }
            const user = new User(expectUserData);
            const userData: UserData = user.get();
    
            expect(expectUserData).toMatchObject(userData);
        });
    });

    describe('Тесты на set()', () => {
        test('Устанавливает поданные значения', () => {
            const initUserData: UserData = {
                avatar: 'img.jpg',
                nickname: 'test',
                email: 'test@example.com',
                score: 12,
                games: 5,
                win: 2,
                lose: 0
            };
            const expectUserData: UserData = {
                avatar: 'img1.jpg',
                nickname: 'test1',
                email: 'test1@example.com',
                score: 200,
                games: 25,
                win: 22,
                lose: 20
            }
            const user = new User(initUserData);
            user.set(expectUserData);

            const userData: UserData = user.get();
            expect(expectUserData).toMatchObject(userData);
        });

        test('Изменение одного поля', () => {
            const initUserData: UserData = {
                avatar: 'img.jpg',
                nickname: 'test',
                email: 'test@example.com',
                score: 12,
                games: 5,
                win: 2,
                lose: 0
            };
            const expectUserData: UserData = {
                avatar: 'img.jpg',
                nickname: 'test',
                email: 'test@example.com',
                score: 200,
                games: 5,
                win: 2,
                lose: 0
            };
            const user = new User(initUserData);
            const newUserData: UserData = user.get();
            newUserData.score = 200;
            user.set(newUserData);

            const userData: UserData = user.get();
            expect(expectUserData).toMatchObject(userData);
        });
    })

    describe('Тесты на exists()', () => {
        test('Возвращает false при отстуствии полей nickname и email', () => {
            const initUserData: UserData = {
                avatar: 'img.jpg',
                nickname: '',
                email: '',
                score: 12,
                games: 5,
                win: 2,
                lose: 0
            };
            const user = new User(initUserData);
    
            expect(user.exists()).toBeFalsy();
        });
    
        test('Возвращает true при наличии полей nickname и email', () => {
            const initUserData: UserData = {
                avatar: 'img.jpg',
                nickname: 'test',
                email: 'test@mail.ru',
                score: 12,
                games: 5,
                win: 2,
                lose: 0
            };
            const user = new User(initUserData);
    
            expect(user.exists()).toBeTruthy();
        });

        test('Возвращает false при отсутствии поля nickname', () => {
            const initUserData: UserData = {
                avatar: 'img.jpg',
                nickname: '',
                email: 'test@mail.ru',
                score: 12,
                games: 5,
                win: 2,
                lose: 0
            };
            const user = new User(initUserData);
    
            expect(user.exists()).toBeFalsy();
        });

        test('Возвращает false при отсутствии поля email', () => {
            const initUserData: UserData = {
                avatar: 'img.jpg',
                nickname: 'test',
                email: '',
                score: 12,
                games: 5,
                win: 2,
                lose: 0
            };
            const user = new User(initUserData);
    
            expect(user.exists()).toBeFalsy();
        });
    });

    describe('Тесты на clear()', () => {
        test('Поля пустые после очистки', () => {
            const initUserData: UserData = {
                avatar: 'img.jpg',
                nickname: 'test',
                email: 'test@mail.ru',
                score: 12,
                games: 5,
                win: 2,
                lose: 0
            };
            const expectUserData: UserData = {
                avatar: '',
                nickname: '',
                email: '',
                score: 0,
                games: 0,
                win: 0,
                lose: 0
            }
            const user = new User(initUserData);
            
            user.clear();

            expect(user.get()).toMatchObject(expectUserData);
        });
    })
});