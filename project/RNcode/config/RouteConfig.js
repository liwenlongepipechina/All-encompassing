import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import WelcomeScreen from '../containers/welcome/WelcomeScreen'
import Login from '../containers/login/Login'


const AppStack = createStackNavigator(
    {
  Login: Login,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Welcome: WelcomeScreen,
      App: AppStack,
    },
    {
      initialRouteName: 'Welcome',
    },
  ),
);
