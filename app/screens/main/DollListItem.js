'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import * as api from '../../api';
import * as net from '../../net';
import PlayScreen from '../play/PlayScreen';

export default class DollListItem extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		const { dollData } = this.props;
		return (
			<View style={[styles.container, this.props.style]}>
				<Image style={styles.bg} source={require('../../imgs/ui206.png')}>
					{
						// <Image style={styles.dollImg} source={require('../../imgs/item.jpg')} />
					}					
					<Image style={styles.dollImg} source={{uri: dollData.path}} />

					<Text style={styles.dollName}>
						{ dollData.machine_name }
					</Text>
					{
						// 模型或者玩偶的标识
					}
					<Image
						style={{
							position: 'absolute',
							left: utils.toDips(275),
							top: utils.toDips(276),
							width: utils.toDips(65),
							height: utils.toDips(35)
						}}
						source={dollData.type == 'model' ? require('../../imgs/ui204_001.png') : require('../../imgs/ui204_002.png')}
					/>
					{
						// 钱
					}
					<View style={{flexDirection: 'row', marginTop: utils.toDips(7), alignItems: 'flex-end'}}>
						<Image style={{width: utils.toDips(26), height: utils.toDips(26), marginBottom: utils.toDips(3)}} source={require('../../imgs/ui205_001.png')} />
						<Text style={{color: '#8e6d76', fontSize: utils.getFontSize(16), marginLeft: utils.toDips(4)}}>
							{ dollData.credit }
							<Text style={{color: '#b2b2b2', fontSize: utils.getFontSize(13)}}>
								/1次
							</Text>
						</Text>
					</View>
					{
						// 按钮
						// 机器目前的状态
						// 0：表示正常
						// 1：正在游戏中
						// 2：机器下线
						// 3：设备故障
					}
					{
						dollData.status == 3 && <Image style={styles.btnImage} source={require('../../imgs/ui202_001.png')} />
					}
					{
						dollData.status == 0 && (
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {									
									net.post(api.getDollMachineInfo(dollData.id), (result) => {
										if (result.code === 200) {
											global.nav.push({
												Component: PlayScreen,
												...result.data
											});
										} else {
											utils.toast(result.message);
										}
									}, (err) => {
										utils.toast(err);
									});
								}}
								style={{}}
							>
								<Image style={styles.btnImage} source={require('../../imgs/ui202_003.png')} />
							</TouchableOpacity>
						)
					}
					{
						dollData.status == 1 && (
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {utils.toast('其他玩家正在使用')}}
								style={{}}
							>
								<Image style={styles.btnImage} source={require('../../imgs/ui202_002.png')} />
							</TouchableOpacity>
						)
					}
				</Image>
				{
					// 是不是新的机器
				}
				{
					dollData.isnew === 1 && <Image style={{width: utils.toDips(80), height: utils.toDips(80), position: 'absolute', left: utils.toDips(-8), top: utils.toDips(-4)}} source={require('../../imgs/ui203.png')} />
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: utils.toDips(356),
		height: utils.toDips(426)
	},
	bg: {
		width: utils.toDips(356),
		height: utils.toDips(426),
		alignItems: 'center',
		paddingTop: utils.toDips(6)
	},
	dollImg: {
		width: utils.toDips(340),
		height: utils.toDips(260),
		borderTopLeftRadius: utils.toDips(14), borderTopRightRadius: utils.toDips(14), borderWidth: 1
	},
	dollName: {
		color: '#b35556',
		fontSize: utils.getFontSize(20),
		fontWeight: 'bold',
		marginTop: utils.toDips(7)
	},
	btnImage: {
		width: utils.toDips(260),
		height: utils.toDips(52)
	}
});
