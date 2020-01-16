import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
    };
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.tela}>
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          placeholder="email"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => this.setState({email: text})}
          style={styles.input}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          placeholder="senha"
          secureTextEntry
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          onChangeText={text => this.setState({senha: text})}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            this.props.loginCallback(this.state.email, this.state.senha)
          }>
          <Text style={styles.botaoTexto}>LOGIN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  tela: {
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#FFF',
    paddingHorizontal: 10,
  },
  botao: {
    backgroundColor: '#1a7d44',
    paddingVertical: 10,
  },
  botaoTexto: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
  },
});

export default LoginForm;
