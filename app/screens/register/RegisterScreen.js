'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import * as utils from '../../utils';
import * as net from '../../net';
import * as api from '../../api';
import * as me from '../../me';

export default class RegisterScreen extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			mobile: 'test001',
			password: '123456'
		}

		this._onRegister = this.onregister.bind(this);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{}} onPress={() => {global.nav.pop();}}>
					back
				</Text>
				<Text style={{}} onPress={this._onRegister}>
					测试注册
				</Text>
			</View>
		);
	}

	onregister() {
		const { mobile, password } = this.state;
		net.post(api.register(mobile, password, password), (result) => {
			if (result.code == 200){
				utils.toast(result.data);
				me.info = result.data;
				me.save(result.data);
			} else {
				utils.toast(result.message);
			}
		}, (err) => {
			utils.toast(err);
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
