import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ImageBackgroundBase, ImageBackground, Dimensions, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//import components
import deviceStorage from '../../services/deviceStorage';

export default function HomeScreen() {

// Generating dummy data
const data = [
  { noPlate: 'AB123', dateTime: '16 Sept | 4:30pm', description: 'Last location at XXX' },
  { noPlate: 'WE635', dateTime: '10 Sept | 2:00pm', description: 'Last location at XXX' },
  { noPlate: 'UO999', dateTime: '7 Sept | 12:00pm', description: 'Last location at XXX' },
  { noPlate: 'AB368', dateTime: '6 Sept | 2:30am', description: 'Last location at XXX' },
  { noPlate: 'OM456', dateTime: '6 Sept | 4:30pm', description: 'Last location at XXX' },
  { noPlate: 'WE450', dateTime: '4 Sept | 2:00pm', description: 'Last location at XXX' },
  { noPlate: 'WE111', dateTime: '3 Sept | 12:00pm', description: 'Last location at XXX' },
  { noPlate: 'UO910', dateTime: '2 Sept | 2:30am', description: 'Last location at XXX' },
  { noPlate: 'OM967', dateTime: '2 Sept | 2:00pm', description: 'Last location at XXX' },
  { noPlate: 'OM932', dateTime: '1 Sept | 12:00pm', description: 'Last location at XXX' },
  { noPlate: 'UO039', dateTime: '1 Sept | 2:30am', description: 'Last location at XXX' },
  { noPlate: 'AB000', dateTime: '30 Aug | 2:30am', description: 'Last location at XXX' },
];


  return (
    <View style={styles.container}>
      
      {/*Top*/}
      <ImageBackground
        source={require('../../assets/header.png')}
        style={{
          height: Dimensions.get('window').height / 5.5, 
        }}>
        <View style={styles.topView}>
          <Text style={styles.title}>Top Feeds</Text>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />

      {/*Search Box*/} 
      <TextInput 
         style={styles.searchBox} 
         placeholder="Search Here" 
      />

       {/*List Card*/}
      <FlatList
        data={data}
        keyExtractor={item => item.noPlate}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>(GAMBAR)</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10}}>{item.noPlate}</Text>
            <Text style={{fontSize:10, opacity: .7}}>{item.dateTime}</Text>
            <Text style={{fontSize:14, opacity: .8, paddingTop: 10}}>{item.description}</Text>
          </View>
        )}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },

  listItem: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },

  searchBox: {
    borderColor: '#4ed9b8',
    borderWidth: 1.4,
    height: 30,
    width: 100,
    marginLeft: 250,
    alignItems: 'center',
  },

});
