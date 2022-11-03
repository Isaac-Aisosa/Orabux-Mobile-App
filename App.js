// In App.js in a new project
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, Button,Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle, } from '@react-navigation/stack';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import  Base from './src/Base';
import ControlPanel from './src/controlPanel';

import CreatePost from './src/createPost/index';
import Challenge from './src/challenge/index';
import Giveaway from './src/giveAway/index';
import Quiz from './src/quiz/index';

import Login from './src/Auth/login';
import Signup from './src/Auth/signup';

import * as NavigationBar from 'expo-navigation-bar';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { SignedInState } from './src/recoilState/SignInState';
import { authToken } from './src/recoilState/authToken';

import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';


const Stack = createStackNavigator();

NavigationBar.setBackgroundColorAsync("white");

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App({ navigation })
{
  return (
    <RecoilRoot>
       <ActionSheetProvider>
       <AppNavigation/>
       </ActionSheetProvider>
    </RecoilRoot> 

  );

  
}

function AppNavigation() {



  const [userToken, setUserToken] = useRecoilState(authToken);
  const [isSignedIn, setisSignedIn] = useRecoilState(SignedInState);

  useEffect(() => {   
    getUserToken()
  },
  [])

  async function getUserToken() {
    let result = await SecureStore.getItemAsync('userToken');
    if (result) {
     // alert("🔐 Here's your Token 🔐 \n" + result);
      setUserToken(result);
      setisSignedIn(true);
      console.log('App is ready Token:');
      console.log(userToken);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    }
    else{
      setisSignedIn(false);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
      //alert("🔐 No Token 🔐 \n" + result);
    }
    
  }
  return (
    <NavigationContainer>
    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/>
    <Stack.Navigator headerMode='none'>
  {isSignedIn ? (
   <>
      <Stack.Screen name="Base" component={Base}  
         options={{ title: 'Orabux',
         headerShown: false,
         headerTitleStyle: {
         fontWeight: 'bold',       
         },
         }}/>

      <Stack.Screen name="ControlPanel" component={ControlPanel}  
         options={{ title: 'Orabux',
         headerShown: false,
         headerTitleStyle: {
         fontWeight: 'bold',       
         },
         }}/>
      <Stack.Screen name="CreatePost" component={CreatePost}  
         options={{ title: 'Orabux',
         headerShown: false,
         headerTitleStyle: {
         fontWeight: 'bold',       
         },
         }}/>
    

    </>
  ) : (
    <>

    <Stack.Screen name="Login" component={Login}  
         options={{ title: 'Orabux login',
         headerShown: false,
         headerTitleStyle: {
         fontWeight: 'bold',       
         },
         }}/>

   <Stack.Screen name="Signup" component={Signup}  
         options={{ title: 'Orabux signup',
         headerShown: false,
         headerTitleStyle: {
         fontWeight: 'bold',       
         },
         }}/>   
     </>
     )}
    
    </Stack.Navigator>  
    </NavigationContainer>
  );
}




