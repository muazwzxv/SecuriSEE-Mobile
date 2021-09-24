import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ImageBackgroundBase, ImageBackground, Dimensions, FlatList, Modal, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WebView from 'react-native-webview';
import axios from 'axios';
import moment from 'moment';
import WebViewQuillJS from 'react-native-webview-quilljs'
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import RenderHTML from 'react-native-render-html';



//import components
import deviceStorage from '../../services/deviceStorage';
import { TouchableOpacity } from 'react-native';

export default function HomeScreen(props) {
  const { width } = useWindowDimensions();
  //state setupppp
  const [news,setNews] = useState(null);
  const [isRefresh,setRefresh] = useState(false);
  const [isShow, setShow] = useState(false);
  const [tempData,setTempData] = useState({description: ''})

  const _editor = React.createRef();
  //Generating dummy data
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

  const getNews = async () => {
    try {
      const dat = await axios.get('http://138.3.215.26:80/api/news', {
        headers: {
          'Authorization' : `Bearer ${props.jwt}`,
        }
      }).then((response) => {
          console.log('executed-news!!');
          setNews(response.data.data);
      });

    }catch(err) {
      alert(err);
    }
  }

  //refresh function
  const waits = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = () => {
    console.log('hooked!');
    setRefresh(true);
    getNews();
    waits(3000).then(()=>setRefresh(false));
  }

  const getDetail = (item) => {
    setTempData(item);
    setShow(true);
  }


  useEffect(() => {
    if(!news) {
      getNews();
    }
  });

  return (
    <View style={styles.container}>
      
      <View>
        <Modal
          animationType = {"slide"}
          transparent={true}
          visible={isShow}
        >
          <View style={styles.modalView}>
            <WebView
              source={tempData}
            /> 
            
            <Text style={styles.modalTextTitle}>{tempData.description}</Text>
            <Text style={styles.modalTextTitle}>Evidence:</Text>
            <Button title='close' onPress={()=>setShow(false)}/>
          </View>
        </Modal>
      </View>

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
        data={news}
        keyExtractor={item => item.id}
        onRefresh={onRefresh}
        refreshing={isRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => getDetail(item)}>
            <View style={styles.listItem}>
              <RenderHTML contentWidth={width} source={item.description}/>
              <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10}}>{item.headline}</Text>
              <Text style={{fontSize:10, opacity: .7}}>{item.created_at}</Text>
            </View>
          </TouchableOpacity>
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

  modalView: {
    margin: 10,
    padding:10,
    backgroundColor: "white",
    borderRadius: 20,
    textAlign: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
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
    marginBottom: 5,
    textAlign: "left"
  },

  modalTextTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: "left"
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: 'white',
  },

});
