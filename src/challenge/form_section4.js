import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, ActivityIndicator,Alert} from 'react-native';
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

export default function Section4Form({ route,navigation })
 {

  const {  
    pk,
    title,
  } = route.params; 
  
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [next, setNext] = useState('flex')
  const [cash, setCashReward] = useState(true);
  const [physicalReward, setPhysicalReward] = useState(false);
  const [number_winner, setNumberWinner] = useState(3);
  const [reward_1, setReward_1] = useState(0);
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

  let worth = 0;
  let worthState =0;
  let minWorth = 1000;

  let raw_worth = parseInt(reward_1) + parseInt(reward_2) + parseInt(reward_3)+ parseInt(reward_4)+ parseInt(reward_5)+ parseInt(reward_6)+ parseInt(reward_7)+ parseInt(reward_8)+ parseInt(reward_9)+ parseInt(reward_10)
  worthState = parseInt(reward_1) + parseInt(reward_2) + parseInt(reward_3)+ parseInt(reward_4)+ parseInt(reward_5)+ parseInt(reward_6)+ parseInt(reward_7)+ parseInt(reward_8)+ parseInt(reward_9)+ parseInt(reward_10)
  
  worth = raw_worth.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  const winnerList = [
    {
      label: "Grand Winner",
      value: 1,
    },
    {
      label: "Top 2 Vote",
      value: 2,
    },
    {
      label: "Top 3 Vote",
      value: 3,
    },
    {
        label: "Top 4 Vote",
        value: 4,
    },
    {
        label: "Top 5 Vote",
        value: 5,
    },
    {
      label: "Top 6 Vote",
      value: 6,
    },
    {
      label: "Top 7 Vote",
      value: 7,
  },
    {
        label: "Top 8 Vote",
        value: 8,
      },

    {
        label: "Top 9 Vote",
        value: 9,
    },
    {
      label: "Top 10 Vote",
      value: 10,
    },  
  ];


  const SaveForm4 = async () => {
   if (worthState < minWorth){
      ToastAndroid.show("Challenge must worth more than ₦1000", ToastAndroid.SHORT);
    }
    else{
      setNext('none');
      setisLoading(true);

    await axios.post( URL + '/api-save-challenge-from4/reward/', 
    
      {
        pk: pk,
        cash: cash,
        physicalReward: physicalReward,
        number_winner: number_winner,
        worth: worthState,
        otherBenefit: otherBenefit,
        reward_1: reward_1,
        reward_2: reward_2,
        reward_3: reward_3,
        reward_4: reward_4,
        reward_5: reward_5,
        reward_6: reward_6,
        reward_7: reward_7,
        reward_8: reward_8,
        reward_9: reward_9,
        reward_10: reward_10,
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
     navigation.navigate('ChallengePreview',{pk:pk, title:title,})
     setisLoading(false);
     setNext('flex');
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
      <Text style={{marginLeft:5, textAlignVertical:'center', marginLeft:10,marginTop:10, fontSize:16,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Challange Reward*
        </Text>
      </View>
      <View>
        
      </View>
      <ActivityIndicator size="large" color="#4f72ff"  animating={isLoading}
           style={{paddingRight:10,position:'absolute', alignSelf:'flex-end', paddingTop:10}}/>
      <Pressable
      onPress={SaveForm4}
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10, display:next}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff',}}>Next</Text>
    </Pressable>
    </View>
    <Provider >
   <ScrollView style={{width:'100%', alignSelf:'center', padding:10}}>
   <Surface>

     <Text style={{fontSize:15, marginTop:10, fontWeight:'bold'}}>Reward Type</Text>
    <View style={{flexDirection:'row', marginTop:5}}>
    <View style={{flexDirection:'row',fontSize:15}}>
      <Text style={{textAlignVertical:'center'}}> Cash prize </Text>
      <RadioButton
        value="cash"
        status={ cash === true ? 'checked' : 'unchecked' }
        onPress={() => setCashReward(true)}
      />
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={{textAlignVertical:'center', fontSize:15, color:'#d1d0cd'}}> Physical Reward </Text>
      <RadioButton
        value="physicalReward"
        uncheckedColor='#d1d0cd'
        status={ physicalReward === true ? 'checked' : 'unchecked' }
      />
      </View>
    </View>

    <View style={{marginTop:20}}>
    <Text style={{fontSize:15, marginBottom:10, fontWeight:'bold'}}>Select Number of Winners to Reward</Text>
            <DropDown
              label={"Select Winner"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={number_winner}
              setValue={setNumberWinner}
              list={winnerList}
            />
    </View>

    <View style={{marginTop:10}}>
    <Text style={{fontSize:15, marginTop:10, fontWeight:'bold'}}>Set Challenge Reward *</Text>
    {!worthState == 0 && (
    <Text style={{fontSize:20, marginTop:10, fontWeight:'bold',color:'#4f72ff'}}>Challenge Worth:  ₦{worth} </Text>
    )}

<View style={{marginBottom:10}}>
{number_winner >= 1 && (
        <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
        <TextInput
           mode="outlined"
           label="Grand prize"
           placeholder= ''
           keyboardType='numeric'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           onChangeText={(val)=> setReward_1(val)} /> 
           <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
       </View>
      )}

{number_winner >= 2 && (
   <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
   <TextInput
      mode="outlined"
      label="Second place cash prize"
      placeholder= ''
      keyboardType='numeric'
      style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
      autoCapitalize='none'
      activeUnderlineColor='#000'
      onChangeText={(val)=> setReward_2(val)} /> 
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
   </View>
      )}

{number_winner >= 3 && (
   <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
   <TextInput
      mode="outlined"
      label="Third place cash prize"
      placeholder= ''
      keyboardType='numeric'
      style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
      autoCapitalize='none'
      activeUnderlineColor='#000'
      onChangeText={(val)=> setReward_3(val)} /> 
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
   </View>
      )}     
{number_winner >= 4 && (
   <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
   <TextInput
      mode="outlined"
      label="Fourth place cash prize"
      placeholder= ''
      keyboardType='numeric'
      style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
      autoCapitalize='none'
      activeUnderlineColor='#000'
      onChangeText={(val)=> setReward_4(val)} /> 
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
   </View>
      )}

{number_winner >= 5 && (
   <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
   <TextInput
      mode="outlined"
      label="Firth place cash prize"
      placeholder= ''
      keyboardType='numeric'
      style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
      autoCapitalize='none'
      activeUnderlineColor='#000'
      onChangeText={(val)=> setReward_5(val)} /> 
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
   </View>
      )}      

{number_winner >= 6 && (
   <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
   <TextInput
      mode="outlined"
      label="Six place cash prize"
      placeholder= ''
      keyboardType='numeric'
      style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
      autoCapitalize='none'
      activeUnderlineColor='#000'
      onChangeText={(val)=> setReward_6(val)} /> 
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
   </View>
      )} 

{number_winner >= 7 && (
   <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
   <TextInput
      mode="outlined"
      label="Seventh place cash prize"
      placeholder= ''
      keyboardType='numeric'
      style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
      autoCapitalize='none'
      activeUnderlineColor='#000'
      onChangeText={(val)=> setReward_7(val)} /> 
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
   </View>
      )}     

{number_winner >= 8 && (
   <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
   <TextInput
      mode="outlined"
      label="Eighth place cash prize"
      placeholder= ''
      keyboardType='numeric'
      style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
      autoCapitalize='none'
      activeUnderlineColor='#000'
      onChangeText={(val)=> setReward_8(val)} /> 
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
   </View>
      )} 

  {number_winner >= 9 && (
   <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
   <TextInput
      mode="outlined"
      label="Nineth place cash prize"
      placeholder= ''
      keyboardType='numeric'
      style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
      autoCapitalize='none'
      activeUnderlineColor='#000'
      onChangeText={(val)=> setReward_9(val)} /> 
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
   </View>
      )} 

{number_winner >= 10 && (
   <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
   <TextInput
      mode="outlined"
      label="Tenth place cash prize"
      placeholder= ''
      keyboardType='numeric'
      
      style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
      autoCapitalize='none'
      activeUnderlineColor='#000'
      onChangeText={(val)=> setReward_10(val)} /> 
   <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
   </View>
      )}     

</View>

<Text style={{fontSize:15, marginTop:10, fontWeight:'bold'}}>Other challenge Benefit (optional)</Text>
<View style={{flexDirection:'row', marginBottom:30, marginTop:10 }}>
          <TextInput
             mode="outlined"
             label="Benefits"
             placeholder= ''
             keyboardType='default'
             style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18,height:200}}
             autoCapitalize='none'
             activeUnderlineColor='#000'
             maxLength={500}
             multiline={true}
             onChangeText={(val)=> setOtherBenefit(val)} /> 
    </View>
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
