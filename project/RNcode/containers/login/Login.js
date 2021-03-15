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
    TouchableHighlight, AppState, Image,
    NativeModules,
    DeviceEventEmitter,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerprintPopup from '../components/BiometricPopup/FingerprintPopup.component.android';

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
            errorMessage: undefined,
            biometric: undefined,
            popupShowed: false,
        };
    }

    componentDidMount(): void {
        AppState.addEventListener('change', this.handleAppStateChange);
        // Get initial fingerprint enrolled
        this.detectFingerprintAvailable();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleFingerprintShowed = () => {
        this.setState({popupShowed: true});
    };

    handleFingerprintDismissed = () => {
        this.setState({popupShowed: false});
    };

    detectFingerprintAvailable = () => {
        FingerprintScanner.isSensorAvailable().catch((error) =>
            this.setState({errorMessage: error.message, biometric: error.biometric}),
        );
    };

    handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState &&
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            FingerprintScanner.release();
            this.detectFingerprintAvailable();
        }
        this.setState({appState: nextAppState});
    };


    onPress = () => {
        // this.login();
        this.props.navigation.navigate('Test');
    };

    handleArcface = () => {
        NativeModules.Arcface.goArcfaceScreen();
    };

    // 判断面部识别是否成功
    checkRecognize = () => {
        NativeModules.Arcface.checkrecognize((error) => {
            console.log(error);
        }, (isRecognize) => {
            if (isRecognize) {
                this.onPress();
            } else {
                console.log("识别失败")
            }
        });
    };

    // 判断注册面部识别是否成功
    checkRegister = () => {
        NativeModules.Arcface.checkregister((error) => {
            console.log(error);
        }, (isRegister) => {
            if (isRegister) {
                alert('注册成功，将本地账号绑定')
            } else {
                alert('注册失败')
            }
        });
    };

    render() {
        const {errorMessage, biometric, popupShowed} = this.state;
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

                        {/*指纹登陆*/}
                        <TouchableOpacity
                            style={styles.fingerprint}
                            onPress={this.handleFingerprintShowed}>
                            <Text style={{color: 'red', fontSize: 25, textAlign: 'center'}}>指纹登陆</Text>
                        </TouchableOpacity>

                        {popupShowed && (
                            <FingerprintPopup
                                style={styles.popup}
                                handlePopupDismissed={this.handleFingerprintDismissed}
                                success={() => {
                                    this.onPress();
                                }}
                            />
                        )}

                        {/*面部识别*/}
                        <TouchableOpacity
                            style={styles.fingerprint}
                            onPress={this.handleArcface}>
                            <Text style={{color: 'red', fontSize: 25, textAlign: 'center'}}>面部识别</Text>
                        </TouchableOpacity>
                        {
                            this.checkRecognize()
                        }

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
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
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
