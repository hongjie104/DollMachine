'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import * as utils from '../../utils';
import DollListItem from './DollListItem';

export default class DollListRow extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		const { dollArrData } = this.props;
		return (
			<View style={styles.container}>
				<DollListItem style={styles.leftItem} dollData={dollArrData[0]} />
				{ dollArrData.length > 1 && <DollListItem style={styles.rightItem} dollData={dollArrData[1]} /> }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: utils.screenWidth(),
		height: utils.toDips(432),
		flexDirection: 'row'
	},
	leftItem: {
		marginLeft: utils.toDips(19)
	},
	rightItem: {
		marginLeft: utils.toDips(7)
	}
});
