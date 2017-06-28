// 'use strict';

// import React, { PureComponent } from 'react';
// import {
// 	StyleSheet,
// 	View,
// 	Text,
// 	BackHandler
// } from 'react-native';

// import * as utils from './app/utils';
// import * as deviceInfo from './app/deviceInfo';
// import * as storage from './app/storage';
// import SplashScreen from 'react-native-smart-splash-screen';
// import toast from '@remobile/react-native-toast';

// // import MainScreen from './app/scene/main/MainScreen';

// import { StackNavigator } from 'react-navigation';

// class App extends PureComponent {

// 	static navigationOptions = {
// 		title: 'Welcome'
// 	};

// 	constructor(props) {
// 		super(props);

// 		// 上一次按下android返回键的时间
// 		this._lastPressBackTime = 0;
// 	}

// 	componentDidMount () {
// 		BackHandler.addEventListener('hardwareBackPress', () => {
// 			// if (!this.onMainScreen()) {
// 			// 	this.goBack();
// 			// 	return true;
// 			// }
// 			// return false;
// 			return false;
// 		});
// 		SplashScreen.close({
// 			animationType: SplashScreen.animationType.scale,
// 			duration: 850,
// 			delay: 500,
// 		});
// 	}

// 	render() {
// 		const { navigate } = this.props.navigation;
// 		return(
// 			<View style={styles.container}>
// 				<Text style={{}} onPress={() => navigate('Chat', { user: 'Lucy' })}>this is a app</Text>
// 			</View>
// 		);
// 	}
// }

// class ChatScreen extends PureComponent {
//   static navigationOptions = ({ navigation }) => ({
//     title: `Chat with ${navigation.state.params.user}`,
//   });
//   render() {
//   	const { navigate, goBack } = this.props.navigation;
//     return (
//       <View style={{backgroundColor: '#00ff00', flex: 1}}>
//         <Text onPress={() => goBack()}>Chat with Lucy</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1
// 	}
// });

// function getCurrentRouteName(navigationState) {
// 	if (!navigationState) {
// 		return null;
// 	}
// 	const route = navigationState.routes[navigationState.index];
// 	// dive into nested navigators
// 	if (route.routes) {
// 		return getCurrentRouteName(route);
// 	}
// 	return route.routeName;
// }


// const AppNavigator = StackNavigator({
// 	Home: { screen: App },
// 	Chat: { screen: ChatScreen }
// }, {
// 	navigationOptions: {
// 		// headerRight: <Text style={{}}>aaaa</Text>,
// 		// headerStyle: {
// 		// 	backgroundColor: '#ff0000',
// 		// },
// 		headerTintColor: '#ff0000'
// 	}
// });

// export default () => (
// 	<AppNavigator
// 		onNavigationStateChange={(prevState, currentState) => {
// 			const currentScreen = getCurrentRouteName(currentState);
// 			const prevScreen = getCurrentRouteName(prevState);
// 			console.log(`currentScreen = ${currentScreen}`);
// 			console.log(`prevScreen = ${prevScreen}`);
// 		}}
// 	/>
// );



'use strict';

/*
 * 用到的第三方组件：
 * react-native-scrollable-tab-view 地址： https://github.com/skv-headless/react-native-scrollable-tab-view
 * react-native-tab-navigator 地址：https://github.com/happypancake/react-native-tab-navigator
 * react-native-circular-progress 地址：https://github.com/bgryszko/react-native-circular-progress
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components';

import MainScreen from './app/screens/main/MainScreen';

export default class App extends Component{

	constructor(props) {
		super(props);
	}

	render() {
		// route.SceneConfig的可选值有
		// Navigator.SceneConfigs.PushFromRight (默认)
		// Navigator.SceneConfigs.FloatFromRight
		// Navigator.SceneConfigs.FloatFromLeft
		// Navigator.SceneConfigs.FloatFromBottom
		// Navigator.SceneConfigs.FloatFromBottomAndroid
		// Navigator.SceneConfigs.FadeAndroid
		// Navigator.SceneConfigs.HorizontalSwipeJump
		// Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
		// Navigator.SceneConfigs.VerticalUpSwipeJump
		// Navigator.SceneConfigs.VerticalDownSwipeJump
		return (
			<Navigator
				initialRoute={{
					// 注意，这里的Component的首字母C要大写，要大写，要大写
					Component: MainScreen
				}}
				configureScene={(route, routeStack) => route.SceneConfig || Navigator.SceneConfigs.FloatFromRight}
				renderScene={this.renderScene.bind(this)} />
		);
	}

	/**
	 * 根据导航路由器渲染场景
	 * @param  {Object} router    路由
	 * @param  {Object} navigator 导航
	 */
	renderScene(router, navigator) {
		global.nav = navigator;
		let { Component } = router;
		return <Component { ...router } />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});