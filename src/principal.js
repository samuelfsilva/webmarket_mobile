import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {SOCKET_SERVER} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';
import Item from './item';

class Principal extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      auth: true,
      loading: false,
    };
  }

  async getItems() {
    let token = await AsyncStorage.getItem('token');
    console.log(token);
    return await new Promise(function(resolve, reject) {
      fetch(SOCKET_SERVER + '/items', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error) {
            reject({auth: false});
          }
          resolve(responseJson.items);
        })
        .catch(error => {
          console.error('Erro: ', error);
        });
    });
  }

  exibeLista(items, navigate) {
    if (!this.state.auth) {
      return (
        <View style={[styles.tela, styles.linha, styles.erroMessage]}>
          <Text style={styles.erroText}>Falha de autenticação.</Text>
        </View>
      );
    } else if (items.length) {
      return (
        <View style={styles.tela}>
          <View style={styles.lista}>
            <FlatList
              scrollEnabled={true}
              data={items}
              renderItem={_items => (
                <Item
                  item={_items.item}
                  callBackDetalhes={values => navigate('Detalhes', values)}
                />
              )}
              keyExtractor={__item => __item._id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loading}
                  onRefresh={this.carregar.bind(this)}
                />
              }
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.tela, styles.linha, styles.erroMessage]}>
          <Text style={styles.erroText}>Nenhum item encontrado.</Text>
        </View>
      );
    }
  }

  async carregar() {
    this.setState({loading: true});
    await this.getItems()
      .then(
        value =>
          this.setState({
            items: value,
            auth: true,
          }),
        this.setState({loading: false}),
      )
      .catch(
        error =>
          this.setState({
            items: [],
            auth: false,
          }),
        this.setState({loading: false}),
      );
  }

  async UNSAFE_componentWillMount() {
    await this.carregar();
  }

  render() {
    const {navigate} = this.props.navigation;
    return this.exibeLista(this.state.items, navigate);
  }
}

Principal.navigationOptions = {
  title: '',
  headerLeft: null,
  headerStyle: {
    backgroundColor: '#27ae60',
  },
  headerTintColor: '#FFF',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default Principal;

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#ecf0f1',
  },
  texto: {
    fontSize: 20,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fundo: {
    //backgroundColor: '#000',
  },
  lista: {
    flex: 1,
  },
  erroMessage: {
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  erroText: {
    color: '#485460',
    fontWeight: '700',
    fontSize: 15,
  },
});
