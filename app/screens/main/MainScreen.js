'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

export default class MainScreen extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{}}>主场景</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
