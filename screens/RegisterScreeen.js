import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

//import components 
import deviceStorage from '../services/deviceStorage';

export default function RegisterScreen(props) {
  const navigation = useNavigation();

  //set the state
  const [names,setName] = useState('');
  const [IC,setIC] = useState('');
  const [emailadd,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [passwords,setPassword] = useState('');

  //register a user
  const registerUser = () => {
    axios({
      method: 'post',
      url: 'http://138.3.215.26:80/api/user',
      data: {
        name: names,
        ic: IC,
        email: emailadd,
        phone: phone,
        password: passwords
      }
    })
    .then(() => {
      Alert.alert('Registration Success','User successfully registered');
      navigation.navigate('Main');
    })
    .catch((err) => {
      Alert.alert('Registration Error',err.response.data.Message);
    })
  }

  
  return (
    <View style={styles.container}>

      {/*Top*/}
      <ImageBackground
        source={require('../assets/bglogin.jpg')}
        style={{
          height: Dimensions.get('window').height / 4.8, 
        }}>

        <View style={styles.titleView}>
          <Text style={styles.title}>Registration</Text>
        </View>
      </ImageBackground>

       {/*Bottom*/} 
      <View style={styles.bottomView}>

      <View style={{padding: 20}}>
      <Text style={{color:'#4ed9b8', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Let's Get Started</Text> 
        <Text style={{textAlign: 'center'}}>Create a new SecuriSEE account</Text>
      </View>

      <View>
        <Text style={{paddingBottom: 5}}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Name" 
          onChangeText={(text) => {setName(text)}}
        />
      </View>
      <View>
        <Text style={{paddingTop: 15, paddingBottom: 5}}>IC Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder="************" 
          onChangeText={(text) => {setIC(text)}}
        />
      </View>
      <View>
      <Text style={{paddingTop: 15,paddingBottom: 5}}>E-mail</Text>
        <TextInput 
          style={styles.input} 
          placeholder="example@mail.com" 
          onChangeText={(text) => {setEmail(text)}}
        />
      </View>
      <View>
      <Text style={{paddingTop: 15,paddingBottom: 5}}>Phone Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder="01*********" 
          onChangeText={(text) => {setPhone(text)}}
        />
      </View>
      <View>
      <Text style={{paddingTop: 15,paddingBottom: 5}}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password" 
          secureTextEntry={true} 
          onChangeText={(text) => {setPassword(text)}}
        />
      </View>

      <View style={styles.regBtn} >
      <Button rounded color='#4ed9b8' title="Register" onPress={registerUser} ></Button>
      <StatusBar style='auto'/>
      </View>

      <View style={styles.row}>
        <Text style={{color: 'grey'}}>Already have an account? </Text>
        <Text  onPress={() => {navigation.navigate('Main')}}>Login Here</Text>
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
    paddingTop: 2,
  },

  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    width: 300,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderRadius: 6
  },

  title: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 30,
  },

  regBtn: {
    color: '#4ed9b8',
    fontSize: 20,
    width: 400,
    justifyContent: 'center',
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20
  }
});