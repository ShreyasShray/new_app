import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class StudentHomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            class_code:''
        }
    }
    render(){
        return(
            <View>
                <View style={{flex:1, justifyContent:'center'}}>
                    <TextInput
                        placeholder="Class Code"
                        onChangeText={(text)=>{this.setState({class_code:text})}}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:"orange",
        borderWidth:1,
        borderRadius:8,
        width:280,
        padding:8,
        alignItems:'center',
        alignSelf:"center",
        marginTop:40
    },
    buttonText:{

    }
})