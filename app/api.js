'use strict';

import * as utils from './utils';
import { PHP_HOST, PHP_PORT, MACHIN_HOST, MACHIN_POST, VERSION } from './config';

const phpUrl = `${PHP_HOST}:${PHP_PORT}`;
const machineUrl = `${MACHIN_HOST}:${MACHIN_POST}/rest/v1b/wa`;

function createParam(params) {
	return {
		client: utils.isIOS() ? 2 : 1,
		version: VERSION,
		clienttime: new Date().getTime(),
		...params
	}
}

export function login(username, password) {
	return {
		url: `${phpUrl}/user`,
		data: createParam({username, password, action: 'login'})
	};
}

export function register(mobile, password, confirmpassword) {
	return {
		url: `${phpUrl}/user`,
		data: createParam({mobile, password, confirmpassword, action: 'reg'})
	};
}

export function getDollMachine(page) {
	return {
		url: `${phpUrl}/`,
		data: createParam({page, action: 'index'})
	};
}

export function getDollMachineInfo(id) {
	return {
		url: `${phpUrl}/machine`,
		data: createParam({id, action: "getdetail"})
	};
}

export function tryToPlay(id) {
	return {
		url: `${phpUrl}/machine`,
		data: createParam({id, action: "play"})
	};
}

/**
 * 开始动作 
 */
export function startMove(id, dir) {
	return `${machineUrl}/cmd=${dir}&sessionId=${id}`;
}

/**
 * 停止动作
 */
export function stopMove(id, dir) {
	return `${machineUrl}/cmd=pause&pvsCmd=${dir}&sessionId=${id}`;
}

/**
 * 抓娃娃
 */
export function fetchDoll(id, token) {
	return `${machineUrl}/cmd=fetch&sessionId=${id}&token=${token}`;
}

/**
 * 给机器投币
 */
export function money(id) {
	return `${machineUrl}/cmd=money&sessionId=${id}`;
}

// /**
//  * 开始动作 
//  */
// export function startMove(id, dir) {
// 	return {
// 		url: `${machineUrl}`,
// 		data: {
// 			cmd: dir,
// 			sessionId: id
// 		}
// 	};
// }

// /**
//  * 停止动作
//  */
// export function stopMove(id, dir) {
// 	return {
// 		url: `${machineUrl}`,
// 		data: {
// 			cmd: 'pause',
// 			sessionId: id,
// 			pvsCmd: dir
// 		}
// 	};
// }

// /**
//  * 抓娃娃
//  */
// export function fetchDoll(id, token) {
// 	return {
// 		url: `${machineUrl}`,
// 		data: {
// 			cmd: 'fetch',
// 			sessionId: id,
// 			token
// 		}
// 	};
// }

// /**
//  * 给机器投币
//  */
// export function money(id) {
// 	// return `${machineUrl}/cmd=money&sessionId=${id}`;
// 	return {
// 		url: `${machineUrl}`,
// 		data: {
// 			cmd: 'money',
// 			sessionId: id
// 		}
// 	};
// }