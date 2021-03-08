import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
    ViewPropTypes,
    Platform,
} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import styles from './FingerprintPopup.component.styles';
import ShakingText from './ShakingText.component';


// Based on https://github.com/hieuvp/react-native-fingerprint-scanner/blob/master/examples/src/FingerprintPopup.component.android.js
// - this example component supports both the legacy device-specific (Android < v23) and
//   current (Android >= 23) biometric APIs
// - your lib and implementation may not need both
class BiometricPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessageLegacy: undefined,
            biometricLegacy: undefined,
        };

        this.description = null;
    }

    componentDidMount() {
        //判断设备是否支持指纹识别
        this.detectFingerprintAvailable();
        //判断Android API是不是<23，高于此版本使用标准指纹解锁api;低于此版本使用兼容适配版本
        if (this.requiresLegacyAuthentication()) {
            this.authLegacy();
        } else {
            this.authCurrent();
        }
    }

    componentWillUnmount = () => {
        FingerprintScanner.release();
    };

    requiresLegacyAuthentication() {
        return Platform.Version < 23;
    }

    //检测手机是否支持指纹识别
    detectFingerprintAvailable = () => {
        FingerprintScanner
            .isSensorAvailable()
            .catch(error => {
                Alert.alert('您的设备不支持指纹识别，请选择其他方式登录');
            });
    };

    authCurrent() {
        FingerprintScanner
            .authenticate({description: this.props.description || '指纹登陆', cancelButton: '取消'})
            .then(() => {
                this.props.success();
            })
            .catch((error) => {
                this.props.handlePopupDismissed();
            });
    }

    authLegacy() {
        FingerprintScanner
            .authenticate({onAttempt: this.handleAuthenticationAttemptedLegacy, cancelButton: '取消'})
            .then(() => {
                this.props.success();
            })
            .catch((error) => {
                this.setState({errorMessageLegacy: error.message, biometricLegacy: error.biometric});
                this.description.shake();
            });
    }

    handleAuthenticationAttemptedLegacy = (error) => {
        this.setState({errorMessageLegacy: error.message});
        this.description.shake();
    };

    renderLegacy() {
        const {errorMessageLegacy, biometricLegacy} = this.state;
        const {style, handlePopupDismissedLegacy} = this.props;

        return (
            <View style={styles.container}>
                <View style={[styles.contentContainer, style]}>

                    <Image
                        style={styles.logo}
                        source={require('./assets/finger_print.png')}
                    />

                    <Text style={styles.heading}>
                        Biometric{'\n'}Authentication
                    </Text>
                    <ShakingText
                        ref={(instance) => {
                            this.description = instance;
                        }}
                        style={styles.description(!!errorMessageLegacy)}>
                        {errorMessageLegacy || `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
                    </ShakingText>

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={handlePopupDismissedLegacy}
                    >
                        <Text style={styles.buttonText}>
                            BACK TO MAIN
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }


    render = () => {
        if (this.requiresLegacyAuthentication()) {
            return this.renderLegacy();
        }

        // current API UI provided by native BiometricPrompt
        return null;
    };
}

BiometricPopup.propTypes = {
    description: PropTypes.string,
    handlePopupDismissedLegacy: PropTypes.func,
    style: ViewPropTypes.style,
};

export default BiometricPopup;

