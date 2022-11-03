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

export default function CreateChallenge({ route,navigation })
 {
  
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [showDropDown, setShowDropDown] = useState(false);
  const [tiltle, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setisLoading] = useState(false)
  const [next, setNext] = useState('flex')

  const categoryList = [
    {
      label: "Music",
      value: "music",
    },
    {
      label: "Dance",
      value: "dance",
    },
    {
      label: "Comedy",
      value: "comedy",
    },
    {
        label: "Technology",
        value: "technology",
    },
    {
        label: "Fashion",
        value: "fashion",
    },
    {
      label: "Entertainment",
      value: "entertainment",
    },
    {
      label: "Social",
      value: "social",
  },
    {
        label: "Others",
        value: "Others",
      },
  ];


  const SaveForm1 = async () => {
    if(tiltle == '' || tiltle.length < 6){
      ToastAndroid.show("Invalid title !", ToastAndroid.SHORT);
    }
    else{
      setNext('none');
      setisLoading(true);
    await axios.post( URL + '/api-save-challenge-from1/', 
    
      {
        title: tiltle,
        type: category,
        description: description,
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
     console.log(response.data.pk);
     navigation.navigate('Section2Form',{pk:response.data.pk, title:response.data.title,})
     setisLoading(false);
     })
     .catch(function (error) {
     console.log(error);
     setisLoading(false);
     setNext('flex');
     ToastAndroid.show("Profile update error!", ToastAndroid.SHORT);
     });
    }
   }
  
  
  return (
    <SafeAreaView style={styles.container}>
    
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginLeft:10, fontSize:20,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Start Challenge
        </Text>
      </View>
      <View>
        
      </View>
      <ActivityIndicator size="large" color="#4f72ff"  animating={isLoading}
           style={{paddingRight:10,position:'absolute', alignSelf:'flex-end', paddingTop:10}}/>
      <Pressable
      onPress={SaveForm1}
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10, display:next}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff',}}>Next</Text>
    </Pressable>
    </View>
    <Provider >
   <ScrollView style={{width:'100%', alignSelf:'center', padding:10}}>
   <Surface>
      <View style={{flexDirection:'row', marginBottom:10 }}>
          <TextInput
             mode="flat"
             label="Title"
             placeholder= 'Challenge Title'
             keyboardType='default'
             maxLength={50}
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             onChangeText={(val)=> setTitle(val)} /> 
     </View>

     <Text style={{fontSize:14, marginTop:10}}>
           Challenge Category
        </Text>
            <DropDown
              label={"Category"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={category}
              setValue={setCategory}
              list={categoryList}
            />

    <View style={{flexDirection:'row', marginTop:20 }}>
          <TextInput
             mode="outlined"
             label="Describ challange"
             placeholder= 'challenge description'
             keyboardType='default'
             textContentType='username'
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:200}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             maxLength={500}
             multiline={true}
             onChangeText={(val)=> setDescription(val)} /> 
    </View>
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
