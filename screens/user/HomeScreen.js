import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, ImageBackgroundBase, ImageBackground, Dimensions, FlatList, Modal, useWindowDimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';



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

  const source = {
    html: tempData.description
  };
  
  return (
    <View style={styles.container}>
      
      <View>
        <Modal
          presentationStyle={"fullScreen"}
          animationType = {"fade"}
          visible={isShow}
        >
          <ScrollView>
            <View style={styles.modalView}>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#4ed9b8'}}>SecuriSEE News</Text>
            <View style={{flex: 1, height: 1, backgroundColor: 'grey', opacity:.2, marginBottom: 20}} />
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>{tempData.headline}</Text>
              <Text style={{fontSize: 15, marginBottom: 10}}>{moment(tempData.created_at).format('dddd d MMM | h:mm a')}</Text>
              <RenderHtml ignoredStyles={['50', '50']} contentWidth={width} source={source}/>
              <Button style={{position: 'absolute',bottom:0, left:0}} title="I'm alert now!" onPress={()=>setShow(false)}/>
            </View>
          </ScrollView>
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

        <Text style={{textAlign:'center'}}>Pull to refresh</Text>
       {/*List Card*/}
      <FlatList
        data={news}
        keyExtractor={item => item.id}
        onRefresh={onRefresh}
        refreshing={isRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => getDetail(item)}>
            <View style={styles.listItem}>
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

  modalView: {
    flex: 1,
    margin: 10,
    padding:10,
    backgroundColor: "white",
    textAlign: "left",
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
