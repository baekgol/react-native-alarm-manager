import React, {useEffect, useState} from 'react';
import {Vibration} from 'react-native';
import {
  NativeBaseProvider,
  Container,
  Center,
  HStack,
  VStack,
  Heading,
  Input,
  Select,
  Switch,
} from 'native-base';
import {TimePicker} from 'react-native-wheel-picker-android';
import moment from 'moment';
import Sound from 'react-native-sound';
import Alarm from 'react-native-alarm-manager';

const App = () => {
  const hours = [];
  const minutes = [];
  const [date, setDate] = useState(new Date());
  const [sound, setSound] = useState('0');
  const [isVibration, setIsVibration] = useState(true);
  const [soundPlayerList, setSoundPlayerList] = useState(null);

  const soundList = [
    {name: 'Adventure', src: 'adventure'},
    {name: 'Bliss', src: 'bliss'},
    {name: 'The Inspiration', src: 'the_inspiration'},
  ];

  for (let i = 1; i <= 12; i++) hours.push(i + '');

  for (let i = 0; i < 60; i++) {
    if (i >= 0 && i < 10) minutes.push('0' + i);
    else minutes.push(i + '');
  }

  useEffect(() => {
    const soundPlayers = [];

    for (let i = 0; i < 3; i++)
      soundPlayers.push(
        new Sound(soundList[i].src + '.mp3', Sound.MAIN_BUNDLE),
      );

    setSoundPlayerList(soundPlayers);
  }, []);

  const dateToTime = currDate => {
    return moment(currDate).format('HH:mm:00') + '';
  };

  const selectSound = value => {
    console.log(soundPlayerList);
    soundPlayerList[sound].stop();
    setSound(value);
    soundPlayerList[value].setVolume(1.0).play();
  };

  const toggleVibration = () => {
    setIsVibration(!isVibration);
    if (!isVibration) Vibration.vibrate();
  };

  const alarmInfo = {
    alarm_time: '19:59:00',
    alarm_name: '',
    alarm_sound: 'adventure',
    alarm_vibration: true,
    alarm_activate: true,
  };

  // Alarm.schedule(
  //   alarmInfo,
  //   success => {
  //     console.log('schedule success');
  //     Alarm.searchAll(
  //       success => {
  //         console.log(success);
  //       },
  //       fail => {
  //         console.log(fail);
  //       },
  //     );
  //   },
  //   fail => {
  //     alert(fail);
  //   },
  // );

  return (
    <NativeBaseProvider>
      <Center paddingTop={50}>
        <Container>
          <VStack space={5}>
            <Heading size="md">Time</Heading>
            <TimePicker
              initDate={date}
              hours={hours}
              minutes={minutes}
              onTimeSelected={currDate => {
                setDate(currDate);
                dateToTime(currDate);
              }}
              style={{height: 200, width: 100}}
              itemTextSize={25}
              selectedItemTextSize={30}
              selectedItemTextColor={'#333333'}
              itemTextColor={'#bbbbbb'}
              hideIndicator
            />
            <Heading size="md">Name</Heading>
            <Input
              variant="outline"
              placeholder="Alarm Name"
              style={{marginBottom: 20}}
            />
            <Heading size="md">Sound</Heading>
            <Select
              selectedValue={sound}
              onValueChange={value => selectSound(value)}>
              <Select.Item label="Adventure" value="0" />
              <Select.Item label="Bliss" value="1" />
              <Select.Item label="The Inspiration" value="2" />
            </Select>
            <HStack style={{marginTop: 20}}>
              <Heading size="md">Vibration</Heading>
              <Switch
                size="lg"
                colorScheme="emerald"
                marginLeft={50}
                isChecked={isVibration}
                onToggle={() => toggleVibration()}
              />
            </HStack>
          </VStack>
        </Container>
      </Center>
    </NativeBaseProvider>
  );
};

export default App;
