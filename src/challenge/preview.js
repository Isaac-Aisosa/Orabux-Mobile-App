
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,StatusBar, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, ActivityIndicator,Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput,  
  Appbar,
 DarkTheme,
 DefaultTheme,
 RadioButton,
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

import { SignedInState } from '../recoilState/SignInState';
import { authToken } from '../recoilState/authToken';
import { ReloadProfile } from '../recoilState/reloadProfile';
import * as ImagePicker from 'expo-image-picker';
import OrabuxConfig from '../config';

const URL = OrabuxConfig.url;

export default function ChallengePreview({ route,navigation })
 {

  const {  
    pk,
  } = route.params; 
  
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [isLoading, setisLoading] = useState(false);
  const [next, setNext] = useState('flex');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [attachImage, setAttachImage] = useState('');
  const [attachAudio, setAttachAudio] = useState('');
  const [attachVideo, setAttachVideo] = useState('');
  const [allowed_voter, setAllowedVoter] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [minVote, setMinVote] = useState('');
  const [rewardType, setRewardType] = useState('');
  const [number_winner, setNumberWinner] = useState(0);
  const [worth, setWorth] = useState('');
  const [grandPrize, setGrandPrize] = useState(0);
  const [reward_2, setReward_2] = useState(0);
  const [reward_3, setReward_3] = useState(0);
  const [reward_4, setReward_4] = useState(0);
  const [reward_5, setReward_5] = useState(0);
  const [reward_6, setReward_6] = useState(0);
  const [reward_7, setReward_7] = useState(0);
  const [reward_8, setReward_8] = useState(0);
  const [reward_9, setReward_9] = useState(0);
  const [reward_10, setReward_10] = useState(0);
  const [otherBenefit, setOtherBenefit] = useState('');


  const GetChallenge = async () => {

    await axios.post( URL + '/api-get-challenge/details/', 
    
      {
        pk: pk,
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
     setTitle(response.data.title)
     setDescription(response.data.description)
     setCategory(response.data.category)
     setAttachAudio(response.data.attach_audio)
     setAttachImage(response.data.attach_image)
     setAttachVideo(response.data.attach_video)
     setAllowedVoter(response.data.allowed_voter)
     setMinVote(response.data.minimumVote)
     setNumberWinner(response.data.select_winner)
     setStartDate(response.data.start_date)
     setEndDate(response.data.end_date)
     setDuration(response.data.duration)
     setRewardType(response.data.cashReward)
     setGrandPrize(response.data.first_place_reward)
     setReward_2(response.data.second_place_reward)
     setReward_3(response.data.third_place_reward)
     setReward_4(response.data.forth_place_reward)
     setReward_5(response.data.firth_place_reward)
     setReward_6(response.data.six_place_reward)
     setReward_7(response.data.seven_place_reward)
     setReward_8(response.data.eight_place_reward)
     setReward_9(response.data.ninth_place_reward)
     setReward_10(response.data.tenth_place_reward)
     setWorth(response.data.worth)
     })
     .catch(function (error) {
     console.log(error);
     ToastAndroid.show("error!", ToastAndroid.SHORT);
     });
    
   }

   GetChallenge();

   function MakePayment(){
    navigation.navigate('ChallengePayment',{pk:pk, title:title,amount:worth})
   }


  return (
    <SafeAreaView style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>  
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginLeft:10,marginTop:10, fontSize:16,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Challange Preview*
        </Text>
      </View>

      <Pressable
      onPress={MakePayment}
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10, display:next}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff',}}>Done</Text>
    </Pressable>
    </View>

   <ScrollView style={{width:'100%', alignSelf:'center',height:'100%'}}>

    {attachImage == '' ? (
   <View style={{ alignSelf:'center', width:"100%", height:230, backgroundColor:'#8f062f'}}>
    <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20, textAlignVertical:'center', marginTop:59, color:'#fff'}}>#{title}</Text>
    
    </View>
     ):(
      <View  style={{ alignSelf:'center', marginTop:0, width:"100%", height:280}}>
       <Image style={{ alignSelf:'center', marginTop:0, width:"100%", height:230}} 
         source={{
            uri: URL + attachImage,
          }}
          />
      <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20, marginTop:10, color:'#000'}}>#{title}</Text> 
     </View>
    )
   }

    <View style={{margin:10}}>
    <Text  style={{fontSize:25,fontWeight:'bold', marginTop:5, alignSelf:'center', color:'#13068f'}}>Worth: {parseInt(worth).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>

    <Text  style={{fontSize:20,fontWeight:'bold'}}>Description:</Text> 
       <Text style={{fontSize:15,fontWeight:'normal'}}>
        {description}
        </Text> 
   
   <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Category: {category}</Text> 

   {attachAudio == '' ? (
   <View>
    </View>
     ):(
      <View  style={{ alignSelf:'center', marginTop:0, width:"100%", height:280}}>
        <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Attach_audio</Text> 
      <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20, marginTop:10, color:'#000'}}>{attachAudio}</Text> 
     </View>
    )
   }
    
    {attachVideo == '' ? (
   <View>
    </View>
     ):(
      <View  style={{ alignSelf:'center', marginTop:0, width:"100%", height:280}}>
        <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Attach_video</Text> 
      <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20, marginTop:10, color:'#000'}}>{attachVideo}</Text> 
     </View>
    )
   } 

  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Allowed_voters: {allowed_voter}*</Text>
  
  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>MinVote: {minVote}</Text>

  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Duration: {duration}</Text>
  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Start Date: {start_date}</Text>
  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>End Date: {end_date}</Text>

  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Reward Type: Cash Prize*</Text>

  <Text  style={{fontSize:20,fontWeight:'bold', marginTop:5}}>Selected Winner: {number_winner}</Text>

  {number_winner >= 1 && (
 <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>GrandPrize:{grandPrize.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )}

{number_winner >= 2 && (
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>2nd Place:{reward_2.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )}

{number_winner >= 3 && (
 <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>3rd Place:{reward_3.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )}     
{number_winner >= 4 && (
 <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>4th Place:{reward_4.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )}

{number_winner >= 5 && (
 <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>5th Place:{reward_5.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )}      

{number_winner >= 6 && (
 <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>6th Place:{reward_6.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )} 

{number_winner >= 7 && (
 <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>7th Place:{reward_7.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )}     

{number_winner >= 8 && (
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>8th Place:{reward_8.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )} 

  {number_winner >= 9 && (
 <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>9th Place:{reward_9.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )} 

{number_winner >= 10 && (
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>10th Place:{reward_10.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
      )}



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
