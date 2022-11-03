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

import { authToken } from './recoilState/authToken'

import OrabuxConfig from './config';
const URL = OrabuxConfig.url;

export default function CreateContent({navigation })
 {
  const token = useRecoilValue(authToken);
  console.log(token)


  return (
      <SafeAreaView style={styles.container}>
     <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:50, marginBottom:0,marginTop:30, flexDirection:'column'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginLeft:20, textAlignVertical:'center', marginTop:5, fontSize:20,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Create
        </Text>
      <MaterialCommunityIcons name="creation" style={{fontSize:30, paddingLeft:10, color:'#000', marginTop:5,}}  onPress={()=>navigation.navigate('Base')}/>
      </View>
    </View>

    <View style={{padding:20}}>
        
        <TouchableOpacity style={{flexDirection:'row', marginBottom:20}} onPress={()=>navigation.navigate('CreatePost')}>
        <View style={{backgroundColor:'#EBEBEB', alignContent:'center',justifyContent:'center', width:50, height:50, borderRadius:50}}>
        <MaterialCommunityIcons name="image-multiple" style={{fontSize:30, color:'#0747B5', alignSelf:'center'}}/>
        </View>
        <Text style={{fontSize:18, color:'#000', alignSelf:'center', fontWeight:'400', paddingLeft:10}}>Post Photo/Video</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection:'row', marginBottom:20}} onPress={()=>navigation.navigate('Challenge')}>
        <View style={{backgroundColor:'#EBEBEB', alignContent:'center',justifyContent:'center', width:50, height:50, borderRadius:50}}>
        <MaterialCommunityIcons name="crown" style={{fontSize:30, color:'#E6152A', alignSelf:'center'}}/>
        </View>
        <Text style={{fontSize:18, color:'#000', alignSelf:'center', fontWeight:'400', paddingLeft:10}}>Start a Challenge Contest</Text>
        </TouchableOpacity>


        <TouchableOpacity style={{flexDirection:'row', marginBottom:20}} onPress={()=>navigation.navigate('Quiz')}>
        <View style={{backgroundColor:'#EBEBEB', alignContent:'center',justifyContent:'center', width:50, height:50, borderRadius:50}}>
        <MaterialCommunityIcons name="cube-scan" style={{fontSize:30, color:'#07B541', alignSelf:'center'}}/>
        </View>
        <Text style={{fontSize:20, color:'#000', alignSelf:'center', fontWeight:'400', paddingLeft:10}}>Start a Quiz Contest</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={{flexDirection:'row', marginBottom:20}} onPress={()=>navigation.navigate('Giveaway')}>
        <View style={{backgroundColor:'#EBEBEB', alignContent:'center',justifyContent:'center', width:50, height:50, borderRadius:50}}>
        <MaterialCommunityIcons name="asterisk" style={{fontSize:30, color:'#000', alignSelf:'center'}}/>
        </View>
        <Text style={{fontSize:20, color:'#000', alignSelf:'center', fontWeight:'400', paddingLeft:10}}>Giveaway</Text>
        </TouchableOpacity>
 
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
