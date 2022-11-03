import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView,FlatList} from 'react-native';
import { Audio, Video } from 'expo-av';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
  
import { SignedInState } from '../recoilState/SignInState';
import { authToken } from '../recoilState/authToken'
import { ReloadProfile } from '../recoilState/reloadProfile';
import OrabuxConfig from '../config';

const URL = OrabuxConfig.url;


export default function UserCreatedContest({navigation })
 {
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [createdlist, setCreatedList] = useState();
  const [Count, setCount] = useState();


//get user post
const GetUserCreatedContest = async () => {
  await axios.get( URL + '/api-get-user/created/contest/', 
   {
     headers: {
       'Authorization': `Token ${token}` 
     }
 
 })
 .then(function (response) {
 console.log(response.status);
 console.log(response.data.contest);
 setCount(response.data.count);
 setCreatedList(response.data.contest);
 })
 .catch(function (error) {
 console.log(error);
 });
 }


  useEffect(()=>{
    GetUserCreatedContest();
 },[])

  return (
      <SafeAreaView style={styles.container}>
       
    <FlatList
      data={createdlist}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      renderItem={({ item }) => (
   <View style={{backgroundColor:'#fff', flex: 1, flexDirection: 'column',  margin:1}}>
   {item.attachImage == '' ? (
  <TouchableOpacity>
    <View  style={{justifyContent: 'center',  alignItems: 'center', height: 150,backgroundColor:'#85012f'}}  
    ></View>
    <MaterialCommunityIcons name="crown-circle" style={{fontSize:25,position:'absolute', color:'#fff',padding:5}}/>
    <Text style={{fontSize:15,position:'absolute', color:'#fff',padding:25}}>{item.title}</Text>
  </TouchableOpacity> 
     ):(
    <TouchableOpacity  onPress={(uri,type,duration)=>SelectFile(item.uri,item.mediaType,item.duration)} >
      <Image  style={{justifyContent: 'center',  alignItems: 'center', height: 150,}}       
      source={{uri: URL +'/media/'+ item.attachImage, }}/>
         <MaterialCommunityIcons name="crown-circle" style={{fontSize:25,position:'absolute', color:'#fff',padding:5}}/>
         <View style={{position:'absolute', bottom:0,right:0,left:0,opacity: .4, backgroundColor:'#000', width:'100%'}}>
         <Text style={{fontSize:15,color:'#fff',}}>{item.title}</Text>
         </View>
    </TouchableOpacity>
        
  )}
   </View>
     
      )}
    />
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
