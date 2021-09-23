import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { RefreshControl,StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, ImageBackground, Dimensions, Touchable, TouchableOpacity, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import moment from 'moment';


export default function HistoryScreen(props) {

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const navigation = useNavigation();
  const [report, setReportData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  //get the report data
  const getReport = async () => {
    try {
      const dat = await axios.get(`http://138.3.215.26:80/api/user/${props.userData.id}/reports`,{
        headers: {
          'Authorization' : `Bearer ${props.jwt}`
        }
      }).then(async (response) => {
        setReportData(response.data.data);
        
      })
    }catch(err) {
      alert(err);
    }
  }

  //refresh function
  const waits = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const testRefresh = () => {
    setRefresh(true);
    getReport();
    waits(3000).then(()=>setRefresh(false));
  }


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
          data={report}
          extraData={report}
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
                <Text style={{fontSize:10, opacity: .7, paddingTop: 6}}>{moment(item.created_at).format('d MMM | h:mm a')}</Text>
                <Text onPress={()=>{Linking.openURL(`google.maps:q=${item.lat}+${item.lng}`)}} style={{fontSize:13, opacity: .7, paddingTop: 10,color: 'blue'}}>Location</Text>
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
