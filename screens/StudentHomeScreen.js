import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Modal
} from 'react-native';
import db from '../config'
import firebas from 'firebase';
import { ListItem } from 'react-native-elements'

export default class StudentHomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebas.auth().currentUser.email,
            user_details:'',
            class_code:'',
            classes:[],
            isModalVisible:false,
            heading:'',
            subject:''
        },
        this.requestRef = null
    }

    showModal=()=>{
        return(
            <Modal
                animationType="slide"
                visible={this.state.isModalVisible}
                transparent={false}
            >
                <TextInput
                    placeholder="Heading"
                    onChangeText={(text)=>{this.setState({heading})}}
                    style={[styles.inputBox, {marginTop:40}]}
                />
                <TextInput
                    placeholder="Subject"
                    onChangeText={(text)=>{this.setState({heading})}}
                    style={[styles.inputBox, {marginTop:40}]}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                >
                    <Text style={styles.buttonText}>Add Image</Text>
                </TouchableOpacity>
            </Modal>
        );
    }

    getUserDetails=async()=>{
        db.collection("users").where("email_id", "==", this.state.userId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({user_details:doc.data()})
                console.log(this.state.user_details)
            })
        })
    }

    joinUser=async()=>{
        db.collection("classes").where("student_code", "==", this.state.class_code)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var students = doc.data().students
                students.push(this.state.userId)
                db.collection("classes").doc(doc.id).update({
                    students:students
                })
                var student_details = doc.data().student_details
                student_details.push(this.state.user_details)
                db.collection("classes").doc(doc.id).update({
                    student_details:student_details
                })
                return Alert.alert("Class Joined")
            })
        })
    }

    getClasses=async()=>{
        this.requestRef = db.collection("classes").where("students", "array-contains", this.state.userId)
        .onSnapshot((snapshot)=>{
            var classes = snapshot.docs.map((doc)=>{return doc.data()})
            this.setState({classes:classes})
        })
    }

    componentDidMount=()=>{
        this.getClasses()
        this.getUserDetails()
    }
    
    componentWillUnmount=()=>{
        this.requestRef()
    }

    render(){
        return(
            <ScrollView style={{flex:1, backgroundColor:"#F8BE85"}}>
                {
                    this.showModal()
                }
                {
                    this.state.classes.length===0?(
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
                    ):(
                        <View>
                            <TouchableOpacity
                                style={[styles.buttonStyle, {marginTop:120}]}
                                onPress={()=>{this.setState({isModalVisible:true})}}
                            >
                                <Text style={styles.buttonText}>Submit Home Work</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </ScrollView>
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