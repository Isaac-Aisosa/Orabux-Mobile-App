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


export default function UserPostList({navigation })
 {
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [postlist, setPostList] = useState();
  const [postCount, setPostCount] = useState();


//get user post
const GetUserPost = async () => {
  await axios.get( URL + '/api-get-user-post/', 
   {
     headers: {
       'Authorization': `Token ${token}` 
     }
 
 })
 .then(function (response) {
 console.log(response.status);
 console.log(response.data);
 setPostCount(response.data.posts_count);
 setPostList(response.data.posts);
 })
 .catch(function (error) {
 console.log(error);
 });
 }


  useEffect(()=>{
    GetUserPost();
 },[])

  return (
      <SafeAreaView style={styles.container}>
    <FlatList
      data={postlist}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      renderItem={({ item }) => (
   <View style={{backgroundColor:'#fff', flex: 1, flexDirection: 'column',  margin:1}}>
   {item.type == 'photo' ? (
  <TouchableOpacity>
     <Image  style={{justifyContent: 'center',  alignItems: 'center', height: 100,}}       
      source={{uri: URL +'/media/'+ item.file, }}/>
    <MaterialCommunityIcons name="image" style={{fontSize:25,position:'absolute', color:'#fff',padding:5}}/>
  </TouchableOpacity> 
     ):(
    <TouchableOpacity  onPress={(uri,type,duration)=>SelectFile(item.uri,item.mediaType,item.duration)} >
      <Video ref={null} style={{height:100}}
         shouldPlay={false}
         volume={0}
         isLooping={true}
         source={{ uri: URL +'/media/'+ item.file,}}
         />
         <MaterialCommunityIcons name="play-circle-outline" style={{fontSize:25,position:'absolute', color:'#fff',padding:5}}/>
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
