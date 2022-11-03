import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, ActivityIndicator} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { TextInput } from 'react-native-paper';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { SignedInState } from '../src/recoilState/SignInState';
import { authToken } from '../src/recoilState/authToken';

export default function ControlPanel({ navigation })
 {
  const signedIn  = useRecoilValue(SignedInState);
  const token = useRecoilValue(authToken);

  const [signedInState, setSignedInState] = useRecoilState(SignedInState);
  const [tokenState, setTokenState] = useRecoilState(authToken);
  const [isLoading, setisLoading] = useState(false)

  console.log(signedIn)
  console.log(token)

  function logout (){
    save('userToken', '');
    save('userID', '')
    setTokenState('');
    setSignedInState(false);
    ToastAndroid.show("Logout", ToastAndroid.SHORT); 
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  return (
 <SafeAreaView style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>   
   <View style={{backgroundColor:'#fff', width:'100%', height:50, marginBottom:0,marginTop:30, flexDirection:'column',borderBottomWidth:0.5, borderBottomColor:'#cccacb'}}>

   <View style={{alignSelf:'flex-start', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
    <Text style={{fontSize:20, paddingLeft:10, color:'#000', fontWeight:'700'}}>Settings</Text>
   </View>

    <View style={{alignSelf:'flex-end', position:'absolute', marginTop:5, paddingVertical:5, flexDirection:'row'}}>
     <MaterialCommunityIcons name="close" style={{fontSize:30, paddingLeft:10, color:'#000'}}  onPress={()=>navigation.navigate('UserProfile')}/>
    </View>

   </View>

   {/* contents */}
    <Text animation="bounceIn" style={styles.preboto}>Appearance</Text>
    <Text animation="bounceIn" style={styles.preboto}>Dark Mode</Text>
    <Text animation="bounceIn" style={styles.preboto}>Light Mode</Text>
    <Text animation="bounceIn" style={styles.preboto}>Orabux Mode</Text>

    <Text animation="bounceIn" style={styles.preboto}>App Icon</Text>
    <Pressable style={{width:'50%', height:50, backgroundColor:'red', borderRadius:5, marginTop:30, alignSelf:'center', flexDirection:'row' }}   onPress={logout}>
    <MaterialCommunityIcons name="logout" style={{fontSize:30, padding:10, color:'#fff'}}/>
      <Text style={{alignSelf:'center', justifyContent:'center',padding:10, fontSize:18, fontWeight:'bold', color:'#fff'}}>Logout</Text>
    </Pressable>
    
    </SafeAreaView >     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      
      },



});
