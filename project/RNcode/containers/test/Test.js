import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
