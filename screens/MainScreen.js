import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import components
import deviceStorage from '../services/deviceStorage';
import Loading from '../components/Loading';
import Auth from './Auth';
import Registration from './RegisterScreeen';
import Login from './LoginScreen';
import Home from './user/HomeScreen';
import Container from './user/UserContainer';

export default function MainScreen({ navigation }) {

  const [jwt,setJwt] = useState('');
  const [loading,setLoading] = useState(true);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('id_token');

      if(value !== null) {
        setJwt(value);
        setLoading(false);
      }else {
        setLoading(false);
      }
    }catch (err) {
      alert(err);
    }
  };

  const newJWT = (JWT) => {
    setJwt(JWT);
    setLoading(false);
  }

  const loadHandler = (bool) => {
    setLoading(bool);
  }

  const logout = () => {
    deviceStorage.delJwt()
    setJwt('');
    setLoading(false);
  }

  useEffect(() => {
    getData();
  },[]);
  
  if(loading) {
    return(<Loading/>);
  } else if(!jwt) {
    return(<Login newJWT={newJWT} loadHandler={loadHandler}/>);
  } else if(jwt){
    return(<Container logout={logout}/>);
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
