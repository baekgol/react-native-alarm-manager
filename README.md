# react-native-alarm-manager

[![npm version](https://img.shields.io/npm/v/react-native-alarm-manager)](https://www.npmjs.org/package/react-native-alarm-manager)
[![install size](https://packagephobia.com/badge?p=react-native-alarm-manager)](https://packagephobia.com/result?p=react-native-alarm-manager)
![android](https://img.shields.io/badge/Android->=9.0-3DDC84?logo=android)
![react-native](https://img.shields.io/badge/ReactNative->=0.60.0-61DAFB?logo=react)

Alarm manager for React Native

## Table of Contents

  - [Installation](#installation)
  - [aaa](#aaa)
    - [bbb](#bbb)
    - [ccc](#ccc)
      - [ddd](#ddd)
      - [eee](#eee)

## Installation

### Add package

#### npm

```bash
$ npm install react-native-alarm-manager
```

#### yarn

```bash
$ yarm add react-native-alarm-manager
```

### AndroidManifest.xml

```
<manifest ... >
    <application ... >
      <activity ... >
      </activity>
      
      <!-- Add the following code -->
      <service android:name="com.baekgol.reactnativealarmmanager.util.AlarmService" android:enabled="true" android:exported="false" />
      <receiver android:name="com.baekgol.reactnativealarmmanager.util.AlarmReceiver" android:enabled="true" android:exported="false" />
      <receiver android:name="com.baekgol.reactnativealarmmanager.util.BootReceiver" android:enabled="false" android:exported="false" >
          <intent-filter android:priority="999">
              <action android:name="android.intent.action.BOOT_COMPLETED" />
          </intent-filter>
      </receiver>
    </application>
</manifest>
```
- sdk version >=28
- manifest fix
- drawable: icon, raw: sound

## a

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) |
--- |
1 |

## b

Using npm:

```bash
$ npm install react-native-alarm-manager
```

## c

### test

```js
// testtest
```

## License

[MIT](LICENSE)
