import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

class WelcomeSvreen extends React.Component {
  componentDidMount(): void {
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('App');
    }, 2000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <Image source={require('../../resources/images/welcome/startPage.png')} />
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
export default WelcomeSvreen;
