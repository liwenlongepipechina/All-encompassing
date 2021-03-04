import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import WelcomeScreen from '../containers/welcome/WelcomeScreen';
import Login from '../containers/login/Login';
import Test from '../containers/test/Test';

const AppStack = createStackNavigator({
    Test: Test,
    Login: Login,
},{
    initialRouteName: 'Login',
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
