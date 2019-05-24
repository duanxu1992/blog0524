import Util from './util';
import refreshService from '../service/login';

const AccessTokenKey = 'jwt_token';
const ExpiresInKey = 'expires_in';
const RefreshTokenKey = 'refresh_token';
let menuSignArray = [];
let buttonSignArray = [];

export function getAccessToken() {
	let token = sessionStorage.getItem(AccessTokenKey);
	if (Util.isEmpty(token)) {
		token = '';
	}
	return token;
}

export function setAccessToken(token) {
	sessionStorage.setItem(AccessTokenKey, token);
}

export function isAuth(name) {
	let pathArray = JSON.parse(sessionStorage.getItem('menu_sign_array'));
	return pathArray && pathArray.indexOf(name) > -1;
}

export function setAuthTree(tree) {
	// 在设置之前要先清空，因为换账号的时候会存留之前的菜单数据
	sessionStorage.setItem('menu_sign_array', JSON.stringify([]));
	sessionStorage.setItem('button_sign_array', JSON.stringify([]));
	sessionStorage.setItem('auth_menu_array', JSON.stringify([]));
	if (!tree || tree.length < 1) {
		return;
	}
	menuSignArray = [];
	buttonSignArray = [];
	let treeMenu = JSON.parse(JSON.stringify(tree));
	let list = transformMenu(treeMenu);
	sessionStorage.setItem('menu_sign_array', JSON.stringify(menuSignArray));
	sessionStorage.setItem('button_sign_array', JSON.stringify(buttonSignArray));
	sessionStorage.setItem('auth_menu_array', JSON.stringify(list));
}

function transformMenu(list) {
	let allBtn = true;
	list.forEach(menu => {
		menu.type === '10' ? menuSignArray.push(menu.sign) : buttonSignArray.push(menu.sign);
		if (menu.type === '10') {
			allBtn = false;
			menu.menuName = menu.name;
			menu.menuPath = menu.url.indexOf('form') > -1 ? menu.url : ('/kisp' + menu.url);
			if (menu.field) {
				for (let i = menu.field.length - 1; i >= 0; i--) {
					if (menu.field[i].name === 'iconClass') {
						menu.iconClass = menu.field[i].description;
						break;
					}
				}
			}
			menu.menus = [];
			if (menu.hasChildren) {
				// menu.menus = [];
				menu.menus = menu.children;
			}
			if (menu.hasChildren && menu.children.length > 0) {
				menu.menus = transformMenu(menu.children);
			}
		}
	});
	return allBtn ? [] : list;
}

export function removeToken() {
	return sessionStorage.removeItem(AccessTokenKey);
}

export function setExpiresIn(expiresIn) {
	sessionStorage.setItem(ExpiresInKey, expiresIn);
}

export function getExpiresIn() {
	let expiredIn = sessionStorage.getItem(ExpiresInKey);
	if (expiredIn) {
		return parseInt(expiredIn);
	} else {
		return 0;
	}
}

export function removeExpiresIn() {
	return sessionStorage.removeItem(ExpiresInKey);
}

export function getRefreshToken() {
	return sessionStorage.getItem(RefreshTokenKey);
}

export function setRefreshToken(refreshToken) {
	sessionStorage.setItem(RefreshTokenKey, refreshToken);
	RefreshTokenLoop();
}

export function removeRefreshToken() {
	return sessionStorage.removeItem(RefreshTokenKey);
}

var RefreshTokenTimer;

// export function RefreshTokenLoop () {
// 	console.log('RefreshToken Started>>>>>>', new Date());
// 	let next = parseInt(sessionStorage.getItem('REFRERSH_TOKEN_TIME')); // 25 分钟之后
// 	if (RefreshTokenTimer) {
// 		clearTimeout(RefreshTokenTimer);
// 	}
// 	RefreshTokenTimer = setTimeout(function () {
// 		// refreshToken();
// 		let refreshToken = sessionStorage.getItem(RefreshTokenKey);
// 		let params = {refreshToken: refreshToken || ''};
// 		refreshService.refreshToken(params).then(res => {
// 			if (res.jwt_token) {
// 				sessionStorage.setItem(AccessTokenKey, res.jwt_token);
// 				sessionStorage.setItem(RefreshTokenKey, res.refresh_token);
// 			}
// 		});
// 		RefreshTokenLoop();
// 	}, next);
// }
