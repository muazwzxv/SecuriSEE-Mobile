import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, TouchableOpacity, TextInput } from 'react-native';

export default function ProfileScreen(props) {

  return (
    <View style={styles.container}>
      
      <View style={{padding: 20}}>
        <Text style={{color:'#4ed9b8', fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>User Profile</Text> 
      </View>

      <View>
        <Text>Full Name:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Abu bin Hassan"
          onChangeText={(text) => {setName(text)}}
        />
      </View>
      <View style={{marginTop: 15}}>
      <Text>IC Number:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="861230012345"
          onChangeText={(text) => {setIC(text)}}
        />
      </View>
      <View style={{marginTop: 15}}>
      <Text>E-mail:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="abuhassan@gmail.com" 
          onChangeText={(text) => {setEmail(text)}}
        />
      </View>
      <View style={{marginTop: 15}}>
      <Text>Phone Number:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="abu1234" 
          onChangeText={(text) => {setPhone(text)}}
        />
      </View>
      <View style={{marginTop: 15}}>
      <Text>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="********" 
          secureTextEntry={true} 
          onChangeText={(text) => {setPassword(text)}}
        />
      </View>

      <View style={styles.btn} >
      <Button rounded color='#4ed9b8' title="Save Changes"></Button>
      <StatusBar style='auto'/>
      </View>

      <View>
      <Button title='Log Out' onPress={props.logout}/>
      <StatusBar style='auto'/>
      </View>

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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  input: {
    borderColor: 'gray',
    borderWidth: 2,
    height: 40,
    width: 300,
    textAlign: 'center',
    borderStyle: 'solid',
    borderRadius: 6,
  },

  btn: {
    fontSize: 20,
    width: 300,
    justifyContent: 'center',
    padding: 20,
  },
});
