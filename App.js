import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import TeacherHomeScreen from './screens/TeacherHomeScreen';
import ListOfStudentsScreen from './screens/ListOfStudentsScreen';
import StudentHomeScreen from './screens/StudentHomeScreen';
import HWScreen from './screens/HWScreen';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  TeacherHomeScreen:{
    screen:TeacherHomeScreen,
    navigationOptions:{
      headerShown:false
    }
  },
  StudentsList:{
    screen:ListOfStudentsScreen,
    navigationOptions:{
      header:" ",
      headerShown:true
    }
  },
  HWScreen:{
    screen:HWScreen,
    navigationOptions:{
      header:" ",
      headerShown:true
    }
  }
})

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  TeacherHomeScreen:{screen:AppStackNavigator},
  StudentHomeScreen:{screen:StudentHomeScreen}
});

const AppContainer = createAppContainer(SwitchNavigator);