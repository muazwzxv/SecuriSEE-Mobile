import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { RefreshControl,StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, ImageBackground, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoder';


export default function HistoryScreen(props) {

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const navigation = useNavigation();
  const [data, setReportData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [temp,setTemp] = useState(null);
  const [addr,setAddr] = useState([
    {
      streetname: null
    },
  ]);
  const [geo,setGeo] = useState(null); 

  //get the report data
  const getReport = async () => {
    try {
      const dat = await axios.get(`http://138.3.215.26:80/api/user/${props.userData.id}/reports`,{
        headers: {
          'Authorization' : `Bearer ${props.jwt}`
        }
      }).then(async (response) => {
        console.log('executed!!')
        setReportData(response.data.reports);
        // var foo  = response.data.reports;
        // var i;
        // for(i=0;i<foo.length;i++) {

        //   let address = await Location.reverseGeocodeAsync(
        //     { latitude: foo[i].lat, 
        //       longitude: foo[i].lng}
        //     ).then((res) => {
        //       if(addr.streetname === null) {
        //         setAddr([{streetname:res[0].street}])
        //       }else {
        //         setAddr(prevState => [...prevState,{streetname:res[0].street}]);
        //       }
        //     })
        // }
        // console.log(JSON.stringify(addr));
        setRefresh(false);
      })
    }catch(err) {
      alert(err);
      
    }
  }

  //refresh function
  const testRefresh = () => {
    setAddr([
      {
        streetname: ''
      },
    ]);
    setRefresh(true);
    getReport();
  }

  // const geoLocate = (data) => {
  //   let address = Location.reverseGeocodeAsync(
  //     { latitude: data.lat, 
  //       longitude: data.lng}
  //     ).then((res) => {
  //       setTemp(`Nearby ${res[0].name}, ${res[0].street},${res[0].postalCode} ${res[0].city}, ${res[0].region}`)
  //     })
  //     console.log('run!!');
  //     return temp;
  // }

  //run on render
  useEffect(() => {
    if(!data) {
      getReport();
    }
  });

  const keyExtractor = (item) => item.id;
  return (
    <View style={styles.container}>

      {/*Top*/}
      <ImageBackground
        source={require('../../assets/bglogin.jpg')}
        style={{
          height: Dimensions.get('window').height / 3.4, 
        }}>

      <View style={{alignItems: 'center'}}>
        <MaterialCommunityIcons name="history" style={{color: '#fff', fontSize: 85, paddingTop: 40}}/>
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
          keyExtractor={keyExtractor}
          onRefresh={testRefresh}
          refreshing={refresh}
          removeClippedSubviews={true}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Text>(GAMBAR)</Text>
                {/*<Text style={{fontSize:10, opacity: .7}}>{item.id}</Text>
                */}

                <Text style={{fontSize:13, opacity: .7, fontWeight: 'bold', paddingTop: 10}}>Created at:</Text>
                <Text style={{fontSize:10, opacity: .7, paddingTop: 6}}>{item.created_at}</Text>
                <Text style={{fontSize:13, opacity: .7, paddingTop: 10}}>{item.lat}</Text>
                <Text style={{fontSize:13, opacity: .7}}>{item.lng}</Text>
                <Text style={{fontSize:16, opacity: .8, paddingTop: 2}}>{item.description}</Text>
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
