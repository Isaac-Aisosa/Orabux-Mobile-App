import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Pressable, ImageBackground,ScrollView, ToastAndroid, SafeAreaView,Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import {createStackNavigator} from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native-paper';
import OrabuxConfig from '../config';
import logo from '../../assets/logo-light.png'
import { useRecoilState} from 'recoil';

import { SignedInState } from '../recoilState/SignInState';
import { authToken } from '../recoilState/authToken';

const URL = OrabuxConfig.url;

let Email = '' ;
let Username = '' ;

const RootStack = createStackNavigator();

export default function EmailSignup({ navigation })
 {

return (

        <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='VerifyEmail' component={VerifyEmail}/>
        <RootStack.Screen name='VerifyUsername' component={VerifyUsername}/>
        <RootStack.Screen name='SetPassword' component={SetPassword}/>
        </RootStack.Navigator>
    
  );
}

function VerifyEmail({ navigation })
 {
    const [isLoading, setisLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [showError, setshowError] = useState('none');
    console.log(Email)

    function checkEmail(){
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

       if (email == '')
        {
         ToastAndroid.show("Please whats your Email", ToastAndroid.SHORT);
        }
       else{
              if(email.match(validRegex)){
                //ToastAndroid.show("Valid email", ToastAndroid.SHORT);
                 //Email Check stage
                 setisLoading(true);
                 setshowError('none');
                axios.post( URL+'/api-email-check/', {
                  email: email,
                }).then(function (response) {
                 console.log(response.status);
               //Email Avaliable
               if(response.status == 200){   
                setisLoading(false); 
                Email = email;
                navigation.navigate('VerifyUsername')
               }}).catch(function (error) {
                console.log(error);
                //Email Used
                if (error.response.status == 409){
                  Email = '';
                  setisLoading(false);
                  setshowError('flex');
                  ToastAndroid.show("Sorry! This email already Exist", ToastAndroid.SHORT);
                }
              });

             }

            else{
                setisLoading(false);
                ToastAndroid.show("Incorrect Email Address", ToastAndroid.SHORT);
                }
        }   
    }
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.form}>
        <Image source={logo} style={styles.logo}/>
      <View style={styles.inputField}>
      <Text style={styles.orabux}>Signup with Email</Text>
        <Text style={{marginTop:20}}>Whats your email?</Text>
      <View style={{flexDirection:'row', marginBottom:0 }}>
          <TextInput
             mode="outlined"
             label="Email"
             placeholder='Email'
             keyboardType='email-address'
             textContentType='emailAddress'
             style={{ paddingLeft:10, flex:1,}}
             autoCapitalize='none'
             activeOutlineColor= '#4f72ff'
             onChangeText={(val)=> setEmail(val)}

             left={<TextInput.Icon
              name='email'/>}
             /> 

    </View>
    <Text style={{color:'red', marginTop:10, fontSize:15, fontWeight:'bold', display:showError}}>
    <MaterialCommunityIcons
           name='alert'
           size={30}
         />
         This email already Exist</Text>
    <Pressable style={styles.button1}  onPress={checkEmail}>
      <Text style={styles.text4}>Verify Email</Text>
    </Pressable>
    <ActivityIndicator size="large" color="#4f72ff" animating={isLoading} style={{padding:10, marginTop:10}}/>
    </View>
    </View>
    </SafeAreaView>
    
  );
}

function VerifyUsername({ navigation })
 {
    const [isLoading, setisLoading] = useState(false)
    const [username, setUsername] = useState('');
    const [showError, setshowError] = useState('none');

    function checkUsername() {

       if (username == ''){
        ToastAndroid.show("Choose a username to continune", ToastAndroid.SHORT);
       }
       else{
        if (! /^[a-zA-Z0-9_]+$/.test(username)) {
            // Validation failed
            ToastAndroid.show("invalid username!", ToastAndroid.SHORT);
        }
        else{
            setisLoading(true);
            setshowError('none');
            axios.post( URL+'/api-username-check/', {
              username: username,
            }).then(function (response) {
             console.log(response.status);
           //Username Avaliable
           if(response.status == 200){   
            setisLoading(false); 
            Username = username;
            navigation.navigate('SetPassword')
            }}).catch(function (error) {
            console.log(error);
            //Username Used
            if (error.response.status == 409){
              Username = '';
              setisLoading(false);
              setshowError('flex');
              ToastAndroid.show("Sorry! This username already Exist", ToastAndroid.SHORT);
            }
          });
        }
       }


    }
    
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.form}>
        <Image source={logo} style={styles.logo}/>
      <View style={styles.inputField}>
      <Text style={styles.orabux}>Continune Signup</Text>
        <Text style={{marginTop:20}}>choose username?</Text>
      <View style={{flexDirection:'row', marginBottom:0 }}>
          <TextInput
             mode="outlined"
             label="Username"
             placeholder='username'
             keyboardType='default'
             textContentType='username'
             style={{ paddingLeft:10, flex:1,}}
             autoCapitalize='none'
             activeOutlineColor= '#4f72ff'
             onChangeText={(val)=> setUsername(val)}

             left={<TextInput.Icon
              name='account'/>}
             /> 

    </View>
    <Text style={{color:'red', marginTop:10, fontSize:15, fontWeight:'bold', display:showError}}>
          <MaterialCommunityIcons
                 name='alert'
                 size={30}
               /> This username already Exist</Text>

    <Text style={{color:'red', marginTop:10}}>  
    <MaterialCommunityIcons name='alert' size={12}/>Required. 150 characters or fewer. Letters, digits and _ only. 
   </Text>
    <Pressable style={styles.button1} onPress={checkUsername}>
      <Text style={styles.text4}>Continune</Text>
    </Pressable>
    <ActivityIndicator size="large" color="#4f72ff" animating={isLoading} style={{padding:10, marginTop:10}}/>
    </View>
    </View>
    </SafeAreaView>
    
  );
}



function SetPassword({ navigation })
 {
    const [isLoading, setisLoading] = useState(false)
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('none');
    const [confirmPassword, setconfrimPassword] = useState('');

    const [signedIn, setSignedIn] = useRecoilState(SignedInState);
    const [token, setToken] = useRecoilState(authToken);

    function SignupUser() {

       if (password == '' || password.length < 8){
        ToastAndroid.show("Set Valid Password", ToastAndroid.SHORT);
        }
       else if (confirmPassword == ''){
         ToastAndroid.show("Confirm Password Invalid", ToastAndroid.SHORT);
        }
        else if (password !== confirmPassword){
            ToastAndroid.show("Your Password did not match!", ToastAndroid.SHORT);
            setMatchPassword('flex')
        }

       else{
        setMatchPassword('none')
        setisLoading(true);
        axios.post( URL+'/api-user-signup/', {
          username: Username,
          password: password,
          email: Email,
        }).then(function (response) {
         console.log(response.status);
         axios.post( URL+'/api-user-login/', {
            username: Username,
            password: password,
          }).then(function (response) {
           console.log(response.status);
          save('userToken', response.data.token);
          save('userID', response.data.user_id.toString());
          setisLoading(false);
          setToken(response.data.token);
          setSignedIn(true);

          }).catch(function (error) {
          console.log(error);
          });

        }).catch(function (error) {
        console.log(error);
        if (error.response.status == 400){
            setisLoading(false);
            ToastAndroid.show("Signup Error!", ToastAndroid.SHORT);
          }
        });
       }
    }

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }
    
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.form}>
        <Image source={logo} style={styles.logo}/>
      <View style={styles.inputField}>
      <Text style={styles.orabux}>Final Signup</Text>
        <Text style={{marginTop:20}}>Set Password!</Text>
      <View style={{flexDirection:'row', marginBottom:0 }}>
          <TextInput
             mode="outlined"
             label="Password"
             placeholder='password'
             keyboardType='default'
             textContentType='password'
             secureTextEntry = {true}
             style={{ paddingLeft:10, flex:1,}}
             autoCapitalize='none'
             activeOutlineColor= '#4f72ff'
             onChangeText={(val)=> setPassword(val)}

             left={<TextInput.Icon
              name='lock'/>}
             /> 
    </View>

    <Text style={{marginTop:20}}>Confirm Password!</Text>
      <View style={{flexDirection:'row', marginBottom:0 }}>
          <TextInput
             mode="outlined"
             label="Confrim Password"
             placeholder='Confirm password'
             keyboardType='default'
             textContentType='password'
             secureTextEntry = {true}
             style={{ paddingLeft:10, flex:1,}}
             autoCapitalize='none'
             activeOutlineColor= '#4f72ff'
             onChangeText={(val)=> setconfrimPassword(val)}

             left={<TextInput.Icon
              name='lock'/>}
             /> 

    </View>

    <Text style={{color:'red', marginTop:10, fontSize:15, fontWeight:'bold', display:matchPassword}}>
    <MaterialCommunityIcons
           name='alert'
           size={30}
         />
         Password did not Match</Text>
    <Text style={{color:'red', marginTop:10}}>  
    {'\n'}<MaterialCommunityIcons name='alert' size={12}/> Your password must contain at least 8 characters.
    {'\n'}
    {'\n'}<MaterialCommunityIcons name='alert' size={12}/> Your password can’t be a commonly used password.
    </Text>
    <Pressable style={styles.button1} onPress={SignupUser}>
      <Text style={styles.text4}>Signup</Text>
    </Pressable>
    <ActivityIndicator size="large" color="#4f72ff" animating={isLoading} style={{padding:10, marginTop:10}}/>
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',

      },

  form:{
    paddingVertical: 70,
    paddingHorizontal: 30,
  },    

  logo: {
      width: 50,
      height: 50,
      marginTop: 20,
      alignSelf:'center'
  },

orabux: {
  color:'#000',
  fontSize: 30,
  marginTop: 0,
  alignSelf:'center',
  fontWeight:'bold' 
},

button1: {
  textAlign:'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 10,
  height:50,
  marginTop: 30,
  backgroundColor: '#4f72ff',
  flexDirection:'row'
},

text4: {
  color:'#fff',
  fontSize: 20,
  fontWeight:'bold',
  marginTop:5
},

inputField:{
 marginTop:20,
 marginBottom:10,
 
},

});
