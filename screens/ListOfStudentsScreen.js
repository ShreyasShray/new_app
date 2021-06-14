import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class ListOfStudentsScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Text style={{marginTop:20, textAlign:'center'}}>List Of Students</Text>
                <View>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate("ListOfSubjects")}} >
                        <Text style={styles.buttonText} >Student 1</Text>
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