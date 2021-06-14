import * as React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class ListOfSubjectsStudent extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Text style={{marginTop:20, textAlign:'center'}}>List Of Subjects for Students</Text>
            </View>
        );
    }
}