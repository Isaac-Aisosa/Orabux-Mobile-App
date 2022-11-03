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

import OrabuxConfig from '../config';
const URL = OrabuxConfig.url;

export default function SelectPost({navigation })
 {
  const token = useRecoilValue(authToken);
  console.log(token)

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedfiles] = useState();
  const [selectMultiple, setSelectMultiple] = useState(false);
  const [multipleButton, setMultipleButton] = useState('#000');
  const [selectedMultipleFile, setSelectedMultipleFiles] = useState([]);
  const [selectedType, setSelectedtype] = useState();
  const [selectedDuration, setSelecteduration] = useState();
  const [selectedWidth, setSelectedwidth] = useState(200);
  const [selectedHeight, setSelectedHeight] = useState(200);
  const [SelectedVolume, setSelectedVolume] = useState(0);

  //Set Selected demision
  const ratio = Dimensions.get('window').width/selectedWidth;//replace 541 with image width

  const SelectFile = async (uri,type,duration) => {
  setSelectedfiles(uri);
  setSelectedtype(type);
  setSelecteduration(duration);
  setSelectedVolume(0);
  // if(selectMultiple == true){
  //   if(selectedMultipleFile.includes(uri)){
  //     setSelectedMultipleFiles(selectedMultipleFile.filter((value)=>value!= uri));
  //   }
  //  else if (!selectedMultipleFile.includes(uri)){
  //     setSelectedMultipleFiles(selectedMultipleFile.concat(uri));
  //     if(!selectedMultipleFile.includes(uri)){setSelectedMultipleFiles(selectedMultipleFile.concat(uri));}
  //   }
   
  //  console.log(selectedMultipleFile);
  // }
  }

  // const ActivateSelectMultiple = async () => {
  //   if(selectMultiple == true){
  //     setSelectMultiple(false); 
  //     setMultipleButton('#000');
  //   }
  //   else if (selectMultiple == false){
  //     setSelectMultiple(true);
  //     setMultipleButton('#4f72ff');
  //   }
  //   }


  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log(permission);

    if (permission.granted) {
      // we want to get all the Video files
      getMedia();
    }

    if (!permission.canAskAgain && !permission.granted) {
      console.log("user denied and we can't ask again");
    }

    if (!permission.granted && permission.canAskAgain) {
      const {
        status,
        canAskAgain,
      } = await MediaLibrary.requestPermissionsAsync();

      if (status === 'denied' && canAskAgain) {
        //   we are going to display alert that user must allow this permission to work this app
        // permissionAllert();
      }

      if (status === 'granted') {
        //    we want to get all the audio files
        getMedia();
      }

      if (status === 'denied' && !canAskAgain) {
        //   we want to display some error to the user
      }
    }
  };

  const getMedia = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ['video','photo'],
      sortBy:'creationTime',
      first: 1,
    });
    //console.log(media);
    setSelectedfiles(media.assets[0].uri);
    setSelectedtype(media.assets[0].mediaType);
    setSelecteduration(media.assets[0].duration);
    setSelectedHeight(media.assets[0].height);
    setSelectedwidth(media.assets[0].width);

    console.log(selectedDuration)

    console.log('media.assets.url')
    console.log(media.assets[0])

    media = await MediaLibrary.getAssetsAsync({
      mediaType: ['video','photo'],
      sortBy:'creationTime',
      first: 50,
      
    });

    setFiles(media.assets);

    media = await MediaLibrary.getAssetsAsync({
      mediaType: ['video','photo'],
      sortBy:'creationTime',
      first: media.totalCount,
      
    });
    setFiles(media.assets);
   // if(media.totalCount != null){setLoading(false)}
  };


  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setSelectedfiles(result.uri);
      console.log(result.uri);
    }
}

  useEffect(() => {
    getPermission();
   
  }, []);

  return (
      <SafeAreaView style={styles.container}>
     <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      {/* <MaterialCommunityIcons name="magnify" style={{fontSize:30, paddingRight:10, color:'#000'}} /> */}
      <MaterialCommunityIcons name="arrow-left" style={{fontSize:30, paddingLeft:5, color:'#000'}}  onPress={()=>navigation.navigate('Base')}/>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginTop:0, fontSize:20,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Create Post
        </Text>
      </View>
      <Pressable
        onPress={()=>navigation.navigate('EditPost',{
          file:selectedFile,
          hieght:selectedHeight,
          width:selectedWidth,
          duration:selectedDuration,
          type:selectedType
         })}
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff',}}>Next</Text>
    </Pressable>
    </View>


{selectedType == 'photo' ? (
  <Image  style={{justifyContent: 'center',  alignItems: 'center', height:300, width:'100%'} }        
         source={{
         uri:selectedFile,
         }}/>
  ):(
    <View style={{width:'100%'}}>
      <Video ref={null} style={{height:200, width:'100%'}}
         shouldPlay={true}
         volume={SelectedVolume}
         resizeMode="contain"
         isLooping={true}
         source={{ uri: selectedFile,}}  
         />
         
    </View>
        
  )}
   

<View style={{flexDirection:'row', marginLeft:10}}>

       {/* <TouchableOpacity style={{marginBottom:5, alignSelf:'flex-end', marginTop:5, marginRight:10}} onPress={ActivateSelectMultiple}>
        <View style={{backgroundColor:'#EBEBEB', alignContent:'center',justifyContent:'center', width:140, height:40, borderRadius:40, flexDirection:'row'}}>
        <MaterialCommunityIcons name="image-multiple" style={{fontSize:20, color:multipleButton, alignSelf:'center'}}/>
        <Text style={{fontSize:16, color:multipleButton, alignSelf:'center'}}>Select multiple</Text>
        </View>
        </TouchableOpacity> */}

        <TouchableOpacity style={{flexDirection:'row', marginBottom:5, alignSelf:'flex-end', marginTop:5, marginRight:10}} onPress={openCamera}>
        <View style={{backgroundColor:'#EBEBEB', alignContent:'center',justifyContent:'center', width:40, height:40, borderRadius:40}}>
        <MaterialCommunityIcons name="camera" style={{fontSize:20, color:'#000', alignSelf:'center'}}/>
        </View>
        </TouchableOpacity>
</View>

    <FlatList
      data={files}
      keyExtractor={item => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        
        <View style={{backgroundColor:'#fff', flex: 1,
        flexDirection: 'column',
         margin: 1,}}>

{item.mediaType == 'photo' ? (
  <TouchableOpacity  onPress={(uri)=>SelectFile(item.uri,item.mediaType)} >
     <Image  style={{justifyContent: 'center',  alignItems: 'center', height: 200,}}       
      source={{uri: item.uri, }}/>

     {/* {selectMultiple == true ? (
      <View>
      {selectedMultipleFile.includes(item.uri) ? (
          <MaterialCommunityIcons name="radiobox-marked" style={{fontSize:20, color:'#4f72ff', alignSelf:'flex-start',position:'absolute',margin:5}}/>
      ):(<View></View>)}
      </View>
     ):(<View></View>)} */}

      </TouchableOpacity>
     
     ):(
    <TouchableOpacity  onPress={(uri,type,duration)=>SelectFile(item.uri,item.mediaType,item.duration)} >
      <Video ref={null} style={{height:200}}
         shouldPlay={true}
         volume={0}
         isLooping={true}
         source={{ uri: item.uri,}}
         
         />
         <Text style={{position:'absolute', left: 0, right: 0, bottom: 0, color:'#fff',opacity: .4, backgroundColor:'#000', width:'100%'}}>{(item.duration/60).toFixed(2)}:min</Text>
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
