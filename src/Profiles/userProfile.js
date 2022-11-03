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

import PostList from './postList';
import ContestList from './contestList';
import CreatedList from './CreatedList';

const ContentTab = createMaterialTopTabNavigator();

import OrabuxConfig from '../config';
const URL = OrabuxConfig.url;

export default function UserProfile({navigation })
 {
  const profileReload = useRecoilValue(ReloadProfile);
  const [reloaded, setReloaded] = useRecoilState(ReloadProfile);
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const { showActionSheetWithOptions } = useActionSheet();
  console.log(signedIn)
  console.log(token)

  const [profileImage, setProfileImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png');
  const [avaterImage, setAvaterImage] = useState('https://media.istockphoto.com/photos/smiling-indian-man-looking-at-camera-picture-id1270067126?k=20&m=1270067126&s=612x612&w=0&h=ZMo10u07vCX6EWJbVp27c7jnnXM2z-VXLd-4maGePqc=');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [DOB, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [joined, setJoined] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [postCount, setPostCount] = useState();
  const [ctreatedCount, setCreatedCount] = useState();

  const icons = [
    <MaterialCommunityIcons name="gmail" style={{fontSize:25, color:'#000'}}/>,
    <MaterialCommunityIcons name="phone" style={{fontSize:25, color:'#000'}}/>,
    <MaterialCommunityIcons name="twitter" style={{fontSize:25, color:'#000'}}/>,
    <MaterialCommunityIcons name="facebook" style={{fontSize:25, color:'#000'}}/>,
    <MaterialCommunityIcons name="instagram" style={{fontSize:25, color:'#000'}}/>,
  ];

  const openSheet = () => {
    const options = [email, phone, "twitter" , "facebook", "instagram", ];
    const destructiveButtonIndex = null; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = null; //Element number 2 in the array will be the 'Cancel' button
  
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex, //the third button will be the 'Cancel' button
        destructiveButtonIndex, //the first button will be the 'Delete' option
        title: "Contacts",
        showSeparators: true, //display a seperator component after each item.
        //apply custom styles to the action sheet.
         containerStyle: styles.actionSheet, 
         textStyle: styles.text,
         messageTextStyle: styles.message,
         titleTextStyle: styles.title,
         icons
      },
      (buttonIndex) => {  }
    );
    }
  
  const FetchProfile = async () => {
   await axios.get( URL + '/api-get-user-profile/', 
    {
      headers: {
        'Authorization': `Token ${token}` 
      }
  
  })
  .then(function (response) {
  console.log(response.status);
  console.log(response.data);
  setUsername(response.data.username);
  if(response.data.name === null){setName('Update Profile🙃!');}
  else{setName(response.data.name);}
  setEmail(response.data.email);
  setBio(response.data.bio);
  setGender(response.data.Gender);
  setDOB(response.data.DOB);
  setPhone(response.data.phone);
  setProfession(response.data.profession);
  setJoined(response.data.joined);
  setFollowers(response.data.followers);
  setFollowing(response.data.following);
  setLocation(response.data.location);
  setProfileImage(URL+response.data.profileImage)
  setReloaded(false);
  })
  .catch(function (error) {
  console.log(error);
  setReloaded(false);
  });
  }

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
 setPostCount(response.data.posts_count);
 })
 .catch(function (error) {
 console.log(error);
 });
 }

 const GetUserCreatedContest = async () => {
  await axios.get( URL + '/api-get-user/created/contest/', 
   {
     headers: {
       'Authorization': `Token ${token}` 
     }
 
 })
 .then(function (response) {
 console.log(response.status);
 setCreatedCount(response.data.count);
 })
 .catch(function (error) {
 console.log(error);
 });
 }


  useEffect(()=>{
    FetchProfile();
    GetUserPost();
    GetUserCreatedContest();
    if (profileReload == true){
      FetchProfile();
    }
 },[])

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  return (
      <SafeAreaView style={styles.container}>
     <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:50, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
     {/* <Image style={{ alignSelf:'center', marginLeft:20,marginTop:5, width:'10%', height:40}} source={logo}   /> */}
      <Text style={{marginLeft:20, textAlignVertical:'center', marginTop:5, fontSize:20,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        {username}
        </Text>
      <View style={{alignSelf:'flex-end', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      {/* <MaterialCommunityIcons name="magnify" style={{fontSize:30, paddingRight:10, color:'#000'}} /> */}
      <MaterialCommunityIcons name="menu" style={{fontSize:30, paddingRight:10, color:'#000'}}  onPress={()=>navigation.navigate('ControlPanel')}/>
      </View>
    </View>
    <Pressable>
        <Image style={{ alignSelf:'center', marginTop:10, width:100, height:100, borderRadius:50}} 
         source={{
            uri: profileImage,
          }}
          />
    </Pressable> 

    <View style={{alignSelf:'center', marginTop:5}}>
      <Text style={{fontSize:18, fontWeight:'bold',textAlign:'center',color:'#000' }}>{name}</Text>
      <Text style={{fontSize:18, fontWeight:'normal',textAlign:'center',color:'#545454'}}>{profession}</Text>
      <Text style={{fontSize:14, fontWeight:'normal',textAlign:'center',color:'#000'}}>{bio}</Text>
      <Text style={{fontSize:14, fontWeight:'normal',textAlign:'center',color:'#424259'}}>{location}</Text>
    </View>

    <View style={{alignSelf:'center', marginTop:20,flexDirection:'row'}}>
      <Pressable style={{width:'30%'}}>
        <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>{followers}</Text>
        <Text style={{alignSelf:'center', fontSize:18, fontWeight:'300'}}>Followers</Text>
      </Pressable>

      <Pressable style={{width:'30%'}}>
        <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>{following}</Text>
        <Text style={{alignSelf:'center', fontSize:18, fontWeight:'300'}}>Following</Text>
      </Pressable>
   
   
      <Pressable style={{width:'30%'}}>
        <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>23M</Text>
        <Text style={{alignSelf:'center', fontSize:18, fontWeight:'300'}}>Votes</Text>
      </Pressable>

    </View>

    <View style={{alignSelf:'center', marginTop:20,flexDirection:'row'}}>
    <Pressable
     onPress={()=>navigation.navigate('UpdateProfile',{
      username:username,
      name:name,
      phone:phone,
      bio:bio,
      DOB:DOB,
      location:location,
      gender:gender,
      profession:profession,
      profileImage:profileImage,
     })}
     style={{width:'45%', height:40, backgroundColor:'#fff', borderRadius:5, marginTop:10,margin:5, alignSelf:'center', borderColor:'#000', borderWidth:1 }}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#000'}}>Edit profile</Text>
    </Pressable>

    <Pressable onPress={() => openSheet()}
    style={{width:'45%', height:40, backgroundColor:'#fff', borderRadius:5, marginTop:10,margin:5, alignSelf:'center', borderColor:'#000', borderWidth:1 }}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#000'}}>Contact</Text>
    </Pressable>

  </View>

<ContentTab.Navigator
      initialRouteName="PostList"
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarLabelStyle: { fontSize: 10, fontWeight:'400' },
        tabBarStyle: { backgroundColor: '#fff' },
        
      }}
>
      <ContentTab.Screen 
         options={{
          tabBarLabel: ` ${postCount} Post`,
           tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="grid" color={color} size={25} />
          ),
         }}
      name="PostList" component={PostList} />
      <ContentTab.Screen 
       options={{
        tabBarLabel: '+20k Contest',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="crown-circle" color={color} size={25} />
        ),
       }}
      name="ContestList" component={ContestList} />
      <ContentTab.Screen 
      options={{
      tabBarLabel: `${ctreatedCount} Created`,
      tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="cards-variant" color={color} size={25} />
      ),
    }}
      name="CreatedList" component={CreatedList} />
</ContentTab.Navigator>

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
