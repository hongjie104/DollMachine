'use strict';

import * as utils from './utils';
import { PHP_HOST, PHP_PORT, VERSION } from './config';

const phpUrl = `${PHP_HOST}:${PHP_PORT}`;

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