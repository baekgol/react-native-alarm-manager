package com.example;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.baekgol.reactnativealarmmanager.AlarmModule;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

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

  @Override
  protected String getMainComponentName() {
    return "example";
  }
}
