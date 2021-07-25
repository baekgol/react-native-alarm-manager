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
    @ColumnInfo(name="alarm_title")
    private String alarmTitle;

    @NonNull
    @ColumnInfo(name="alarm_text")
    private String alarmText;

    @NonNull
    @ColumnInfo(name="alarm_sound")
    private String alarmSound;

    @NonNull
    @ColumnInfo(name="alarm_vibration")
    private boolean alarmVibration;

    @NonNull
    @ColumnInfo(name="alarm_icon")
    private String alarmIcon;

    @NonNull
    @ColumnInfo(name="alarm_time")
    private Time alarmTime;

    @NonNull
    @ColumnInfo(name="alarm_activate", defaultValue = "true")
    private boolean alarmActivate;

    public int getAlarmId() {
        return alarmId;
    }

    public void setAlarmId(int alarmId) {
        this.alarmId = alarmId;
    }

    public String getAlarmTitle() {
        return alarmTitle;
    }

    public void setAlarmTitle(String alarmTitle) {
        this.alarmTitle = alarmTitle;
    }

    public String getAlarmText() {
        return alarmText;
    }

    public void setAlarmText(String alarmText) {
        this.alarmText = alarmText;
    }

    public String getAlarmSound() {
        return alarmSound;
    }

    public void setAlarmSound(String alarmSound) {
        this.alarmSound = alarmSound;
    }

    public boolean isAlarmVibration() { return alarmVibration; }

    public void setAlarmVibration(boolean alarmVibration) { this.alarmVibration = alarmVibration; }

    public String getAlarmIcon() {
        return alarmIcon;
    }

    public void setAlarmIcon(String alarmIcon) {
        this.alarmIcon = alarmIcon;
    }

    public Time getAlarmTime() {
        return alarmTime;
    }

    public void setAlarmTime(@NonNull Time alarmTime) {
        this.alarmTime = alarmTime;
    }

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
                ", alarmSound='" + alarmSound +
                ", alarmVibration='" + alarmVibration +
                ", alarmIcon='" + alarmIcon +
                ", alarmTitle='" + alarmTitle +
                ", alarmText='" + alarmText +
                ", alarmActivate=" + alarmActivate +
                '}';
    }
}
