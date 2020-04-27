import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };
  componentDidMount(): void {}
  componentWillUnmount() {}

  render() {
    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../../resources/images/login/Bitmap.png')}>
        <Text>123</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Login;
