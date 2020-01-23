import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CadForm from './cadForm';

class Cadastro extends Component {
  render() {
    return (
      <View style={styles.tela}>
        <CadForm />
      </View>
    );
  }
}

Cadastro.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#27ae60',
  },
});

export default Cadastro;
