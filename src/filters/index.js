// 获取url的host
export function host(url) {
	const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
	const parts = host.split('.').slice(-3);
	if (parts[0] === 'www') parts.shift();
	return parts.join('.');
}

/*
* 返回一个2018-09-06 00:25:03 格式的时间
* */
export function currentTime() {
	let tmpDate = new Date();
	let year = tmpDate.getFullYear();
	let month = tmpDate.getMonth() + 1;
	let day = tmpDate.getDate();
	let hour = tmpDate.getHours();
	let min = tmpDate.getMinutes();
	let sec = tmpDate.getSeconds();
	return (
		year +
		'-' +
		formatTimeNumber(month) +
		'-' +
		formatTimeNumber(day) +
		' ' +
		formatTimeNumber(hour) +
		':' +
		formatTimeNumber(min) +
		':' +
		formatTimeNumber(sec)
	);
}

/*
* 返回一个2018-09-06 00:25:03 格式的时间,因为后天返回的是2018-09-26T15:08:13.0，要去掉中间那个T
* */
export function formatCurrentTime(time) {
	let currentTime = time.replace('T', ' ');
	return currentTime;
}

/*
  返回yyyy-mm-dd
 */
export function formatDate(time) {
	if (time) {
		if (time.length === 10) time = time * 1000;
		let tmpDate = new Date(parseInt(time));
		let year = tmpDate.getFullYear();
		let month = tmpDate.getMonth() + 1;
		let day = tmpDate.getDate();
		if (parseInt(month) < 10) {
			month = '0' + month;
		}
		// let hours = tmpDate.getHours();
		// let minutes = tmpDate.getMinutes();
		return year + '-' + month + '-' + day;
	}
	return '';
}

/**
 * 返回yyyy
 */
export function currentYear(time) {
	if (time) {
		if (time.length === 10) time = time * 1000;
		let tmpDate = new Date(parseInt(time));
		let year = tmpDate.getFullYear();
		// let hours = tmpDate.getHours();
		// let minutes = tmpDate.getMinutes();
		return year;
	}
	return '';
}

/**
 * 返回yyyy-MM
 *
 */
export function currentYearMonth(time) {
	if (time) {
		if (time.length === 10) time = time * 1000;
		let tmpDate = new Date(parseInt(time));
		let year = tmpDate.getFullYear();
		let month = tmpDate.getMonth() + 1;
		if (parseInt(month) < 10) {
			month = '0' + month;
		}
		// let hours = tmpDate.getHours();
		// let minutes = tmpDate.getMinutes();
		return year + '-' + month;
	}
	return '';
}

/*
返回yyyy-mm-dd hh:mm:ss
*/
function formatTimeNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}

export function formatDateTime(
	time,
	format,
	{emptyText} = {emptyText: '- -'}
) {
	if (time) {
		if (time.length === 10) time = time * 1000;
		let tmpDate = new Date(parseInt(time));
		let year = tmpDate.getFullYear();
		let month = tmpDate.getMonth() + 1;
		let day = tmpDate.getDate();
		let hour = tmpDate.getHours();
		let min = tmpDate.getMinutes();
		let sec = tmpDate.getSeconds();
		// let hours = tmpDate.getHours();
		// let minutes = tmpDate.getMinutes();
		return (
			year +
			'-' +
			formatTimeNumber(month) +
			'-' +
			formatTimeNumber(day) +
			'  ' +
			formatTimeNumber(hour) +
			':' +
			formatTimeNumber(min) +
			':' +
			formatTimeNumber(sec)
		);
	}
	return emptyText;
}

/*
返回hh:mm:ss
*/
export function formatTime(time) {
	if (time) {
		if (time.length === 10) time = time * 1000;
		let tmpDate = new Date(parseInt(time));
		let hour = tmpDate.getHours();
		let min = tmpDate.getMinutes();
		let sec = tmpDate.getSeconds();
		// let hours = tmpDate.getHours();
		// let minutes = tmpDate.getMinutes();
		return (
			formatTimeNumber(hour) +
			':' +
			formatTimeNumber(min) +
			':' +
			formatTimeNumber(sec)
		);
	}
	return '';
}

/**
 * 根据后台返回的value匹配上正确的文本label
 */
export function getLabel(value, options) {
	let filterData = '';
	if (options) {
		for (let i = 0; i < options.length; i++) {
			if (value === options[i].value) {
				filterData = options[i].label;
			}
		}
	}
	return filterData;
}

/**
 * 根据后台返回的tagType匹配上正确的文本tagName
 * 这个方法针对人员标签的
 */
export function getTagName(value, options) {
	let filterData = '';
	if (options) {
		for (let i = 0; i < options.length; i++) {
			if (value === options[i].id) {
				filterData = options[i].tagName;
			}
		}
	}
	return filterData;
}

/**
 * 根据后台返回的sign匹配上正确的文本tagName
 * 这个方法针对资源管理的
 */
export function resourceType(value) {
	if (!value) {
		return '';
	}
	if (value == '10') {
		return 'MENU';
	}
	if (value == '20') {
		return 'ACTION';
	}
}

/**
 * 根据后台返回的standardAddressBaseId匹配上正确的文本communityName
 */
export function getCommunityName(standardAddressBaseId, options) {
	let filterData = '';
	if (options) {
		for (let i = 0; i < options.length; i++) {
			if (standardAddressBaseId === options[i].standardAddressBaseId) {
				filterData = options[i].communityName;
			}
		}
	}
	return filterData;
}

/**
 * 逗号分隔每3位数字
 */
export function formatNumWithColon(value) {
	if (!value) return '0';
	var intPart = Number(value).toFixed(0); // 获取整数部分
	var intPartFormat = intPart
		.toString()
		.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
	return intPartFormat;
}

/**
 * 逗号分隔每3位数字
 */

/**
 * 返回yyyy
 */
export function currentyear() {
	let tmpDate = new Date();
	let year = tmpDate.getFullYear() + '';
	return year;
}

/**
 * 返回yyyy
 *
 */
export function currentyearmonth() {
	let tmpDate = new Date();
	let year = tmpDate.getFullYear() + '';
	let month = tmpDate.getMonth() + 1;
	return year + '-' + formatTimeNumber(month);
}


/**
 * 返回mm
 */
export function currentmonth() {
	let tmpDate = new Date();
	let month = tmpDate.getMonth() + 1;
	return formatTimeNumber(month);
}

/**
 * 按照数组的某个可以对数组进行排序
 * 例如：arr.sort(compare("age"))
 */
export function compareArray(prop) {
	return function (obj1, obj2) {
		let val1 = obj1[prop];
		let val2 = obj2[prop];
		if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
			val1 = Number(val1);
			val2 = Number(val2);
		}
		if (val1 > val2) { // 升序排序
			return -1;
		} else if (val1 < val2) {
			return 1;
		} else {
			return 0;
		}
	};
}
