import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';


export default function ReportFormScreen(props) {
  
  //state for the location and permission error
  const [lat,setLat] = useState(0);
  const [lng,setLng] = useState(0);
  const [errmsg,setErrmsg] =  useState(null);
  const [photo,setPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgReady,setImgReady] = useState('');
  const [desc,setDesc] = useState('');

  //run location permission when the page rendered
  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted') {
        setErrmsg('Permission Location Denied');
        alert(errmsg);
        return;
      }

      let location = await Location.getLastKnownPositionAsync({accuracy: 6});
      setLat(location.coords.latitude);
      setLng(location.coords.longitude);
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
      quality: 1,
      base64: true,
      exif: true,
    });

    if(!image.cancelled) {
      try {
        const file = await ImageManipulator.manipulateAsync(image.uri, [], { compress: 0.4 });
        setPhoto(file.uri);
        setImgReady('Image ready!');

      }catch(err) {
        alert(err)
      }
    }
  }

  //launch the camera
  const openCam = async () => {
    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
      base64: true,
      exif: true,
    });

    if(!image.cancelled) {
      try {
        const file = await ImageManipulator.manipulateAsync(image.uri, [], { compress: 0.4 });
        setPhoto(file.uri);
        setImgReady('Image ready!');

      }catch(err) {
        alert(err)
      }
    }
  }

  //remove the image
  const removeImg = () => {
    setPhoto(null);
    setImgReady('');
  }

  //send the report
  const postReport = async () => {
    try {
      const datas = await axios.post('http://138.3.215.26:80/api/report',
        {
          description: desc,
          lat: lat,
          lng: lng,
        },
        {
        headers: {
          'Authorization': `Bearer ${props.jwt}`
        },
      }).then((response) => {
        postImage(response.data.data.id);
      });

    }catch(err) {
      alert(err);
    }
  }

  //send the image
  const postImage = async (reportID) => {
    try {
      const param = new FormData();
      param.append('image', {
        uri: photo,
        type: 'image/jpeg',
        name: reportID+'.jpg'
      });

      const datas = await axios.post(`http://138.3.215.26:80/api/image/upload/${reportID}`,param,{
        headers: {
          'Authorization': `Bearer ${props.jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        Alert.alert('Success',response.data.Message);
      });
    }catch(err) {
      alert(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{paddingTop:40}}/>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/police.jpg')}
      />

      <Text style={{color:'#4ed9b8', fontSize: 30, fontWeight: 'bold', paddingTop: 40}}>Report Form</Text>
      <Text style={{fontSize:15, opacity: .7}}>Witnessed suspicious car? Let us know.</Text>

      <View style={{marginTop: 30}}>
        <Text style={{paddingBottom: 5}}>Description</Text>
        <TextInput 
          style={styles.inpDesc} 
          placeholder="Enter description"
          onChangeText={(text) => {setDesc(text)}} 
        />
      </View>

      <View>
      <Text style={{paddingBottom: 5,marginTop: 20, paddingRight: 190}}>Upload an Image</Text>
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
            <Button rounded color='#F47373' title="Remove Photo" onPress={removeImg} ></Button>
          </View>
          {/*<View style={styles.submitBtn} >
            <Button rounded color='#4ed9b8' title="Cancel Upload" onPress={() => {setShowModal(false)}} ></Button>
      </View>*/}

      <View style={{paddingTop: 60, width: 300}}>
      <Button rounded color='#4ed9b8' title="Submit Report" onPress={postReport}/>
      </View>

      <Text>{lat}</Text>
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
    marginTop: 20,
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
    width: 250,
    height: 150,
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
