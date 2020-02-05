import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class CadForm extends Component {
  state = {
    photo: null,
  };

  async acesso() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.handleChoosePhoto();
      } else {
        console.log('Permissão a camera negada');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  handleChoosePhoto() {
    //alert('Email ou senha inválida.', 'Autenticação', [{text: 'OK'}]);
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  }

  exibeImagem(photo) {
    if (photo) {
      return <Image source={{uri: photo.uri}} style={styles.imagem} />;
    } else {
      return <Image source={require('./images/profile.png')} style={styles.imagem} />
    }
  }

  render() {
    const {photo} = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.tela}>
        <View style={styles.centralizar}>
          {this.exibeImagem(photo)}
          <Button
            title="Escolher Foto"
            onPress={() => this.handleChoosePhoto()}
          />
        </View>
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          placeholder="nome"
          returnKeyType="next"
          onSubmitEditing={() => this.emailInput.focus()}
          autoCapitalize="none"
          onChangeText={text => this.setState({email: text})}
          style={[styles.input, styles.botaoFoto]}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          placeholder="email"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          ref={input => (this.emailInput = input)}
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
          <Text style={styles.botaoTexto}>CADASTRAR</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  tela: {
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#27ae60',
  },
  imagem: {
    width: 200,
    height: 200,
    marginTop: 50,
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
    marginBottom: 10,
  },
  botaoTexto: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
  },
  botaoFoto: {
    marginTop: 10,
  },
  centralizar: {
    alignItems: "center",
  },
});

export default CadForm;
