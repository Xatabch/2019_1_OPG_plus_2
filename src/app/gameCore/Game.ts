import {
    IBlock,
    StringBlock,
} from './block';

import {
    Player 
} from './player';

import { User } from '../../modules/user'; 

import { Cordinates } from './cordinates';
import {
    FieldSize,
    IField,
    Field
} from './field';

const MIN_DISABLE_BLOCKS = 2;
const MAX_FREE_BLOCKS = 10;

export class Test {
    doSmth(a: any) {
        console.log(a);
    }
}

export interface IGame {
    /**
     * Игроки
     */
    players: Player[];

    /**
     * Обрабатывает первый шаг
     * @returns {bool} Возвращает true, если ход модет быть совершен
     */
    doStartStep(block: IBlock): boolean;

    /**
     * Обрабатывает каждый шаг между первым и последним шагами
     * @returns {bool} RВозвращает true, если ход модет быть совершен
     */
    doOverStep(block: IBlock): boolean;
    
    /**
     * Обрабатывает последний шаг
     * @returns {bool} Возвращает true, если ход может быть завершен
     */
    doFinishStep(block: IBlock): boolean;
} 

export class SingleGame implements IGame { 
    public players: Player[];

    private whoseFirstStep: Player;
    private whoseTurn: Player;
    private fieldMatrix: Field;
    private cellsCount: number;
    private steps: StringBlock[] = [];

    private startFlag: boolean = false;
    private secondStepFlag: boolean = false;
    private ans: boolean = false;

    constructor(users: User[], whoseFirstStep?: Player, disableBlocks?: StringBlock[]) {
        this.players = [new Player(users[0].get(), 'x'), 
                        new Player(users[1].get(), 'o')];
        this.whoseFirstStep = whoseFirstStep || this.getRandomWhoseFirstStep();
        this.whoseTurn = this.whoseFirstStep;
        this.fieldMatrix = new Field();
        this.fieldMatrix.setDisableBlocks = disableBlocks || this.getRandomDisableBlocks();
        // Вычитаем из общего количества ячеек заблокированные
        this.cellsCount = this.fieldMatrix.width * this.fieldMatrix.height - this.fieldMatrix.getDisableBlocks.length;

    }

    doStartStep(block: StringBlock): boolean {
        if (!this.startFlag) {
            const coordinates = block.getCordinates(this.fieldMatrix.widthAndHeight);
			const isCanSet = this.fieldMatrix.setStep(coordinates, this.whoseTurn);

            if (isCanSet) {
                this.steps.push(block);
                this.startFlag = true;
            }

            return isCanSet;
        }

        return false;
    }

    doOverStep(block: StringBlock): boolean {
        if (this.startFlag) {
			const cordinates = block.getCordinates(this.fieldMatrix.widthAndHeight);
			const isDiagonal = this.isDiagonal(cordinates);
			const isConsistStraight = this.isConsistStraight(cordinates);

			if (!this.secondStepFlag && !isDiagonal) {
                this.steps.push(block);
                
                const canStep = this.fieldMatrix.setStep(cordinates, this.whoseTurn);
				this.secondStepFlag = true;

				return canStep;
			}

			if (isConsistStraight && !isDiagonal) {
				this.steps.push(block);
				const canStep = this.fieldMatrix.setStep(cordinates, this.whoseTurn);

				return canStep;
			}
        }
        
        return false;
    }

    doFinishStep(block: StringBlock): boolean {
        return true;
    }
    /**
     * Возвращает случайного пользователя, который будет делать первый шаг
     */
    getRandomWhoseFirstStep(): Player {
        // Рандомное число от 1 до 2 (min - 0.5 + Math.random() * (max - min + 1);)
        const random = Math.floor(Math.random() * 2);
        return this.players[random];
    }

    /**
     * Возвращает массив заблокированных блоков
     */
    getRandomDisableBlocks(): StringBlock[] {
        const disableBlocks: StringBlock[] = [];
        const countDisableBlocks = this.fieldMatrix.width * this.fieldMatrix.height - MAX_FREE_BLOCKS;
        // Рандомное колчиество заблокированных блоков (min - 0.5 + Math.random() * (max - min + 1))
		let randomCountDisableBlocks = Math.floor(Math.random() * (countDisableBlocks - MIN_DISABLE_BLOCKS + 1));

        for (let i = 0; i < randomCountDisableBlocks; i++) {
            // TODO вынести такие громосткие вычисления в utils, когда перепишу на ts
            const randomBlock = Math.floor(Math.random() * (countDisableBlocks - MIN_DISABLE_BLOCKS + 1));
            if (!disableBlocks.some(block => block.stringToInt === randomBlock)) {
                // Это для того, чтобы создать элемент StringBlock
                const randomStringBlock = randomBlock.toString();
                disableBlocks.push(new StringBlock(randomStringBlock));
            } else {
                randomCountDisableBlocks--;
            }
        }

        return disableBlocks;
    }
    
    /**
     * Проверяет принадлежит ли точка диагонали
     * @returns {bool} Возвращает true, если точка принадледит диагонали
     */
    isDiagonal(cordinates: Cordinates): boolean {
		let startPoint: Cordinates = this.steps[0].getCordinates(this.fieldMatrix.widthAndHeight)
		return !!((startPoint.y - cordinates.y) && (startPoint.x - cordinates.x));
    }
    
    /**
     * Проверяет принадлежит ли точка ходу противника
     * @returns {bool} Возвращает true, если принадлежит
     */
    isEnemyStep(cordinates: Cordinates): boolean {
        const firstPlayer = this.players[0];
        const secondPlayer = this.players[1];

		if (this.whoseTurn === firstPlayer) {
			return this.fieldMatrix.getCell(cordinates) === secondPlayer.stepSymbol;
		} else {
			return this.fieldMatrix.getCell(cordinates) === firstPlayer.stepSymbol;
		}
    }

    /**
     * Проверяет принадлежит ли точка прямой(необходими две начальные точки)
     * @returns {bool} Возвращает true, если принадлежит
     */
	isConsistStraight(coordinates: Cordinates) {
        const startPoint = this.steps[0].getCordinates(this.fieldMatrix.widthAndHeight);
        const endPoint = this.steps[1].getCordinates(this.fieldMatrix.widthAndHeight);

		const firstPart = coordinates.y * endPoint.x 
            - endPoint.x * startPoint.y
            - startPoint.x * coordinates.y
            + startPoint.x * startPoint.y;

		const secondPart = coordinates.x * endPoint.y
                    - coordinates.x * startPoint.y
                    - startPoint.x * endPoint.y
                    + startPoint.x * startPoint.y;


		return firstPart === secondPart;
    }

    get disableBlocks(): StringBlock[] {
        return this.fieldMatrix.getDisableBlocks;
    }

    // /**
    //  * Проверяет целостность шага
    //  * @returns {bool} Возвращает true, если шаг может быть проставлен
    //  */
	// checkIntegrity() {
	// 	const begin = this.steps[0].stringToInt;
	// 	const end = this.steps[this.steps.length - 1].stringToInt;
	// 	const diff = Math.abs(end - begin);
	// 	const newSteps: StringBlock[] = [];

	// 	if (diff < 5) {
	// 		this.steps.forEach((el, i) => {
	// 			if (this.ans) {
	// 				newSteps.push(el);
	// 			}

	// 			if (Math.abs(el.stringToInt - this.steps[i + 1].stringToInt) != 1) {
	// 				this.steps.splice(i + 1, 0, ...this.getMissX(el, this.steps[i + 1]));
	// 			}
	// 		});

	// 		if (!this.ans) {
	// 			this.steps = newSteps;
	// 		}

	// 		return this.ans;
	// 	} else {
	// 		this.steps.forEach((el, i) => {
	// 			if (this.ans) {
	// 				newSteps.push(el);
	// 			}
                
	// 			if (Math.abs(el.stringToInt - this.steps[i + 1].stringToInt) != 5) {
	// 				this.steps.splice(i + 1, 0, ...this.getMissY(el, this.steps[i + 1]));
	// 			}
	// 		});

	// 		if (!this.ans) {
	// 			this.steps = newSteps;
	// 		}

	// 		return this.ans;
	// 	}
	// }
}