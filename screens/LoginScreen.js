import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


//import components 
import deviceStorage from '../services/deviceStorage';

export default function LoginScreen(props) {
  const navigation = useNavigation();

  //set the state
  const [IC,setIC] = useState('');
  const [passwords,setPassword] = useState('');

  //login user
  const loginUser = async () => {
    try {
      props.loadHandler(true);
      const data = await axios({
        method: 'post',
        url: 'http://138.3.215.26:80/api/login',
        data: {
          ic: IC,
          password: passwords
        }
      })
      .then((response) => {
        deviceStorage.saveItem('id_token', response.data.Token);
        props.newJWT(response.data.Token);
      })
      .catch((err) => {
        Alert.alert('Login Error', err.response.data.Message);
        props.loadHandler(false);
      })
    }catch (e) {
      alert(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login Page </Text>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder="IC number" 
          onChangeText={(text) => {setIC(text)}}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Password" 
          secureTextEntry={true} 
          onChangeText={(text) => {setPassword(text)}}
        />
      </View>
      <View style={styles.row}>
        <Text style={{color: 'blue'}} onPress={() => {navigation.navigate('Register')}}>Don't have an account Register</Text>
      </View>
      <Button title="Login" onPress={loginUser}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
  },

  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    width: 200,
    textAlign: 'center'
  }
});
