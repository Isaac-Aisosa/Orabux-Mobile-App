import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView,FlatList,Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native-paper';
import { useActionSheet } from "@expo/react-native-action-sheet";
import axios from 'axios';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Audio, Video } from 'expo-av';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  RecoilState,
} from 'recoil';
import * as ImagePicker from 'expo-image-picker';
import { authToken } from '../recoilState/authToken'
import { ImageEditor } from "expo-image-editor";
import OrabuxConfig from '../config';
const URL = OrabuxConfig.url;

export default function EditPost({route, navigation })
 {
    const {  
        file,
        hieght,
        width,
        duration,
        type
      } = route.params;

  const token = useRecoilValue(authToken);
  const [editFile, setEditFile] = useState(file);
  const [editorVisible, setEditorVisible] = useState(false);
  let videoError = 'none';
  let nextBotton = 'flex';

  console.log(token)
  //Set Selected demision
  const ratio = (Dimensions.get('window').width-50)/width;//replace 541 with image width
  console.log(duration)
  if(duration > 60){
    videoError = 'flex';
    nextBotton ='none';
  }

  const launchEditor = () => {
    setEditorVisible(true);
  };


  useEffect(() => {

  }, []);

  return (
      <SafeAreaView style={styles.container}>
     <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      {/* <MaterialCommunityIcons name="magnify" style={{fontSize:30, paddingRight:10, color:'#000'}} /> */}
      <MaterialCommunityIcons name="arrow-left" style={{fontSize:30, paddingLeft:5, color:'#000'}}  onPress={()=>navigation.navigate('Base')}/>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginTop:0, fontSize:20,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Edit Post
        </Text>
      </View>
      <Pressable
              onPress={()=>navigation.navigate('FinishPost',{
                file:editFile,
                duration:duration,
                type:type
               })}
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10, display:nextBotton}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff'}}>Next</Text>
    </Pressable>
    </View>


{type == 'photo' ? (
    <View>
     <Image  style={{justifyContent: 'center',  alignItems: 'center', height:'50%', width:'100%',resizeMode:'contain'} }        
         source={{
         uri:editFile,
         
         }}/>
         
       <TouchableOpacity style={{flexDirection:'row', marginBottom:5, alignSelf:'flex-end', marginTop:10, marginRight:10}} onPress={launchEditor}>
       <View style={{backgroundColor:'#EBEBEB', alignContent:'center',justifyContent:'center', width:50, height:50, borderRadius:50}}>
       <MaterialCommunityIcons name="crop" style={{fontSize:25, color:'#000', alignSelf:'center'}}/>
       </View>
       </TouchableOpacity>
    </View>
  ):(
    <View style={{width:'100%', justifyContent:'center'}}>
      <Video ref={null} style={{height:300, width:'100%'}}
        
         volume={10}
         useNativeControls
         resizeMode="cover"
         isLooping={false}
         source={{ uri: editFile,}}  
         />
    
        <Text style={{display:videoError, color:'red',fontSize:14, marginTop:20, marginLeft:10}}><MaterialCommunityIcons name="alert" style={{fontSize:25, alignSelf:'center'}}/>Cant Post Video, duration exceed 60 sec</Text> 
        </View>
        
  )}
  <View style={{marginTop:5}}>
  <ImageEditor
        visible={editorVisible}
        onCloseEditor={() => setEditorVisible(false)}
        imageUri={file}
        fixedCropAspectRatio={16 / 9}
        minimumCropDimensions={{
          width: 100,
          height: 100,
        }}
        onEditingComplete={(result) => {
          setEditFile(result.uri);
          console.log(result)
        }}
        mode='full'
      />
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
