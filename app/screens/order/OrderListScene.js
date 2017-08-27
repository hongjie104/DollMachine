'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import * as utils from '../../utils';
import OrderListItem from './OrderListItem';

/**
 * 订单列表场景
 */
export default class OrderListScene extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			// 是否全选中了
			isSelectedAll: false,
			selectedCount: 0,
			awardDataArr: [
				{
					id: '1',
					name: '玩具的名字七个',
					date: '2017-12-32 23:23:11',
					type: '毛绒玩具',
					isSelected: false
				},
				{
					id: '2',
					name: '玩具的名字七个',
					date: '2017-12-32 23:23:11',
					type: '毛绒玩具',
					isSelected: false
				},
				{
					id: '3',
					name: '玩具的名字七个',
					date: '2017-12-32 23:23:11',
					type: '毛绒玩具',
					isSelected: false
				},
				{
					id: '4',
					name: '玩具的名字七个',
					date: '2017-12-32 23:23:11',
					type: '毛绒玩具',
					isSelected: false
				},
				{
					id: '5',
					name: '玩具的名字七个',
					date: '2017-12-32 23:23:11',
					type: '毛绒玩具',
					isSelected: false
				}
			]
		};

		this._onSelectedChanged = this.onSelectedChanged.bind(this);
		this._onSeelctAll = this.onSeelctAll.bind(this);
	}

	render() {
		const { isSelectedAll, selectedCount, awardDataArr } = this.state;
		return (
			<View style={styles.container}>
				<Image style={styles.bgImg} source={require('../../imgs/login_bg.jpg')} />
				{
					// 顶部
				}
				<Image style={styles.topImage} source={require('../../imgs/gouwulan1.png')}>
					<View style={styles.backBtnContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								global.nav.pop();
							}}
							style={styles.backBtn}
						>
							<Image style={styles.backImg} source={require('../../imgs/ui301_3.png')} />
						</TouchableOpacity>
					</View>
					{
						// title
					}
					<Text style={styles.title}>
						奖品订单
					</Text>
				</Image>
				{
					// 订单列表
				}
				<ScrollView style={styles.container}>
					{
						awardDataArr.map((awardData, i) => {
							return <OrderListItem key={i} isSelected={awardData.isSelected} awardID={awardData.id} awardName={awardData.name} orderDate={awardData.date} awardType={awardData.type} onSelectedChanged={this._onSelectedChanged} />
						})
					}
				</ScrollView>
				{
					// 底部
				}
				<Image style={[styles.topImage, {transform: [{scaleY: -1}]}]} source={require('../../imgs/gouwulan1.png')}>
					<View style={{flex: 1, transform: [{scaleY: -1}], flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
						{
							// 全选按钮
						}
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this._onSeelctAll}
							style={{marginLeft: utils.toDips(40)}}
						>
							<Image style={styles.selectedImg} source={isSelectedAll ? require('../../imgs/gouwulan3_2.png') : require('../../imgs/gouwulan3_1.png')} />
						</TouchableOpacity>
						<View style={styles.selectedTextContainer}>
							<Text style={{
								color: '#f2615e',
								fontSize: utils.getFontSize(27),
								marginLeft: utils.toDips(15)
							}}>
								全选
							</Text>
							<Text style={{
								color: '#838383',
								fontSize: utils.getFontSize(18),
								marginLeft: utils.toDips(15)
							}}>
								已选中{selectedCount}个奖品
							</Text>
						</View>
						{
							// 去配送的按钮
						}
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {}}
							style={{
								marginRight: utils.toDips(16)
							}}
						>
							<Image style={styles.sendImg} source={require('../../imgs/gouwulan4.png')} />
						</TouchableOpacity>
					</View>
				</Image>
			</View>
		);
	}

	onSelectedChanged(id, isSelected) {
		const { awardDataArr } = this.state;
		let selectedCount = 0;
		const tmp = awardDataArr.slice();		
		for (let i = 0; i < tmp.length; i++) {
			if (tmp[i].id === id) {
				tmp[i].isSelected = isSelected;
			}
			selectedCount += tmp[i].isSelected ? 1 : 0;
		}

		this.setState({
			awardDataArr: tmp,
			selectedCount,
			isSelectedAll: selectedCount === tmp.length
		});
	}

	onSeelctAll() {
		let { selectedCount, awardDataArr, isSelectedAll } = this.state;
		const tmp = awardDataArr.slice();
		let newSelectedState = false;
		if (selectedCount === tmp.length) {
			selectedCount = 0;
			isSelectedAll = false;
		} else {
			newSelectedState = true;
			selectedCount = tmp.length;
			isSelectedAll = true;
		}
		
		for (let i = 0; i < tmp.length; i++) {
			tmp[i].isSelected = newSelectedState;
		}
		this.setState({
			awardDataArr: tmp,
			selectedCount,
			isSelectedAll
		});	
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	bgImg: {
		width: utils.toDips(750),
		height: utils.toDips(1334),
		position: 'absolute',
		left: 0,
		top: 0
	},
	topImage: {
		width: utils.toDips(750),
		height: utils.toDips(116),
		justifyContent: 'center',
		alignItems: 'center'
	},
	backBtnContainer: {
		position: 'absolute',
		width: utils.toDips(750),
		height: utils.toDips(116),
		justifyContent: 'center'
	},
	backBtn: {
		marginLeft: utils.toDips(14)
	},
	backImg: {
		width: utils.toDips(84),
		height: utils.toDips(76)
	},
	title: {
		color: '#060f14',
		fontSize: utils.getFontSize(28)
	},
	selectedImg: {
		width: utils.toDips(41),
		height: utils.toDips(41)
	},
	selectedTextContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		flex: 1
	},
	sendImg: {
		width: utils.toDips(220),
		height: utils.toDips(73)
	}
});
