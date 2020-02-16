import Model from './model';
import { EventEmitterMixin } from '../event_emitter';
import Game from '../../modules/game';
import UserS, { User } from '../../modules/user';
import { Player } from '../gameCore/Player';
import API from '../../modules/API';
import { INIT_EVENT, 
		 END_DOWN_EVENT, 
		 FINISH_GAME_EVENT, 
		 FINISH_STEP_EVENT,
		 END_OVER_BLOCK_EVENT } from '../../modules/events';

import { SingleGame } from '../gameCore/Game';

export default class GameModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	init({root = {}} = {}) {
		if (UserS.exists()) {
			const firstPlayer = UserS;
			const secondPlayer = new User({
				avatar: '',
				nickname: 'Enemy',
				email: 'enemy@mail.ru',
				score: 0,
				game: 0,
				win: 0,
				lose: 0
			});
			this._game = new SingleGame([firstPlayer, secondPlayer]);

			this.emit(INIT_EVENT, {
				root: root, 
				username: UserS._nickname,
				avatar: UserS._avatar,
				firstPlayer: this._game.getFirstPlayer(), 
				disableBlocks: this._game.getDisableBlocks(),
			});
		} else {
			API.getUser()
				.then(user => {
					User.set(user);
					this.emit(INIT_EVENT, {
						root: root, 
						username: User._username,
						avatar: User._avatar,
						firstPlayer: this._game.getFirstPlayer(), 
						disableBlocks: this._game.getDisableBlocks(),
					});
				})
				.catch((function() {
					const firstPlayer = new User({
						avatar: '',
						nickname: 'Enemy1',
						email: 'enemy@mail.ru',
						score: 0,
						game: 0,
						win: 0,
						lose: 0
					});

					const secondPlayer = new User({
						avatar: '',
						nickname: 'Enemy2',
						email: 'enemy@mail.ru',
						score: 0,
						game: 0,
						win: 0,
						lose: 0
					});
					this._game = new SingleGame([firstPlayer, secondPlayer]);

					this.emit(INIT_EVENT, {
						root: root, 
						username: UserS._nickname,
						avatar: UserS._avatar,
						firstPlayer: '', 
						disableBlocks: [],
					});
					// this.emit(INIT_EVENT, {
					// 	root: root, 
					// 	username: 'Player1',
					// 	firstPlayer: this._game.getFirstPlayer(), 
					// 	disableBlocks: this._game.getDisableBlocks(),
					// });
				}).bind(this));
		}
	}

	doStartStep({block = null} = {}) {
		let ans = this._game.doStartStep({block});
		this.emit(END_DOWN_EVENT, {player: this._game.getWhoseTurn(), ans: ans});
	}

	doOverStep({block = null} = {}) {
		let ans = this._game.doStep({block});
		this.emit(END_OVER_BLOCK_EVENT, {player: this._game.getWhoseTurn(), ans: ans, steps: this._game.steps});
	}

	doFinishStep({block = null} = {}) {
		this._game.doFinishStep({block}); // вернет true, если ход можно закончить
		let isWinner = this._game.isWinner(); // возвращает true если был win condition
		if (isWinner) { // если ход можно закончить и победитель существует
			// издать событие конца игры
			this.emit(FINISH_GAME_EVENT, {
				winner: this._game.getWinner()}); // по окончании игры нам надо знать победителя
		} else { // если ход можно закончить
			// издать событие конца хода
			this.emit(FINISH_STEP_EVENT, {player: this._game.getWhoseTurn()}); // по окончании хода, 
			// нам надо знать, 
			// чей сейчас ход и можно ли его завершить
		}
	}
}