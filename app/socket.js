'use strict';

import ReconnectingWebSocket from 'reconnecting-websocket';
import * as utils from './utils';

export default class Socket {

	constructor(host, port, cbObj) {
		this._socket = new ReconnectingWebSocket(`${host}:${port}`);

		this._socket.addEventListener('open', () => {
			const { onConnect } = cbObj;
			onConnect && onConnect();
		});

		this._socket.addEventListener('close', () => {
			utils.toast('socket关闭');
		});

		this._socket.addEventListener('message', (event) => {
			utils.toast(event.data);
			const data = JSON.parse(event.data);
			if (data.type === 'login') {
				const { onLogin } = cbObj;
				onLogin && onLogin(data);
			} else if (data.type === 'close') {
				// 有人离开了
				const { onLogin } = cbObj;
				onLogin && onLogin(data);
			} else if (data.type === 'play') {
				const { onPlay } = cbObj;
				onPlay && onPlay(data);
			} else if(data.type === 'over') {
				const { onOver } = cbObj;
				onOver && onOver(data);
			} else if(data.type === 'start') {
				const { onStart } = cbObj;
				onStart && onStart(data);
			}
		});
	}

	send(data) {
		this._socket.send(JSON.stringify(data));
	}

	close() {
		this._socket.close(1000, 'close', {keepClosed: true});
	}

	open() {
		this._socket.open();
	}
}