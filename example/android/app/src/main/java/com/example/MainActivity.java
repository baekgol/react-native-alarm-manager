package com.example;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.baekgol.reactnativealarmmanager.AlarmModule;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {
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

//  @Override
//  public void onNewIntent(Intent intent) {
//    super.onNewIntent(intent);
//
//    int id = intent.getIntExtra("id", 0);
//    int hour = intent.getIntExtra("hour", 0);
//    int minute = intent.getIntExtra("minute", 0);
//    boolean notiRemovable = intent.getBooleanExtra("notiRemovable", true);
//    boolean activate = intent.getBooleanExtra("activate", true);
//
//    System.out.println("notiRemovable");
//    System.out.println(notiRemovable);
//    if(notiRemovable) {
//      ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
//      System.out.println("reactContext");
//      System.out.println(reactContext);
//
//      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//      .emit("notification", null);
//      ReactInstanceManager reactInstanceManager = getReactNativeHost().getReactInstanceManager();
//
//      reactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
//        @Override
//        public void onReactContextInitialized(ReactContext context) {
//          System.out.println("haha");
//        }
//      });
//      getReactInstanceManager()
//              .getCurrentReactContext()
//              .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//              .emit("notification", null);

//      AlarmModule.stop(getReactInstanceManager().getCurrentReactContext());
//    }
//  }

  @Override
  protected String getMainComponentName() {
    return "example";
  }
}
