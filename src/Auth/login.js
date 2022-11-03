import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Pressable, ImageBackground,ScrollView, ToastAndroid, SafeAreaView,Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native-paper';
import OrabuxConfig from '../config';
import logo from '../../assets/logo-light.png'

import { useRecoilState} from 'recoil';

import { SignedInState } from '../recoilState/SignInState';
import { authToken } from '../recoilState/authToken';

const URL = OrabuxConfig.url;

export default function EmailLogin({ navigation })
 {
     const[data, setData] = React.useState({
      secureTextEntry: true
     });

     const [signedIn, setSignedIn] = useRecoilState(SignedInState);
     const [token, setToken] = useRecoilState(authToken);

     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [eye, setEye] = useState('eye-off-outline');
     const [isLoading, setisLoading] = useState(false);

     async function login(){

      if (username === '' || password === ''){
        ToastAndroid.show("Incorrect Credentials", ToastAndroid.SHORT); 
      }

      else{
      setisLoading(true);
       axios.post( URL + '/api-user-login/' , {
      username: username,
      password: password,
      })
     .then(function (response) {
     //console.log(response.data);
     save('userToken', response.data.token);
     save('userID', response.data.user_id.toString())
     setisLoading(false);
     setToken(response.data.token);
     setSignedIn(true);
  })
  .catch(function (error) {
    console.log(error);
    if(error.response.status == 400){
      ToastAndroid.show("Incorrect Login Credentials", ToastAndroid.SHORT); 
      setisLoading(false);
     }
  });

      }
     }

    const updateSecuredTextEntry = () =>{
      setData({
          ...data,
          secureTextEntry: !data.secureTextEntry
      });
    if (!data.secureTextEntry){
      setEye('eye-off-outline')
    }
    else{
      setEye('eye-outline')
    }
     
}

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
    <StatusBar style="none" />
    <Image source={logo} style={styles.logo}/>
    <Text style={styles.orabux}> Orabux  </Text>
    <ScrollView>
    <View style={styles.inputField}>
      <View style={{flexDirection:'row', marginBottom:0 }}>
          <TextInput
             mode="outlined"
             label="Username or Email"
             placeholder='@username'
             style={{ paddingLeft:10, flex:1}}
             textContentType='username'
             autoCapitalize='none'
             activeOutlineColor= '#4f72ff'
             onChangeText={(val)=> setUsername(val)}
             left={<TextInput.Icon
              name='account'/>}

             /> 

      </View>


      <View style={styles.inputField}>
      <View style={{flexDirection:'row', marginBottom:0 }}>
          <TextInput
             mode="outlined"
             label="Password"
             placeholder='Password'
             secureTextEntry={data.secureTextEntry ? true : false}
             style={{ paddingLeft:10, flex:1,}}
             autoCapitalize='none'
             activeOutlineColor= '#4f72ff'
             onChangeText={(val)=> setPassword(val)}

             left={<TextInput.Icon
              name='lock'/>}

             right={<TextInput.Icon
                name= {eye}
               onPress={updateSecuredTextEntry} />}

             /> 
      </View>
      </View>
        <Text style={{alignSelf:'flex-end',color:'#4f72ff', fontWeight:'bold'}}>Forgot Password?</Text>
    </View>

    <Pressable style={styles.button1}   onPress={login}>
      <Text style={styles.text4}>Login</Text>
    </Pressable>
    <ActivityIndicator size="large" color="#4f72ff" animating={isLoading} style={{padding:10, marginTop:10}}/>
    <View>
    </View>
     </ScrollView>
     </View>

     <Pressable onPress={()=>navigation.navigate('Signup')}
     style={{alignSelf:'stretch', backgroundColor:'#fff', borderWidth:0.5, borderColor:'#838485', position: 'absolute', left: 0, right: 0, bottom: 0, height:40 }}>
      <Text style={{color:'#000', alignSelf:'center',marginVertical:5}}>Don't have an account? <Text  style={{color:'#4f72ff', fontSize:16}}>Signup</Text></Text>
    </Pressable>
     
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
      width: 70,
      height: 70,
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
