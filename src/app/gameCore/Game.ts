import {
    IBlock,
    StringToIntBlock,
} from './Block';

import { 
    IPlayer,
    Player 
} from './Player';

import { BlockToCoordinates } from './Coordinates';
import { 
    IField,
    Field 
} from './Field';

export interface IGame {
    /**
     * Игроки
     */
    players: IPlayer[];

    /**
     * Тот, кто будет ходить первым
     */
    whoseFirstStep: IPlayer;

    /**
     * Заблокированные блоки
     */
    disableBlocks: IBlock[];

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

export default class Game<B = StringToIntBlock, P = Player> implements IGame {
    public players: P[];
    public whoseFirstStep: P;
    public disableBlocks: B[];

    // private startFlag: boolean;
    // private stopFlag: boolean;
    // private steps: IBlock[];
    // private whoseTurn: P;
    // private fieldMatrix: IField;
    // private secondStepFlag: boolean;

    constructor(players: P[], whoseFirstStep: P, disableBlocks: B[]) {
        this.players = players;
        this.whoseFirstStep = whoseFirstStep;
        this.disableBlocks = disableBlocks;

        // this.startFlag = false;
        // this.stopFlag = false;
        // this.secondStepFlag = false;
        // this.steps = [];
        // this.whoseTurn = this.whoseFirstStep;
        // this.fieldMatrix = new Field();
    }

    doStartStep(block: StringToIntBlock): boolean {
        // if (!this.startFlag) {
		// 	const coordinates = new BlockToCoordinates(block);
		// 	const isDiagonal = this.isDiagonal(coordinates);
		// 	const isEnemyStep = this.isEnemyStep(coordinates);
		// 	const isDisable = this.isDisable(block);

		// 	if (!isDiagonal && !isEnemyStep && !isDisable) {
        //         const isSet = this.fieldMatrix.setStep(coordinates, this.whoseTurn);
        //         this.steps.push(block);
        //         // this.whoseTurn.step = block;

		// 		// this._multSteps.push(intBlock);

		// 		this.startFlag = true;

		// 		return isSet;
		// 	} else if (isDisable || isEnemyStep) {
		// 		this.stopFlag = true;
		// 	}
		// }

		return false;
    }

    doOverStep(block: IBlock): boolean { return false; }
    doFinishStep(block: IBlock): boolean { return false; }

    // doOverStep(block: StringToIntBlock): boolean {
    //     if (this.startFlag) {
	// 		const coordinates = new BlockToCoordinates(block);
	// 		const isDiagonal = this.isDiagonal(coordinates);
	// 		// const isStep = this.isStep({coordinates});
	// 		// const isDisable = this.isDisable({block: intBlock});
	// 		const isEnemyStep = this.isEnemyStep(coordinates);
	// 		const isConsistStraight = this.isConsistStraight(coordinates);

	// 		if (!this.secondStepFlag && !isDiagonal && !this.stopFlag) {
	// 			this.steps.push(block);
	// 			// this._multSteps.push(intBlock);
    //             const ans = this.checkIntegrity();
                
	// 			if (ans) {
	// 				this.fieldMatrix.setStep(coordinates, this.whoseTurn);
    //             }
                
	// 			this.secondStepFlag = true;

	// 			return ans;
	// 		} else if (!this.secondStepFlag || isEnemyStep) {
	// 			this.stopFlag = true;
	// 		}

	// 		if (isConsistStraight  && !this.stopFlag && !isDiagonal) {
	// 			this.steps.push(block);
	// 			// this._multSteps.push(intBlock);
    //             const ans = this.checkIntegrity();
                
	// 			if (ans) {
	// 				this.fieldMatrix.setStep(coordinates, this.whoseTurn);
	// 			}

	// 			return ans;
	// 		} else if (isEnemyStep) {
	// 			this.stopFlag = true;
	// 		} else if (!isConsistStraight) {
	// 			this.stopFlag = true;
	// 		}

	// 		return false;
	// 	}
    // }

    // /**
    //  * Проверяет принадлежит ли точка диагонали
    //  * @returns {bool} Возвращает true, если принадледит
    //  */
    // isDiagonal(coordinates: BlockToCoordinates): boolean {
    //     let startPoint = new BlockToCoordinates(this.steps[0]);

	// 	return !!((startPoint.y - coordinates.y) && (startPoint.x - coordinates.x));
    // }

    /**
     * Проверяет принадлежит ли точка ходу противника
     * @returns {bool} Возвращает true, если принадлежит
     */
    // isEnemyStep(coordinates: BlockToCoordinates): boolean {
	// 	if (this.whoseTurn === this.players[0]) {
    //         return this.fieldMatrix.getCell(coordinates) === this.players[1].symbol;
	// 	} else {
	// 		return this.fieldMatrix.getCell(coordinates) === this.players[0].symbol;
	// 	}
    // }
    
    /**
     * Проверяет заблокирован ли блок
     * @returns {bool} Возвращает true, если заблокирован
     */
	// isDisable(block: StringToIntBlock) {
	// 	return this.disableBlocks.some(blc => blc.value === block.value);
    // }
    
    // /**
    //  * Проверяет принадлежит ли точка прямой(необходими две начальные точки)
    //  * @returns {bool} Возвращает true, если принадлежит
    //  */
	// isConsistStraight(coordinates: BlockToCoordinates) {
	// 	const startPoint = new BlockToCoordinates(this.steps[0]);
	// 	const endPoint = new BlockToCoordinates(this.steps[1]);

	// 	const firstPart = coordinates.y * endPoint.x 
    //         - endPoint.x * startPoint.y
    //         - startPoint.x * coordinates.y
    //         + startPoint.x * startPoint.y;

	// 	const secondPart = coordinates.x * endPoint.y
    //                 - coordinates.x * startPoint.y
    //                 - startPoint.x * endPoint.y
    //                 + startPoint.x * startPoint.y;


	// 	return firstPart === secondPart;
    // }
    
    // /**
    //  * Проверяет целостность шага
    //  * @returns {bool} Возвращает true, если шаг может быть проставлен
    //  */
    // checkIntegrity(): boolean {
    //     if (this.steps.length === 1) {
	// 		return this.ans;
	// 	}
        
	// 	const begin: number = this.steps[0].value;
	// 	const end: number = this.steps[this.steps.length - 1].value;
	// 	const diff: number = Math.abs(end - begin);
	// 	const newSteps: StringToIntBlock[] = [];

	// 	if (diff < 5) {
	// 		this.steps.forEach((el, i) => {
	// 			if (this.ans) {
	// 				newSteps.push(el);
	// 			}

	// 			if (Math.abs(el.value - this.steps[i + 1].value) != 1) {
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
                
	// 			if (Math.abs(el.value - this.steps[i + 1].value) != 5) {
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