import 'normalize.css';
import './scss/style.scss';

import AjaxModule from './modules/ajax.js';
import MainPage from './pages/main_page.js'
import SignInPage from './pages/signin_page.js'
import SignUpPage from './pages/signup_page.js'
// import {LeaderBoard} from './pages/scoreboard_page.js'
import ProfilePage from './pages/profile_page.js'
import EditProfilePage from './pages/edit_profile_page.js'
import Router from './modules/router.js'

document.addEventListener("DOMContentLoaded", function(event) {
	const router = new Router({
		root: document.getElementById('application'),
	});
	router.add('/', new MainPage());
	router.add('/signin', new SignInPage({
		router: router,
	}));
	router.add('/me', new ProfilePage({
		router: router,
	}));
	router.add('/signup', new SignUpPage({
		router: router,
	}));

	router.start();
});
