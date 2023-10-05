package com.baekgol.reactnativealarmmanager.util;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.icu.util.Calendar;

public class AlarmReceiver extends BroadcastReceiver {
    private AlarmManager alarmManager;

    @Override
    public void onReceive(Context context, Intent intent) {
        alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        Intent alarmServiceIntent = new Intent(context, AlarmService.class);
        alarmServiceIntent.putExtra("id", intent.getIntExtra("id", 0));
        alarmServiceIntent.putExtra("hour", intent.getIntExtra("hour", 0));
        alarmServiceIntent.putExtra("minute", intent.getIntExtra("minute", 0));
        alarmServiceIntent.putExtra("title", intent.getStringExtra("title"));
        alarmServiceIntent.putExtra("text", intent.getStringExtra("text"));
        alarmServiceIntent.putExtra("sound", intent.getStringExtra("sound"));
        alarmServiceIntent.putExtra("icon", intent.getStringExtra("icon"));
        alarmServiceIntent.putExtra("soundLoop", intent.getBooleanExtra("soundLoop", true));
        alarmServiceIntent.putExtra("vibration", intent.getBooleanExtra("vibration", true));
        alarmServiceIntent.putExtra("notiRemovable", intent.getBooleanExtra("notiRemovable", true));

        context.startForegroundService(alarmServiceIntent);
    }
}