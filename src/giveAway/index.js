import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native-paper';
import { useActionSheet } from "@expo/react-native-action-sheet";
import axios from 'axios';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  RecoilState,
} from 'recoil';

import { authToken } from '../recoilState/authToken'

import OrabuxConfig from '../config';
const URL = OrabuxConfig.url;

export default function Giveaway({navigation })
 {
  const token = useRecoilValue(authToken);
  console.log(token)

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
      <SafeAreaView style={styles.container}>
     <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:50, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
     {/* <Image style={{ alignSelf:'center', marginLeft:20,marginTop:5, width:'10%', height:40}} source={logo}   /> */}
      <Text style={{marginLeft:20, textAlignVertical:'center', marginTop:5, fontSize:20,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Giveaway
        </Text>
      <View style={{alignSelf:'flex-end', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      {/* <MaterialCommunityIcons name="magnify" style={{fontSize:30, paddingRight:10, color:'#000'}} /> */}
      <MaterialCommunityIcons name="close" style={{fontSize:30, paddingRight:10, color:'#000'}}  onPress={()=>navigation.navigate('Base')}/>
      </View>
    </View>


    
    </SafeAreaView >     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      
      },
    actionSheet: {
        borderTopRightRadius: 20, //our container's borders will be rounded
        borderTopLeftRadius: 20,
        backgroundColor: "#fff", 
      },
      message: {
        backgroundColor: "purple", 
        color: "white",
      },
      title: {
        fontSize:20,
        fontWeight:'bold',
        color:'#000'
      },
      text: {
        fontSize:18,
        color:'#000',
        fontWeight:'600'

      },
});
