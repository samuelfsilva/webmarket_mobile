import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {SOCKET_SERVER} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';
import LoginForm from './loginForm';

class Login extends Component {
  render() {
    const {navigate} = this.props.navigation;
    AsyncStorage.getItem('token').then(value => {
      if (value === null) return;
      return new Promise(function(resolve, reject) {
        fetch(SOCKET_SERVER + '/items', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            if (!responseJson.error) {
              navigate('Principal');
            }
          });
      });
    });

    return (
      <View style={styles.tela}>
        <View style={styles.logo}>
          <Image
            style={styles.imageLogo}
            source={require('./images/logo.png')}
          />
        </View>
        <View style={styles.form}>
          <LoginForm
            loginCallback={(email, senha) => {
              this.login(email, senha, navigate);
            }}
          />
        </View>
      </View>
    );
  }
  async login(email, senha, navigate) {
      try {
        var response = await this.conectar(email, senha);
        if (response.error) {
          alert(response.error);
          return;
        }
        AsyncStorage.setItem('usuario', JSON.stringify(response.user));
        AsyncStorage.setItem('token', response.token);
        navigate('Principal');
    } catch (error) {
      alert(error);
    }
  }
  async conectar(email, senha) {
    console.log(email.length, senha.length);
    if (!email.length || !senha.length) return {
      error: 'Preencha o email e senha corretamente.'
    };
    try {
      var response = await fetch(SOCKET_SERVER + '/auth/authenticate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      });

      var responseJson = response.json();
      if (responseJson.error) {
        return {
          error: responseJson.error
        };
      }
      return responseJson;
    } catch (error) {
      return {error};
    }
  }
}

Login.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#27ae60',
  },
  logo: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: 200,
    height: 200,
  },
});

//make this component available to the app
export default Login;
