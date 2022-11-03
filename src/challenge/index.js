import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Section1Form from './form_section1'
import Section2Form from './form_section2'
import Section3Form from './form_section3'
import Section4Form from './form_section4'
import Section5Form from './form_section5'
import ChallengePreview from './preview';
import ChallengePayment from './payment';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>(
    <RootStack.Navigator headerMode='none'>

        <RootStack.Screen name='Section1Form' component={Section1Form}/>  
        <RootStack.Screen name='Section2Form' component={Section2Form}/> 
        <RootStack.Screen name='Section3Form' component={Section3Form}/> 
        <RootStack.Screen name='Section4Form' component={Section4Form}/> 
        <RootStack.Screen name='Section5Form' component={Section5Form}/> 
        <RootStack.Screen name='ChallengePreview' component={ChallengePreview}/> 
        <RootStack.Screen name='ChallengePayment' component={ChallengePayment}/> 
    </RootStack.Navigator>
);
export default RootStackScreen;
