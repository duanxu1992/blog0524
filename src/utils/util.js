let util = {};
util.title = function (title) {
	title = title || 'first App';
	window.document.title = title;
};

util.inOf = function (arr, targetArr) {
	let res = true;
	arr.forEach(item => {
		if (targetArr.indexOf(item) < 0) {
			res = false;
		}
	});
	return res;
};

util.oneOf = function (ele, targetArr) {
	if (targetArr.indexOf(ele) >= 0) {
		return true;
	} else {
		return false;
	}
};

util.showThisRoute = function (itAccess, currentAccess) {
	if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
		return util.oneOf(currentAccess, itAccess);
	} else {
		return itAccess === currentAccess;
	}
};

util.getRouterObjByName = function (routers, name) {
	if (!name || !routers || !routers.length) {
		return null;
	}
	// debugger;
	let routerObj = null;
	for (let item of routers) {
		if (item.name === name) {
			return item;
		}
		routerObj = util.getRouterObjByName(item.children, name);
		if (routerObj) {
			return routerObj;
		}
	}
	return null;
};

util.handleTitle = function (vm, item) {
	if (typeof item.title === 'object') {
		return vm.$t(item.title.i18n);
	} else {
		return item.title;
	}
};

util.openNewPage = function (vm, name, argu, query) {
	let pageOpenedList = vm.$store.state.app.pageOpenedList;
	let openedPageLen = pageOpenedList.length;
	let i = 0;
	let tagHasOpened = false;
	while (i < openedPageLen) {
		if (name === pageOpenedList[i].name) { // 页面已经打开
			vm.$store.commit('pageOpenedList', {
				index: i,
				argu: argu,
				query: query
			});
			tagHasOpened = true;
			break;
		}
		i++;
	}
	if (!tagHasOpened) {
		let tag = vm.$store.state.app.tagsList.filter((item) => {
			if (item.children) {
				return name === item.children[0].name;
			} else {
				return name === item.name;
			}
		});
		tag = tag[0];
		if (tag) {
			tag = tag.children ? tag.children[0] : tag;
			if (argu) {
				tag.argu = argu;
			}
			if (query) {
				tag.query = query;
			}
			vm.$store.commit('increateTag', tag);
		}
	}
	vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
	let len = routers.length;
	let i = 0;
	let notHandle = true;
	while (i < len) {
		if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
			route.replace({
				name: routers[i].children[0].name
			});
			notHandle = false;
			next();
			break;
		}
		i++;
	}
	// console.log('notHandle=' + notHandle);
	if (notHandle) {
		next();
	}
};

util.fullscreenEvent = function (vm) {
	vm.$store.commit('initCachepage');
	// 权限菜单过滤相关
	vm.$store.commit('updateMenulist');
	// 全屏相关
};

util.isEmpty = function (value) {
	if (value === undefined || value === null || value === 'null' || value === '' || value.length <= 0) {
		return true;
	} else {
		return false;
	}
};
let path = {};
util.setCurrentPath = function (appname) {
	let currentPath = window.location.href;
	path[appname] = currentPath;
	// console.log('path>>>' + JSON.stringify(path));
};
util.getCurrentPath = function (appname) {
	let currentPath = path[appname];
	console.log(appname + 'currentPath>>>' + currentPath);
	return currentPath;
};
util.setPageData = function (pageName, val) {
	sessionStorage.setItem(pageName, JSON.stringify(val));
};
util.getPageData = function (pageName, val) {
	return JSON.parse(sessionStorage.getItem(pageName));
};

export default util;
