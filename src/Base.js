import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Newsfeed from './Feed/index';
import Discover from './discover/index';
import Inbox from './Inbox/index';
import profile from './Profiles/index';
import Create from '../src/createContentIndex';


const Tab = createBottomTabNavigator();

export default function AppBase() {
  return (
   
    <Tab.Navigator
      initialRouteName="Newsfeed"
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#929294',
      }} >
      
      <Tab.Screen
        name="Newsfeed"
        component={Newsfeed}
        options={{
          headerShown: false,
          tabBarLabel: 'Newsfeed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={25} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          headerShown: true,
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="compass" color={color} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={Create}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle-outline" color={color} size={50}  style={{position:'absolute', paddingTop:10}}/>
          ),
        }}
      />

     <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          headerShown: false,
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-text" color={color} size={25} />
          ),
        }}
      />  

     <Tab.Screen
        name="Profile"
        component={profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={25} />
          ),
        }}
      /> 
    </Tab.Navigator>


  );
}

