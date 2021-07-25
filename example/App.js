import React, {useEffect, useState} from 'react';
import {Vibration} from 'react-native';
import {
  NativeBaseProvider,
  Container,
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
  IconButton,
  InfoOutlineIcon,
  SmallCloseIcon,
} from 'native-base';
import {TimePicker} from 'react-native-wheel-picker-android';
import moment from 'moment';
import Sound from 'react-native-sound';
import Alarm from 'react-native-alarm-manager';

const App = () => {
  const hours = [];
  const minutes = [];
  const [date, setDate] = useState(new Date());
  const [createTitle, setCreateTitle] = useState('');
  const [modifyTitle, setModifyTitle] = useState('');
  const [createText, setCreateText] = useState('');
  const [modifyText, setModifyText] = useState('');
  const [createSound, setCreateSound] = useState('0');
  const [modifySound, setModifySound] = useState('0');
  const [createIsVibration, setCreateIsVibration] = useState(true);
  const [modifyIsVibration, setModifyIsVibration] = useState(true);
  const [createIcon, setCreateIcon] = useState('0');
  const [modifyIcon, setModifyIcon] = useState('0');
  const [soundPlayerList, setSoundPlayerList] = useState(null);
  const [isListModal, setIsListModal] = useState(false);
  const [isModifyModal, setIsModifyModal] = useState(false);
  const [alarmList, setAlarmList] = useState([]);

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

  const selectCreateSound = value => {
    soundPlayerList[createSound].stop();
    setCreateSound(value);
    soundPlayerList[value].setVolume(1.0).play();
  };

  const toggleCreateVibration = () => {
    setCreateIsVibration(!createIsVibration);
    if (!createIsVibration) Vibration.vibrate();
  };

  const selectModifySound = value => {
    soundPlayerList[modifySound].stop();
    setModifySound(value);
    soundPlayerList[value].setVolume(1.0).play();
  };

  const toggleModifyVibration = () => {
    setModifyIsVibration(!modifyIsVibration);
    if (!modifyIsVibration) Vibration.vibrate();
  };

  const closeModifyModal = () => {
    soundPlayerList[modifySound].stop();
    setModifySound('0');
    setIsModifyModal(false);
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
              {alarmList.map(alarm => {
                const hour = alarm.alarm_time.substring(0, 2);
                const minute = alarm.alarm_time.substring(3, 5);

                return (
                  <HStack
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    key={alarm.alarm_id}>
                    <Tag
                      colorScheme="emerald"
                      size="sm"
                      rounded={'full'}
                      variant="outline"
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderWidth: 2,
                      }}>
                      <Text fontSize={20} bold>
                        {`${hour}:${minute}`}
                      </Text>
                    </Tag>
                    <Text fontSize={20} isTruncated>
                      {alarm.alarm_name}
                    </Text>
                    <HStack>
                      <IconButton
                        colorScheme="emerald"
                        icon={<InfoOutlineIcon />}
                        onPress={() => setIsModifyModal(true)}
                      />
                      <IconButton
                        colorScheme="secondary"
                        icon={<SmallCloseIcon />}
                        onPress={() => console.log('aaa')}
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
            <Center style={{paddingTop: 20}}>
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
                  onChangeText={value => setModifyTitle(value)}
                  style={{marginBottom: 20}}
                />
                <Heading size="md">Sound</Heading>
                <Select
                  selectedValue={modifySound}
                  onValueChange={value => selectModifySound(value)}>
                  <Select.Item label="Adventure" value="0" />
                  <Select.Item label="Bliss" value="1" />
                  <Select.Item label="The Inspiration" value="2" />
                </Select>
                <HStack
                  justifyContent="space-between"
                  style={{marginTop: 20, marginBottom: 20}}>
                  <Heading size="md">Vibration</Heading>
                  <Switch
                    size="lg"
                    colorScheme="emerald"
                    isChecked={createIsVibration}
                    onToggle={() => toggleModifyVibration()}
                    style={{marginLeft: 50}}
                  />
                </HStack>
              </VStack>
            </Center>
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
      fail => {
        console.log(fail);
      },
    );
  };

  const createAlarm = () => {
    const alarmInfo = {
      alarm_title: createTitle,
      alarm_text: createText,
      alarm_sound: soundList[createSound].src,
      alarm_vibration: createIsVibration,
      alarm_icon: createIcon,
      alarm_time: dateToTime(date),
      alarm_activate: true,
    };

    Alarm.schedule(
      alarmInfo,
      success => {
        console.log(success);
      },
      fail => {
        alert(fail);
      },
    );
  };

  return (
    <NativeBaseProvider>
      <Button
        variant="ghost"
        onPress={() => showList()}
        style={{alignSelf: 'flex-end', marginRight: 20}}>
        Alarm List
      </Button>
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
            <HStack
              justifyContent="space-between"
              style={{marginTop: 10, marginBottom: 10}}>
              <Heading size="md">Vibration</Heading>
              <Switch
                size="lg"
                colorScheme="emerald"
                isChecked={createIsVibration}
                onToggle={() => toggleCreateVibration()}
                style={{marginLeft: 50}}
              />
            </HStack>
            <Heading size="md">Icon</Heading>
            <Select
              selectedValue={createIcon}
              onValueChange={value => setCreateIcon(value)}>
              <Select.Item label="basic1" value="0" />
              <Select.Item label="basic2" value="1" />
              <Select.Item label="baisc3" value="2" />
            </Select>
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
