package com.example;

import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.baekgol.reactnativealarmmanager.AlarmModule;
import com.baekgol.reactnativealarmmanager.util.BootReceiver;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class MainActivity extends ReactActivity {
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

  @Override
  protected String getMainComponentName() {
    return "example";
  }
}
