
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,StatusBar, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, ActivityIndicator,Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput,  
  Appbar,
 DarkTheme,
 DefaultTheme,
 RadioButton,
 Provider,
 Surface,
 ThemeProvider,  } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import axios from 'axios';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  constSelector,
} from 'recoil';

import { SignedInState } from '../recoilState/SignInState';
import { authToken } from '../recoilState/authToken';
import { ReloadProfile } from '../recoilState/reloadProfile';
import * as ImagePicker from 'expo-image-picker';
import OrabuxConfig from '../config';

const URL = OrabuxConfig.url;

export default function ChallengePayment({ route,navigation })
 {

  const {  
    amount,
    pk,
    title,
  } = route.params; 
  
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [isLoading, setisLoading] = useState(false);
  const [next, setNext] = useState('flex');

  const paymentSuccess = async () => {

     await axios.post( URL + '/api-get-challenge/payment/success/', 
     
       {
         pk: pk,
       },

       {
          headers: {
            'Authorization': `Token ${token}` ,
            'Content-Type': 'multipart/form-data'
          }
      }
      
       )
      .then(function (response) {
      console.log(response.status);
      navigation.navigate('CreateContent')

      })
      .catch(function (error) {
      console.log(error);
      ToastAndroid.show("error!", ToastAndroid.SHORT);
      });
     }
    

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>  
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginLeft:10,marginTop:10, fontSize:16,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Challange Payment*
        </Text>
      </View>
   
      </View>
      <Text  style={{fontSize:20,fontWeight:'bold'}}>#{title}</Text> 
      <Text  style={{fontSize:20,fontWeight:'bold'}}>Make Payment</Text> 
      <Text  style={{fontSize:30,fontWeight:'bold'}}>Amount: {amount}</Text> 

      <Pressable
      onPress={paymentSuccess}
      style={{width:'60%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10,alignSelf:'center',marginRight:10, display:next}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff',}}>Payment Success!</Text>
    </Pressable>
</SafeAreaView >     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      
      },


});
