package com.baekgol.reactnativealarmmanager.util;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.icu.util.Calendar;

import com.baekgol.reactnativealarmmanager.db.Database;
import com.baekgol.reactnativealarmmanager.model.AlarmDto;

public class BootReceiver extends BroadcastReceiver {
    private AlarmManager alarmManager;
    private AlarmDto[] alarms;

    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction().equals("android.intent.action.BOOT_COMPLETED")){
            alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            searchAll(context);

            if (alarms.length != 0) {
                for (AlarmDto alarm : alarms)
                    schedule(context, alarm);
            }
        }
    }

    public void schedule(final Context context, final AlarmDto alarm){
        Runnable r = new Runnable() {
            @Override
            public void run() {
                String time = alarm.getAlarmTime().toString();
                String[] timeInfo = time.split(":");
                int hour = Integer.parseInt(timeInfo[0]);
                int minute = Integer.parseInt(timeInfo[1]);
                int second = Integer.parseInt(timeInfo[2]);

                Calendar calendar = Calendar.getInstance();
                calendar.setTimeInMillis(System.currentTimeMillis());

                int currHour = calendar.get(Calendar.HOUR_OF_DAY);
                int currMinute = calendar.get(Calendar.MINUTE);
                int currSecond = calendar.get(Calendar.SECOND);

                calendar.set(Calendar.HOUR_OF_DAY, hour);
                calendar.set(Calendar.MINUTE, minute);
                calendar.set(Calendar.SECOND, 0);

                if(hour<currHour || (hour==currHour && minute<currMinute) || (hour==currHour && minute==currMinute && second<currSecond))
                    calendar.setTimeInMillis(calendar.getTimeInMillis() + (1000*60*60*24));

                Intent alarmIntent = new Intent(context, AlarmReceiver.class);
                alarmIntent.putExtra("id", alarm.getAlarmId());
                alarmIntent.putExtra("hour", hour);
                alarmIntent.putExtra("minute", minute);
                alarmIntent.putExtra("title", alarm.getAlarmTitle());
                alarmIntent.putExtra("text", alarm.getAlarmText());
                alarmIntent.putExtra("sound", alarm.getAlarmSound());
                alarmIntent.putExtra("icon", alarm.getAlarmIcon());
                alarmIntent.putExtra("soundLoop", alarm.isAlarmSoundLoop());
                alarmIntent.putExtra("vibration", alarm.isAlarmVibration());
                alarmIntent.putExtra("notiRemovable", alarm.isAlarmNotiRemovable());

                PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(context, alarm.getAlarmId(), alarmIntent, PendingIntent.FLAG_CANCEL_CURRENT);
                alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), alarmPendingIntent);
            }
        };

        Thread thread = new Thread(r);
        thread.start();

        try{
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void searchAll(final Context context){
        Runnable r = new Runnable() {
            @Override
            public void run() {
                Database db = Database.getInstance(context);
                alarms = db.alarmDao().searchAll();
            }
        };

        Thread thread = new Thread(r);
        thread.start();

        try{
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
