import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import TeacherHomeScreen from './screens/TeacherHomeScreen';
import ListOfStudentsScreen from './screens/ListOfStudentsScreen';
import ListOfSubjects from './screens/ListOfSubjects';
import StudentHomeScreen from './screens/StudentHomeScreen';
import ListOfSubjectsStudent from './screens/ListOfSubjectsStudent';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    );
  }
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  TeacherHomeScreen:{screen:TeacherHomeScreen},
  ListOfStudentsScreen:{screen:ListOfStudentsScreen},
  ListOfSubjects:{screen:ListOfSubjects},
  StudentHomeScreen:{screen:StudentHomeScreen},
  ListOfSubjectsStudent:{screen:ListOfSubjectsStudent}
});

const AppContainer = createAppContainer(SwitchNavigator);