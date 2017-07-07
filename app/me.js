
// "uid": "126",
// "token": "0b81e62e7bbb5a83d8dabc4d2fa492dc",
// "headimg": null,
// "username": "18717954536",
// "nickname": null,
// "gender": null,
// "birthday": null,
// "credit": 0

'use strict';

import * as storage from './storage';

export let info = {
	uid: '',
	token: '',
	headimg: '',
	username: '',
	gender: '',
	birthday: '',
	nickname: '',
	credit: ''
};

export function save(data) {
	storage.saveDataToLocal('myInfo', data, () => {});
}

export function load(cb, errCB) {
	storage.loadDataFromLocal('myInfo', cb, errCB);
}