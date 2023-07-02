import React from 'react';
import { AppRegistry } from 'react-native';
import SettingsContextProvider from './settings/SettingsContext';
import FullView from './fullView';


export default App = () => (
    <SettingsContextProvider>
      <FullView />
    </SettingsContextProvider>
    );

AppRegistry.registerComponent("Snake", () => App);
