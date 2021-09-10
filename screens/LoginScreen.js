import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function LoginScreen({ navigation }) {

  //set the state
  const [IC,setIC] = useState(0);
  const [password,setPassword] = useState('');

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
        <Text>Forgot Password</Text>
      </View>
      <Button title="Login" onPress={()=> {
        navigation.navigate('Container')
      }}></Button>
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
