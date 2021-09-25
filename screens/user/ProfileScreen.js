import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, TouchableOpacity, TextInput, ImageBackground, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function ProfileScreen(props) {

  //all the states
  const [name,setName] = useState('');
  const [IC,setIC] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [passw,setPassword] = useState('');

  useEffect(() => {
    setName(props.userData.name);
    setIC(props.userData.ic);
    setEmail(props.userData.email);
    setPhone(props.userData.phone);
  });
  
  return (
    <View style={styles.container}>

       {/*Top*/}
       <ImageBackground
        source={require('../../assets/bglogin.jpg')}
        style={{
          height: Dimensions.get('window').height / 3.5, 
        }}>

        <View style={{alignItems: 'center'}}>
          <MaterialCommunityIcons name="face" style={{color: '#fff', fontSize: 85, paddingTop: 40}}/>
          <Text style={{color:'#fff', fontSize: 30, fontWeight: 'bold', textAlign: 'center', paddingBottom: 30}}>User Profile</Text> 
        </View>
      </ImageBackground>
    

      {/*Bottom*/} 
      <View style={styles.bottomView}>
      <Text style={{color: 'grey', paddingBottom: 30}}>Update your profile here</Text>
      
      <View style={styles.box}>
        <MaterialCommunityIcons name="account" style={{fontSize: 20, paddingTop: 10}}/>
        <TextInput
            style={styles.textInput}
            value={name}
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => {setName(text)}}
          />
      </View>
      <View style={styles.box}>
        <MaterialCommunityIcons name="identifier" style={{fontSize: 20, paddingTop: 10}}/>
        <TextInput
            style={styles.textInput}
            value={IC}
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => {setIC(text)}}
          />
      </View>
      <View style={styles.box}>
        <MaterialCommunityIcons name="email" style={{fontSize: 20, paddingTop: 10}}/>
        <TextInput
            style={styles.textInput}
            value={email}
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => {setEmail(text)}}
          />
      </View>
      <View style={styles.box}>
        <MaterialCommunityIcons name="phone" style={{fontSize: 20, paddingTop: 10}}/>
        <TextInput
            style={styles.textInput}
            value={phone}
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => {setPhone(text)}}
          />
      </View>
      <View style={styles.box}>
        <MaterialCommunityIcons name="onepassword" style={{fontSize: 20, paddingTop: 10}}/>
        <TextInput
            style={styles.textInput}
            placeholder="Enter new password here"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => {setPassword(text)}}
          />
      </View>

      <View style={styles.btn} >
      <Button rounded color='#4ed9b8' title="Save Changes"></Button>
      </View>

      <View style={{paddingTop: 10}}>
        <Button title='Log Out' onPress={props.logout}></Button>
      </View>
      </View>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomView: {
    flex: 1.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    paddingTop: 20,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  box: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#f2f2f2',
    paddingBottom: 5,
    height: 40,
    width: 300,
  },

  textInput: {
    flex: 1,
    marginTop: 12,
    paddingLeft: 10,
    color: '#05375a',
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
