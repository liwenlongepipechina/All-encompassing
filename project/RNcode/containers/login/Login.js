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
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      count: 1,
    };
  }
  componentDidMount(): void {}
  componentWillUnmount() {}
  onPress = () => {
    // this.login();
    this.props.navigation.navigate('Test');
  };
  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{
          width: width,
          height: height,
          justifyContent: 'center',
        }}
        scrollEnabled={false}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('../../resources/images/login/Bitmap.png')}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
              style={{
                backgroundColor: '#ffffff',
                width: (width * 9.5) / 10,
                height: 223,
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Text style={styles.text}>账号:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="请输入您的手机号码"
                  secureTextEntry={false}
                  onChangeText={(text) => {
                    this.setState({
                      username: text,
                    });
                  }}
                  underlineColorAndroid={'#7F8592'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flex: 1,
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <Text style={styles.text}>密码:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="请输入您的密码"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                  underlineColorAndroid={'#7F8592'}
                />
              </View>
            </View>

            {/*登录*/}
            <TouchableHighlight
              style={{
                backgroundColor: '#fa7268',
                width: 300,
                height: 49,
                borderBottomRightRadius: 30,
                borderTopRightRadius: 30,
                marginTop: -25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              underlayColor={'#DDDDDD'}
              onPress={this.onPress}>
              <Text style={{fontSize: 18, paddingRight: 10}}>登录</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }

  /********************************************************网络请求*************************************************/
  login = async () => {
    let body = {
      userName: this.state.username,
      password: this.state.password,
    };
    let url = 'http://192.168.8.243:8080/login';
    debugger;
    let response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    debugger;
    let result = await response.json();
    return result;
  };
  /*****************************************************************************************************************/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 18,
    borderRadius: 10,
    textAlign: 'left',
    flex: 4,
  },
  text: {
    fontSize: 18,
    color: '#7F8592',
    flex: 1,
    textAlign: 'right',
  },
});
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default Login;
