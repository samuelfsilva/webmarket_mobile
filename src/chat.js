import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
//import io from 'socket.io-client';
//import {SOCKET_SERVER} from 'react-native-dotenv';

//var socket = io();

export default function Mensagem(props) {
  const [usuario, setUsuario] = useState('');
  const [mensagem, setMensagem] = useState('');

  return (
    <View>
      <Text>Conversa</Text>
      <Text>{usuario}</Text>
      <TextInput
        placeholder="Usuário"
        onChangeText={text => setUsuario(text)}
      />
      <TextInput
        placeholder="Mensagem"
        onChangeText={text => setMensagem(text)}
      />
      <Button
        title="Enviar"
        onPress={() => {
          props.callBackEnviar(usuario, mensagem);
        }}
      />
    </View>
  );
}
