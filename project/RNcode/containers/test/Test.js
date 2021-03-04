import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BiometricPopup from '../components/BiometricPopup/BiometricPopup';

class Test extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.s = '';
  }
  componentDidMount(): void {}
  componentWillUnmount() {}

  render() {
    return (
      <View>
        <Text>{`测试页面+${this.s}`}</Text>
        <BiometricPopup
          onAuthenticate={() => {
            alert('该登陆了');
          }}
        />
      </View>
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
export default Test;
