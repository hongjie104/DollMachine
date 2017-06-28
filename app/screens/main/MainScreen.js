'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	ListView,
	RefreshControl
} from 'react-native';

import * as utils from '../../utils';

import MySwiper from './MySwiper';
import DollListRow from './DollListRow';

/**
 * 娃娃机列表界面
 */
export default class MainScreen extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			// 当前娃娃机的类型，三个可选值：all/model/toy
			dollType: 'all',
			dollDataArr: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
			isRefreshing: false
		};
		this._dollDataArr = [];

		this._onAllDollSelected = this.onAllDollSelected.bind(this);
		this._onModelDollSelected = this.onModelDollSelected.bind(this);
		this._onToyDollSelected = this.onToyDollSelected.bind(this);

		this._renderDollItem = this.renderDollItem.bind(this);
		this._renderHeader = this.renderHeaderItem.bind(this);
		this._onRefresh = this.onRefresh.bind(this);
		this._onListEndReached = this.onListEndReached.bind(this);
	}

	componentDidMount() {
		// this.fetchData();
	}

	render() {
		const { dollType, dollDataArr, isRefreshing } = this.state;
		return (
			<View style={styles.container}>
				{
					// 顶部
				}
				<Image style={styles.topImg} source={require('../../imgs/ui101_1.png')}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this._onAllDollSelected}
						style={styles.dollTypeCheckBoxContainer}
					>
						<Image style={styles.dollTypeCheckBox} source={dollType === 'all' ? require('../../imgs/ui208_101.png') : require('../../imgs/ui208_102.png')} />
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this._onModelDollSelected}
						style={styles.dollTypeCheckBoxContainer}
					>
						<Image style={styles.dollTypeCheckBox} source={dollType === 'model' ? require('../../imgs/ui208_201.png') : require('../../imgs/ui208_202.png')} />
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this._onToyDollSelected}
						style={styles.dollTypeCheckBoxContainer}
					>
						<Image style={styles.dollTypeCheckBox} source={dollType === 'toy' ? require('../../imgs/ui208_301.png') : require('../../imgs/ui208_302.png')} />
					</TouchableOpacity>
					<View style={{flex: 1}} />
					{
						// 设置按钮
					}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {utils.toast('设置')}}
						style={{marginBottom: utils.toDips(21)}}
					>
						<Image style={styles.settingImg} source={require('../../imgs/ui207_105.png')} />
					</TouchableOpacity>
				</Image>
				<ListView
					// ref={"scrollView"}
					pageSize={4}
					onEndReached={this._onListEndReached}
					onEndReachedThreshold={5}
					style={styles.container}
					removeClippedSubviews={false}
					dataSource={dollDataArr}
					renderHeader={this._renderHeader}
					renderRow={this._renderDollItem}
					refreshControl={
						<RefreshControl
							onRefresh={this._onRefresh}
							refreshing={isRefreshing}
							// colors={refreshableColors}
							// progressBackgroundColor={refreshableProgressBackgroundColor}
							// size={refreshableSize}
							// tintColor={refreshableTintColor}
							// title={refreshableTitle}
							// titleColor={refreshableTitleColor}
						/>
					}
					canCancelContentTouches={true}
					scrollEnabled={true}
					automaticallyAdjustContentInsets={false}
					// onScroll={this._onScroll}
					enableEmptySections={true}
					keyboardDismissMode={'on-drag'}
				/>
				{
					// 底部
				}
				<View style={styles.bottomContainer}>
					<Image style={styles.bottomImg} source={require('../../imgs/ui101_2.png')}>
						{
							// 刷新按钮
						}
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {utils.toast('刷新')}}
							style={{marginTop: utils.toDips(21), marginLeft: utils.toDips(14)}}
						>
							<Image style={{width: utils.toDips(100), height: utils.toDips(100)}} source={require('../../imgs/ui207_104.png')} />
						</TouchableOpacity>
						{
							// 公告按钮
						}
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {utils.toast('公告')}}
							style={{marginTop: utils.toDips(21), marginLeft: utils.toDips(421)}}
						>
							<Image style={{width: utils.toDips(100), height: utils.toDips(100)}} source={require('../../imgs/ui207_103.png')} />
							{
								// 公告的数值
							}
							<Image style={{position: 'absolute', left: utils.toDips(66), top: 0, width: utils.toDips(37), height: utils.toDips(39), alignItems: 'center', justifyContent: 'center'}} source={require('../../imgs/ui207_101.png')}>
								<Text style={{color: 'white', fontSize: utils.getFontSize(14)}}>
									9
								</Text>
							</Image>
						</TouchableOpacity>
						{
							// 配送按钮
						}
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {utils.toast('配送')}}
							style={{marginTop: utils.toDips(21), marginLeft: utils.toDips(1)}}
						>
							<Image style={{width: utils.toDips(100), height: utils.toDips(100)}} source={require('../../imgs/ui207_102.png')} />
							{
								// 配送的数值
							}
							<Image style={{position: 'absolute', left: utils.toDips(66), top: 0, width: utils.toDips(37), height: utils.toDips(39), alignItems: 'center', justifyContent: 'center'}} source={require('../../imgs/ui207_101.png')}>
								<Text style={{color: 'white', fontSize: utils.getFontSize(14)}}>
									5
								</Text>
							</Image>
						</TouchableOpacity>
					</Image>
				</View>
			</View>
		);
	}

	renderDollItem(dollArrData) {
		return(
			<DollListRow dollArrData={dollArrData} />
		);
	}

	renderHeaderItem() {
		return <MySwiper />;
	}

	onAllDollSelected() {
		const { dollType } = this.state;
		if (dollType !== 'all') {
			this.setState({
				dollType: 'all'
			});
		}
	}

	onModelDollSelected() {
		const { dollType } = this.state;
		if (dollType !== 'model') {
			this.setState({
				dollType: 'model'
			});
		}
	}

	onToyDollSelected() {
		const { dollType } = this.state;
		if (dollType !== 'toy') {
			this.setState({
				dollType: 'toy'
			});
		}
	}

	/**
	 * 向服务器索要数据
	 * 这里就先模拟一下
	 */
	fetchData(refresh) {
		this.setState({
			isRefreshing: true
		}, () => {
			const timer = setTimeout(() => {
				clearTimeout(timer);
				// 这是模拟的测试数据
				// 正式版时以服务器发来的数据为准
				const dollData = [
					{ name: '特色的小包包哦', type: 'model', price: 85441 },
					{ name: '日式灯笼', type: 'model', price: 451 },
					{ name: '哦点击撒', type: 'model', price: 6 },
					{ name: '的身份违法的事', type: 'toy', price: 547 },
					{ name: '请问greg', type: 'model', price: 234 },
					{ name: '公号和闰土股份', type: 'toy', price: 543 },
					{ name: '个好人提供', type: 'model', price: 45643 },
					{ name: '个k，浪费我的', type: 'model', price: 123 },
					{ name: '漂亮few发的', type: 'toy', price: 4545 },
					{ name: '漂亮few发的', type: 'toy', price: 4545 },
					{ name: '特色的小包包哦', type: 'model', price: 85441 },
					{ name: '日式灯笼', type: 'model', price: 451 },
					{ name: '哦点击撒', type: 'model', price: 6 },
					{ name: '的身份违法的事', type: 'toy', price: 547 },
					{ name: '请问greg', type: 'model', price: 234 },
					{ name: '公号和闰土股份', type: 'toy', price: 543 },
					{ name: '个好人提供', type: 'model', price: 45643 },
					{ name: '个k，浪费我的', type: 'model', price: 123 },
					{ name: '漂亮few发的', type: 'toy', price: 4545 },
					{ name: '漂亮few发的', type: 'toy', price: 4545 }
				];

				const lastResult = [];
				while(dollData.length > 2) {
					lastResult.push(dollData.splice(0, 2));
				}
				if(dollData.length > 0) {
					lastResult.push(dollData);
				}

				this._dollDataArr = refresh ? lastResult : this._dollDataArr.concat(lastResult);
				this.setState({
					isRefreshing: false,
					dollDataArr: this.state.dollDataArr.cloneWithRows(this._dollDataArr)
				});
			}, 500);
		});
	}

	/**
	 * 刷新
	 */
	onRefresh() {
		this.fetchData(true);
	}

	/**
	 * 加载更多
	 */
	onListEndReached() {
		this.fetchData();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	topImg: {
		width: utils.screenWidth(),
		height: utils.toDips(104),
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingLeft: utils.toDips(10),
		paddingRight: utils.toDips(10)
	},
	dollTypeCheckBoxContainer: {
		marginLeft: utils.toDips(4)
	},
	dollTypeCheckBox: {
		width: utils.toDips(151),
		height: utils.toDips(90)
	},
	settingImg: {
		width: utils.toDips(74),
		height: utils.toDips(74)
	},
	bottomContainer: {
		alignSelf: 'flex-end'
	},
	bottomImg: {
		width: utils.screenWidth(),
		height: utils.toDips(123),
		flexDirection: 'row'
	}
});
