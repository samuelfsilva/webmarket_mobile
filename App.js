import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import io from 'socket.io-client';
import {SOCKET_SERVER} from 'react-native-dotenv';
import Mensagem from './src/chat';
import Router from './routes';
/* 
var socket = io();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket = io(SOCKET_SERVER, {transports: ['websocket']});
    //console.log(SOCKET_SERVER);
  }

  buttonPressEnviar(usuario, mensagem) {
    var ObjectMessage = {
      usuario: usuario,
      mensagem: mensagem,
    };
    socket.emit('mensagem', ObjectMessage);
  }

  render() {
    return (
      <>
        <Mensagem callBackEnviar={this.buttonPressEnviar} />
      </>
    );
  }
}
 */
const App = () => <View />;
export default App;
