import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  PermissionsAndroid,
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
        console.log('Camera permission denied');
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

  render() {
    const {photo} = this.state;
    return (
      <View style={styles.tela}>
        {photo && <Image source={{uri: photo.uri}} style={styles.imagem} />}
        <Button
          title="Escolher Foto"
          onPress={() => this.handleChoosePhoto()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#27ae60',
  },
  imagem: {
    width: 300,
    height: 300,
  },
});

export default CadForm;
