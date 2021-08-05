import React from 'react';
import {
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
  Link,
  IconButton,
  InfoOutlineIcon,
  SmallCloseIcon,
} from 'native-base';
import {TimePicker} from 'react-native-wheel-picker-android';

const loadListModal = (
  listModal,
  alarmList,
  openModifyModal,
  deleteAlarm,
  toggleAlarm,
  setListModal,
) => {
  return listModal ? (
    <Modal isOpen={listModal} closeOnOverlayClick={false}>
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
                      onPress={() => openModifyModal(alarm)}
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
              setListModal(false);
            }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ) : null;
};

const loadModifyModal = (
  modifyModal,
  modifyDate,
  hours,
  minutes,
  modifyTitle,
  modifyText,
  modifySound,
  iconList,
  modifyIcon,
  modifySoundLoop,
  modifyVibration,
  modifyNotiRemovable,
  closeModifyModal,
  setModifyDate,
  setModifyTitle,
  setModifyText,
  selectModifySound,
  setModifyIcon,
  setModifySoundLoop,
  toggleModifyVibration,
  setModifyNotiRemovable,
  modifyAlarm,
) => {
  return modifyModal ? (
    <Modal
      isOpen={modifyModal}
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
                  initDate={modifyDate}
                  hours={hours}
                  minutes={minutes}
                  onTimeSelected={currDate => setModifyDate(currDate)}
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
                  value={modifyTitle}
                  onChangeText={value => setModifyTitle(value)}
                  style={{marginBottom: 10}}
                />
                <Heading size="md">Text</Heading>
                <Input
                  variant="outline"
                  placeholder="Alarm Text"
                  value={modifyText}
                  onChangeText={value => setModifyText(value)}
                  style={{marginBottom: 10}}
                />
                <Heading size="md">Sound</Heading>
                <Select
                  selectedValue={modifySound}
                  onValueChange={value => selectModifySound(value)}>
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
                  selectedValue={modifyIcon}
                  onValueChange={value => setModifyIcon(value)}>
                  <Select.Item label="Mail" value="0" />
                  <Select.Item label="User" value="1" />
                  <Select.Item label="Like" value="2" />
                </Select>
                <HStack justifyContent="space-between" style={{marginTop: 10}}>
                  <Heading size="md">Sound Loop</Heading>
                  <Switch
                    size="lg"
                    colorScheme="emerald"
                    isChecked={modifySoundLoop}
                    onToggle={() => setModifySoundLoop(!modifySoundLoop)}
                  />
                </HStack>
                <HStack justifyContent="space-between">
                  <Heading size="md">Vibration</Heading>
                  <Switch
                    size="lg"
                    colorScheme="emerald"
                    isChecked={modifyVibration}
                    onToggle={() => toggleModifyVibration()}
                  />
                </HStack>
                <HStack justifyContent="space-between">
                  <Heading size="md">Notification Removable</Heading>
                  <Switch
                    size="lg"
                    colorScheme="emerald"
                    isChecked={modifyNotiRemovable}
                    onToggle={() =>
                      setModifyNotiRemovable(!modifyNotiRemovable)
                    }
                  />
                </HStack>
              </VStack>
            </Center>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onPress={() => modifyAlarm()}>
            Modify
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ) : null;
};

const loadContactModal = (contactModal, setContactModal) => {
  return contactModal ? (
    <Modal isOpen={contactModal} closeOnOverlayClick={false}>
      <Modal.Content maxWidth="200px">
        <Modal.Header>Contact</Modal.Header>
        <Modal.Body>
          <HStack>
            <Text
              fontSize="lg"
              alignSelf="center"
              style={{marginRight: 5}}
              bold>
              Baekgol
            </Text>
            <Link
              _text={{color: 'blue.700'}}
              href="https://github.com/baekgol"
              isExternal>
              (Github)
            </Link>
          </HStack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onPress={() => setContactModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ) : null;
};

const loadOpenSourceModal = (openSourceModal, setOpenSourceModal) => {
  return openSourceModal ? (
    <Modal isOpen={openSourceModal} closeOnOverlayClick={false}>
      <Modal.Content maxWidth="400px">
        <Modal.Header>Open Source</Modal.Header>
        <Modal.Body>
          <Text
            fontSize="lg"
            style={{
              color: '#616161',
            }}
            bold>
            react-native
          </Text>
          <Link
            _text={{color: 'blue.700'}}
            href="https://github.com/facebook/react-native"
            isUnderlined
            isExternal>
            https://github.com/facebook/react-native
          </Link>
          <Text
            fontSize="sm"
            style={{
              color: '#616161',
              lineHeight: 20,
              marginBottom: 20,
            }}>
            Copyright (c) Facebook, Inc{'\n'}
            MIT License
          </Text>

          <Text
            fontSize="lg"
            style={{
              color: '#616161',
            }}
            bold>
            react-sound
          </Text>
          <Link
            _text={{color: 'blue.700'}}
            href="https://github.com/zmxv/react-native-sound"
            isUnderlined
            isExternal>
            https://github.com/zmxv/react-native-sound
          </Link>
          <Text
            fontSize="sm"
            style={{
              color: '#616161',
              lineHeight: 20,
              marginBottom: 20,
            }}>
            Copyright (c) Zhen Wang{'\n'}
            MIT License
          </Text>

          <Text
            fontSize="lg"
            style={{
              color: '#616161',
            }}
            bold>
            react-native-wheel-picker-android
          </Text>
          <Link
            _text={{color: 'blue.700'}}
            href="https://github.com/Cero-Studio/ReactNativeWheelPicker"
            isUnderlined
            isExternal>
            https://github.com/Cero-Studio/ReactNativeWheelPicker
          </Link>
          <Text
            fontSize="sm"
            style={{
              color: '#616161',
              lineHeight: 20,
              marginBottom: 20,
            }}>
            Copyright (c) Cero-Studio{'\n'}
            MIT License
          </Text>

          <Text
            fontSize="lg"
            style={{
              color: '#616161',
            }}
            bold>
            moment
          </Text>
          <Link
            _text={{color: 'blue.700'}}
            href="https://github.com/moment/moment"
            isUnderlined
            isExternal>
            https://github.com/moment/moment
          </Link>
          <Text
            fontSize="sm"
            style={{
              color: '#616161',
              lineHeight: 20,
              marginBottom: 20,
            }}>
            Copyright (c) JS Foundation{'\n'}
            MIT License
          </Text>

          <Text
            fontSize="lg"
            style={{
              color: '#616161',
            }}
            bold>
            native-base
          </Text>
          <Link
            _text={{color: 'blue.700'}}
            href="https://github.com/GeekyAnts/NativeBase"
            isUnderlined
            isExternal>
            https://github.com/GeekyAnts/NativeBase
          </Link>
          <Text
            fontSize="sm"
            style={{
              color: '#616161',
              lineHeight: 20,
              marginBottom: 20,
            }}>
            Copyright (c) GeekyAnts{'\n'}
            Apache License 2.0
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onPress={() => setOpenSourceModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ) : null;
};

export {loadListModal, loadModifyModal, loadContactModal, loadOpenSourceModal};
