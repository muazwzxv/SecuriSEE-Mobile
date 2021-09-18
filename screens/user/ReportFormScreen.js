import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';


export default function ReportFormScreen({ navigation }) {
  
  //state for the location and permission error
  const [location,setLocation] = useState(null);
  const [errmsg,setErrmsg] =  useState(null);
  const [photo,setPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgReady,setImgReady] = useState('');

  //run location permission when the page rendered
  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted') {
        setErrmsg('Permission Location Denied');
        alert(errmsg);
        return;
      }

      let location = await Location.getLastKnownPositionAsync({accuracy: 6, maxAge: 1000});
      setLocation(location);
    })();
  },[]);

  //run camera permission when the page rendered
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions!');
      }
    })();
  }, []);

  //open the gallery
  const openGallery = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      exif: true,
    });

    if(!image.cancelled) {
      setPhoto(image.uri);
      setImgReady('Image ready!');
    }
  }

  //launch the camera
  const openCam = async () => {
    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      exif: true,
    });

    if(!image.cancelled) {
      setPhoto(image.uri);
      setImgReady('Image ready!');
    }
  }

  //remove the image
  const removeImg = () => {
    setPhoto(null);
    setImgReady('ddd');
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/police.jpg')}
      />

      <Text style={{color:'#4ed9b8', fontSize: 30, fontWeight: 'bold', paddingTop: 10}}>Report Form</Text>
      <Text style={{fontSize:15, opacity: .7}}>Witnessed suspicious car? Let us know.</Text>

      <View style={{marginTop: 20}}>
        <Text style={{paddingBottom: 5}}>Plate Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter plate number" 
        />
      </View>

      <View style={{marginTop: 10}}>
        <Text style={{paddingBottom: 5}}>Address</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter address here" 
        />
      </View>

      <View style={{marginTop: 10}}>
        <Text style={{paddingBottom: 5}}>Description</Text>
        <TextInput 
          style={styles.inpDesc} 
          placeholder="Enter description" 
        />
      </View>

      <View>
      <Text style={{paddingBottom: 5,marginTop: 10, paddingRight: 190}}>Upload an Image</Text>
      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons name="upload" style={{color: 'black', fontSize: 30}} onPress={() => {setShowModal(true)}}/>
        <Text style={{padding: 10}}>{imgReady}</Text>
      </View>
      </View>

      <View style={styles.box}>
        <View style={styles.submitBtn} >
            <Button rounded color='#697689' title="Open Camera" onPress={openCam} ></Button>
          </View>
          <View style={styles.submitBtn} >
            <Button rounded color='#697689' title="Open Gallery" onPress={openGallery} ></Button>
          </View>
      </View>


          <View style={styles.submitBtn} >
            <Button rounded color='#F47373' title="Remove Photo" onPress={() => {setImgReady('')}} ></Button>
          </View>
          {/*<View style={styles.submitBtn} >
            <Button rounded color='#4ed9b8' title="Cancel Upload" onPress={() => {setShowModal(false)}} ></Button>
      </View>*/}

      <View style={{paddingTop: 60, width: 300}}>
      <Button rounded color='#4ed9b8' title="Submit Report" ></Button>
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

  box: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    height: 40,
    width: 100,
  },

  modal: {
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
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    width: 300,
    borderStyle: 'solid',
    paddingLeft: 10,
    borderRadius: 6
  },

  inpDesc: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 60,
    width: 300,
    borderStyle: 'solid',
    paddingLeft: 10,
    borderRadius: 6
  },

  submitBtn: {
    color: '#4ed9b8',
    fontSize: 20,
    width: 150,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  
});
