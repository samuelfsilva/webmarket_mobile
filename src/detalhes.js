import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

const width = Dimensions.get('window').width;

class Detalhes extends Component {
  render() {
    const item = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.tela}>
        <Image source={{uri: item.imagemURI}} style={styles.imagem} />
        <View style={styles.bloco}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.valor}>R${item.valor}</Text>
        </View>
        <View style={styles.divisao} />
        <View style={[styles.bloco, styles.espaco]}>
          <Text style={styles.titulo}>Descricao</Text>
          <Text style={styles.texto}>{item.descricao}</Text>
        </View>
        <View style={styles.divisao} />
        <View style={[styles.bloco, styles.espaco]}>
          <Text style={styles.titulo}>Localização</Text>
          <Text style={styles.texto}>Rua Riachuelo</Text>
        </View>
      </ScrollView>
    );
  }
}

Detalhes.navigationOptions = {
  title: 'Anúncio',
  headerStyle: {
    backgroundColor: '#27ae60',
  },
  headerTintColor: '#FFF',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FFF',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  imagem: {
    width: width,
    height: width,
    resizeMode: 'contain',
    backgroundColor: '#ecf0f1',
  },
  divisao: {
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  bloco: {
    paddingLeft: 10,
    paddingVertical: 15,
  },
  espaco: {
    paddingBottom: 80,
    paddingTop: 30,
  },
  nome: {
    fontSize: 30,
    paddingBottom: 10,
    color: '#485460',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#485460',
  },
  texto: {
    fontSize: 17,
    color: '#485460',
  },
  valor: {
    fontSize: 25,
    color: 'green',
  },
});

//make this component available to the app
export default Detalhes;
