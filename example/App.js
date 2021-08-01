import React, {useEffect, useState} from 'react';
import {Vibration} from 'react-native';
import {
  NativeBaseProvider,
  ScrollView,
  Center,
  HStack,
  VStack,
  Heading,
  Input,
  Select,
  Switch,
  Button,
  Modal,
  Text,
  Tag,
  Image,
  IconButton,
  InfoOutlineIcon,
  SmallCloseIcon,
} from 'native-base';
import {TimePicker} from 'react-native-wheel-picker-android';
import moment from 'moment';
import Sound from 'react-native-sound';
import Alarm from 'react-native-alarm-manager';

const App = props => {
  const hours = [];
  const minutes = [];
  const [date, setDate] = useState(new Date());
  const [createTitle, setCreateTitle] = useState('');
  const [modifyTitle, setModifyTitle] = useState('');
  const [createText, setCreateText] = useState('');
  const [modifyText, setModifyText] = useState('');
  const [createSound, setCreateSound] = useState('0');
  const [modifySound, setModifySound] = useState('0');
  const [createIcon, setCreateIcon] = useState('0');
  const [modifyIcon, setModifyIcon] = useState('0');
  const [createSoundLoop, setCreateSoundLoop] = useState(true);
  const [modifySoundLoop, setModifySoundLoop] = useState(true);
  const [createVibration, setCreateVibration] = useState(true);
  const [modifyVibration, setModifyVibration] = useState(true);
  const [createNotiRemovable, setCreateNotiRemovable] = useState(true);
  const [modifyNotiRemovable, setModifyNotiRemovable] = useState(true);
  const [soundPlayerList, setSoundPlayerList] = useState(null);
  const [isListModal, setIsListModal] = useState(false);
  const [isModifyModal, setIsModifyModal] = useState(false);
  const [alarmList, setAlarmList] = useState([]);

  const soundList = [
    {name: 'Adventure', src: 'adventure'},
    {name: 'Bliss', src: 'bliss'},
    {name: 'The Inspiration', src: 'the_inspiration'},
  ];

  const iconList = ['mail', 'user', 'like'];

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

  const selectCreateSound = value => {
    soundPlayerList[createSound].stop();
    setCreateSound(value);
    soundPlayerList[value].setVolume(1.0).play();
  };

  const toggleCreateVibration = () => {
    setCreateVibration(!createVibration);
    if (!createVibration) Vibration.vibrate();
  };

  const selectModifySound = value => {
    soundPlayerList[modifySound].stop();
    setModifySound(value);
    soundPlayerList[value].setVolume(1.0).play();
  };

  const toggleModifyVibration = () => {
    setModifyVibration(!modifyVibration);
    if (!modifyVibration) Vibration.vibrate();
  };

  const closeModifyModal = () => {
    soundPlayerList[modifySound].stop();
    setModifySound('0');
    setIsModifyModal(false);
  };

  const toggleAlarm = id => {
    let tmpAlarm = null;

    const tmpAlarmList = alarmList.map(item => {
      if (id == item.alarm_id) {
        tmpAlarm = {...item, alarm_activate: !item.alarm_activate};
        return tmpAlarm;
      } else return item;
    });

    setAlarmList(tmpAlarmList);

    Alarm.modify(
      tmpAlarm,
      () => {},
      fail => alert(fail),
    );
  };

  const getListModal = () => {
    return (
      <Modal
        isOpen={isListModal}
        onClose={() => setIsListModal(false)}
        closeOnOverlayClick={false}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Alarm List</Modal.Header>
          <Modal.Body>
            <VStack>
              {alarmList.map((alarm, idx) => {
                const hour = alarm.alarm_time.substring(0, 2);
                const minute = alarm.alarm_time.substring(3, 5);

                return (
                  <HStack justifyContent="space-between" key={alarm.alarm_id}>
                    <HStack alignItems="center" w="55%">
                      <Tag
                        colorScheme={alarm.alarm_activate ? 'emerald' : 'gray'}
                        size="sm"
                        rounded={'full'}
                        variant="outline"
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10,
                          marginRight: 10,
                          borderWidth: 2,
                        }}>
                        <Text
                          fontSize={20}
                          bold={alarm.alarm_activate ? true : false}>
                          {`${hour}:${minute}`}
                        </Text>
                      </Tag>
                      <Text fontSize={15} w="50%" isTruncated>
                        {alarm.alarm_title}
                      </Text>
                    </HStack>
                    <HStack>
                      <IconButton
                        colorScheme="emerald"
                        icon={<InfoOutlineIcon />}
                        onPress={() => setIsModifyModal(true)}
                      />
                      <IconButton
                        colorScheme="secondary"
                        icon={<SmallCloseIcon />}
                        onPress={() => deleteAlarm(alarm.alarm_id, idx)}
                      />
                      <Switch
                        size="md"
                        colorScheme="emerald"
                        isChecked={alarm.alarm_activate}
                        onToggle={() => toggleAlarm(alarm.alarm_id)}
                      />
                    </HStack>
                  </HStack>
                );
              })}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="ghost"
              onPress={() => {
                setIsListModal(false);
              }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  };

  const getModifyModal = () => {
    return (
      <Modal
        isOpen={isModifyModal}
        onClose={() => closeModifyModal()}
        closeOnOverlayClick={false}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Alarm Modification</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Center>
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
                  <Heading size="md">Title</Heading>
                  <Input
                    variant="outline"
                    placeholder="Alarm Title"
                    onChangeText={value => setCreateTitle(value)}
                    style={{marginBottom: 10}}
                  />
                  <Heading size="md">Text</Heading>
                  <Input
                    variant="outline"
                    placeholder="Alarm Text"
                    onChangeText={value => setCreateText(value)}
                    style={{marginBottom: 10}}
                  />
                  <Heading size="md">Sound</Heading>
                  <Select
                    selectedValue={createSound}
                    onValueChange={value => selectCreateSound(value)}>
                    <Select.Item label="Adventure" value="0" />
                    <Select.Item label="Bliss" value="1" />
                    <Select.Item label="The Inspiration" value="2" />
                  </Select>
                  <Heading size="md" style={{marginTop: 10}}>
                    Icon
                  </Heading>
                  <Select
                    selectedValue={createIcon}
                    onValueChange={value => setCreateIcon(value)}>
                    <Select.Item label="Mail" value="0" />
                    <Select.Item label="User" value="1" />
                    <Select.Item label="Like" value="2" />
                  </Select>
                  <HStack
                    justifyContent="space-between"
                    style={{marginTop: 10}}>
                    <Heading size="md">Sound Loop</Heading>
                    <Switch
                      size="lg"
                      colorScheme="emerald"
                      isChecked={createSoundLoop}
                      onToggle={() => setCreateSoundLoop(!createSoundLoop)}
                      style={{marginLeft: 50}}
                    />
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Heading size="md">Vibration</Heading>
                    <Switch
                      size="lg"
                      colorScheme="emerald"
                      isChecked={createVibration}
                      onToggle={() => toggleCreateVibration()}
                      style={{marginLeft: 50}}
                    />
                  </HStack>
                  <Button
                    onPress={() => createAlarm()}
                    style={{marginTop: 10, marginBottom: 30}}>
                    Create Alarm
                  </Button>
                </VStack>
              </Center>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="ghost"
              onPress={() => {
                setIsModifyModal(false);
              }}>
              Modify
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  };

  const showList = () => {
    Alarm.searchAll(
      success => {
        soundPlayerList[createSound].stop();
        setAlarmList(success);
        setIsListModal(true);
      },
      fail => alert(fail),
    );
  };

  const createAlarm = () => {
    const alarmInfo = {
      alarm_time: dateToTime(date),
      alarm_title: createTitle,
      alarm_text: createText,
      alarm_sound: soundList[createSound].src,
      alarm_icon: iconList[createIcon],
      alarm_sound_loop: createSoundLoop,
      alarm_vibration: createVibration,
      alarm_noti_removable: createNotiRemovable,
      alarm_activate: true,
    };

    Alarm.schedule(
      alarmInfo,
      success => alert(success),
      fail => alert(fail),
    );
  };

  const deleteAlarm = (id, idx) => {
    Alarm.delete(
      id,
      () => {
        const list = alarmList.slice();
        list.splice(idx, 1);
        setAlarmList(list);
      },
      fail => alert(fail),
    );
  };

  const stopAlarm = () => {
    Alarm.stop(
      success => alert(success),
      fail => alert(fail),
    );
  };

  return (
    <NativeBaseProvider>
      <HStack justifyContent="flex-end">
        <Button variant="ghost" onPress={() => stopAlarm()}>
          Stop Alarm
        </Button>
        <Button
          variant="ghost"
          onPress={() => showList()}
          style={{marginRight: 20}}>
          Alarm List
        </Button>
      </HStack>
      <ScrollView>
        <Center>
          {getListModal()}
          {getModifyModal()}
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
            <Heading size="md">Title</Heading>
            <Input
              variant="outline"
              placeholder="Alarm Title"
              onChangeText={value => setCreateTitle(value)}
              style={{marginBottom: 10}}
            />
            <Heading size="md">Text</Heading>
            <Input
              variant="outline"
              placeholder="Alarm Text"
              onChangeText={value => setCreateText(value)}
              style={{marginBottom: 10}}
            />
            <Heading size="md">Sound</Heading>
            <Select
              selectedValue={createSound}
              onValueChange={value => selectCreateSound(value)}>
              <Select.Item label="Adventure" value="0" />
              <Select.Item label="Bliss" value="1" />
              <Select.Item label="The Inspiration" value="2" />
            </Select>
            <HStack justifyContent="space-between" style={{marginTop: 10}}>
              <Heading size="md">Icon</Heading>
              <HStack>
                <Image
                  source={{uri: iconList[0]}}
                  size={25}
                  alt={iconList[0]}
                  style={{marginRight: 10}}
                />
                <Image
                  source={{uri: iconList[1]}}
                  size={25}
                  alt={iconList[1]}
                  style={{marginRight: 10}}
                />
                <Image
                  source={{uri: iconList[2]}}
                  size={25}
                  alt={iconList[2]}
                />
              </HStack>
            </HStack>
            <Select
              selectedValue={createIcon}
              onValueChange={value => setCreateIcon(value)}>
              <Select.Item label="Mail" value="0" />
              <Select.Item label="User" value="1" />
              <Select.Item label="Like" value="2" />
            </Select>
            <HStack justifyContent="space-between" style={{marginTop: 10}}>
              <Heading size="md">Sound Loop</Heading>
              <Switch
                size="lg"
                colorScheme="emerald"
                isChecked={createSoundLoop}
                onToggle={() => setCreateSoundLoop(!createSoundLoop)}
                style={{marginLeft: 50}}
              />
            </HStack>
            <HStack justifyContent="space-between">
              <Heading size="md">Vibration</Heading>
              <Switch
                size="lg"
                colorScheme="emerald"
                isChecked={createVibration}
                onToggle={() => toggleCreateVibration()}
                style={{marginLeft: 50}}
              />
            </HStack>
            <HStack justifyContent="space-between">
              <Heading size="md">Notification Removable</Heading>
              <Switch
                size="lg"
                colorScheme="emerald"
                isChecked={createNotiRemovable}
                onToggle={() => setCreateNotiRemovable(!createNotiRemovable)}
                style={{marginLeft: 50}}
              />
            </HStack>
            <Button
              onPress={() => createAlarm()}
              style={{marginTop: 10, marginBottom: 30}}>
              Create Alarm
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default App;
