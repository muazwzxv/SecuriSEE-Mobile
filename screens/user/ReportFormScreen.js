import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';


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
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
