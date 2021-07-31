package com.example;

import android.content.Intent;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    int id = intent.getIntExtra("id", 0);
    int hour = intent.getIntExtra("hour", 0);
    int minute = intent.getIntExtra("minute", 0);
    boolean notiRemovable = intent.getBooleanExtra("notiRemovable", true);
    boolean activate = intent.getBooleanExtra("activate", true);

    System.out.println("notinoti: "+notiRemovable);
  }

  @Override
  protected String getMainComponentName() {
    return "example";
  }
}
