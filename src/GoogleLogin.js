import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

GoogleSignin.configure();

signIn = async () => {
  try {
    const teste = await GoogleSignin.hasPlayServices();
    console.log(teste);
    const userInfo = await GoogleSignin.signIn();
    console.log('teste');
    this.setState({userInfo});
    console.log(this.state.userInfo);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Cancelado');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      this.setState({isSigninInProgress: true});
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Não foi possível conectar');
    } else {
      console.log(error);
    }
  }
};

export default //import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class MyClass extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MyClass</Text>
            </View>
        );
    }
}

//make this component available to the app
export default MyClass;
