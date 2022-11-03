import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, ActivityIndicator,} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { TextInput,  
  Appbar,
 DarkTheme,
 DefaultTheme,
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
import * as DocumentPicker from 'expo-document-picker';
import { Video, AVPlaybackStatus, Audio } from 'expo-av';
import { SignedInState } from '../recoilState/SignInState';
import { authToken } from '../recoilState/authToken';
import { ReloadProfile } from '../recoilState/reloadProfile';
import * as ImagePicker from 'expo-image-picker';
import OrabuxConfig from '../config';

const URL = OrabuxConfig.url;

export default function Section2Form({ route,navigation })
 {
  
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [showDropDown, setShowDropDown] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setisLoading] = useState(false)
  const [next, setNext] = useState('flex');
  const [photo, setPhoto] = useState('');
  const [audio, setAudio] = useState('');
  const [audiofile, setAudioFile] = useState();
  const [audioFilename, setAudioFilename] = useState('Audio Filename');
  const [audioStatus, setAudioStatus] = useState(false);
  const [audioIcon, setAudioIcon] = useState('play');
  const [video, setVideo] = useState('');
  const [videoFilename, setVideoFilename] = useState('Video Filename');

  const [videoExample, setVideoExample] = useState('https://youtu.be/WSkETCRe7Ic');
  const [photoExample, setPhotoExample] = useState('https://images.squarespace-cdn.com/content/v1/60f82da883565757ea27e327/512228f2-c08f-40c5-8918-d9963d8833da/Next+Challenge+Logo+Hero+Twitter.png');

  const {  
    pk,
    title,
  } = route.params; 


  const SelectPhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 4],
     
    });

    console.log(result);
 
    if (result.cancelled) {
        return;
    }
    if (!result.cancelled) {
    setPhoto(result.uri);
    }
  }

  const SelectAudio = async () => {
 
    let result = await DocumentPicker.getDocumentAsync({
        type: "audio/*" // all audio files
    });
    console.log(result.uri);
    setAudioFilename(result.name)
    setAudio(result.uri);
    
    }

  const SelectVideo = async () => {
      let result = await DocumentPicker.getDocumentAsync({
          type: "video/*" // all video files
      });
      console.log(result.uri);
      setVideoFilename(result.name);
      setVideo(result.uri);
      }  

      

    async function playAudio() {
      const { sound } = await Audio.Sound.createAsync({uri: audio});
      setAudioFile(sound)
      await sound.playAsync();
      setAudioIcon('pause');
      setAudioStatus(true);
      console.log('Playing Sound');
    }

    async function stopAudio() {
      await audiofile.unloadAsync();
      setAudioIcon('play');
      setAudioStatus(false);
      console.log('Stop Sound');
    }

   function controlAudio() {
     if (audioStatus == false){
      playAudio();
     }
     else{
      stopAudio();
     }
    }

const SaveForm2 = async () => {
      setNext('none');
      setisLoading(true);

  if(photo != ''){ 
      let filename = photo.split('/').pop();
      let file_type = 'image/*';
   
      let formData = new FormData();
      formData.append('photo', { uri: photo, name: filename, type: file_type});
      formData.append('pk', pk);

      await axios.post(URL+'/api-save-challenge-from2/photo/', formData,     {
        headers: {
          'Authorization': `Token ${token}` ,
          'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        console.log('photo uploaded');
        console.log(res.status);
        uploadAudio();

      }).catch(err => {
          console.log(err.response);
          setisLoading(false);
          setNext('flex');
          ToastAndroid.show("Error Uploading...", ToastAndroid.SHORT);
      });

      }
      else{
        console.log('no photo');
        uploadAudio();
      }
  }

  const uploadAudio = async () => {
      if(audio != ''){
        let filename = audio.split('/').pop();
        let file_type = 'audio/*';

        let formData = new FormData();
        formData.append('audio', { uri: audio, name: filename, type: file_type});
        formData.append('pk', pk);
        await axios.post(URL+'/api-save-challenge-from2/audio/', formData,     {
          headers: {
            'Authorization': `Token ${token}` ,
            'Content-Type': 'multipart/form-data'
          }
      }).then(res => {
        console.log('audio uploaded');
        console.log(res.status);
        uploadVideo();

        }).catch(err => {
            console.log(err.response);
            setisLoading(false);
            setNext('flex');
            ToastAndroid.show("Error Uploading...", ToastAndroid.SHORT);
      });
  
        }
        else{
          console.log('no audio');
          uploadVideo();
        }
      }


  const uploadVideo = async () => {
        if(video != ''){
          let filename = video.split('/').pop();
          let file_type = 'video/*';

          let formData = new FormData();
          formData.append('video', { uri: video, name: filename, type: file_type});
          formData.append('pk', pk);

          await axios.post(URL+'/api-save-challenge-from2/video/', formData,     {
            headers: {
              'Authorization': `Token ${token}` ,
              'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
             // ToastAndroid.show("Uploaded Success!", ToastAndroid.SHORT);
               setisLoading(false);
               setNext('none');
               navigation.navigate('Section3Form',{pk:pk, title:title,})
          }).catch(err => {
              console.log(err.response);
              setisLoading(false);
              setNext('flex');
              ToastAndroid.show("Error Uploading...", ToastAndroid.SHORT);
          });
    
          }
          else{
            console.log('no video');
            navigation.navigate('Section3Form',{pk:pk, title:title,})
            setNext('flex');
            setisLoading(false);
          }
     }

  
  
  return (
    <SafeAreaView style={styles.container}>
    
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginTop:5, textAlignVertical:'center', marginLeft:10, fontSize:18,fontWeight:'bold', color:'#000'}}>
        Challange setup
        </Text>
      </View>
      <View>
        
      </View>
      <ActivityIndicator size="large" color="#4f72ff"  animating={isLoading}
           style={{paddingRight:10,position:'absolute', alignSelf:'flex-end', paddingTop:10}}/>
      <Pressable
      onPress={SaveForm2}
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10, display:next}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff',}}>Next</Text>
    </Pressable>
    </View>
   <ScrollView style={{width:'100%', alignSelf:'center', padding:0}}>
   <Text style={{fontSize:15, marginTop:10, marginLeft:5}}>
     Attach Image (coverPhoto, artwork, thumbnail) Optional
   </Text>
  
   {photo == '' ? (
   <Image style={{ alignSelf:'center', marginTop:10, width:"100%", height:300}} 
         source={{
            uri: photoExample,
          }}
          />
     ):(
      <Image style={{ alignSelf:'center', marginTop:10, width:"100%", height:300}} 
         source={{
            uri: photo,
          }}
          />
    )
   }

   <TouchableOpacity onPress={SelectPhoto}
   style={{flexDirection:'row', backgroundColor:'#e80b07',width:130, height:40, padding:4, borderRadius:15,marginTop:10, marginLeft:10}}>
   <MaterialCommunityIcons name="image" style={{fontSize:20, color:'#fff',textAlignVertical:'center',marginLeft:5}} />
   <Text style={{fontSize:14, textAlignVertical:'center',color:'#fff',marginLeft:5}}>Select Image</Text>
   </TouchableOpacity>


   <Text style={{fontSize:15, marginTop:20, marginLeft:10}}>
     Attach Audio File (Optional)
   </Text>

   <TouchableOpacity 
   style={{flexDirection:'row', backgroundColor:'#fff', borderWidth:1, borderColor:'#e84a07',width:'60%', height:50, padding:4, borderRadius:20,margin:10}}>
    <Pressable onPress={controlAudio}
    style={{flexDirection:'row', backgroundColor:'gray',width:35, height:35, borderRadius:20, alignSelf:'center'}}>
    <MaterialCommunityIcons name={audioIcon} style={{fontSize:25, color:'#fff',textAlignVertical:'center',marginLeft:5}} />
    </Pressable>
   <Text style={{fontSize:14, textAlignVertical:'center',color:'#000',marginLeft:5}}>{audioFilename}</Text>
   </TouchableOpacity>

   <Pressable onPress={SelectAudio}
   style={{flexDirection:'row', backgroundColor:'#e80b07',width:130, height:40, padding:4, borderRadius:15,marginLeft:10}}>
   <MaterialCommunityIcons name="music-circle" style={{fontSize:20, color:'#fff',textAlignVertical:'center',marginLeft:5}} />
   <Text style={{fontSize:14, textAlignVertical:'center',color:'#fff',marginLeft:5}}>Select Audio</Text>
   </Pressable>

   <Text style={{fontSize:15, marginTop:30, marginLeft:5}}>
     Attach Video (video description, example)Optional
   </Text>
   {video == '' ? (
 <Video
 style={{width:'100%', height:300}}
 source={{
   uri: videoExample,
 }}
 useNativeControls
 resizeMode="cover"
 />
     ):(
      <Video
      style={{width:'100%', height:300}}
      source={{
        uri: video,
      }}
      useNativeControls
      resizeMode="cover"
      />
    )
   }

   <TouchableOpacity onPress={SelectVideo}
   style={{flexDirection:'row', backgroundColor:'#e80b07',width:130, height:40, padding:4, borderRadius:15,margin:10, marginLeft:10}}>
   <MaterialCommunityIcons name="video" style={{fontSize:20, color:'#fff',textAlignVertical:'center',marginLeft:5}} />
   <Text style={{fontSize:14, textAlignVertical:'center',color:'#fff',marginLeft:5}}>Select Video</Text>
   </TouchableOpacity>

   </ScrollView>
    </SafeAreaView >     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      
      },


});
