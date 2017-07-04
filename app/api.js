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