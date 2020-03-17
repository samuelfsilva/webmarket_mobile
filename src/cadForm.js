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
  ScrollView,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

var hoje = new Date();
var hojeStr = String(hoje.getDate()).padStart(2,'0') + "/"+ String(hoje.getMonth()+1).padStart(2,'0') +"/"+hoje.getFullYear()
class CadForm extends Component {
  
  state = {
    photo: null,
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    senhaConf: '',
    data: hojeStr,
    showData: false,
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

  selecionaData() {
    this.setState({
      showData: true,
    });
  }

  Alerta(str) {
    Alert.alert('Confirmação de dados', str);
  }

  isEmpty(str) {
    var texto = str.trim();
    return (!texto || 0 === texto.length);
  }

  IsEmail(str){
    var email = str.trim();
    var usuario = email.substring(0, email.indexOf("@"));
    var dominio = email.substring(email.indexOf("@")+ 1, email.length);
    if ((usuario.length >=1) &&
        (dominio.length >=3) && 
        (usuario.search("@")==-1) && 
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) && 
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&      
        (dominio.indexOf(".") >=1)&& 
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
      return true;
    }else {
      return false;
    }
  }

  senhaValida(str) {
    var senha = str;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    return strongRegex.test(senha);
  }

  critica() {
    const {nome, sobrenome, email, senha, senhaConf, data} = this.state;

    if (this.isEmpty(nome)) {
      this.Alerta('Informe o nome.');
      this.nomeInput.focus();
      return false;
    }
    if (this.isEmpty(sobrenome)) {
      this.Alerta('Informe o sobrenome.');
      this.sobrenomeInput.focus();
      return false;
    }
    if (this.isEmpty(email)) {
      this.Alerta('Informe o email.');
      this.emailInput.focus();
      return false;
    }
    if (!this.IsEmail(email)) {
      this.Alerta('Informe um email válido.');
      this.emailInput.focus();
      return false;
    }
    if (this.isEmpty(senha)) {
      this.Alerta('Informe a senha.');
      this.passwordInput.focus();
      return false;
    }
    if (this.isEmpty(senhaConf)) {
      this.Alerta('Informe a senha de confirmação.');
      this.passwordConfInput.focus();
      return false;
    }
    if (senha !== senhaConf) {
      this.Alerta('As senhas devem ser identicas.');
      this.passwordConfInput.focus();
      return false;
    }
    if (!this.senhaValida(senha)) {
      this.Alerta('A senha deve conter os itens a seguir:\n\n-No minimo 8 caracteres\n-Letras minúsculas\n-Letras maiúsculas\n-Caracteres númericos\n-Caracteres especiais');
      this.passwordInput.focus();
      return false;
    }
  }

  setCadastro() {
    if (!this.critica()) {
      //
    }
  }

  render() {
    const {photo} = this.state;
    return (
      <ScrollView>
        <KeyboardAvoidingView>
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
            onSubmitEditing={() => this.sobrenomeInput.focus()}
            autoCapitalize="none"
            onChangeText={text => this.setState({nome: text})}
            ref={input => (this.nomeInput = input)}
            style={[styles.input, styles.botaoFoto]}
          />
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.7)"
            placeholder="sobrenome"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
            autoCapitalize="none"
            ref={input => (this.sobrenomeInput = input)}
            onChangeText={text => this.setState({sobrenome: text})}
            style={styles.input}
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
            returnKeyType="next"
            ref={input => (this.passwordInput = input)}
            onSubmitEditing={() => this.passwordConfInput.focus()}
            onChangeText={text => this.setState({senha: text})}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.7)"
            placeholder="confirmar senha"
            secureTextEntry
            returnKeyType="next"
            ref={input => (this.passwordConfInput = input)}
            onSubmitEditing={() => this.dataInput.focus()}
            onChangeText={text => this.setState({senhaConf: text})}
            style={styles.input}
          />
          {this.state.showData && 
            <DateTimePicker 
              mode="date" 
              value={new Date()} 
              onChange={date => {
                if (date !== "dismissed") {
                  var dt = new Date(date.nativeEvent.timestamp);
                  var dtStr = String(dt.getDate()).padStart(2, '0') + '/' + 
                    String(dt.getMonth()+1).padStart(2, '0') + '/' + 
                    dt.getFullYear();
                  this.setState({data: dtStr, showData: false,});
                } else {
                  this.setState({showData: false,});
                }
              }} 
              display="spinner"
            />}
          <TouchableOpacity
            onPress={this.selecionaData.bind(this)}>
            <Text
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go" 
              ref={input => (this.dataInput = input)}
              style={[styles.input, styles.inputDis]}
            >{this.state.data}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              this.setCadastro()
            }>
            <Text style={styles.botaoTexto}>CADASTRAR</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
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
    //height: 40,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#FFF',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'green',
    fontSize: 20,
  },
  inputDis: {
    paddingTop: 12,
    height: 50,
  },
  botao: {
    backgroundColor: '#1a7d44',
    paddingVertical: 10,
    //marginBottom: 10,
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
