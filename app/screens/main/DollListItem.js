'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';

import * as utils from '../../utils';

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
					<View style={{flexDirection: 'row', marginTop: utils.toDips(20)}}>
						<Image style={{width: utils.toDips(26), height: utils.toDips(26)}} source={require('../../imgs/ui205_001.png')} />
						<Text style={{color: '#8e6d76', fontSize: utils.getFontSize(20), marginLeft: utils.toDips(4)}}>
							{ dollData.price }
						</Text>
						<Text style={{color: '#b2b2b2', fontSize: utils.getFontSize(17)}}>
							/1次
						</Text>
					</View>
				</Image>
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
		height: utils.toDips(260)
	},
	dollName: {
		color: '#b35556',
		fontSize: utils.getFontSize(24),
		fontWeight: 'bold',
		marginTop: utils.toDips(7)
	}
});
