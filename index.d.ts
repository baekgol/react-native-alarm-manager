import * as React from "react";

declare module "react-native-alarm-manager" {
  export interface AlarmType {
    alarm_id: number;
    alarm_time: string;
    alarm_title: string;
    alarm_text: string;
    alarm_expandable_content: string;
    alarm_sound: string;
    alarm_icon: string;
    alarm_sound_loop: boolean;
    alarm_vibration: boolean;
    alarm_noti_removable: boolean;
    alarm_activate: boolean;
  }
  export type AlarmScheduleType = Omit<AlarmType, "alarm_id">;
  type messageCallback = (message: string) => void;
  type alarmListCallBack = (list: AlarmType[]) => void;
  type alarmCallBack = (list: AlarmType) => void;

  export function schedule(
    alarm: AlarmScheduleType,
    success: messageCallback,
    fail: messageCallback
  ): void;
  export function search(
    id: number,
    success: alarmCallBack,
    fail: messageCallback
  ): void;
  export function searchAll(
    success: alarmListCallBack,
    fail: messageCallback
  ): void;
  export function modify(
    alarm: AlarmType,
    success: messageCallback,
    fail: messageCallback
  ): void;
  function _delete(
    id: number,
    success: messageCallback,
    fail: messageCallback
  ): void;
  export function stop(success: messageCallback, fail: messageCallback): void;
  export { _delete as delete };
}
