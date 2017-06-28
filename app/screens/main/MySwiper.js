'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';

import Swiper from 'react-native-swiper';
import * as utils from '../../utils';

export default class MySwiper extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Swiper style={styles.wrapper} showsButtons={false} autoplay={true} height={utils.toDips(200)} paginationStyle={{bottom: 10}}>
					<Image style={styles.img} source={require('../../imgs/ui001_001.jpg')} />
					<Image style={styles.img} source={require('../../imgs/ui001_003.jpg')} />
				</Swiper>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: utils.screenWidth(),
		paddingLeft: utils.toDips((750 - 710) / 2)
	},
	wrapper: {
		
	},
	img: {
		width: utils.toDips(710),
		height: utils.toDips(200)
	}
});
