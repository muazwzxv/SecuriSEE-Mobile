import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import axios from 'axios';

//import components 
import deviceStorage from '../services/deviceStorage';

export default function RegisterScreen(props) {

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
      url: 'http://0c96-2001-d08-d8-be8e-403a-2e07-68f4-5189.ngrok.io/api/user',
      data: {
        name: names,
        ic: IC,
        email: emailadd,
        phone: phone,
        password: passwords
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <View style={styles.container}>
      <Text>Registration Page </Text>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder="Name" 
          onChangeText={(text) => {setName(text)}}
        />
      </View>
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
          placeholder="Email" 
          onChangeText={(text) => {setEmail(text)}}
        />
      </View>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder="Phone" 
          onChangeText={(text) => {setPhone(text)}}
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
      <Button title="Register" onPress={registerUser}/>
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
