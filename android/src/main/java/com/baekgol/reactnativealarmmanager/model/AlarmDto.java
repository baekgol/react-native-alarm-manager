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
    @ColumnInfo(name="alarm_title")
    private String alarmTitle;

    @NonNull
    @ColumnInfo(name="alarm_text")
    private String alarmText;

    @NonNull
    @ColumnInfo(name="alarm_sound")
    private String alarmSound;

    @NonNull
    @ColumnInfo(name="alarm_icon")
    private String alarmIcon;

    @NonNull
    @ColumnInfo(name="alarm_sound_loop")
    private boolean alarmSoundLoop;

    @NonNull
    @ColumnInfo(name="alarm_vibration")
    private boolean alarmVibration;

    @NonNull
    @ColumnInfo(name="alarm_noti_removable")
    private boolean alarmNotiRemovable;

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

    public String getAlarmIcon() {
        return alarmIcon;
    }

    public void setAlarmIcon(String alarmIcon) {
        this.alarmIcon = alarmIcon;
    }

    public boolean isAlarmSoundLoop() { return alarmSoundLoop; }

    public void setAlarmSoundLoop(boolean alarmSoundLoop) { this.alarmSoundLoop = alarmSoundLoop; }

    public boolean isAlarmVibration() { return alarmVibration; }

    public void setAlarmVibration(boolean alarmVibration) { this.alarmVibration = alarmVibration; }

    public boolean isAlarmNotiRemovable() { return alarmNotiRemovable; }

    public void setAlarmNotiRemovable(boolean alarmNotiRemovable) { this.alarmNotiRemovable = alarmNotiRemovable; }

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
                ", alarmTitle=" + alarmTitle +
                ", alarmText=" + alarmText +
                ", alarmSound=" + alarmSound +
                ", alarmIcon=" + alarmIcon +
                ", alarmSoundLoop=" + alarmSoundLoop +
                ", alarmVibration=" + alarmVibration +
                ", alarmNotiRemovable=" + alarmNotiRemovable +
                ", alarmActivate=" + alarmActivate +
                "}";
    }
}
