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
					<Image style={styles.dollImg} source={require('../../imgs/item.jpg')} />
					<Text style={styles.dollName}>
						{ dollData.name }
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
							{ dollData.price }
							<Text style={{color: '#b2b2b2', fontSize: utils.getFontSize(13)}}>
								/1次
							</Text>
						</Text>
					</View>
					{
						// 按钮
					}
					{
						dollData.status === 0 && <Image style={styles.btnImage} source={require('../../imgs/ui202_001.png')} />
					}
					{
						dollData.status === 1 && (
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									global.nav.push({
										Component: PlayScreen,
										source: {
											uri: 'rtmp://9993.liveplay.myqcloud.com/live/9993_0baa94a95cbb11e791eae435c87f075e',
											controller: false, //Android only
											timeout: 3000, //Android only
											hardCodec: false, //Android only  //1 or 0  // 1 -> hw codec enable, 0 -> disable [recommended]
											live: true, //Android only  //1 or 0 // 1 -> live
										}
									});
								}}
								style={{}}
							>
								<Image style={styles.btnImage} source={require('../../imgs/ui202_003.png')} />
							</TouchableOpacity>
						)
					}
					{
						dollData.status === 2 && (
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
					dollData.isNew === 1 && <Image style={{width: utils.toDips(80), height: utils.toDips(80), position: 'absolute', left: utils.toDips(-8), top: utils.toDips(-4)}} source={require('../../imgs/ui203.png')} />
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
