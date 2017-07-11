'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import * as utils from '../../utils';

/**
 * 倒计时
 */
export default class CountDown extends PureComponent {

	static propTypes = {
		onEnd: PropTypes.func
	};
	
	constructor(props) {
		super(props);

		this.state = {
			leftSecond: 30
		};

		this._onInterval = this.onInterval.bind(this);
	}

	componentDidMount() {
		if (!this._interval) {
			this._interval = setInterval(this._onInterval, 1000);
		}		
	}

	componentWillUnmount() {
		if (this._interval) {
			clearInterval(this._interval);
			this._interval = null;
		}
	}

	render() {
		const { leftSecond } = this.state;
		const { style } = this.props;
		return (
			<Text style={[style, styles.time]}>
				{ leftSecond }
			</Text>
		);
	}

	onInterval() {
		let { leftSecond } = this.state;		
		leftSecond--;
		if (leftSecond < 1) {
			const { onEnd } = this.props;
			onEnd && onEnd();
			this.componentWillUnmount();
		}
		this.setState({
			leftSecond
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	time: {
		color: '#fe7800',
		fontSize: utils.getFontSize(60)
	}
});
