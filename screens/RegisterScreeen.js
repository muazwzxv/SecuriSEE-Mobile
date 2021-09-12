import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

//import components 
import deviceStorage from '../services/deviceStorage';

export default function RegisterScreen(props) {

  //set the state
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [IC,setIC] = useState(0);
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState(0);
  const [password,setPassword] = useState('');

  //register a user
  const registerUser = () => {
    axios({
      method: 'post',
      url: 'url',
      data: {
        firstname: fname,
        lastname: lname,
        icnumber: IC,
        emailAddress: email,
        phoneNo: phone,
        password: password
      }
    })
    .then((response) => {
      deviceStorage.saveItem(response.data.jwt);
      props.newJWT('hello');
    })
  }

  return (
    <View style={styles.container}>
      <Text>Registration Page </Text>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder="First Name" 
          onChangeText={(text) => {setIC(text)}}
        />
      </View>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder="Last Name" 
          onChangeText={(text) => {setIC(text)}}
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
          onChangeText={(text) => {setIC(text)}}
        />
      </View>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder="Phone" 
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
