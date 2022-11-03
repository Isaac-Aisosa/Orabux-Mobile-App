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
import DateTimePicker from '@react-native-community/datetimepicker';
import { SignedInState } from '../recoilState/SignInState';
import { authToken } from '../recoilState/authToken';
import { ReloadProfile } from '../recoilState/reloadProfile';
import * as ImagePicker from 'expo-image-picker';
import OrabuxConfig from '../config';

const URL = OrabuxConfig.url;

export default function QuizForm2({ route,navigation })
 {
    const {  
        pk,
        title,
      } = route.params; 
    
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [photo, setPhoto] = useState('');
  const [photoExample, setPhotoExample] = useState('https://images.squarespace-cdn.com/content/v1/60f82da883565757ea27e327/512228f2-c08f-40c5-8918-d9963d8833da/Next+Challenge+Logo+Hero+Twitter.png');
  const [isLoading, setisLoading] = useState(false)
  const [next, setNext] = useState('flex')

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



const SaveQuizForm2 = async () => {
      setNext('none');
      setisLoading(true);

  if(photo != ''){ 
      let filename = photo.split('/').pop();
      let file_type = 'image/*';
   
      let formData = new FormData();
      formData.append('photo', { uri: photo, name: filename, type: file_type});
      formData.append('pk', pk);

      await axios.post(URL+'/api-save-quiz-from2/photo/', formData,     {
        headers: {
          'Authorization': `Token ${token}` ,
          'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        console.log('photo uploaded');
        console.log(res.status);
        navigation.navigate('QuizForm3',{pk:pk, title:title,})

      }).catch(err => {
          console.log(err.response);
          setisLoading(false);
          setNext('flex');
          ToastAndroid.show("Error Uploading...", ToastAndroid.SHORT);
      });

      }
      else{
        console.log('no photo');
        navigation.navigate('QuizForm3',{pk:pk, title:title,})
      }
  }
  
  
  return (
    <SafeAreaView style={styles.container}>
    
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginLeft:10, fontSize:20,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Quiz Cover Photo
        </Text>
      </View>
      <View>
        
      </View>
      <ActivityIndicator size="large" color="#4f72ff"  animating={isLoading}
           style={{paddingRight:10,position:'absolute', alignSelf:'flex-end', paddingTop:10}}/>
      <Pressable
      onPress={SaveQuizForm2}
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10, display:next}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff',}}>Next</Text>
    </Pressable>
    </View>
    <Provider >
   <ScrollView style={{width:'100%', alignSelf:'center'}}>
   <Text style={{fontSize:15, marginTop:10, marginLeft:5}}>
     Attach coverPhoto, artwork, thumbnail (Optional)
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
