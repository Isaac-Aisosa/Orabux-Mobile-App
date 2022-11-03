import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, ActivityIndicator,} from 'react-native';
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

export default function QuizForm3({ route,navigation })
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
  const [grandPrize, setGrandPrize] = useState(0);
  const [otherBenefit, setOtherBenefit] = useState('');
  const [startDatePickerShow, setStartDatePickerShow] = useState(false);
  const [startTimePickerShow, setStartTimePickerShow] = useState(false);
  const [start_date, setStartDate] = useState(new Date(Date.now()));
  const [start_time, setStartTime] = useState(new Date(Date.now()));

  const [endDatePickerShow, setEndDatePickerShow] = useState(false);
  const [endTimePickerShow, setEndTimePickerShow] = useState(false);
  const [end_date, setEndDate] = useState(new Date(Date.now()));
  const [end_time, setEndTime] = useState(new Date(Date.now()));

  let duration = 0;
  let durationState =0;
  let worth = grandPrize;

  function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // even 32 is acceptable
    return `${tomorrow.getFullYear()}/${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`;
}


  const showStartDatePicker = () => {
    setStartDatePickerShow(true);
  };

  const showStartTimePicker = () => {
    setStartTimePickerShow(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerShow(true);
  };

  const showEndTimePicker = () => {
    setEndTimePickerShow(true);
  };

  const onStartDateChange = (event, value) => {
    setStartDate(value);
    if (Platform.OS === 'android') {
      setStartDatePickerShow(false);
    }
  };

  const onStartTimeChange = (event, value) => {
    console.log(value)
    setStartTime(value);
    if (Platform.OS === 'android') {
      setStartTimePickerShow(false);
    }
  };

  const onEndDateChange = (event, value) => {
    setEndDate(value);
    if (Platform.OS === 'android') {
      setEndDatePickerShow(false);
    }
  };

  const onEndTimeChange = (event, value) => {
    console.log(value)
    setEndTime(value);
    if (Platform.OS === 'android') {
      setEndTimePickerShow(false);
    }
  };

var startDate = new Date(start_date.getFullYear(), (start_date.getUTCMonth()+1), start_date.getDate(), start_time.getHours(),start_time.getUTCMinutes());
var endDate = new Date(end_date.getFullYear(), (end_date.getUTCMonth()+1), end_date.getDate(), end_time.getHours(),end_time.getMinutes());
console.log(diff_hours(startDate, endDate));

function diff_hours(endDate, startDate) 
 {
  var diff =(endDate.getTime() - startDate.getTime()) / 1000;
  diff /= (60 * 60);
  var du = Math.abs(Math.round(diff))
  if(du > 24){
   duration = du/24 + 'days';
  }
  else{
    duration = Math.abs(Math.round(diff))+ 'hrs';
  }
  durationState = Math.abs(Math.round(diff));
  return Math.abs(Math.round(diff));
  
 }

  const SaveQuizForm3 = async () => {
 
    console.log(start_date)
    await axios.post( URL + '/api-save-quiz-from3/', 
    
      {
        pk: pk,
        duration: duration,
        startDate: start_date,
        endDate: end_date,
        cash: cash,
        physicalReward: physicalReward,
        worth: worth,
        grandPrize: grandPrize,
        otherBenefit: otherBenefit,
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
     navigation.navigate('QuizPreview',{pk:pk, title:title,})
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

  return (
    <SafeAreaView style={styles.container}>
    
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
    <View style={{backgroundColor:'#fff', width:'100%', height:70, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>
      <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
      <Text style={{marginLeft:5, textAlignVertical:'center', marginLeft:10, fontSize:20,letterSpacing:1, fontWeight:'bold', color:'#000'}}>
        Quiz Setup
        </Text>
      </View>
      <View>
        
      </View>
      <ActivityIndicator size="large" color="#4f72ff"  animating={isLoading}
           style={{paddingRight:10,position:'absolute', alignSelf:'flex-end', paddingTop:10}}/>
      <Pressable
      onPress={SaveQuizForm3}
      style={{width:'20%', height:40, backgroundColor:'#4f72ff', borderRadius:5, marginTop:10, alignSelf:'flex-end',marginRight:10, display:next}}>
      <Text style={{alignSelf:'center', marginTop:5, fontSize:18, fontWeight:'normal', color:'#fff',}}>Next</Text>
    </Pressable>
    </View>
    <Provider >
   <ScrollView style={{width:'100%', alignSelf:'center', padding:10,}}>
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

    <View style={{marginTop:10}}>
    <Text style={{fontSize:15, marginTop:10, fontWeight:'bold'}}>Set Quiz Reward *</Text>
    {!worth == 0 && (
    <Text style={{fontSize:20, marginTop:10, fontWeight:'bold',color:'#4f72ff'}}>Quiz Worth:  ₦{parseInt(worth).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </Text>
    )}

<View style={{marginBottom:10}}>
        <View style={{flexDirection:'row', marginBottom:10, margin:20 }}>
        <TextInput
           mode="outlined"
           label="Grand prize"
           placeholder= ''
           keyboardType='numeric'
           style={{ flex:1,backgroundColor:'#fff', borderColor:'#000',fontSize:18}}
           autoCapitalize='none'
           activeUnderlineColor='#000'
           onChangeText={(val)=> setGrandPrize(val)} /> 
           <Text style={{fontSize:20, color:'#000',marginTop:5, fontWeight:'bold', marginLeft:5}}>*</Text>
       </View>
      </View>
      </View>

    <View style={{marginTop:10}}>
    <Text style={{fontSize:15, marginTop:10, fontWeight:'bold'}}>Set Quiz Duration *</Text>
    {!durationState == 0 && (
    <Text style={{fontSize:20, marginTop:10, fontWeight:'bold',color:'#4f72ff'}}>Quiz duration:  {duration}* </Text>
    )}
<Text style={{fontSize:16, color:'#000',marginTop:20, fontWeight:'bold', marginRight:5}}>Start Date:</Text>
 {/* Start Date Picker */}
   {!startDatePickerShow && (
        <View style={{flexDirection:'row', marginTop:10}}>
          <Text style={{fontSize:16, color:'#000',marginTop:5, fontWeight:'bold', marginRight:5}}>Date:</Text>
          <Pressable style={{backgroundColor:'#fff', width:'50%', height:40, borderRadius:5,borderColor:'#000', borderWidth:0.5}}>
             <Text style={{fontSize:18,fontWeight:'500',alignSelf:'center',marginTop:5}}>
            {start_date.getFullYear()}-{start_date.getUTCMonth()+1}-{start_date.getDate()}
           </Text>
            </Pressable>
          <MaterialCommunityIcons name="calendar-month"  onPress={showStartDatePicker} 
          style={{fontSize:30, paddingLeft:10, position:'relative', color:'green', fontWeight:'bold',alignSelf:'center'}}/>
        </View>
      )}

{!startTimePickerShow && (
        <View style={{flexDirection:'row', marginTop:10}}>
          <Text style={{fontSize:16, color:'#000',marginTop:5, fontWeight:'bold', marginRight:5}}>Time:</Text>
          <Pressable style={{backgroundColor:'#fff', width:'50%', height:40, borderRadius:5,borderColor:'#000', borderWidth:0.5}}>
             <Text style={{fontSize:18,fontWeight:'500',alignSelf:'center',marginTop:5}}>
             {start_time != null && (
                <Text>{start_time.getHours() % 12 || 12}:{start_time.getMinutes()}</Text>
             )}
           </Text>
            </Pressable>
          <MaterialCommunityIcons name="clock-outline"  onPress={showStartTimePicker} 
          style={{fontSize:30, paddingLeft:10, position:'relative', color:'green', fontWeight:'bold',alignSelf:'center'}}/>
        </View>
      )}



      {/* The date picker */}

      {startDatePickerShow && (
        <DateTimePicker
          value={start_date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onStartDateChange}
          style={styles.datePicker}
        />
      )}

     {startTimePickerShow && (
        <DateTimePicker
          value={start_time}
          mode={'time'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={false}
          onChange={onStartTimeChange}
          style={styles.datePicker}
        />
      )}

    </View>
 {/* End  Date Section */}
<View style={{marginTop:20,marginBottom:30}}>
    <Text style={{fontSize:16, color:'#000',marginTop:5, fontWeight:'bold', marginRight:5}}>End Date:</Text>
 {/* Start Date Picker */}
   {!endDatePickerShow && (
        <View style={{flexDirection:'row', marginTop:10}}>
          <Text style={{fontSize:16, color:'#000',marginTop:5, fontWeight:'bold', marginRight:5}}>Date:</Text>
          <Pressable style={{backgroundColor:'#fff', width:'50%', height:40, borderRadius:5,borderColor:'#000', borderWidth:0.5}}>
             <Text style={{fontSize:18,fontWeight:'500',alignSelf:'center',marginTop:5}}>
            
            {end_date != null && (
                <Text>{end_date.getFullYear()}-{end_date.getUTCMonth()+1}-{end_date.getDate()}</Text>
             )}
           </Text>
            </Pressable>
          <MaterialCommunityIcons name="calendar-month"  onPress={showEndDatePicker} 
          style={{fontSize:30, paddingLeft:10, position:'relative', color:'green', fontWeight:'bold',alignSelf:'center'}}/>
        </View>
      )}

{!endTimePickerShow && (
        <View style={{flexDirection:'row', marginTop:10}}>
          <Text style={{fontSize:16, color:'#000',marginTop:5, fontWeight:'bold', marginRight:5}}>Time:</Text>
          <Pressable style={{backgroundColor:'#fff', width:'50%', height:40, borderRadius:5,borderColor:'#000', borderWidth:0.5}}>
             <Text style={{fontSize:18,fontWeight:'500',alignSelf:'center',marginTop:5}}>
             {end_time != null && (
                <Text>{end_time.getHours() % 12 || 12}:{end_time.getMinutes()}</Text>
             )}
           </Text>
            </Pressable>
          <MaterialCommunityIcons name="clock-outline"  onPress={showEndTimePicker} 
          style={{fontSize:30, paddingLeft:10, position:'relative', color:'green', fontWeight:'bold',alignSelf:'center'}}/>
        </View>
      )}

      {/* The date picker */}

      {endDatePickerShow && (
        <DateTimePicker
          value={end_date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          minimumDate={new Date(Date.now())}
          onChange={onEndDateChange}
          style={styles.datePicker}
        />
      )}

     {endTimePickerShow && (
        <DateTimePicker
          value={end_time}
          mode={'time'}
          minimumDate={new Date(Date.now())}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={false}
          onChange={onEndTimeChange}
          style={styles.datePicker}
        />
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
