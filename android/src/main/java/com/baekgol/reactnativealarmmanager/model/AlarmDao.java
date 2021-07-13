package com.baekgol.reactnativealarmmanager.model;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import java.sql.Time;

@Dao
public interface AlarmDao {
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    public long add(AlarmDto dto);

    @Query("select * from alarm where alarm_id=:alarmId")
    public AlarmDto search(int alarmId);

    @Query("select * from alarm where alarm_time=:alarmTime")
    public AlarmDto search(Time alarmTime);

    @Query("select * from alarm order by alarm_time")
    public AlarmDto[] searchAll();

    @Update
    public int modifyAlarm(AlarmDto dto);

    @Query("delete from alarm where alarm_id=:alarmId")
    public int deleteAlarm(int alarmId);
}
