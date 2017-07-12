'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';

import Player from './NewPlayer';
import * as utils from '../../utils';
import * as net from '../../net';
import * as api from '../../api';
import * as me from '../../me';
import Socket from '../../MySocket';
// import * as storeSingleton from '../../storeSingleton';
import DirBtn from './DirBtn';
import CountDown from './CountDown';

export default class PlayScreen extends PureComponent {

	static propTypes = {
		// source: PropTypes.shape({
		// 	uri: PropTypes.string.isRequired,
		// 	controller: PropTypes.bool, //Android only
		// 	timeout: PropTypes.number, //Android only
		// 	hardCodec: PropTypes.bool, //Android only  //1 or 0  // 1 -> hw codec enable, 0 -> disable [recommended]
		// 	live: PropTypes.bool, //Android only  //1 or 0 // 1 -> live
		// }).isRequired,
		id: PropTypes.string.isRequired,
		machine_name: PropTypes.string.isRequired,
		credit: PropTypes.string.isRequired,
		thumbs: PropTypes.array.isRequired,
		machine_id: PropTypes.string.isRequired,
		liveurl_1: PropTypes.string.isRequired,
		liveurl_2: PropTypes.string.isRequired,
		socket_ip: PropTypes.string.isRequired,
		socket_port: PropTypes.string.isRequired
	};
	
	constructor(props) {
		super(props);

		this.state = {
			isPlaying: false,
			curLiveUrl: 'rtmp://9993.liveplay.myqcloud.com/live/9993_0baa94a95cbb11e791eae435c87f075e'//props.liveurl_1
		};

		this._isSocketConnected = false;
		this._isMachineBusy = false;

		this._readyToPlay = this.readyToPlay.bind(this);

		this._onStart = this.onStart.bind(this);
		this._onLoading = this.onLoading.bind(this);
		this._onPaused = this.onPaused.bind(this);
		this._onShutdown = this.onShutdown.bind(this);
		this._onError = this.onError.bind(this);
		this._onPlaying = this.onPlaying.bind(this);

		this._fetchDoll = this.fetchDoll.bind(this);
		this._onStartUp = this.onStartUp.bind(this);
		this._onEndUp = this.onEndUp.bind(this);
		this._onStartRight = this.onStartRight.bind(this);
		this._onEndRight = this.onEndRight.bind(this);
		this._onStartDown = this.onStartDown.bind(this);
		this._onEndDown = this.onEndDown.bind(this);
		this._onStartLeft = this.onStartLeft.bind(this);
		this._onEndLeft = this.onEndLeft.bind(this);

		this._switchLiveUrl = this.switchLiveUrl.bind(this);		
	}

	componentDidMount() {
		const { socket_ip, socket_port, machine_id, id } = this.props;
		// this._socket = storeSingleton.getSocket(`ws://${socket_ip}`, socket_port, () => {
		// // this._socket = storeSingleton.getSocket(`ws://${socket_ip}`, socket_port, () => {
		// 	// 链接成功
		// 	this._isSocketConnected = true;
		// });
		this._socket = new Socket(`ws://${socket_ip}`, socket_port, {
			onConnect: () => {
				// 链接成功
				this._isSocketConnected = true;
				this._socket.send({
					type: 'login',
					machine_id: id,
					uid: me.info.uid
				});
			},
			onLogin: (data) => {
				// {"type":"login","status":"1","online":"1"}
				if (data === 'login') {
					// status=1 表示机器处理空闲中，可以进行抢
					// status=0 机器处理正忙，把抢的按钮灰掉，不允许用户点击；
					// online 有多少用户正在观看
					this._isMachineBusy = data.status === 0;
				}
			},
			onPlay: (data) => {
				// {"type":"play","status":0}
				this._isMachineBusy = data.status === 0;
				// 给机器发个投币的消息
				const { machine_id } = this.props;
				net.get(api.money(machine_id), result => {
				// net.postToMachine(api.money(machine_id), result => {
					utils.toast(`投币返回 => ${JSON.stringify(result)}`);
					this.setState({
						isPlaying: true
					});
				}, err => {
					utils.toast(`投币失败 => ${err}`)
					console.warn(`投币失败 => ${err}`);
				});				
			},
			onOver: () => {
				// 我的游戏结束了
				this.setState({
					isPlaying: false
				});
			},
			onStart: () => {
				// 可以抢机器了
				this._isMachineBusy = false;
			}
		});
	}

	componentWillUnmount() {
		this._socket.close();
	}

	render() {
		const { isPlaying, curLiveUrl } = this.state;
		return (
			<View style={styles.container}>
			{
					// 顶部
				}
				<Image style={styles.topImg} source={require('../../imgs/ui101_1.png')}>
					{
						// 返回按钮
					}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {
							global.nav.pop();
						}}
						style={{position: 'absolute', left: utils.toDips(4), top: utils.toDips(9)}}
					>
						<Image style={{width: utils.toDips(84), height: utils.toDips(76)}} source={require('../../imgs/ui301_3.png')} />
					</TouchableOpacity>
					{
						// 钱
					}
					{
						// 充值按钮
					}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {}}
						style={{position: 'absolute', left: utils.toDips(515), top: utils.toDips(13)}}
					>
						<Image style={{width: utils.toDips(148), height: utils.toDips(68)}} source={require('../../imgs/ui301_1.png')} />
					</TouchableOpacity>
					{
						// 设置按钮
					}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {}}
						style={{position: 'absolute', left: utils.toDips(667), top: utils.toDips(9)}}
					>
						<Image style={{width: utils.toDips(74), height: utils.toDips(74)}} source={require('../../imgs/ui207_105.png')} />
					</TouchableOpacity>
				</Image>
				{
					<Player
						source={{
							uri: curLiveUrl,
							controller: false,
							timeout: 3000,
							hardCodec: false,
							live: true
						}}
						started={true}
						onStart={this._onStart}
						onLoading={this._onLoading}
						onPaused={this._onPaused}
						onShutdown={this._onShutdown}
						onPlayyError={this._onError}
						onPlaying={this._onPlaying}
						style={{
							width: utils.screenWidth(),
							// height: utils.screenHeight()
							// width: 200,
							height: utils.toDips(625)
						}}
					/>
				}
				<View style={{flex: 1}}>
				</View>
				{
					// 换视角的按钮
				}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this._switchLiveUrl}
					style={{position: 'absolute', left: utils.toDips(8), bottom: utils.toDips(620)}}
				>
					<Image style={{width: utils.toDips(90), height: utils.toDips(90)}} source={require('../../imgs/ui301_4.png')} />
				</TouchableOpacity>
				{
					!isPlaying && this.rednerWait()
				}
				{
					isPlaying && this.renderPlay()
				}
			</View>
		);
	}

	rednerWait() {
		const { thumbs, credit } = this.props;
		return(
			<Image style={{width: utils.screenWidth(), height: utils.toDips(620)}} source={require('../../imgs/ui101_3.png')}>
				{
					// 游玩一次消耗的钱
				}
				<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: utils.toDips(30)}}>
					<Image style={{width: utils.toDips(156), height: utils.toDips(28)}} source={require('../../imgs/ui301_6.png')} />
					<Image style={{width: utils.toDips(26), height: utils.toDips(26), marginLeft: utils.toDips(30)}} source={require('../../imgs/ui205_001.png')} />
					<Text style={{color: '#8e6d76', fontSize: utils.getFontSize(16), marginLeft: utils.toDips(4)}}>
						{ credit }
					</Text>
				</View>
				{
					// 开始玩的按钮
				}
				<View style={{alignItems: 'center', marginTop: utils.toDips(15)}}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this._readyToPlay}
						style={{}}
					>
						<Image style={{width: utils.toDips(322), height: utils.toDips(78)}} source={require('../../imgs/ui301_5.png')} />
					</TouchableOpacity>
				</View>
				{
					// 娃娃的展示图片
				}
				<Image style={{width: utils.screenWidth(), height: utils.toDips(450), marginTop: utils.toDips(20), flexDirection: 'row', justifyContent: 'center', paddingTop: utils.toDips(45)}} source={require('../../imgs/ui301_7.png')}>
					{
						// <Image style={{width: utils.toDips(334), height: utils.toDips(382)}} source={require('../../imgs/ui302_001.png')} />
						// <Image style={{width: utils.toDips(334), height: utils.toDips(382), marginLeft: utils.toDips(15)}} source={require('../../imgs/ui302_001.png')} />
					}
					<Image style={{width: utils.toDips(334), height: utils.toDips(382)}} source={{uri: thumbs[0]}} />
					<Image style={{width: utils.toDips(334), height: utils.toDips(382), marginLeft: utils.toDips(15)}} source={{uri: thumbs[1]}} />
				</Image>
			</Image>
		);
	}

	renderPlay() {
		return(
			<Image style={{width: utils.screenWidth(), height: utils.toDips(620)}} source={require('../../imgs/ui101_3.png')}>
				<Image style={{position: 'absolute', left: utils.toDips(69), top: utils.toDips(112), width: utils.toDips(114), height: utils.toDips(32)}} source={require('../../imgs/ui303_6.png')} />
				<CountDown style={{position: 'absolute', left: utils.toDips(230), top: utils.toDips(55)}} onEnd={() => {
					utils.toast('onEnd');
				}} />
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this._fetchDoll}
					style={{position: 'absolute', left: utils.toDips(59), top: utils.toDips(166), }}
				>
					<Image style={{width: utils.toDips(228), height: utils.toDips(98)}} source={require('../../imgs/ui303_7.png')} />
				</TouchableOpacity>
				<Image style={{position: 'absolute', left: utils.toDips(392), top: utils.toDips(114), width: utils.toDips(313), height: utils.toDips(313)}} source={require('../../imgs/ui303_1.png')} />
				<DirBtn startFunc={this._onStartUp} endFunc={this._onEndUp} left={utils.toDips(475)} top={utils.toDips(87)} source={require('../../imgs/ui303_2.png')} />
				<DirBtn startFunc={this._onStartRight} endFunc={this._onEndRight} left={utils.toDips(589)} top={utils.toDips(204)} source={require('../../imgs/ui303_3.png')} />
				<DirBtn startFunc={this._onStartDown} endFunc={this._onEndDown} left={utils.toDips(475)} top={utils.toDips(319)} source={require('../../imgs/ui303_4.png')} />
				<DirBtn startFunc={this._onStartLeft} endFunc={this._onEndLeft} left={utils.toDips(355)} top={utils.toDips(204)} source={require('../../imgs/ui303_5.png')} />
			</Image>
		);
	}

	readyToPlay() {
		if (this._isSocketConnected) {
			if (!this._isMachineBusy) {
				const { id, machine_id } = this.props;
				// 发消息去抢机器
				net.post(api.tryToPlay(id), (result) => {
					if (result.code === 200) {
						// socket通知php
						this._socket.send({
							type: 'play',
							machine_id: id
						});
					} else {
						utils.toast(result.message);
					}
				}, err => {
					utils.toast(`error => ${err}`);
				});
			} else {
				utils.toast('其他用户正在使用这台机器，请稍候！');
			}
		} else {
			utils.toast('网络状况不佳，请稍候!');
		}
	}

	onStart(e) {
		// console.warn('onStart', e);
	}

	onLoading(e) {
		// console.warn('onLoading', e);
	}

	onPaused(e) {
		// console.warn('onPaused', e);
	}

	onShutdown(e) {
		console.warn('onShutdown', e);
	}

	onError(e) {
		console.warn('onError', e);
	}

	onPlaying(e) {
		// console.warn('onPlaying', e);
	}

	fetchDoll() {
		const { machine_id } = this.props;
		net.get(api.fetchDoll(machine_id, me.info.token), (result) => {
		// net.postToMachine(api.fetchDoll(machine_id, me.info.token), (result) => {
			utils.toast(result);
		}, err => {
			utils.toast(err);
		});
	}

	onStartUp() {
		this.startMove('up');
	}

	onEndUp() {
		this.pauseMove();
	}

	onStartRight() {
		this.startMove('right');
	}

	onEndRight() {
		this.pauseMove();
	}

	onStartDown() {
		this.startMove('down');
	}

	onEndDown() {
		this.pauseMove();
	}

	onStartLeft() {
		this.startMove('left');
	}

	onEndLeft() {
		this.pauseMove();
	}

	startMove(dir) {
		const { machine_id } = this.props;
		this._dir = dir;
		net.get(api.startMove(machine_id, dir), (result) => {			
		// net.postToMachine(api.startMove(machine_id, dir), (result) => {			
			utils.toast(result);
		}, err => {
			utils.toast(err);
		});
	}

	pauseMove() {
		const { machine_id } = this.props;
		net.get(api.stopMove(machine_id, this._dir), (result) => {
		// net.postToMachine(api.stopMove(machine_id, this._dir), (result) => {
			utils.toast(result);
		}, err => {
			utils.toast('aaa');
			utils.toast('err => ${err}');
		});
	}

	switchLiveUrl() {
		const { liveurl_1, liveurl_2 } = this.props;
		this.setState({
			curLiveUrl: this.status.curLiveUrl === liveurl_1 ? liveurl_2 : liveurl_1
		});
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	topImg: {
		width: utils.screenWidth(),
		height: utils.toDips(104),
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingLeft: utils.toDips(10),
		paddingRight: utils.toDips(10)
	}
});
