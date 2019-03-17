import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import backArrowTemplate from '../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../blocks/html/body/application/container/content/title/title.pug';
import mainTemplate from '../blocks/html/body/application/container/content/main/main.pug';
import rowTemplate from '../blocks/html/body/application/container/content/main/row/row.pug';
import pagesTemplate from '../blocks/html/body/application/container/content/main/pages/pages.pug';

import {genericBeforeEnd} from '../modules/helpers.js';
import Page from './page';
import API from '../modules/API.js';

export default class LeaderBoard extends Page {
	constructor({
		router = {},
	} = {}) {
		super();
		this._router = router;
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		if (event.target.classList.contains('pages__first')) {
			API.getUsers({
				limit: 5,
				pages: 1,
			})
				.then(users => {
					this._el.innerHTML = '';
					this._renderLeaderBoard(users.data, 1);
				});
		} else if (event.target.classList.contains('pages__back')) {
			const pagesNum = parseInt(document.querySelector('.pages__num').textContent) - 1;
			API.getUsers({
				limit: 5,
				page: pagesNum > 0 ? pagesNum : 1,
			})
				.then(users => {
					this._el.innerHTML = '';
					this._renderLeaderBoard(users.data, pagesNum > 0 ? pagesNum : 1);
				});
		} else if (event.target.classList.contains('pages__next')) {
			const pagesNum = parseInt(document.querySelector('.pages__num').textContent) + 1;
			API.getUsers({
				limit: 5,
				page: pagesNum,
			})
				.then(users => {
					this._el.innerHTML = '';
					this._renderLeaderBoard(users.data, pagesNum);
				});
		}
	}

	_createEventListener() {
		const pages = this._el.querySelector('.pages');
		pages.addEventListener('click', this.onClick, true);
	}

	_removeEventListener() {
		const pages = this._el.querySelector('.pages');
		pages.removeEventListener('click', this.onClick, true);
	}

	_renderLeaderBoard(data, pageNum) {
		genericBeforeEnd(this._el, containerTemplate({
			modifiers: ['container_theme_scoreboard'],
		}));
		const containerBlock = document.querySelector('.container.container_theme_scoreboard');


		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_scoreboard'],
			})
		);
		const headBlock = document.querySelector('.head.head_theme_back-arrow');
		const contentBlock = document.querySelector('.content.content_theme_scoreboard');

		genericBeforeEnd(headBlock, 
			backArrowTemplate({
				modifiers: [],
				href: '/',
				dataset: '/',
			}),
		);
		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'SCOREBOARD',
				modifiers: ['title_theme_scoreboard'],
			}),
			mainTemplate({
				modifiers: ['main_theme_scoreboard'],
			}),
			pagesTemplate({
				modifiers: [],
				page_num: pageNum,
			})
		);
		const mainBlock = document.querySelector('.main.main_theme_scoreboard');

		genericBeforeEnd(mainBlock, 
			rowTemplate({
				modifiers: [],
				lst: [...data],
			}),
		);

		this._removeEventListener();
		this._createEventListener();
	}

	open(root) {
		this._el = root;
		API.getUsers({
			limit: 5,
			page: 1,
		})
			.then(users => {
				this._renderLeaderBoard(users.data, 1);
			});
	}
}