'use strict';

import io from 'socket.io-client';
import ReconnectingWebSocket from 'reconnecting-websocket';
import * as utils from './utils';

export default class Socket {

	constructor(host, port, connectCallBack) {
		this._socket = new ReconnectingWebSocket(`${host}:${port}`);

		this._socket.addEventListener('open', () => {
			connectCallBack();
		});

		this._socket.addEventListener('close', () => {
			utils.toast('socket关闭');
		});

		this._socket.addEventListener('message', (event) => {
			// {"type":"login","status":"1","online":"1"}
			utils.toast(event.data);
			const data = JSON.parse(event.data);
			if (data.type === 'login') {

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