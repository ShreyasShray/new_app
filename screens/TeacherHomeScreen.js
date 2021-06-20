import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    FlatList
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class TeacherHomeScreen extends React.Component{

    constructor(){
        super();
        this.state={
            user_id:firebase.auth().currentUser.email,
            isModalVisible:false,
            class_name:'',
            student_code:'',
            teacher_code:'',
            school_name:'',
            classes:[],
            doc_id:''
        },
        this.requestRef=null
    }

    showModal=()=>{
        return(
            <Modal
                visible={this.state.isModalVisible}
                animationType="slide"
                transparent={false}
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
                        <TouchableOpacity
                            style={styles.modalButtonStyle}
                            onPress={()=>{this.createClass()}}
                        >
                            <Text style={styles.buttonText} >
                                Create
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButtonStyle, {marginBottom:50}]}
                            onPress={()=>{this.setState({isModalVisible:false})}}
                        >
                            <Text style={styles.buttonText} >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        );
    }

    createClass=()=>{
        db.collection("classes").add({
            class_name:this.state.class_name,
            school_name:this.state.school_name,
            teacher_code:this.state.teacher_code,
            student_code:this.state.student_code
        })
        db.collection('users').where("email_id", "==", this.state.user_id)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({doc_id:doc.id})
            })
            db.collection('users').doc(this.state.doc_id).update({
                code:this.state.teacher_code
            })
        })
    }

    getClasses=async() => {
        var teacherCode;
        db.collection('users').where("email_id", "==", this.state.user_id)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                teacherCode=doc.data().code
            })
            this.requestRef = db.collection('classes').where("teacher_code", "==", teacherCode)
            .onSnapshot((snapshot)=>{
                var requestedClass = snapshot.docs.map((document)=>{return document.data()})
                this.setState({classes:requestedClass})
                console.log(this.state.classes)
            })

        })
    }

    componentDidMount=()=>{
        this.getClasses()
    }

    componentWillUnmount=()=>{
        this.requestRef()
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
                        onPress={()=>{this.setState({isModalVisible:true})}}
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
        marginTop:200,
        marginBottom:50,
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
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold'
    },
    inputBox:{
        alignSelf:'center',
        marginTop:40,
        borderWidth:1,
        borderRadius:4,
        paddingLeft:4,
        width:280
    },
    modalButtonStyle:{
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
    } 
})