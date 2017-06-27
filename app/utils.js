'use strict';

import {
	Platform,
	PixelRatio
} from 'react-native';

import { showShortCenter } from '@remobile/react-native-toast';

const { height, width } = require('Dimensions').get('window');
// ui设计图的宽度是750
const UIPixelRatio = width / 750;

/**
 * 判断当前系统是不是iOS
 * @return {Boolean} [description]
 */
export function isIOS() {
	return Platform.OS === "ios";
}

/**
 * 获取屏幕宽度
 * @return {[type]} [description]
 */
export function screenWidth() {
	return width;
}

/**
 * 获取屏幕高度
 * @return {[type]} [description]
 */
export function screenHeight() {
	return height;
}

/**
 * 转成像素单位
 * @param  {[type]} dp [description]
 * @return {[type]}    [description]
 */
export function toPixels(dp) {
	return PixelRatio.getPixelSizeForLayoutSize(dp);
}

/**
 * 转成dp
 * @param  {[type]} px [description]
 * @return {[type]}    [description]
 */
export function toDips(px) {
	// return px / PixelRatio.get();
	// return px / 2;
	return px * UIPixelRatio;
}

export function getPixelRatio() {
	return PixelRatio.get();
}

/**
 * 获取字体大小
 * @param  {[type]} px 参考图上的像素值
 * @return {[type]}    字体大小
 */
export function getFontSize(px) {
	// return toDips(px) * PixelRatio.get() / 3;
	return toDips(px) + (isIOS() ? 2 : 0);
}

export function getTextMarginTop(fontSize) {
	return isIOS() ? getFontSize(fontSize) * -1 : getFontSize(fontSize) / -3;
}

/**
 * 去掉数组中的重复项
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
export function unique(arr) {
	let result = [], hash = {};
	for (let i = 0, elem; (elem = arr[i]) != null; i++) {
		if (!hash[elem]) {
			result.push(elem);
			hash[elem] = true;
		}
	}
	return result;
}

/**
 * 检查是不是手机号
 * @param  {[type]}  phone [description]
 * @return {Boolean}       [description]
 */
export function isPhone(phone) {
	return RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/).test(phone);
}

export function isEmail(mail) {
	return RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail);
}

const timeStrings = {
	seconds: "1分钟前",
	minute: "1分钟前",
	minutes: "%d分钟前",
	hour: "1小时前",
	hours: "%d小时前",
	day: "1天前",
	days: "%d天前",
	month: "1个月前",
	months: "%d月前",
	year: "1年前",
	years: "%d年前"
};

export function timeAgo(timestamp) {
	let seconds = Math.floor((new Date().getTime() - timestamp) / 1000);
	let minutes = seconds / 60;
	let hours = minutes / 60;
	let days = hours / 24;
	let years = days / 365;

	function substitute (string, number) {
		return string.replace(/%d/i, number);
	}

	let words = seconds < 45 && substitute(timeStrings.seconds, Math.round(seconds)) ||
		seconds < 90 && substitute(timeStrings.minute, 1) ||
		minutes < 45 && substitute(timeStrings.minutes, Math.round(minutes)) ||
		minutes < 90 && substitute(timeStrings.hour, 1) ||
		hours < 24 && substitute(timeStrings.hours, Math.round(hours)) ||
		hours < 48 && substitute(timeStrings.day, 1) ||
		days < 30 && substitute(timeStrings.days, Math.floor(days)) ||
		days < 60 && substitute(timeStrings.month, 1) ||
		days < 365 && substitute(timeStrings.months, Math.floor(days / 30)) ||
		years < 2 && substitute(timeStrings.year, 1) ||
		substitute(timeStrings.years, Math.floor(years));

	return words;
}

export function formatDateTime(date, fmt: String = 'yyyy-MM-dd hh:mm:ss', judgeDoday: Boolean = true) {
	// const now = new Date();
	// let y = date.getFullYear();
	// let isToday = now.getFullYear() === y;
	// let m = date.getMonth() + 1;
	// if (isToday) {
	// 	isToday = now.getMonth() + 1 === m;
	// }
	// m = m < 10 ? ('0' + m) : m;
	// let d = date.getDate();
	// if (isToday) {
	// 	isToday = now.getDate() === d;
	// }
	// d = d < 10 ? ('0' + d) : d;
	// let h = date.getHours();
	// h = h < 10 ? ('0' + h) : h;
	// let minute = date.getMinutes();
	// minute = minute < 10 ? ('0' + minute) : minute;
	// let s = date.getSeconds();
	// s = s < 10 ? ('0' + s) : s;
	// return isToday ? `${h}:${minute}:${s}` : `${y}-${m}-${d} ${h}:${minute}:${s}`;
	
	const o = {
		// 月份
		"M+": date.getMonth() + 1,
		// 日
		"d+": date.getDate(),
		// 小时
		"h+": date.getHours(),
		// 分
		"m+": date.getMinutes(),
		// 秒
		"s+": date.getSeconds(),
		// 季度
		// "q+": Math.floor((date.getMonth() + 3) / 3),
		// 毫秒
		"S": date.getMilliseconds()
	};
	if (judgeDoday && fmt.indexOf(' ') !== -1) {
		const now = new Date();
		if (now.getDate() === o['d+'] && now.getMonth() + 1 === o['M+'] && now.getFullYear() === date.getFullYear()) {
			fmt = fmt.split(' ')[1];
		} else {
			fmt = fmt.split(' ')[0];
		}
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	}
	return fmt;
}

/**
 * 获取两点之间的距离
 */
export function getDistance(x0, y0, x1, y1) {
	let x = x0 - x1;
	let y = y0 - y1;
	return Math.pow((x * x + y * y), 0.5);
}

/**
 * 将两个数组进行merge，key相同的话，就认为是同一个元素
 */
export function mergeArray(arrA, arrB, key) {

	function hasItem(arr, key, val) {
		for (let i = 0; i < arr.length; i++) {
			if(arr[i][key] === val) return true;
		}
		return false;
	}

	for (let i = 0; i < arrB.length; i++) {
		if (!hasItem(arrA, key, arrB[i][key])) {
			arrA.push(arrB[i]);
		}
	}

	return arrA;
}

export function getItemFromArray(arr, key, val) {
	for (let i = 0; i < arr.length; i++) {
		if(arr[i][key] === val) return arr[i];
	}
	return null;
}

export function getItemsFromArray(arr, key, val) {
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		if(arr[i][key] === val) result.push(arr[i]);
	}
	return result;
}

/**
 * 转成Unicode编码
 * @param  {string} str 带转换的string
 * @return {string}     Unicode编码
 */
export function decToHex(str) {
    let res = [];
    for(let i = 0; i < str.length; i++)
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u" + res.join("\\u");
}

/**
 * Unicode编码转成string
 * @param  {string} str Unicode编码
 * @return {string}     string
 */
export function hexToDec(str) {
    str = str.replace(/\\/g,"%");
    return unescape(str);
}

// /**
//  * @param  {[type]}  text [description]
//  * @return {Boolean}      [description]
//  */
// export function isNameLegal(text) {
// 	// return RegExp(/[\u4e00-\u9fa5A-Za-z0-9-_~!@#$%^&*]/).test(text);
// 	const l = text.length;
// 	if (l > 1 && l < 10) {
// 		return true;
// 	}
// 	return false;
// }
// 

export function isPasswordLegal(password) {
	return RegExp(/^[0-9a-zA-Z-_~!@#$%^&*]+$/).test(password);
}

/**
*
*/
export function getCharNum(text) {
	let str = {
		// 非中文字数
		e: 0,
		// 中文字数
		h: 0,
		line: 1,
	}
	let textLength = text.length;
	if (textLength > 7) {
		str.line = 2;
		textLength = 7;
	}
	for (let i = 0; i < textLength; i++) {
		let c = text.charCodeAt(i);
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			str.e++;
		} else {
			str.h++;
		}
		if(c === 0x20)
			str.e = str.e - 0.5;
		if (c > 65248 || c === 12288) { 
			str.e--;
			str.h++;
		}
	}
	return str;
}

function _deepcopy(source) {
	let result = source instanceof Array ? [] : {};
	let t = null;
	for (let key in source) {
		t = typeof(source[key]);
		if (key === "reply") {
			console.log(t);
		}
		result[key] = t === "object" ? _deepcopy(source[key]): source[key];
	}
	return result; 
}

/**
 * 深度复制
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
export function deepcopy(source) {
	return _deepcopy(source);
}

export function obj2Str(obj) {
	if (typeof(obj) === 'boolean') return obj ? 'true' : 'false';
	if (typeof(obj) === "string") return obj;
	let str = '';
	for (let key in obj) {
		str += `key=>${key},val=${obj[key]}\n`;
	}
	return str;
}

export function isUndefined(val) {
	return typeof val === "undefined";
}

export function toast(msg) {
	if (msg !== '') {
		showShortCenter(obj2Str(msg));
	}
}

export function isAvatarOwnered(avatarData) {
	const { id, currency, price } = avatarData;
	// 免费的，就算是已拥有了
	if (currency === 1 && price === 0) {
		return true;
	}
	// 看看已经已经购买了
	if (Array.isArray(global.userInfo.avatarOwned)) {
		for (let i = 0; i < global.userInfo.avatarOwned.length; i++) {
			if (global.userInfo.avatarOwned[i] === id) {
				return true;
			}
		}
	}
	return false;
}