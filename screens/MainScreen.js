import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

//import components
import {Loading} from '../components/Index';
import Auth from './Auth';
import Registration from './RegisterScreeen';
import Home from './user/HomeScreen';



export default function MainScreen({ navigation }) {

  const [jwt,setJwt] = useState('');

  //set a new jwt
  const newJWT = (JWT) => {
    setJwt(JWT);
  }

  if(jwt === '') {
    return(<Registration newJWT={newJWT}/>);
  } else {
    return(<Home />);
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
