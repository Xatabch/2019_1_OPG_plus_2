type UserData = {
	avatar: string;
	nickname: string;
	email: string;
	score: number;
	games: number;
	win: number;
	lose: number;
}

interface IUser {
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

class User implements IUser {
	avatar: string;
	nickname: string;
	email: string;
	score: number;
	games: number;
	win: number;
	lose: number;

	constructor() {
		this.avatar = '';
		this.nickname = '';
		this.email = '';
		this.score = 0;
		this.games = 0;
		this.win = 0;
		this.lose = 0;
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
// /**
//  * Singleton User structure that represents client
//  */
// class UserS {
// 	/**
// 	 * @constructor
// 	 */
// 	constructor() {
// 		this._avatar = null;
// 		this._username = null;
// 		this._email = null;
// 		this._score = null;
// 		this._games = 0;
// 		this._win = 0;
// 		this._lose = 0;
// 	}

// 	/**
// 	 * Checks whether user exists
// 	 * @return {boolean}
// 	 */
// 	exist() {
// 		return this._username && this._email;
// 	}

// 	/**
// 	 * Returns User data
// 	 * @return {{score: null, lose: number, username: null, games: number, win: number, email: null}}
// 	 */
// 	get() {
// 		return {
// 			avatar: this._avatar,
// 			username: this._username,
// 			email: this._email,
// 			score: this._score,
// 			games: this._games,
// 			win: this._win,
// 			lose: this._lose,
// 		};
// 	}

// 	/**
// 	 * Sets User data
// 	 * @param data
// 	 */
// 	set(data) {
// 		this._avatar = data.avatar;
// 		this._username = data.username;
// 		this._email = data.email;
// 		this._score = data.score;
// 		this._games = data.games;
// 		this._win = data.win;
// 		this._lose = data.lose;
// 	}

// 	/**
// 	 * Clear User data
// 	 */
// 	clear() {
// 		this._avatar = null;
// 		this._username = null;
// 		this._email = null;
// 		this._score = null;
// 		this._games = 0;
// 		this._win = 0;
// 		this._lose = 0;
// 	}
// }

/**
 * Singleton variable that represents user
 * @type {UserS}
 */
const user = new User();
export default user;