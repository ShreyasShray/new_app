import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class StudentHomeScreen extends React.Component{
    render(){
        return(
            <View>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{textAlign:'center', marginTop:20}}>List of Subjects</Text>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate("ListOfSubjectsStudent")}}>
                        <Text style={styles.buttonText}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Hindi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Math</Text>
                    </TouchableOpacity>
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