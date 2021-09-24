import { StatusBar } from 'expo-status-bar';
import React, { Profiler, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

//importing screen authenticated user screen
import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen';
import ReportFormScreen from './ReportFormScreen';
import ProfileScreen from './ProfileScreen';


//declaring tab navigator
const Tab = createBottomTabNavigator();

export default function UserContainer(props) {
  const [userData,setUserData] = useState(null);

  //get the userData 
  const getUser = async () => {
    try {
      const data = await axios.get('http://138.3.215.26:80/api/me', {
        headers: {
          'Authorization': `Bearer ${props.jwt}`
        }
      }).then((res) => {
        setUserData(res.data.data);
      })

    }catch(err) {
      errMsg = err.response.data.Message
      alert(err);
      if(errMsg === 'Unauthorized') {
        props.newJWT('');
      }
    }
  }

  //run the function
  useEffect(() => {
    getUser();
  },[]);


  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon : ({color, size}) => {
            let iconName;

            if(route.name === 'Home') {
                iconName = 'home';
            } else if(route.name === 'History') {
                iconName = 'history';
            } else if(route.name === 'Report') {
                iconName = 'plus-box';
            } else if(route.name === 'Profile') {
                iconName = 'face-profile';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor:'gray',
        headerShown: false
    })}>
         <Tab.Screen name="Home" children={() => <HomeScreen userData={userData} jwt={props.jwt}/>} />
         <Tab.Screen name="History" children={() => <HistoryScreen userData={userData} jwt={props.jwt}/>} />
         <Tab.Screen name="Report" children={()=><ReportFormScreen userData={userData} jwt={props.jwt}/>} />
         <Tab.Screen name="Profile" children={()=><ProfileScreen userData={userData} jwt={props.jwt} logout={props.logout}/>} />
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
