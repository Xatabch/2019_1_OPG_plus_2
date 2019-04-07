import Controller from './controller';
import { EventEmitterMixin } from '../event_emitter';

export default class ScoreBoardController extends Controller {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('getScore', ({root = {}, data = {}} = {}) => { this.render({root: root, data: data}); });
	}
}