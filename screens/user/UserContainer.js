import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//importing screen authenticated user screen
import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen';
import ReportFormScreen from './ReportFormScreen';
import ProfileScreen from './ProfileScreen';


//declaring tab navigator
const Tab = createBottomTabNavigator();

export default function UserContainer() {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon : ({color, size}) => {
            let iconName;

            if(route.name === 'Home') {
                iconName = 'home';
            } else if(route.name === 'History') {
                iconName = 'magnify';
            } else if(route.name === 'New') {
                iconName = 'plus-box';
            } else if(route.name === 'Profile') {
                iconName = 'face-profile';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor:'gray',
    })}>
         <Tab.Screen name="Home" component={HomeScreen}/>
         <Tab.Screen name="History" component={HistoryScreen}/>
         <Tab.Screen name="New" component={ReportFormScreen}/>
         <Tab.Screen name="Profile" component={ProfileScreen}/>
    </Tab.Navigator>
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
