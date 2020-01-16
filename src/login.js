import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {SOCKET_SERVER} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';
import LoginForm from './loginForm';

class Login extends Component {
  render() {
    const {navigate} = this.props.navigation;
    AsyncStorage.getItem('token').then(value => {
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
    await this.conectar(email, senha)
      .then(value => {
        AsyncStorage.setItem('usuario', JSON.stringify(value.user));
        AsyncStorage.setItem('token', value.token);
        navigate('Principal');
      })
      .catch(error => {
        alert('Email ou senha inválida.', 'Autenticação', [{text: 'OK'}]);
      });
  }
  async conectar(email, senha) {
    return await new Promise(function(resolve, reject) {
      fetch(SOCKET_SERVER + '/auth/authenticate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error) {
            reject({error: responseJson.error});
          }
          //console.log(responseJson);
          resolve(responseJson);
        })
        .catch(error => {
          console.error('Erro: ', error);
        });
    });
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
