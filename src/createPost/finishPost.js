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

export default function FinishPost({route, navigation })
 {
    const {  
        file,
        duration,
        type
      } = route.params;

  const token = useRecoilValue(authToken);
  const [caption, setCaption] = useState('')

  console.log(token)
  //Set Selected demision

  const UploadPost = async () => {

    let filename = file.split('/').pop();
    console.log(type);
    let file_type = '';
    if (type == 'photo'){

        file_type = 'image/*'
    }
    else{

        file_type = 'video/*'
    }
    // let match = /\.(\w+)$/.exec(filename);

    let formData = new FormData();
    formData.append('post_file', { uri: file, name: filename, type: file_type});
    formData.append('caption', caption);
    formData.append('type', type);
    await axios.post(URL+'/api-user-post/', formData,     {
      headers: {
        'Authorization': `Token ${token}` ,
        'Content-Type': 'multipart/form-data'
      }
  }).then(res => {
        ToastAndroid.show("Uploaded Success!", ToastAndroid.SHORT);
        console.log(res.status);
        navigation.navigate('Newsfeed')
    }).catch(err => {
        console.log(err.response);
        ToastAndroid.show("Error Uploading Post", ToastAndroid.SHORT);
    });
    }
  


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
        Finish up
        </Text>
      </View>
      <Pressable 
      onPress={UploadPost}
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff'}}>Post</Text>
    </Pressable>
    </View>


{type == 'photo' ? (
    <View>
     <Image  style={{justifyContent: 'center',  alignItems: 'center', height:300, width:'100%',resizeMode:'contain'}}        
         source={{
         uri:file,
         
         }}/>
    </View>
  ):(
    <View style={{width:'100%', justifyContent:'center'}}>
      <Video ref={null} style={{height:300, width:'100%'}}
         volume={10}
         useNativeControls
         resizeMode="cover"
         isLooping={false}
         source={{ uri: file,}}  
         />
        </View>   
  )}

  
<View style={{flexDirection:'row', marginBottom:0 }}>
          <TextInput
             mode="flat"
             label=""
             placeholder= 'write a caption'
             keyboardType='default'
             textContentType='none'
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,margin:10}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             onChangeText={(val)=> setCaption(val)}

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
