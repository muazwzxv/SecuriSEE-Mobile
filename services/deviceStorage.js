import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const deviceStorage = {
  
    async saveItem(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        alert('AsyncStorage Error: ' + error.message);
      }
    },
    
    async loadJWT() {
      const [temp,setTemp] = useState('');
      try {
        const value = await AsyncStorage.getItem('id_token');
  
        if(value !== null) {
          setTemp(value);
          alert(temp);
        }else {
          setLoading(false);
        }
      }catch (err) {
        alert(err);
      }
    },

    async delJwt() {
      try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
      }catch (error) {
        alert(error);
      }
    }
  };

export default deviceStorage;