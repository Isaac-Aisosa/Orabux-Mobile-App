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

export default function CreateQuiZ({ route,navigation })
 {
  
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [showDropDown, setShowDropDown] = useState(false);
  const [title, setTitle] = useState('');
  const [numberQuestion, setNumberQuestion] = useState(1);
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
  const [isLoading, setisLoading] = useState(false)
  const [next, setNext] = useState('flex')

  const questionList = [
    {
      label: "One Question",
      value: 1,
    },
    {
      label: "Two Question",
      value: 2,
    },
    {
      label: "Three Question",
      value: 3,
    },
    {
        label: "Four Question",
        value: 4,
    },
    {
        label: "Five Question",
        value: 5,
    },
 
  ];


  const SaveQuizForm1 = async () => {
    if(title == '' || title.length < 6){
      ToastAndroid.show("Invalid title !", ToastAndroid.SHORT);
    }
    else{
      setNext('none');
      setisLoading(true);
    await axios.post( URL + '/api-save-quiz-from1/', 
    
      {
        title: title,
        numberQuestion: numberQuestion,
        question1: question1,
        answer1:answer1,
        question2: question2,
        answer2:answer2,
        question3: question3,
        answer3:answer3,
        question4: question4,
        answer4:answer4,
        question5: question5,
        answer5:answer5,
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
     navigation.navigate('QuizForm2',{pk:response.data.pk, title:response.data.title,})
     setisLoading(false);
     })
     .catch(function (error) {
     console.log(error);
     setisLoading(false);
     setNext('flex');
     ToastAndroid.show("error!", ToastAndroid.SHORT);
     });
    }
   }
  
  
  return (
    <SafeAreaView style={styles.container}>
    
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginLeft:10, fontSize:20,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Create Quiz
        </Text>
      </View>
      <View>
        
      </View>
      <ActivityIndicator size="large" color="#4f72ff"  animating={isLoading}
           style={{paddingRight:10,position:'absolute', alignSelf:'flex-end', paddingTop:10}}/>
      <Pressable
      onPress={SaveQuizForm1}
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
             placeholder= 'Quiz Title'
             keyboardType='default'
             maxLength={50}
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             onChangeText={(val)=> setTitle(val)} /> 
     </View>

     <Text style={{fontSize:14, marginTop:10}}>
           Number of Questions
        </Text>
            <DropDown
              label={"Category"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={numberQuestion}
              setValue={setNumberQuestion}
              list={questionList}
            />

<View style={{marginBottom:10}}>
{numberQuestion >= 1 && (
        <View style={{flexDirection:'row', marginBottom:10, margin:20, }}>
        <View style={{ flex:1}}>
        <TextInput
           mode="outlined"
           label="Question One"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setQuestion1(val)} />

        <TextInput
           mode="outlined"
           label="Answer"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setAnswer1(val)} /> 
        </View>
           <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
       </View>
      )}

{numberQuestion >= 2 && (
        <View style={{flexDirection:'row', marginBottom:10, margin:20, }}>
        <View style={{ flex:1}}>
        <TextInput
           mode="outlined"
           label="Question Two"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setQuestion2(val)} />

        <TextInput
           mode="outlined"
           label="Answer"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setAnswer2(val)} /> 
        </View>
           <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
       </View>
      )}

{numberQuestion >= 3 && (
        <View style={{flexDirection:'row', marginBottom:10, margin:20, }}>
        <View style={{ flex:1}}>
        <TextInput
           mode="outlined"
           label="Question Three"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setQuestion3(val)} />

        <TextInput
           mode="outlined"
           label="Answer"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setAnswer3(val)} /> 
        </View>
           <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
       </View>
      )}     
{numberQuestion >= 4 && (
        <View style={{flexDirection:'row', marginBottom:10, margin:20, }}>
        <View style={{ flex:1}}>
        <TextInput
           mode="outlined"
           label="Question Four"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setQuestion4(val)} />

        <TextInput
           mode="outlined"
           label="Answer"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setAnswer4(val)} /> 
        </View>
           <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
       </View>
      )}

{numberQuestion >= 5 && (
        <View style={{flexDirection:'row', marginBottom:10, margin:20, }}>
        <View style={{ flex:1}}>
        <TextInput
           mode="outlined"
           label="Question Five"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setQuestion5(val)} />

        <TextInput
           mode="outlined"
           label="Answer"
           placeholder= ''
           keyboardType='default'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:60}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           multiline={true}
           onChangeText={(val)=> setAnswer5(val)} /> 
        </View>
           <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
       </View>
      )}  
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
