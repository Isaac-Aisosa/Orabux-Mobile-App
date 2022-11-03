import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, ActivityIndicator,Alert} from 'react-native';
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

export default function Section4Form({ route,navigation })
 {

  const {  
    pk,
    title,
  } = route.params; 
  
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [next, setNext] = useState('flex')
  const [cash, setCashReward] = useState(true);
  const [physicalReward, setPhysicalReward] = useState(false);
  const [number_winner, setNumberWinner] = useState(3);
  const [reward_1, setReward_1] = useState(0);
  const [reward_2, setReward_2] = useState(0);
  const [reward_3, setReward_3] = useState(0);
  const [reward_4, setReward_4] = useState(0);
  const [reward_5, setReward_5] = useState(0);
  const [reward_6, setReward_6] = useState(0);
  const [reward_7, setReward_7] = useState(0);
  const [reward_8, setReward_8] = useState(0);
  const [reward_9, setReward_9] = useState(0);
  const [reward_10, setReward_10] = useState(0);
  const [otherBenefit, setOtherBenefit] = useState('');


  const GetChallenge = async () => {

    await axios.post( URL + '/api-get-challenge/details/', 
    
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
     console.log(response.data);
     })
     .catch(function (error) {
     console.log(error);
     ToastAndroid.show("error!", ToastAndroid.SHORT);
     });
    
   }

   GetChallenge();


  return (
    <SafeAreaView style={styles.container}>
    
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginLeft:10,marginTop:10, fontSize:16,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Challenge Preview*
        </Text>
      </View>
      <View>
        
      </View>
      <ActivityIndicator size="large" color="#4f72ff"  animating={isLoading}
           style={{paddingRight:10,position:'absolute', alignSelf:'flex-end', paddingTop:10}}/>
      <Pressable
     
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10, display:next}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff',}}>Done</Text>
    </Pressable>
    </View>
    <Provider >
   <ScrollView style={{width:'100%', alignSelf:'center', padding:10}}>
   <Surface>
     <Text>Challenge Preview and edit</Text>
    </Surface>
   </ScrollView>
   </Provider>
    </SafeAreaView >     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      
      },


});
