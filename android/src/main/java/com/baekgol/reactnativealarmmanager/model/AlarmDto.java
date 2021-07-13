package com.baekgol.reactnativealarmmanager.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.sql.Time;

@Entity(tableName = "alarm")
public class AlarmDto {
    @NonNull
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name="alarm_id")
    private int alarmId;

    @NonNull
    @ColumnInfo(name="alarm_time")
    private Time alarmTime;

    @NonNull
    @ColumnInfo(name="alarm_name")
    private String alarmName;

    @ColumnInfo(name="alarm_sound")
    private String alarmSound;

    @NonNull
    @ColumnInfo(name="alarm_vibration")
    private boolean alarmVibration;

    @NonNull
    @ColumnInfo(name="alarm_activate", defaultValue = "true")
    private boolean alarmActivate;

    public int getAlarmId() {
        return alarmId;
    }

    public void setAlarmId(int alarmId) {
        this.alarmId = alarmId;
    }

    public Time getAlarmTime() {
        return alarmTime;
    }

    public void setAlarmTime(@NonNull Time alarmTime) {
        this.alarmTime = alarmTime;
    }

    public String getAlarmName() {
        return alarmName;
    }

    public void setAlarmName(@NonNull String alarmName) {
        this.alarmName = alarmName;
    }

    public String getAlarmSound() {
        return alarmSound;
    }

    public void setAlarmSound(String alarmSound) {
        this.alarmSound = alarmSound;
    }

    public boolean isAlarmVibration() { return alarmVibration; }

    public void setAlarmVibration(boolean alarmVibration) { this.alarmVibration = alarmVibration; }

    public boolean isAlarmActivate() {
        return alarmActivate;
    }

    public void setAlarmActivate(boolean alarmActivate) {
        this.alarmActivate = alarmActivate;
    }

    @Override
    public String toString() {
        return "AlarmDto{" +
                "alarmId=" + alarmId +
                ", alarmTime=" + alarmTime +
                ", alarmName='" + alarmName +
                ", alarmSound='" + alarmSound +
                ", alarmVibration='" + alarmVibration +
                ", alarmActivate=" + alarmActivate +
                '}';
    }
}
