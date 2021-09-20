import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { RefreshControl,StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, ImageBackground, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';


export default function HistoryScreen(props) {

  const navigation = useNavigation();
  const [data, setReportData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [geo,setGeo] = useState(null); 

  //get the report data
  const getReport = async () => {
    try {
      const dat = await axios.get(`http://138.3.215.26:80/api/user/${props.userData.id}/reports`,{
        headers: {
          'Authorization' : `Bearer ${props.jwt}`
        }
      }).then((response) => {
        console.log('executed!!')
        setReportData(response.data.reports);
        setRefresh(false);
      })
    }catch(err) {
      alert(err);
      
    }
  }

  //refresh function
  const testRefresh = () => {
    setRefresh(true);
    getReport();
  }

  //get geoLocation
  // const geoConvert = async (data) => {
  //   try {
  //     for()
  //     const {lat,lng} = data;
  //     const geo = await Location.reverseGeocodeAsync({lat,lng});

  //     alert('run');
  //     return `${geo.name}`
  //   }catch(err) {
  //     alert(err);
  //   }
  // }

  //run on render
  useEffect(() => {
    if(!data) {
      getReport();
    }
  });


  return (
    <View style={styles.container}>

      {/*Top*/}
      <ImageBackground
        source={require('../../assets/bglogin.jpg')}
        style={{
          height: Dimensions.get('window').height / 4, 
        }}>

      <View style={{alignItems: 'center'}}>
        <MaterialCommunityIcons name="history" style={{color: '#fff', fontSize: 85, paddingTop: 20}}/>
        <Text style={{color:'#fff', fontSize: 30, fontWeight: 'bold', textAlign: 'center', paddingBottom: 30}}>Report History</Text> 
      </View>
      </ImageBackground>

      {/*Bottom*/} 
      <View style={styles.bottomView}>
      <Text style={{color: 'grey', paddingBottom: 10, textAlign: 'center'}}>View your previous reports here</Text>
      <Text style={{color: 'grey', paddingBottom: 10, textAlign: 'center'}}>Pull to refresh</Text>

        <FlatList
          data={data}
          extraData={data}
          keyExtractor={item => item.id}
          onRefresh={testRefresh}
          refreshing={refresh}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Text>(GAMBAR)</Text>
                <Text style={{fontSize:10, opacity: .7}}>{item.id}</Text>
                <Text style={{fontSize:10, opacity: .7}}>{item.created_at}</Text>
                <Text style={{fontSize:10, opacity: .7}}>{item.lat}</Text>
                <Text style={{fontSize:10, opacity: .7}}>{item.lng}</Text>
                <Text style={{fontSize:14, opacity: .8, paddingTop: 10}}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  bottomView: {
    flex: 1.5,
    backgroundColor: '#fff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    paddingTop: 20,
  },

  listItem: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

  buttonOpen: {
    backgroundColor: "white",
  },

  buttonClose: {
    backgroundColor: "#4ed9b8",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
