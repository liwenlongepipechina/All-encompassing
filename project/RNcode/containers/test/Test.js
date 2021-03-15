import React from 'react';
import {NativeModules, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class Test extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.s = '';
    }

    componentDidMount(): void {
    }

    componentWillUnmount() {
    }

    handleArcface = () => {
        NativeModules.Arcface.goArcfaceScreen();
    };

    render() {
        return (
            <View>
                <Text>{`测试页面+${this.s}`}</Text>
                {/*面部识别*/}
                <TouchableOpacity
                    style={styles.fingerprint}
                    onPress={this.handleArcface}>
                    <Text style={{color: 'red', fontSize: 25, textAlign: 'center'}}>面部识别</Text>
                </TouchableOpacity>
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
