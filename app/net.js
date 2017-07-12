'use strict';

const ReactNative = require('react-native');
const {
	NetInfo,
} = ReactNative;

import * as utils from './utils';
import * as me from './me';

import axios from 'axios';

const _axios = axios.create({
	// baseURL: Config.API_BASE,
	headers: {
		'Accept': 'application/x-www-form-urlencoded',
		'Content-Type': 'application/json',
		'Authorization': 'Basic QWxhZGRpbjpPcGVuU2VzYW1l'
	},
});

const TIME_OUT = 12000;

let isConnected = true;

NetInfo.isConnected.addEventListener(
	'change',
	handleConnectivityChange
);

NetInfo.isConnected.fetch().done(
	(isConnected) => { isConnected = isConnected; }
);

function handleConnectivityChange(_isConnected) {
	isConnected = _isConnected;
}

/**
 * 发送post请求
 * @param	{[string]}	 url						 api
 * @param	{[json]}		 data						数据
 * @param	{[function]} successCallback 成功的回调
 * @param	{[function]} errorCallback	 失败的回调
 */
export function post ({ url, data }, successCallback, errorCallback = null) {
	if (!isConnected) {
		// utils.toast('网络链接已断开');
		errorCallback && errorCallback('net is not Connected');
		return;
	}
	timeout(fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Token ${me.info.token}`
			// 'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		},
		body: JSON.stringify(data)
	}), TIME_OUT)
		.then((response) => response.text())
		.then((responseText) => {
			successCallback(JSON.parse(responseText));
		})
		.catch(e => errorCallback && errorCallback(e));
}

/**
 * 发送get请求
 * @param	{[string]}	 url						 api
 * @param	{[function]} successCallback 成功时的回调
 * @param	{[function]} errorCallback	 错误时的回调
 */
export function get (url, successCallback, errorCallback = null) {
	if (!isConnected) {
		// utils.toast('网络链接已断开');
		errorCallback && errorCallback('net is not Connected');
		return;
	}
	// utils.toast(`给机器的消息 => ${url}`);	
	// timeout(fetch(url, {
	// 	headers: {
	// 		'Accept': 'application/x-www-form-urlencoded',
	// 		'Content-Type': 'application/json',
	// 		'Authorization': 'Basic QWxhZGRpbjpPcGVuU2VzYW1l'
	// 	},
	// }), TIME_OUT)
	// 	.then((response) => response.text())
	// 	.then((responseText) => {
	// 		// successCallback(JSON.parse(responseText));
	// 		// on success
	// 		let json = JSON.parse(responseText);
	// 		successCallback(json);
	// 	})
	// 	.catch(e => errorCallback && errorCallback(e));

	_axios.get(url).then(response => {
		successCallback(response.data);
		console.warn(JSON.stringify(response.data));
	});

	// fetch(url, {
	// 	headers: {
	// 		'Accept': 'application/x-www-form-urlencoded',
	// 		'Content-Type': 'application/json',
	// 		'Authorization': 'Basic QWxhZGRpbjpPcGVuU2VzYW1l'
	// 	},
	// }).then((response) => response.text())
	// 	.then((responseText) => {
	// 		// successCallback(JSON.parse(responseText));
	// 		// on success
	// 		let json = JSON.parse(responseText);
	// 		successCallback(json);
	// 		console.warn(responseText);
	// 	})
	// 	.catch(e => {
	// 		console.warn(`error => ${e}`);
	// 		errorCallback && errorCallback(e);
	// 	});
}

function timeout(promise, ms) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject('网络似乎不通畅，请稍后再试'), ms);
		promise
			.then(response => {
				clearTimeout(timer);
				resolve(response);
			})
			.catch(reject);
	});
}

export function postToMachine({ url, data }, successCallback, errorCallback = null) {
	if (!isConnected) {
		// utils.toast('网络链接已断开');
		errorCallback && errorCallback('net is not Connected');
		return;
	}
	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/x-www-form-urlencoded',
			'Content-Type': 'text/plain', //'application/json',
			'Authorization': 'Basic QWxhZGRpbjpPcGVuU2VzYW1l'
		},
		body: JSON.stringify(data)
	})
		.then((response) => response.text())
		.then((responseText) => {
			successCallback(JSON.parse(responseText));
		})
		.catch(e => errorCallback && errorCallback(e));
}