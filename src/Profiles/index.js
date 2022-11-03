import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import UserProfile from './userProfile'
import UpdateProfile from './updateProflie'


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>(
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='UserProfile' component={UserProfile}/>
        <RootStack.Screen name='UpdateProfile' component={UpdateProfile}/>
    </RootStack.Navigator>
);
export default RootStackScreen;
