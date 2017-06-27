'use strict';

import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

const storage = new Storage({
	//最大容量，默认值1000条数据循环存储
	size: 1000,
	//数据过期时间，默认一整天（1000 * 3600 * 24秒）
	defaultExpires: null,
	// Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage
});

/**
 * 将数据存储在本地
 * @param  {[string]} key  键
 * @param  {[Object]} data 数据
 */
export function saveDataToLocal(key, data, onSuccess) {
	storage.save({
		// 注意:请不要在key中使用_下划线符号!
		key: key,
		rawData: data,
		//如果不指定过期时间，则会使用defaultExpires参数
		//如果设为null，则永不过期
		expires: null
	}).then(() => onSuccess());
}

/**
 * 从本地读取数据
 * @param  {[string]}   key       键
 * @param  {[function]} onSuccess 获取数据成功的回调
 * @param  {[function]} onFail    获取数据失败的回调
 */
export function loadDataFromLocal(key, onSuccess, onFail) {
	// 读取
	storage.load({
		key: key,
		//autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
		autoSync: true,
		//syncInBackground(默认为true)意味着如果数据过期，
		//在调用同步方法的同时先返回已经过期的数据。
		//设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
		syncInBackground: true
	}).then(ret => {
		//如果找到数据，则在then方法中返回
		onSuccess(ret);
	}).catch(err => {
		//如果没有找到数据且没有同步方法，
		//或者有其他异常，则在catch中返回
		onFail && onFail(err);
	});
}

/**
 * 删除单个数据
 * @param  {[string]} key 键
 */
export function removeLocalData(key:string) {
	storage.remove({key: key});
}

/**
 * 清空所有存储在本地的数据
 */
export function clearLocalData() {
	storage.clearMap();
}