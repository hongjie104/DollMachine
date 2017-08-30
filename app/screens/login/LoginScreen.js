'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TextInput,
	Text,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import * as me from '../../me';
import * as api from '../../api';
import * as net from '../../net';
import MainScreen from '../main/MainScreen';
import RegisterScreen from '../register/RegisterScreen';

export default class LoginScreen extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			account: '',
			password: ''
		};

		this._onAccountChanged = this.onAccountChanged.bind(this);
		this._onPasswordChanged = this.onPasswordChanged.bind(this);
		this._login = this.login.bind(this);
	}	

	render() {
		const { account, password }  = this.state;
		return (
			<View style={styles.container}>
				<Image style={styles.bgImg} source={require('../../imgs/login_bg.jpg')}>
					<Image style={styles.logoImg} source={require('../../imgs/logo.png')} />
					<Image style={styles.inputImg} source={require('../../imgs/denglu005.png')}>
						<TextInput 
							maxLength={11}
							autoCapitalize={"none"}
							style={styles.textInput}
							// 关闭拼写自动修正
							autoCorrect={false}
							keyboardType={"default"}
							multiline={false}
							value={account}
							onChangeText={this._onAccountChanged}
							placeholder={"请输入账号"}
							placeholderTextColor={'#954e54'}
							underlineColorAndroid={'transparent'}
							returnKeyType="next"
						/>
						<TextInput 
							secureTextEntry={true}
							maxLength={16}
							autoCapitalize={"none"}
							style={[styles.textInput, {marginTop: utils.toDips(104 - 15 - 51 + 5)}]}
							// 关闭拼写自动修正
							autoCorrect={false}
							keyboardType={"default"}
							multiline={false}
							value={password}
							onChangeText={this._onPasswordChanged}
							placeholder={"请输入密码"}
							placeholderTextColor={'#954e54'}
							underlineColorAndroid={'transparent'}
							returnKeyType="done"
						/>
					</Image>
					{
						// 忘记密码
					}
					<Text style={{color: '#944d4b', fontSize: utils.getFontSize(19), marginTop: utils.toDips(24), includeFontPadding: false}} onPress={() => {}}>
						忘记密码啦？
					</Text>
					{
						// 登录按钮
					}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this._login}
						style={styles.loginBtn}
					>
						<Image style={styles.btnImg} source={require('../../imgs/denglu006.png')} />
					</TouchableOpacity>
					{
						// 注册按钮
					}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {
							global.nav.push({
								Component: RegisterScreen
							});
						}}
						style={styles.registerBtn}
					>
						<Image style={styles.btnImg} source={require('../../imgs/denglu007.png')} />
					</TouchableOpacity>
					{
						// 第三方登录分割线
					}
					<Image style={{width: utils.toDips(539), height: utils.toDips(23), marginTop: utils.toDips(90)}} source={require('../../imgs/denglu004.png')} />
					<View style={{flexDirection: 'row', marginTop: utils.toDips(38)}}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {}}
						>
							<Image style={styles.qqImg} source={require('../../imgs/denglu003.png')} />
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {}}
							style={{marginLeft: utils.toDips(98)}}							
						>
							<Image style={styles.qqImg} source={require('../../imgs/denglu002.png')} />
						</TouchableOpacity>
					</View>
				</Image>
			</View>
		);
	}

	onAccountChanged(account) {
		this.setState({
			account
		});
	}

	onPasswordChanged(password) {
		this.setState({
			password
		});
	}

	login() {
		const { account, password } = this.state;
		net.post(api.login(account, password), (result) => {
			if (result.code === 200) {
				me.info = result.data;
				me.save(result.data);
				global.nav.replace({
					Component: MainScreen
				});
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
	},
	bgImg: {
		width: utils.screenWidth(),
		height: utils.screenHeight(),
		alignItems: 'center'
	},
	logoImg: {
		marginTop: utils.toDips(220),
		width: utils.toDips(335),
		height: utils.toDips(274)
	},
	inputImg: {
		marginTop: utils.toDips(27),
		width: utils.toDips(452),
		height: utils.toDips(173),
		paddingLeft: utils.toDips(150)
	},
	textInput: {
		width: utils.toDips(250),
		height: utils.toDips(51),
		fontSize: utils.getFontSize(17),
		color: "#914248",
		marginTop: utils.toDips(15)
	},
	loginBtn: {
		marginTop: utils.toDips(48)
	},
	btnImg: {
		width: utils.toDips(311),
		height: utils.toDips(71)
	},
	registerBtn: {
		marginTop: utils.toDips(28)
	},
	qqImg: {
		width: utils.toDips(95),
		height: utils.toDips(110)
	}
});
