import React from 'react';
import {Image, View, Text, StyleSheet, TouchableHighlight} from 'react-native';

const Item = props => {
  const numFormat = num => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={'#ecf0f1'}
      onPress={() => props.callBackDetalhes(props.item)}>
      <View style={styles.item}>
        <Image source={{uri: props.item.imagemURI}} style={styles.imagem} />
        <View style={styles.info}>
          <View style={styles.linha}>
            <Text style={styles.titulo}>{props.item.nome}</Text>
          </View>
          <Text style={styles.valor}>R${numFormat(props.item.valor)}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 4,
    backgroundColor: '#FFF',
    marginBottom: 5,
    borderRadius: 5,
  },
  imagem: {
    width: 120,
    height: 120,
    //resizeMode: 'contain',
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    color: '#485460',
  },
  valor: {
    fontSize: 22,
    color: 'green',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    //justifyContent: 'space-between',
    marginLeft: 10,
    marginVertical: 2,
    flex: 1,
  },
});

export default Item;
