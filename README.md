# react-native-alarm-manager

[![npm version](https://img.shields.io/npm/v/react-native-alarm-manager)](https://www.npmjs.org/package/react-native-alarm-manager)
[![install size](https://packagephobia.com/badge?p=react-native-alarm-manager)](https://packagephobia.com/result?p=react-native-alarm-manager)
![react-native](https://img.shields.io/badge/ReactNative->=0.60.0-61DAFB?logo=react)

Alarm manager for React Native

## Table of Contents

  - [Installation](#installation)
    - [Adding the package](#adding-the-package)
      - [npm](#npm)
      - [yarn](#yarn)
    - [Manipulating codes in your project](#manipulating-codes-in-your-project)
      - [Check Android SDK](#check-android-sdk)
      - [Register components](#register-components)
      - [Overriding MainActivity Methods](#overriding-mainactivity-methods)
      - [Create resource directory](#create-resource-directory)
  - [Usage](#usage)
    - [Props](#props)
    - [Alarm Scheduling](#alarm-scheduling)
    - [Alarm Searching](#alarm-searching)
      - [One](#one)
      - [All](#all)
    - [Alarm Modifying](#alarm-modifying)
    - [Alarm Deleting](#alarm-deleting)
    - [Alarm Stopping](#alarm-stopping)
  - [Example](#example)
  - [License](#license)


## Installation

### Adding the package

#### npm

```bash
$ npm install react-native-alarm-manager
```

#### yarn

```bash
$ yarn add react-native-alarm-manager
```

### Manipulating codes in your project

#### Check Android SDK

This package is compiled with Android SDK Platform 29.  
Your project SDK version doesn't matter.  
Android SDK Platform 29 must be installed.

#### Register components

Go to AndroidManifest.xml and register the service and receiver.

```xml
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

#### Overriding MainActivity Methods

Go to MainActivity.java and override the onCreate and createReactActivityDelegate methods as follows.  
It can work properly during the process of calling parameters and rebooting the android with alarm functions.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);

  ComponentName receiver = new ComponentName(this, BootReceiver.class);
  PackageManager packageManager = this.getPackageManager();

  packageManager.setComponentEnabledSetting(receiver,
          PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
          PackageManager.DONT_KILL_APP);
}

@Override
protected ReactActivityDelegate createReactActivityDelegate() {
  return new ReactActivityDelegate(this, getMainComponentName()){
    @Nullable
    @Override
    protected Bundle getLaunchOptions() {
      Intent intent = getIntent();
      Bundle bundle = intent.getExtras();

      if(intent.getBooleanExtra("notiRemovable", true))
        AlarmModule.stop(this.getContext());

      return bundle;
    }
  };
}
```

#### Create resource directory

Configure your project's resource directory.  
This is a necessary process to apply the alarm sound and notification icon.

```
project/app/src/main/res/raw       // alarm sound
project/app/src/main/res/drawable  // notification icon
```

## Usage

### Props

| Prop                              | Description                                                                                                                                                                                                                                                                                                             | Default                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **`auto_cancel`**                 | Make this notification automatically dismissed when the user touches it. `[boolean]`                                                                                                                                                                                                                                    | `true`                      |
| **`channel (Android only)`**      | **Required:** - Specifies the channel the notification should be delivered on.. `[string]`                                                                                                                                                                                                                              | `"my_channel_id"`           |



### Alarm Scheduling

Using npm:

```bash
$ npm install react-native-alarm-manager
```

### Alarm Searching

#### One

#### All

### Alarm Modifying

### Alarm Deleting

### Alarm Stopping

```js
// testtest
```

## Example

[MIT](LICENSE)

## License
