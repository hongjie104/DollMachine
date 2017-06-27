'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	BackHandler
} from 'react-native';

import * as utils from './app/utils';
import * as deviceInfo from './app/deviceInfo';
import * as storage from './app/storage';
import SplashScreen from 'react-native-smart-splash-screen';
import toast from '@remobile/react-native-toast';

// import MainScreen from './app/scene/main/MainScreen';

import { StackNavigator } from 'react-navigation';

class App extends PureComponent {

	static navigationOptions = {
		title: 'Welcome'
	};

	constructor(props) {
		super(props);

		// 上一次按下android返回键的时间
		this._lastPressBackTime = 0;
	}

	componentDidMount () {
		BackHandler.addEventListener('hardwareBackPress', () => {
			// if (!this.onMainScreen()) {
			// 	this.goBack();
			// 	return true;
			// }
			// return false;
			return false;
		});
		SplashScreen.close({
			animationType: SplashScreen.animationType.scale,
			duration: 850,
			delay: 500,
		});
	}

	render() {
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.container}>
				<Text style={{}} onPress={() => navigate('Chat', { user: 'Lucy' })}>this is a app</Text>
			</View>
		);
	}
}

class ChatScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
  	const { navigate, goBack } = this.props.navigation;
    return (
      <View style={{backgroundColor: '#00ff00', flex: 1}}>
        <Text onPress={() => goBack()}>Chat with Lucy</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

function getCurrentRouteName(navigationState) {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	// dive into nested navigators
	if (route.routes) {
		return getCurrentRouteName(route);
	}
	return route.routeName;
}


const AppNavigator = StackNavigator({
	Home: { screen: App },
	Chat: { screen: ChatScreen }
}, {
	navigationOptions: {
		// headerRight: <Text style={{}}>aaaa</Text>,
		// headerStyle: {
		// 	backgroundColor: '#ff0000',
		// },
		headerTintColor: '#ff0000'
	}
});

export default () => (
	<AppNavigator
		onNavigationStateChange={(prevState, currentState) => {
			const currentScreen = getCurrentRouteName(currentState);
			const prevScreen = getCurrentRouteName(prevState);
			console.log(`currentScreen = ${currentScreen}`);
			console.log(`prevScreen = ${prevScreen}`);
		}}
	/>
);