import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable, ImageBackground, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function HistoryScreen({ navigation }) {

  //dummy data
  const data = [
    { noPlate: 'OM932', dateTime: '1 Sept | 12:00pm', description: 'Last location at XXX' },
    { noPlate: 'UO039', dateTime: '1 Sept | 2:30am', description: 'Last location at XXX' },
    { noPlate: 'AB000', dateTime: '30 Aug | 2:30am', description: 'Last location at XXX' },
    { noPlate: 'WE111', dateTime: '3 Sept | 12:00pm', description: 'Last location at XXX' },
    { noPlate: 'UO910', dateTime: '2 Sept | 2:30am', description: 'Last location at XXX' },
    { noPlate: 'OM967', dateTime: '2 Sept | 2:00pm', description: 'Last location at XXX' },
  ];

  const [modalVisible, setModalVisible] = useState(false);
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
      <StatusBar style="auto" />

      {/*Modal*/} 
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Report has been deleted.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to delete this report?</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Delete Report</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
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
      </Pressable>
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
