import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import TeacherHomeScreen from './screens/TeacherHomeScreen';
import ListOfStudentsScreen from './screens/ListOfStudentsScreen';
import TeacherSubjectsList from './screens/TeacherSubjectsList';
import StudentHomeScreen from './screens/StudentHomeScreen';
import StudentSubjectsList from './screens/StudentSubjectsList';

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
  TeacherSubjectsList:{screen:TeacherSubjectsList},
  StudentHomeScreen:{screen:StudentHomeScreen},
  StudentSubjectsList:{screen:StudentSubjectsList}
});

const AppContainer = createAppContainer(SwitchNavigator);