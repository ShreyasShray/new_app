import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config'

export default class HWScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            student_details:this.props.navigation.getParam("details")
        }
    }

    render(){
        return(
            <ScrollView style={{flex:1, backgroundColor:"#F8BE85"}}>
                <AppHeader title="Home Work" />
                <Text>{this.state.student_details.first_name}</Text>
            </ScrollView>
        );
    }
}