export type UserData = {
	avatar: string;
	nickname: string;
	email: string;
	score: number;
	games: number;
	win: number;
	lose: number;
}

export interface IUser {
	avatar: string;
	nickname: string;
	email: string;
	score: number;
	games: number;
	win: number;
	lose: number;

	/**
	 * Проверяет есть ли пользователь в данной сессии
	 * @return {boolean}
	 */
	exists(): boolean;

	/**
	 * Возвращает информацию о пользователе
	 * @return UserData
	 */
	get(): UserData;

	/**
	 * Устанавливает пользовательские данные
	 * @param data
	 */
	set(data: UserData): any;

	/**
	 * Удаляет пользовательские данные
	 */
	clear(): any;
}

export class User implements IUser {
	avatar: string;
	nickname: string;
	email: string;
	score: number;
	games: number;
	win: number;
	lose: number;

	constructor(data: UserData = {
		avatar: '',
		nickname: '',
		email: '',
		score: 0,
		games: 0,
		win: 0,
		lose: 0
	}) {
		this.avatar = data.avatar;
		this.nickname = data.nickname;
		this.email = data.email;
		this.score = data.score;
		this.games = data.games;
		this.win = data.win;
		this.lose = data.lose;
	}

	exists(): boolean {
		return !!(this.nickname && this.email);
	}

	get(): UserData {
		return {
			avatar: this.avatar,
			nickname: this.nickname,
			email: this.email,
			score: this.score,
			games: this.games,
			win: this.win,
			lose: this.lose,
		};
	}

	set(data: UserData) {
		this.avatar = data.avatar;
		this.nickname = data.nickname;
		this.email = data.email;
		this.score = data.score;
		this.games = data.games;
		this.win = data.win;
		this.lose = data.lose;
	}

	clear() {
		this.avatar = '';
		this.nickname = '';
		this.email = '';
		this.score = 0;
		this.games = 0;
		this.win = 0;
		this.lose = 0;
	}
}

/**
 * Синглтон, который представляет пользователя сессии
 * @type {User}
 */
const user = new User();
export default user;