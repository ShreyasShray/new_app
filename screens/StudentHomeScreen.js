import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import db from '../config'
import firebas from 'firebase';
import { Alert } from 'react-native';

export default class StudentHomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            user_id:firebas.auth().currentUser.email,
            class_code:'',
            doc_id:'',
            userJoinData:false
        }
    }

    joinUser=()=>{
        var userData;
        db.collection('users').where("email_id", "==", this.state.user_id)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                userData=doc.data()
            })
            console.log(userData)
            db.collection('classes').where("student_code", "==", this.state.class_code)
            .get()
            .then((snapshot)=>{
                snapshot.forEach((doc)=>{
                    this.setState({doc_id:doc.id})
                })
                db.collection("classes").doc(this.state.doc_id).collection("students").add({
                    email_id:userData.email_id,
                    contact:userData.contact,
                    address:userData.address,
                    first_name:userData.first_name,
                    last_name:userData.last_name
                })
            })
            .catch((error)=>{
                return Alert.alert("Code is Not Correct")
            })
        })
    }

    getUserJoinData=async()=>{
        db.collection('users').where("email_id", "==", this.state.user_id)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({userJoinData:doc.data().join})
            })
        })
    }

    componentDidMount=()=>{
        this.getUserJoinData()
    }

    render(){
        return(
                <View style={{flex:1, justifyContent:'center'}}>
                    {
                        this.state.userJoinData?(
                            <View>
                                <Text>Select Any Subject to Submmit the HomeWork</Text>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                >
                                    <Text style={styles.buttonText}>English</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                >
                                    <Text style={styles.buttonText}>Hindi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                >
                                    <Text style={styles.buttonText}>Math</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                >
                                    <Text style={styles.buttonText}>Science</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                >
                                    <Text style={styles.buttonText}>Social Science</Text>
                                </TouchableOpacity>
                            </View>
                        ):(
                            <View>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Class Code"
                        onChangeText={(text)=>{this.setState({class_code:text})}}
                    />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={()=>{this.joinUser()}}
                    >
                        <Text style={styles.buttonText}>Join</Text>
                    </TouchableOpacity>
                    </View>
                    )
                    }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputBox:{
        marginTop:200,
        width:280,
        borderWidth:1,
        paddingLeft:5,
        borderRadius:4,
        alignSelf:'center'
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
    }
})