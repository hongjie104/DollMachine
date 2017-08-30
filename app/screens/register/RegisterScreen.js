'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import * as net from '../../net';
import * as api from '../../api';
import * as me from '../../me';

export default class RegisterScreen extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			mobile: '',
			password: '',
			// 验证码
			code: '',
			leftSecond: 0
		}

		this._onMobileChanged = this.onMobileChanged.bind(this);
		this._onPasswordChanged = this.onPasswordChanged.bind(this);
		this._onCodeChanged = this.onCodeChanged.bind(this);
		this._onRegister = this.onRegister.bind(this);
	}

	componentWillUnmount() {
		if (this._interval) {
			clearInterval(this._interval);
			this._interval = null;
		}
	}

	render() {
		const { mobile, password, code, leftSecond } = this.state;
		return (
			<View style={styles.container}>
				<Image style={styles.bgImg} source={require('../../imgs/login_bg.jpg')} />
				{
					// 顶部
				}
				<Image style={styles.topImage} source={require('../../imgs/gouwulan1.png')}>
					<View style={styles.backBtnContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								global.nav.pop();
							}}
							style={styles.backBtn}
						>
							<Image style={styles.backImg} source={require('../../imgs/ui301_3.png')} />
						</TouchableOpacity>
					</View>
					{
						// title
					}
					<Text style={styles.title}>
						新用户注册
					</Text>
				</Image>
				<View style={[styles.container, {alignItems: 'center'}]}>
					{
						// 账号输入框
					}
					<Image style={styles.itemImg} source={require('../../imgs/gouwulan5.png')}>
						<Text style={styles.key}>
							输入手机号:
						</Text>
						<TextInput 
							secureTextEntry={false}
							maxLength={16}
							autoCapitalize={"none"}
							style={styles.textInput}
							// 关闭拼写自动修正
							autoCorrect={false}
							keyboardType={"default"}
							multiline={false}
							value={mobile}
							onChangeText={this._onMobileChanged}
							placeholder={"请输入手机号"}
							placeholderTextColor={'#b7adae'}
							underlineColorAndroid={'transparent'}
							returnKeyType="next"
						/>
						{
							// 获取短信的按钮
						}
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								if (leftSecond < 1) {
									this.setState({
										leftSecond: 30
									});
									// 获取短信
									this._interval = setInterval(() => {
										let nowLeftSecond = this.state.leftSecond;
										if (nowLeftSecond < 2) {
											clearInterval(this._interval);
											this._interval = null;
										}
										nowLeftSecond -= 1;
										this.setState({
											leftSecond: nowLeftSecond
										});
									}, 1000);
								}
							}}
							style={{marginBottom: utils.toDips(8)}}
						>
							<Image style={{width: utils.toDips(180), height: utils.toDips(52), alignItems: 'center', justifyContent: 'center'}} source={require('../../imgs/gouwulan7_3.png')}>
								<Text style={{color: 'white'}}>
									{
										leftSecond > 0 ? `${leftSecond}s` : '获取验证码'
									}
								</Text>
							</Image>
						</TouchableOpacity>
					</Image>
					{
						// 密码输入框
					}
					<Image style={styles.itemImg} source={require('../../imgs/gouwulan5.png')}>
						<Text style={styles.key}>
							输入密码:
						</Text>
						<TextInput 
							secureTextEntry={true}
							maxLength={16}
							autoCapitalize={"none"}
							style={styles.textInput}
							// 关闭拼写自动修正
							autoCorrect={false}
							keyboardType={"default"}
							multiline={false}
							value={password}
							onChangeText={this._onPasswordChanged}
							placeholder={"请输入密码"}
							placeholderTextColor={'#b7adae'}
							underlineColorAndroid={'transparent'}
							returnKeyType="next"
						/>
					</Image>
					{
						// 验证码输入框
					}
					<Image style={styles.itemImg} source={require('../../imgs/gouwulan5.png')}>
						<Text style={styles.key}>
							验 证 码:
						</Text>
						<TextInput 
							secureTextEntry={true}
							maxLength={16}
							autoCapitalize={"none"}
							style={styles.textInput}
							// 关闭拼写自动修正
							autoCorrect={false}
							keyboardType={"default"}
							multiline={false}
							value={code}
							onChangeText={this._onCodeChanged}
							placeholder={"请输入短信验证码"}
							placeholderTextColor={'#b7adae'}
							underlineColorAndroid={'transparent'}
							returnKeyType="done"
						/>
					</Image>
				</View>
				{
					// 底部
				}
				<Image style={[styles.topImage, {transform: [{scaleY: -1}], alignItems: 'flex-end', justifyContent: 'center'}]} source={require('../../imgs/gouwulan1.png')}>
					{
						// 确定按钮
					}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this._onRegister}
						style={{
							marginRight: utils.toDips(16),
							transform: [{scaleY: -1}]
						}}
					>
						<Image style={styles.okBtnImg} source={require('../../imgs/gouwulan4_3.png')} />
					</TouchableOpacity>
				</Image>
			</View>
		);
	}

	onMobileChanged(mobile) {
		this.setState({
			mobile
		});
	}

	onPasswordChanged(password) {
		this.setState({
			password
		});
	}

	onCodeChanged(code) {
		this.setState({
			code
		});
	}

	onRegister() {
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
	},
	bgImg: {
		width: utils.toDips(750),
		height: utils.toDips(1334),
		position: 'absolute',
		left: 0,
		top: 0
	},
	topImage: {
		width: utils.toDips(750),
		height: utils.toDips(116),
		justifyContent: 'center',
		alignItems: 'center'
	},
	backBtnContainer: {
		position: 'absolute',
		width: utils.toDips(750),
		height: utils.toDips(116),
		justifyContent: 'center'
	},
	backBtn: {
		marginLeft: utils.toDips(14)
	},
	backImg: {
		width: utils.toDips(84),
		height: utils.toDips(76)
	},
	title: {
		color: '#060f14',
		fontSize: utils.getFontSize(28)
	},
	itemImg: {
		width: utils.toDips(714),
		height: utils.toDips(72),
		padding: utils.toDips(26),
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: utils.toDips(8)
	},
	key: {
		color: '#64595d',
		fontSize: utils.getFontSize(21),
		width: utils.toDips(180),
	},
	textInput: {
		color: '#64595d',
		fontSize: utils.getFontSize(21),
		padding: 0,
		flex: 1,
		height: utils.toDips(72)
	},
	okBtnImg: {
		width: utils.toDips(220),
		height: utils.toDips(74)
	}
});
