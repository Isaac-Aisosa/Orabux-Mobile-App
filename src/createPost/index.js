import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SelectPost from './selectPost';
import EditPost from './editPost';
import FinishPost from './finishPost';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>(
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='SelectPost' component={SelectPost}/>
        <RootStack.Screen name='EditPost' component={EditPost}/>
        <RootStack.Screen name='FinishPost' component={FinishPost}/>
    </RootStack.Navigator>
);
export default RootStackScreen;
