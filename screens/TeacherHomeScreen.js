import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

export default class TeacherHomeScreen extends React.Component{

    constructor(){
        super();
        this.state={
            isModalVisible:false,
            class_name:'',
            student_code:'',
            teacher_code:'',
            school_name:''
        }
    }

    showModal=()=>{
        return(
            <Modal
                visible={this.state.isModalVisible}
                animationType="slide"
                transparent={true}
            >
                <KeyboardAvoidingView>
                    <ScrollView>
                        <Text style={{marginTop:30, fontSize:18, fontWeight:'bold', textAlign:'center'}}>Create Class</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Class Name"
                            onChangeText={(text)=>{this.setState({class_name:text})}}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="School Name"
                            onChangeText={(text)=>{this.setState({school_name:text})}}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Teacher Code"
                            onChangeText={(text)=>{this.setState({teacher_code:text})}}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Student Code"
                            onChangeText={(text)=>{this.setState({student_code:text})}}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        );
    }

    render(){
        return(
            <View>
                <View style={{flex:1, justifyContent:'center'}}>
                    {
                        this.showModal()
                    }
                    <TouchableOpacity
                        style={styles.buttonStyle}
                    >
                        <Text style={styles.buttonText}>
                            Create Class Group
                        </Text>
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
        marginTop:40,
    },
    buttonText:{

    },
    inputBox:{
        
    }   
})