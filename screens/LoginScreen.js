import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackgroundBase, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
      
      {/*Top*/}
      <ImageBackground
        source={require('../assets/bglogin.jpg')}
        style={{
          height: Dimensions.get('window').height / 2.5, 
        }}>

        <View style={styles.titleView}>
          <MaterialCommunityIcons name="account" style={{color: '#fff', fontSize: 85}}/>
          <Text style={styles.title}>SecuriSEE</Text>
        </View>
      </ImageBackground>
    
      {/*Bottom*/} 
      <View style={styles.bottomView}>
 
      <View style={{padding: 20}}>
        <Text style={{color:'#4ed9b8', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Welcome</Text> 
        <Text>Login to access your account</Text>
      </View>

      <View style={{marginTop: 30}}>
        <Text>Enter IC Number:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="IC number" 
          onChangeText={(text) => {setIC(text)}}
        />
        
      </View>

      <View style={{padding: 30}}>
      <Text>Enter Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password" 
          secureTextEntry={true} 
          onChangeText={(text) => {setPassword(text)}}
        />
      </View>

      <View style={styles.row}>
        <Text style={{color: 'grey'}}>Don't have an account? </Text>
        <Text  onPress={() => {navigation.navigate('Register')}}>Register Here</Text>
      </View>
      
      <View style={styles.loginBtn} >
      <Button rounded color='#4ed9b8' title="Login" onPress={loginUser} ></Button>
      <StatusBar style='auto'/>
      </View>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  bottomView: {
    flex: 1.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    //justifyContent: 'center',
  },
  
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
  },

  input: {
    borderColor: 'gray',
    borderWidth: 2,
    height: 40,
    width: 300,
    textAlign: 'center',
    borderStyle: 'solid',
    borderRadius: 6
  },

  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
  },

  loginBtn: {
    color: '#4ed9b8',
    fontSize: 20,
    width: 400,
    justifyContent: 'center',
    padding: 40,
  }

});
