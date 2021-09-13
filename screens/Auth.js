import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

//import components
import {Loading} from '../components/Index';
import Login from './LoginScreen';
import Registration from './RegisterScreeen';

export default function Auth({ navigation }) {

    const [showLogin, setShowLogin] = useState(false);

    if(!showLogin) {
        return(<Registration/>);
    }else {
        return(<Login />);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
