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

export default class PlayScreen extends PureComponent {

	static propTypes = {
		source: PropTypes.shape({
			uri: PropTypes.string.isRequired,
			controller: PropTypes.bool, //Android only
			timeout: PropTypes.number, //Android only
			hardCodec: PropTypes.bool, //Android only  //1 or 0  // 1 -> hw codec enable, 0 -> disable [recommended]
			live: PropTypes.bool, //Android only  //1 or 0 // 1 -> live
		}).isRequired
	};
	
	constructor(props) {
		super(props);

		this._onStart = this.onStart.bind(this);
		this._onLoading = this.onLoading.bind(this);
		this._onPaused = this.onPaused.bind(this);
		this._onShutdown = this.onShutdown.bind(this);
		this._onError = this.onError.bind(this);
		this._onPlaying = this.onPlaying.bind(this);
	}

	render() {
		const { source } = this.props;
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
				// 	<Player
				// 	source={source}
				// 	started={false}
				// 	onStart={this._onStart}
				// 	onLoading={this._onLoading}
				// 	onPaused={this._onPaused}
				// 	onShutdown={this._onShutdown}
				// 	onPlayyError={this._onError}
				// 	onPlaying={this._onPlaying}
				// 	style={{
				// 		width: utils.screenWidth(),
				// 		// height: utils.screenHeight()
				// 		// width: 200,
				// 		height: 400
				// 	}}
				// />
				}
				<View style={{flex: 1}}>
				</View>
				{
					// 换视角的按钮
				}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {}}
					style={{position: 'absolute', left: utils.toDips(8), bottom: utils.toDips(620)}}
				>
					<Image style={{width: utils.toDips(90), height: utils.toDips(90)}} source={require('../../imgs/ui301_4.png')} />
				</TouchableOpacity>
				{
					false && this.rednerWait()
				}
				{
					true && this.renderPlay()
				}
			</View>
		);
	}

	rednerWait() {
		return(
			<Image style={{width: utils.screenWidth(), height: utils.toDips(620)}} source={require('../../imgs/ui101_3.png')}>
				{
					// 游玩一次消耗的钱
				}
				<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: utils.toDips(30)}}>
					<Image style={{width: utils.toDips(156), height: utils.toDips(28)}} source={require('../../imgs/ui301_6.png')} />
					<Image style={{width: utils.toDips(26), height: utils.toDips(26), marginLeft: utils.toDips(30)}} source={require('../../imgs/ui205_001.png')} />
					<Text style={{color: '#8e6d76', fontSize: utils.getFontSize(16), marginLeft: utils.toDips(4)}}>
						9642145
					</Text>
				</View>
				{
					// 开始玩的按钮
				}
				<View style={{alignItems: 'center', marginTop: utils.toDips(15)}}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {}}
						style={{}}
					>
						<Image style={{width: utils.toDips(322), height: utils.toDips(78)}} source={require('../../imgs/ui301_5.png')} />
					</TouchableOpacity>
				</View>
				{
					// 娃娃的展示图片
				}
				<Image style={{width: utils.screenWidth(), height: utils.toDips(450), marginTop: utils.toDips(20), flexDirection: 'row', justifyContent: 'center', paddingTop: utils.toDips(45)}} source={require('../../imgs/ui301_7.png')}>
					<Image style={{width: utils.toDips(334), height: utils.toDips(382)}} source={require('../../imgs/ui302_001.png')} />
					<Image style={{width: utils.toDips(334), height: utils.toDips(382), marginLeft: utils.toDips(15)}} source={require('../../imgs/ui302_001.png')} />
				</Image>
			</Image>
		);
	}

	renderPlay() {
		return(
			<Image style={{width: utils.screenWidth(), height: utils.toDips(620)}} source={require('../../imgs/ui101_3.png')}>
				<Image style={{position: 'absolute', left: utils.toDips(69), top: utils.toDips(112), width: utils.toDips(114), height: utils.toDips(32)}} source={require('../../imgs/ui303_6.png')} />
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {}}
					style={{position: 'absolute', left: utils.toDips(59), top: utils.toDips(166), }}
				>
					<Image style={{width: utils.toDips(228), height: utils.toDips(98)}} source={require('../../imgs/ui303_7.png')} />
				</TouchableOpacity>
				<Image style={{position: 'absolute', left: utils.toDips(392), top: utils.toDips(114), width: utils.toDips(313), height: utils.toDips(313)}} source={require('../../imgs/ui303_1.png')} />
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {}}
					style={{position: 'absolute', left: utils.toDips(475), top: utils.toDips(87)}}
				>
					<Image style={{width: utils.toDips(144), height: utils.toDips(144)}} source={require('../../imgs/ui303_2.png')} />
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {}}
					style={{position: 'absolute', left: utils.toDips(589), top: utils.toDips(204)}}
				>
					<Image style={{width: utils.toDips(144), height: utils.toDips(144)}} source={require('../../imgs/ui303_3.png')} />
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {}}
					style={{position: 'absolute', left: utils.toDips(475), top: utils.toDips(319)}}
				>
					<Image style={{width: utils.toDips(144), height: utils.toDips(144)}} source={require('../../imgs/ui303_4.png')} />	
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {}}
					style={{position: 'absolute', left: utils.toDips(355), top: utils.toDips(204)}}
				>
					<Image style={{width: utils.toDips(144), height: utils.toDips(144)}} source={require('../../imgs/ui303_5.png')} />
				</TouchableOpacity>
			</Image>
		);
	}

	onStart(e) {
		console.warn('onStart', e);
	}

	onLoading(e) {
		console.warn('onLoading', e);
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
		console.warn('onPlaying', e);
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
