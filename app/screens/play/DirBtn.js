'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,
	PanResponder
} from 'react-native';

import * as utils from '../../utils';

export default class DirBtn extends PureComponent {

	static propTypes = {
		left: PropTypes.number,
		top: PropTypes.number
	};
	
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const handlePanResponderEnd = this.handlePanResponderEnd.bind(this);
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			// onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
			onPanResponderGrant: this.handlePanResponderGrant.bind(this),
			// onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: handlePanResponderEnd,
			onPanResponderTerminate: handlePanResponderEnd,
		});
	}

	render() {
		const { left, top, source } = this.props;
		return (
			<View style={{position: 'absolute', left, top}} {...this._panResponder.panHandlers}>
				<Image style={{width: utils.toDips(144), height: utils.toDips(144)}} source={source} />
			</View>
		);
	}

	handlePanResponderGrant() {
		// console.warn('handlePanResponderGrant');
		const { startFunc } = this.props;
		startFunc();
	}

	handlePanResponderEnd() {
		// console.warn('handlePanResponderEnd');
		const { endFunc } = this.props;
		endFunc();
	}
}
