//import React from 'react';
//import {createStackNavigator} from 'react-navigation';
//import SafeAreaView from 'react-native-safe-area-view';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Principal from './src/principal';
import Detalhes from './src/detalhes';
import Login from './src/login';
import Cadastro from './src/cadastro';

const Router = createDrawerNavigator({
  Main: createStackNavigator({
    Login,
    Cadastro,
    Principal,
    Detalhes,
  }),
});

export default createAppContainer(Router);
