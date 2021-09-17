import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ReportFormScreen({ navigation }) {
  
  //state for the location and permission error
  const [location,setLocation] = useState(null);
  const [errmsg,setErrmsg] =  useState(null);

  //run when the page rendered
  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted') {
        setErrmsg('Permission Denied');
        return;
      }

      let location = await Location.getLastKnownPositionAsync({accuracy: 6, maxAge: 1000});
      setLocation(location);
    })();
  },[]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/police.jpg')}
      />

      <Text style={{color:'#4ed9b8', fontSize: 30, fontWeight: 'bold', paddingTop: 10}}>Report Form</Text>
      <Text style={{fontSize:15, opacity: .7}}>Witnessed suspicious car? Let us know.</Text>

      <View style={{marginTop: 20}}>
        <Text>Plate Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter plate number" 
        />
      </View>

      <View style={{marginTop: 10}}>
        <Text>Address</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter address here" 
        />
      </View>

      <View style={{marginTop: 10}}>
        <Text>Description</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter description" 
        />
      </View>

      <View style={{marginTop: 10, paddingRight: 210}}>
        <Text>Upload Picture</Text>
        <MaterialCommunityIcons name="upload" style={{color: 'black', fontSize: 60}}/>
      </View>
      
      <View style={styles.loginBtn} >
      <Button rounded color='#4ed9b8' title="Submit Report" ></Button>
      <StatusBar style='auto'/>
      </View>

      <Text>{JSON.stringify(location)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tinyLogo: {
    width: 150,
    height: 80,
  },

  input: {
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: 40,
    width: 300,
    marginBottom: 5,
  },

  loginBtn: {
    color: '#4ed9b8',
    fontSize: 20,
    width: 200,
    justifyContent: 'center',
    padding: 10,
  }
});
