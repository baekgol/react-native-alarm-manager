import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import Alarm from 'react-native-alarm-manager';

const App = () => {
  Alarm.schedule(
    alarmInfo,
    success => {
      console.log('schedule success');
    },
    fail => {
      alert(fail);
    },
  );

  return (
    <NativeBaseProvider>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  );
};

export default App;
