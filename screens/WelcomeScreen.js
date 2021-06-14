import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Modal,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email_id:'',
            password:'',
            first_name:'',
            last_name:'',
            contact:'',
            address:'',
            email:'',
            create_password:'',
            confirm_password:'',
            isModalVisible:false,
            User:"Student"
        }
    }
    
    userLogin=async()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.email_id, this.state.password)
        .then(()=>{
            if(this.state.User === "Teacher"){
                this.props.navigation.navigate("TeacherHomeScreen")
            } else {
                this.props.navigation.navigate("StudentHomeScreen")
            }
        })
        .catch((error)=> {
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          })
    }

    showModal = () =>{
        return(
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isModalVisible}
                >
                    <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
                        <KeyboardAvoidingView>
                            <Text style={styles.modalText}>Registration</Text>
                            <View>
                                <TextInput
                                    placeholder="First_name"
                                    onChangeText={(text)=>{this.setState({first_name:text})}}
                                    style={styles.modalInputBox}
                                />
                                <TextInput
                                    placeholder="Last_name"
                                    onChangeText={(text)=>{this.setState({last_name:text})}}
                                    style={styles.modalInputBox}
                                />
                                <TextInput
                                    placeholder="Contact"
                                    keyboardType='numeric'
                                    onChangeText={(text)=>{this.setState({contact:text})}}
                                    style={styles.modalInputBox}
                                />
                                <TextInput
                                    placeholder="Address"
                                    onChangeText={(text)=>{this.setState({address:text})}}
                                    style={styles.modalInputBox}
                                />
                                <TextInput
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    onChangeText={(text)=>{this.setState({email:text})}}
                                    style={styles.modalInputBox}
                                />
                                <TextInput
                                    placeholder="Create Password"
                                    secureTextEntry={true}
                                    onChangeText={(text)=>{this.setState({create_password:text})}}
                                    style={styles.modalInputBox}
                                />
                                <TextInput
                                    placeholder="Confirm Password"
                                    secureTextEntry={true}
                                    onChangeText={(text)=>{this.setState({confirm_password:text})}}
                                    style={styles.modalInputBox}
                                />
                                <View style={{flexDirection:'row'}}>
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="Teacher" />
                                        Teacher
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="Student" />
                                        Student
                                    </label>
                                </div>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                >
                                    <Text style={styles.modalButtonText}>Sign Up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, {marginBottom:40}]}
                                    onPress={()=>{this.setState({isModalVisible:false})}}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </Modal>
        )
    }

    render(){
        return(
            <View style={{backgroundColor:"#f8be85", flex:1}}>
                {
                    this.showModal()
                }
                <View style={{marginTop:60}}>
                    <TextInput 
                        placeholder="Email" 
                        style={styles.inputBox}
                        keyboardType="email-address"
                        onChangeText={(text)=>{this.setState({email_id:text})}}
                    />
                    <TextInput 
                        placeholder="Password" 
                        style={styles.inputBox}
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState({password:text})}}
                    />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={()=>{this.userLogin()}}
                    ><Text style={styles.buttonText}> Login </Text></TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonStyle, {marginBottom:40}]}
                        onPress={()=>{this.setState({isModalVisible:true})}}
                    ><Text style={styles.buttonText}> Sign Up </Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textStyle:{
        marginTop:40,
        textAlign:'center'
    },
    inputBox:{
        marginTop:60,
        alignSelf:'center',
        width:280,
        borderBottomWidth:2,
        paddingLeft:6,
        fontSize:18
    },
    buttonStyle:{
        marginTop:40,
        alignSelf:'center',
        backgroundColor:"orange",
        width:200,
        height:40,
        borderRadius:10,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:8
        },
        shadowOpacity:0.40,
        justifyContent:'center'
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        padding:8
    },
    modalInputBox:{
        width:280,
        alignSelf:'center',
        marginTop:40,
        borderWidth:2,
        borderRadius:6,
        paddingLeft:5
    },
    modalButton:{
        width:200,
        padding:10,
        borderRadius:8,
        backgroundColor:'orange',
        alignSelf:'center',
        marginTop:30,
        shadowColor:"#000",
        shadowOffset:{width:0, height:8},
        shadowOpacity:0.44,
    },
    modalText:{
        color:"#fe9b06",
        textAlign:'center',
        padding:10,
        fontWeight:'bold'
    },
    modalButtonText:{
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center'
    }
})