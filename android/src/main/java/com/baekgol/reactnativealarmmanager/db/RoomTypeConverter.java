package com.baekgol.reactnativealarmmanager.db;

import androidx.room.TypeConverter;

import java.sql.Time;


public class RoomTypeConverter {
    @TypeConverter
    public static Time fromTime(Long value){
        return value==null ? null : new Time(value);
    }
    
    @TypeConverter
    public static Long toTime(Time time){
        return time==null ? null : time.getTime();
    }
}
