import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import QuizForm1 from './form_section1'
import QuizForm2 from './form_section2'
import QuizForm3 from './form_section3'
import QuizPreview from './previewQuiz'
import QuizPayment from './quizPayment'

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>(
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='QuizForm1' component={QuizForm1}/>  
        <RootStack.Screen name='QuizForm2' component={QuizForm2}/> 
        <RootStack.Screen name='QuizForm3' component={QuizForm3}/> 
        <RootStack.Screen name='QuizPreview' component={QuizPreview}/> 
        <RootStack.Screen name='QuizPayment' component={QuizPayment}/> 
    </RootStack.Navigator>
);
export default RootStackScreen;
