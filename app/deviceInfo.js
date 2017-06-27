'use strict';

import DeviceInfo from 'react-native-device-info';

/**
 * Device Unique ID
 * This is IDFV on iOS so it will change if all apps from the current apps vendor have been previously uninstalled.
 * @example
 * FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
 */
export function getUniqueID() {
	return DeviceInfo.getUniqueID();
}

/**
 * Device Manufacturer
 * @example
 * Apple
 * @return {string}
 */
export function getManufacturer() {
	return DeviceInfo.getManufacturer();
}

/**
 * Device Brand
 * @example
 * Apple / htc / Xiaomi
 * @return {string}
 */
export function getBrand() {
	return DeviceInfo.getBrand();
}

/**
 * Device Model
 * @example
 * iPhone 6
 * @return {string}
 */
export function getModel() {
	return DeviceInfo.getModel();
}

/**
 * Device ID
 * @example
 * iPhone7,2
 * @return {string}
 */
export function getDeviceId() {
	return DeviceInfo.getDeviceId();
}

/**
 * System Name
 * @example
 * iPhone OS
 * @return {string}
 */
export function getSystemName() {
	return DeviceInfo.getSystemName();
}

/**
 * System Version
 * @example
 * 9.0
 * @return {string}
 */
export function getSystemVersion() {
	return DeviceInfo.getSystemVersion();
}

/**
 * Bundle ID
 * @example
 * com.learnium.mobile
 * @return {string}
 */
export function getBundleId() {
	return DeviceInfo.getBundleId();
}

/**
 * Build Number
 * @example
 * 89
 * @return {string}
 */
export function  getBuildNumber() {
	return DeviceInfo.getBuildNumber();
}

/**
 * App Version
 * @example
 * 1.1.0
 * @return {string}
 */
export function  getVersion() {
	return DeviceInfo.getVersion();
}
/**
 * App Version (Readable)
 * @example
 * 1.1.0.89
 * @return {string}
 */
export function getReadableVersion() {
	return DeviceInfo.getReadableVersion();
}

/**
 * Device Name
 * @example
 * Becca's iPhone 6
 * @return {string}
 */
export function getDeviceName() {
	return DeviceInfo.getDeviceName();
}

/**
 * User Agent
 * @example
 * Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)
 * @return {string}
 */
export function getUserAgent() {
	return DeviceInfo.getUserAgent();
}

/**
 * Device Locale
 * @example
 * en-US
 * @return {string}
 */
export function getDeviceLocale() {
	return DeviceInfo.getDeviceLocale();
}

/**
 * Device Country
 * @example
 * US
 * @return {string}
 */
export function getDeviceCountry() {
	return DeviceInfo.getDeviceCountry();
}

/**
 * Timezone
 * @example
 * America/Mexico_City
 * @return {string}
 */
export function getTimezone() {
	return DeviceInfo.getTimezone();
}

/**
 * App Instance ID
 * ANDROID ONLY - see https://developers.google.com/instance-id/
 * @return {string}
 */
export function getInstanceID() {
	return DeviceInfo.getInstanceID();
}

/**
 * App is running in emulator
 * if app is running in emulator return true
 * @return {Boolean}
 */
export function isEmulator() {
	return DeviceInfo.isEmulator();
}

/**
 * App is running on a tablet
 * if app is running on a tablet return true
 * @return {Boolean}
 */
export function isTablet() {
	return DeviceInfo.isTablet();
}