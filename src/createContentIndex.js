import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CreateContent from './createContent';
import Challenge from './challenge/index';
import Giveaway from './giveAway/index';
import Quiz from './quiz/index';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>(
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='CreateContent' component={CreateContent}/>
        <RootStack.Screen name="Challenge" component={Challenge} /> 
        <RootStack.Screen name="Quiz" component={Quiz} />   
        <RootStack.Screen name="Giveaway" component={Giveaway}/>   
    </RootStack.Navigator>
);
export default RootStackScreen;
