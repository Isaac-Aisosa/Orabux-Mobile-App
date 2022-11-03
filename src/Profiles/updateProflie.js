import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, ActivityIndicator,} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { TextInput, Provider, Surface} from 'react-native-paper';
import axios from 'axios';
import DropDown from "react-native-paper-dropdown";
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

export default function UpdateProfile({ route,navigation })
 {
  const {  
    username,
    name,
    phone,
    bio,
    DOB,
    location,
    gender,
    profileImage,
    profession
  } = route.params; 
 
  
  const signedIn  = useRecoilValue(SignedInState);
  const [reloadProfile, setProfileReload] = useRecoilState(ReloadProfile);
  const token = useRecoilValue(authToken);
  const [isSaving, setisSaving] = useState('flex')
  const [isSaved, setisSaved] = useState('none')
  const [isLoading, setisLoading] = useState(false)
  const [ImageLoading, setImageLoading] = useState(false)
  const [username_input, setUsername] = useState('');
  const [name_input, setName] = useState('');
  const [bio_input, setBio] = useState('');
  const [profession_input, setProfession] = useState('');
  const [location_input, setLocation] = useState('');
  const [DOB_input, setDOB] = useState(new Date(Date.now()));
  const [DOB_formated, setDOBFormated] = useState('');
  const [gender_input, setGender] = useState('');
  const [phone_input, setPhone] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [profileImage_input, setProfileImage] = useState(profileImage);
  const [avaterImage_input, setAvaterImage] = useState('https://media.istockphoto.com/photos/smiling-indian-man-looking-at-camera-picture-id1270067126?k=20&m=1270067126&s=612x612&w=0&h=ZMo10u07vCX6EWJbVp27c7jnnXM2z-VXLd-4maGePqc=');


  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDOB(value);
    setDOBFormated(DOB_input.getFullYear()+'-'+(DOB_input.getUTCMonth()+1)+'-'+DOB_input.getDate())
    //DOB = DOB_formated;
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const takePhotoAndUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
     
    });

    console.log(result);
 
    if (result.cancelled) {
        return;
    }
    if (!result.cancelled) {
    setImageLoading(true);
    ToastAndroid.show("Uploading Profile Photo", ToastAndroid.SHORT);
    let localUri = result.uri;
    //setProfileImage(localUri);
    let filename = localUri.split('/').pop();
    console.log(localUri);
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('profileImage', { uri: localUri, name: filename, type });

    await axios.post(URL+'/api-update-user-profile/image/', formData,     {
      headers: {
        'Authorization': `Token ${token}` ,
        'Content-Type': 'multipart/form-data'
      }
  }).then(res => {
        setImageLoading(false);
        setProfileReload(true);
        ToastAndroid.show("Uploaded Success!", ToastAndroid.SHORT);
        setProfileImage(URL+res.data.profileImage);
    }).catch(err => {
        setImageLoading(false);
        console.log(err.response);
        ToastAndroid.show("Error Uploading", ToastAndroid.SHORT);
    });
    }
  }

  
  const UpdateProfile = async () => {
    let usernameValue = username_input;
    let nameValue = name_input;
    let bioValue = bio_input;
    let DOBValue = DOB_formated;
    let ProffessionValue = profession_input;
    let phoneValue = phone_input;
    let locationValue = location_input;

    if (username_input == '') {usernameValue=username; console.log('username empty detected') }
    if (name_input == '') {nameValue=name;}
    if (bio_input == '') {bioValue=bio}
    if (DOB_formated == '') {DOBValue=DOB}
    if (profession_input == '') {ProffessionValue=profession}
    if (phone_input == '') {phoneValue=phone}
    if (location_input == '') {locationValue=location} 
     setisLoading(true);
     setisSaving('none');
     setisSaved('none');
     console.log('username:'+ usernameValue);

    await axios.post( URL + '/api-update-user-profile/', 
  
    {
      username: usernameValue,
      name: nameValue,
      bio: bioValue,
      DOB: DOBValue,
      profession: ProffessionValue,
      phone: phoneValue,
      location:locationValue,

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
   setisLoading(false);
   setisSaving('none');
   setisSaved('flex');
   setProfileReload(true);
   ToastAndroid.show("Profile updated success!", ToastAndroid.SHORT);
   })
   .catch(function (error) {
   console.log(error);
   setisLoading(false);
   setisSaving('flex');
   setisSaved('none');
   ToastAndroid.show("Profile update error!", ToastAndroid.SHORT);
   });

   }

  return (
    <SafeAreaView style={styles.container}>
    
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
   <View style={{backgroundColor:'#fff', width:'100%', height:50, marginBottom:0,marginTop:30, flexDirection:'column',}}>
    {/* <Image style={{ alignSelf:'center', marginLeft:20,marginTop:5, width:'10%', height:40}} source={logo}   /> */}
    <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
     {/* <MaterialCommunityIcons name="magnify" style={{fontSize:30, paddingRight:10, color:'#000'}} /> */}
     <MaterialCommunityIcons name="close" style={{fontSize:30, paddingLeft:10, color:'#000'}}  onPress={()=>navigation.navigate('UserProfile')}/>
     </View>
 
     <View style={{alignSelf:'flex-end', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
     {/* <MaterialCommunityIcons name="magnify" style={{fontSize:30, paddingRight:10, color:'#000'}} /> */}
     <ActivityIndicator size="large" color="#000"  animating={isLoading}
           style={{paddingRight:10, color:'#000',position:'relative'}}/>
    <MaterialCommunityIcons name="check" 
          style={{fontSize:40, paddingRight:10, position:'relative', color:'green', fontWeight:'bold', display:isSaved }}/>
    
    <Text style={{fontSize:20, paddingRight:10, color:'#000', fontWeight:'700', display:isSaving}}  onPress={UpdateProfile}>Save</Text>
     </View>
   </View>

   <ScrollView style={{width:'100%', alignSelf:'center', padding:10}}>
   <Pressable>
        <Image style={{ alignSelf:'center', marginTop:0, width:100, height:100, borderRadius:50,}} 
         source={{
            uri: profileImage_input,
          }}
          />
     <ActivityIndicator size="large" color="#000"  animating={ImageLoading}
           style={{paddingRight:10, color:'#000',position:'absolute',alignSelf:'center',paddingTop:30}}/>
       <MaterialCommunityIcons onPress={takePhotoAndUpload}
       name="camera" style={{fontSize:30, paddingLeft:120,paddingTop:70, color:'#000',alignSelf:'center', position:'absolute'}}/>
     
    </Pressable> 


      <View style={{flexDirection:'row', marginBottom:10 }}>
          <TextInput
             mode="flat"
             label="Username"
             placeholder= ''
             keyboardType='default'
             textContentType='username'
             defaultValue={username}
             value={username}
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             onChangeText={(val)=> setUsername(val)}

             /> 
    </View>
    <View style={{flexDirection:'row', marginBottom:10 }}>
          <TextInput
             mode="flat"
             label="Name"
             placeholder= ''
             keyboardType='default'
             textContentType='givenName'
             defaultValue={name}
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             onChangeText={(val)=> setName(val)}

             /> 
    </View>

    <View style={{flexDirection:'row', marginBottom:10 }}>
          <TextInput
             mode="flat"
             label="Proffession, Skill, Career"
             placeholder= ''
             keyboardType='default'
             textContentType='jobTitle'
             defaultValue={profession}
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             onChangeText={(val)=> setProfession(val)}

             /> 
    </View>

    <View style={{flexDirection:'row', marginBottom:10 }}>
          <TextInput
             mode="flat"
             label="Bio"
             placeholder= ''
             keyboardType='default'
             textContentType='jobTitle'
             defaultValue={bio}
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             onChangeText={(val)=> setBio(val)}

             /> 
    </View>

    <View style={{flexDirection:'row', marginBottom:10 }}>

          <TextInput
             mode="flat"
             label="Phone"
             placeholder= ''
             keyboardType='phone-pad'
             textContentType='telephoneNumber'
             defaultValue={phone}
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             onChangeText={(val)=> setPhone(val)}

             /> 
    </View>


        <Text style={{fontSize:15, marginTop:20}}>
           Date of Birth
        </Text> 
    
        <Text style={{fontSize:20, marginTop:0, marginBottom:2, fontWeight:'bold'}}>
           {DOB}
        </Text>


        {/* The button that used to trigger the date picker */}
        {!isPickerShow && (
        <View style={{flexDirection:'row'}}>
          <Pressable  onPress={showPicker}  style={{backgroundColor:'#fff', width:'30%', height:30, borderRadius:5,borderColor:'#000', borderWidth:0.5}}>
            <Text style={{alignSelf:'center', fontSize:14, color:'#000',marginTop:5}}>Select Date</Text>
            </Pressable>
            <Text style={{fontSize:15, marginTop:10, marginBottom:10, fontWeight:'500', paddingLeft:10}}>
            {DOB_input.getFullYear()}-{DOB_input.getUTCMonth()+1}-{DOB_input.getDate()}
        </Text>

        </View>
      )}

      {/* The date picker */}

      {isPickerShow && (
        <DateTimePicker
          value={DOB_input}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
          style={styles.datePicker}
        />
      )}
       
 <View style={{flexDirection:'row', marginBottom:10 }}>

<TextInput
   mode="flat"
   label="Location"
   placeholder= ''
   keyboardType='default'
   textContentType='addressCityAndState'
   defaultValue={location}
   style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
   autoCapitalize='none'
   activeUnderlineColor='#000'
   onChangeText={(val)=> setLocation(val)}

   /> 
</View>
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
