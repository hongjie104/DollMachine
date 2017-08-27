'use strict';

import React, { PureComponent, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';

export default class OrderListItem extends PureComponent {

	static propTypes = {
		isSelected: PropTypes.bool,
		awardID: PropTypes.string,
		awardName: PropTypes.string,
		orderDate: PropTypes.string,
		awardType: PropTypes.string,
		onSelectedChanged: PropTypes.func
	};

	static defaultProps = {
		isSelected: false,
		onSelectedChanged: () => {}
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			isSelected: nextProps.isSelected
		});
	}
	
	constructor(props) {
		super(props);

		this.state = {
			isSelected: props.isSelected
		};

		this._switchSelected = this.switchSelected.bind(this);
	}

	render() {
		const { isSelected } = this.state;
		const { awardName, orderDate, awardType } = this.props;
		return (
			<View style={styles.container}>
				<Image style={styles.bgImg} source={require('../../imgs/gouwulan2.png')} />
				{
					// 勾选框
				}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this._switchSelected}
					style={styles.selectedImgContainer}
				>
					<Image style={styles.selectedImg} source={isSelected ? require('../../imgs/gouwulan3_2.png') : require('../../imgs/gouwulan3_1.png')} />
				</TouchableOpacity>
				{
					// 奖品图片
				}
				<Image style={styles.awardImg} resizeMode={"contain"} source={require('../../imgs/ui302_001.png')} />
				{
					// 名字和日期
				}
				<View style={styles.nameContainer}>
					<Text style={styles.awardName}>
						{ awardName }
					</Text>
					<Text style={styles.orderDate}>
						{ orderDate }
					</Text>
				</View>
				{
					// 奖品类型
				}
				<View style={styles.awardTypeContainer}>
					<Text style={styles.awardType}>
						{ awardType }
					</Text>
				</View>
			</View>
		);
	}

	switchSelected() {
		// const { isSelected } = this.state;
		// this.setState({
		// 	isSelected: !isSelected
		// }, () => {
		// 	const { onSelectedChanged, awardID } = this.props;
		// 	onSelectedChanged(awardID, this.state.isSelected);
		// });
		const { onSelectedChanged, awardID } = this.props;
		onSelectedChanged(awardID, !this.state.isSelected);
	}

	get isSelected() {
		return this.state.isSelected;
	}

	set isSelected(isSelected) {
		this.setState({
			isSelected
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: utils.toDips(750),
		height: utils.toDips(161),
		flexDirection: 'row',
		alignItems: 'center'
	},
	bgImg: {
		width: utils.toDips(714),
		height: utils.toDips(161),
		position: 'absolute',
		left: utils.toDips(22),
		top: 0
	},
	selectedImgContainer: {
		marginLeft: utils.toDips(37)
	},
	selectedImg: {
		width: utils.toDips(41),
		height: utils.toDips(41)
	},
	awardImg: {
		width: utils.toDips(130),
		height: utils.toDips(130),
		marginLeft: utils.toDips(17)
	},
	nameContainer: {
		flex: 1,
		marginLeft: utils.toDips(18),
		height: utils.toDips(161),
		paddingTop: utils.toDips(15)
	},
	awardName: {
		color: '#f55851',
		fontSize: utils.getFontSize(29)
	},
	orderDate: {
		color: '#8a8486',
		fontSize: utils.getFontSize(13)
	},
	awardTypeContainer: {
		height: utils.toDips(161),
	},
	awardType: {
		color: '#898083',
		fontSize: utils.getFontSize(20),
		marginRight: utils.toDips(40),
		marginTop: utils.toDips(28)
	}
});
