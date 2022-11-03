
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
  const [attachImage, setAttachImage] = useState('');
  const [numberQuestion, setNumberQuestion] = useState(0);
  const [question1, setQuestion1] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [question5, setQuestion5] = useState('');
  const [answer5, setAnswer5] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [rewardType, setRewardType] = useState('');
  const [worth, setWorth] = useState('');
  const [grandPrize, setGrandPrize] = useState(0);
  const [otherBenefit, setOtherBenefit] = useState('');


  const GetQuiz = async () => {

    await axios.post( URL + '/api-quiz-preview/', 
    
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
     setAttachImage(response.data.attach_image)
     setNumberQuestion(response.data.numberQuestion)
     setStartDate(response.data.start_date)
     setEndDate(response.data.end_date)
     setDuration(response.data.duration)
     setRewardType(response.data.cashReward)
     setGrandPrize(response.data.grandPrize)
     setWorth(response.data.worth)
     setQuestion1(response.data.question1)
     setAnswer1(response.data.answer1)
     setQuestion2(response.data.question2)
     setAnswer2(response.data.answer2)
     setQuestion3(response.data.question3)
     setAnswer3(response.data.answer3)
     setQuestion4(response.data.question4)
     setAnswer4(response.data.answer4)
     setQuestion5(response.data.question5)
     setAnswer5(response.data.answer5)
     })
     .catch(function (error) {
     console.log(error);
     ToastAndroid.show("error!", ToastAndroid.SHORT);
     });
    
   }

   GetQuiz();

   function MakePayment(){
    navigation.navigate('QuizPayment',{pk:pk, title:title,amount:worth})
   }


  return (
    <SafeAreaView style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>  
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginLeft:10,marginTop:10, fontSize:16,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
       Quiz Preview*
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

  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Duration: {duration}</Text>
  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Start Date: {start_date}</Text>
  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>End Date: {end_date}</Text>

  <Text  style={{fontSize:18,fontWeight:'bold', marginTop:5}}>Reward Type: Cash Prize*</Text>

  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>GrandPrize:{grandPrize.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
     

  <Text  style={{fontSize:20,fontWeight:'bold', marginTop:5}}>Number Question: {numberQuestion}</Text>

  {numberQuestion >= 1 && (
  <View>
 <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Question1:{question1}</Text>
 <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Answer1:{answer1}</Text>
 </View>
    
     )}

{numberQuestion >= 2 && (
  <View>
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Question2:{question2}</Text>
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Answer2:{answer2}</Text>
  </View>
      )}

{numberQuestion >= 3 && (
  <View>
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Question3:{question3}</Text>
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Answer3:{answer3}</Text>
  </View>
      )}     
{numberQuestion >= 4 && (
  <View>
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Question4:{question4}</Text>
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Answer4:{answer4}</Text>
  </View>
     )}

{numberQuestion >= 5 && (
  <View>
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Question5:{question5}</Text>
  <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>Answer5:{answer5}</Text>
  </View>
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
