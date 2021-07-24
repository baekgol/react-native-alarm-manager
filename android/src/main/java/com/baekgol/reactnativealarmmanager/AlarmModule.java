package com.baekgol.reactnativealarmmanager;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.icu.util.Calendar;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.ReadableMap;

import java.text.SimpleDateFormat;
import java.text.DateFormat;

import java.sql.Time;

import com.baekgol.reactnativealarmmanager.db.Database;
import com.baekgol.reactnativealarmmanager.model.AlarmDto;
import com.baekgol.reactnativealarmmanager.util.AlarmReceiver;
import com.baekgol.reactnativealarmmanager.util.AlarmService;

public class AlarmModule extends ReactContextBaseJavaModule {
  private ReactApplicationContext reactContext;
  private NotificationManager notificationManager;
  private AlarmManager alarmManager;
  private AlarmDto alarm;
  private AlarmDto[] alarms;
  private int affectedCnt;
  private final String channelId = "alarm";

  AlarmModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    alarmManager = (AlarmManager) reactContext.getSystemService(Context.ALARM_SERVICE);
    createNotificationChannel();
  }

  @Override
  public String getName() {
    return "Alarm";
  }

  private void createNotificationChannel(){
    if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.O){
      notificationManager = reactContext.getSystemService(NotificationManager.class);

      NotificationChannel channel = new NotificationChannel(channelId, "Alarm", NotificationManager.IMPORTANCE_HIGH);
      channel.setDescription("Alarm");
      channel.setSound(null, null);
      notificationManager.createNotificationChannel(channel);
    }
  }

  private Class getMainActivity(){
    String packageName = reactContext.getPackageName();
    Intent intent = reactContext.getPackageManager().getLaunchIntentForPackage(packageName);
    String className = intent.getComponent().getClassName();

    System.out.println(packageName);
    System.out.println(className);

    try {
      return Class.forName(className);
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
      return null;
    }
  }

  @ReactMethod
  public void schedule(final ReadableMap rm, Callback success, Callback fail){
    Runnable r = new Runnable() {
      @Override
      public void run() {
        Database db = Database.getInstance(getReactApplicationContext());
        AlarmDto newAlarm = createAlarm(rm, false);
        AlarmDto existedAlarm = db.alarmDao().search(newAlarm.getAlarmTime());

        if(existedAlarm==null){
          long alarmId = db.alarmDao().add(newAlarm);
          alarm = db.alarmDao().search((int)alarmId);

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


          Intent notiIntent = new Intent(reactContext, getMainActivity());
          notiIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

          notiIntent.putExtra("id", alarm.getAlarmId());
          notiIntent.putExtra("name", alarm.getAlarmName());
          notiIntent.putExtra("hour", hour);
          notiIntent.putExtra("minute", minute);
          notiIntent.putExtra("isActivate", true);

          PendingIntent notiPendingIntent = PendingIntent.getActivity(reactContext, 0, notiIntent, PendingIntent.FLAG_CANCEL_CURRENT);

          NotificationCompat.Builder builder = new NotificationCompat.Builder(reactContext, channelId)
//                    .setSmallIcon(R.mipmap.ic_launcher)
                  .setContentTitle("일어나")
                  .setContentText("일어날 시간입니다.")
                  .setContentIntent(notiPendingIntent)
                  .setOngoing(true)
                  .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);

          notificationManager.notify(1, builder.build());

          Intent alarmIntent = new Intent(reactContext, AlarmReceiver.class);
          alarmIntent.putExtra("id", alarm.getAlarmId());
          alarmIntent.putExtra("name", alarm.getAlarmName());
          alarmIntent.putExtra("sound", alarm.getAlarmSound());
          alarmIntent.putExtra("vibration", alarm.isAlarmVibration());
          alarmIntent.putExtra("hour", hour);
          alarmIntent.putExtra("minute", minute);

          PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(reactContext, alarm.getAlarmId(), alarmIntent, PendingIntent.FLAG_CANCEL_CURRENT);
          alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), alarmPendingIntent);
        }
      }
    };

    Thread thread = new Thread(r);
    thread.start();

    try{
      thread.join();
      if(alarm!=null) success.invoke("success to add alarm");
      else fail.invoke("이미 알람이 설정되어 있습니다.");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("알람을 생성하는 동안 오류가 발생하였습니다.");
    }finally{
      alarm = null;
    }
  }

  @ReactMethod
  public void search(final int id, Callback success, Callback fail){
    Runnable r = new Runnable() {
      @Override
      public void run() {
        Database db = Database.getInstance(getReactApplicationContext());
        alarm = db.alarmDao().search(id);
      }
    };

    Thread thread = new Thread(r);
    thread.start();

    try{
      thread.join();
      if(alarm!=null) success.invoke(createMap(alarm));
      else fail.invoke("fail to load alarm");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to load alarm detail");
    }finally{
      alarm = null;
    }
  }

  @ReactMethod
  public void searchAll(Callback success, Callback fail){
    Runnable r = new Runnable() {
      @Override
      public void run() {
        Database db = Database.getInstance(getReactApplicationContext());
        alarms = db.alarmDao().searchAll();
      }
    };

    Thread thread = new Thread(r);
    thread.start();

    try{
      thread.join();
      success.invoke(createArray(alarms));
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to load alarms");
    }finally{
      alarms = null;
    }
  }

  @ReactMethod
  public void modify(final ReadableMap rm, Callback success, Callback fail){
    Runnable r = new Runnable(){
      @Override
      public void run(){
        Database db = Database.getInstance(getReactApplicationContext());
        AlarmDto newAlarm = createAlarm(rm, true);
        AlarmDto existedAlarm = db.alarmDao().search(newAlarm.getAlarmId());
        PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(
                reactContext,
                newAlarm.getAlarmId(),
                new Intent(reactContext, AlarmReceiver.class),
                PendingIntent.FLAG_NO_CREATE);

        if(existedAlarm!=null && newAlarm.getAlarmId()==existedAlarm.getAlarmId()){
          if(alarmPendingIntent!=null){
            alarmPendingIntent.cancel();
            alarmManager.cancel(alarmPendingIntent);
          }

          affectedCnt = db.alarmDao().modifyAlarm(newAlarm);

          if(newAlarm.isAlarmActivate()){
            String time = newAlarm.getAlarmTime().toString();
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

            Intent alarmIntent = new Intent(reactContext, AlarmReceiver.class);
            alarmIntent.putExtra("id", newAlarm.getAlarmId());
            alarmIntent.putExtra("name", newAlarm.getAlarmName());
            alarmIntent.putExtra("sound", newAlarm.getAlarmSound());
            alarmIntent.putExtra("hour", hour);
            alarmIntent.putExtra("minute", minute);

            alarmPendingIntent = PendingIntent.getBroadcast(reactContext, newAlarm.getAlarmId(), alarmIntent, PendingIntent.FLAG_CANCEL_CURRENT);
            alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), alarmPendingIntent);
          }
        }
      }
    };

    Thread thread = new Thread(r);
    thread.start();

    try{
      thread.join();
      if(affectedCnt!=0) success.invoke("success to modify alarm");
      else fail.invoke("알람을 수정하는 동안 오류가 발생하였습니다.");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("알람을 수정하는 동안 오류가 발생하였습니다.");
    }finally{
      affectedCnt = 0;
    }
  }

  @ReactMethod
  public void delete(final int id, Callback success, Callback fail){
    Runnable r = new Runnable(){
      @Override
      public void run(){
        Database db = Database.getInstance(getReactApplicationContext());
        PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(
                reactContext,
                id,
                new Intent(reactContext, AlarmReceiver.class),
                PendingIntent.FLAG_NO_CREATE);

        if(alarmPendingIntent!=null) {
          alarmPendingIntent.cancel();
          alarmManager.cancel(alarmPendingIntent);
        }

        affectedCnt = db.alarmDao().deleteAlarm(id);
      }
    };

    Thread thread = new Thread(r);
    thread.start();

    try{
      thread.join();
      if(affectedCnt!=0) success.invoke("success to delete alarm");
      else fail.invoke("fail to delete alarm");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to delete alarm");
    }finally{
      affectedCnt = 0;
    }
  }

  @ReactMethod
  public void completeMission(int id, Callback success, Callback fail){
    Runnable r = new Runnable(){
      @Override
      public void run(){
        Intent alarmServiceIntent = new Intent(reactContext, AlarmService.class);
        reactContext.stopService(alarmServiceIntent);
      }
    };

    Thread thread = new Thread(r);
    thread.start();

    try{
      thread.join();
      success.invoke("success to complete mission");
    } catch (InterruptedException e) {
      e.printStackTrace();
      fail.invoke("fail to complete mission");
    }
  }

  WritableMap createMap(AlarmDto dto){
    DateFormat format = new SimpleDateFormat("HH:mm:ss");
    WritableMap wm = new WritableNativeMap();

    wm.putInt("alarm_id", dto.getAlarmId());
    wm.putString("alarm_time", format.format(dto.getAlarmTime().getTime()));
    wm.putString("alarm_name", dto.getAlarmName());
    wm.putString("alarm_sound", dto.getAlarmSound());
    wm.putBoolean("alarm_vibration", dto.isAlarmVibration());
    wm.putBoolean("alarm_activate", dto.isAlarmActivate());

    return wm;
  }

  WritableArray createArray(AlarmDto[] dtos){
    WritableArray wa = new WritableNativeArray();

    for(AlarmDto dto:dtos)
      wa.pushMap(createMap(dto));

    return wa;
  }

  AlarmDto createAlarm(ReadableMap rm, boolean isModify){
    AlarmDto newAlarm = new AlarmDto();

    if(isModify) newAlarm.setAlarmId(rm.getInt("alarm_id"));
    newAlarm.setAlarmName(rm.getString("alarm_name"));
    newAlarm.setAlarmSound(rm.getString("alarm_sound"));
    newAlarm.setAlarmTime(Time.valueOf(rm.getString("alarm_time")));
    newAlarm.setAlarmVibration(rm.getBoolean("alarm_vibration"));
    newAlarm.setAlarmActivate(rm.getBoolean("alarm_activate"));

    return newAlarm;
  }
}
