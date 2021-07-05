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
    FlatList,
    Alert
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

export default class TeacherHomeScreen extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            isModalVisible:false,
            isModalVisible2:false,
            class_name:'',
            student_code:'',
            teacher_code:'',
            school_name:'',
            classes:[],
            name:'',
            contact:'',
            address:'',
            teacher_join_code:''
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

    showModal2=()=>{
        return(
            <Modal
                visible={this.state.isModalVisible2}
                animationType="slide"
                transparent={false}
            >
                <KeyboardAvoidingView>
                    <ScrollView>
                        <Text style={{marginTop:30, fontSize:18, fontWeight:'bold', textAlign:'center'}}>Join Class</Text>
                        <TextInput
                            placeholder="Class Code"
                            onChangeText={(text)=>{this.setState({teacher_join_code:text})}}
                            style={styles.inputBox}
                        />
                        <TouchableOpacity
                            style={styles.modalButtonStyle}
                            onPress={()=>{this.joinUser()}}
                        >
                            <Text style={styles.buttonText} >
                                Join
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButtonStyle, {marginBottom:50}]}
                            onPress={()=>{this.setState({isModalVisible2:false})}}
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

    joinUser=async()=>{
        db.collection("classes").where("teacher_code", "==", this.state.teacher_join_code)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var teachers = doc.data().teachers
                teachers.push(this.state.userId)
                db.collection("classes").doc(doc.id).update({
                    teachers:teachers
                })
                Alert.alert("Class Joined")
            })
        })
    }

    getUserDetails=async()=>{
        db.collection("users").where("email_id", "==", this.state.userId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    name:doc.data().first_name + " " + doc.data().last_name,
                    contact:doc.data().contact,
                    address:doc.data().address
                })
            })
        })
    }

    createClass=()=>{
        db.collection("classes").add({
            class_name:this.state.class_name,
            school_name:this.state.school_name,
            teacher_code:this.state.teacher_code,
            student_code:this.state.student_code,
            teachers:[{email_id:this.state.userId}]
        })
        return Alert.alert("Class created")
    }

    getClasses=async()=>{
        this.requestRef = db.collection("classes").where("teachers", "array-contains", this.state.userId)
        .onSnapshot((snapshot)=>{
            var classes = snapshot.docs.map((doc)=>{return doc.data()})
            this.setState({classes:classes})
        })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem=({item, i}) => {
        return(
            <ListItem
                key={i}
                title={item.class_name}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                rightElement={
                    <TouchableOpacity
                        style={[styles.buttonStyle, {marginTop:0, marginBottom:0}]}
                        onPress={()=>{this.props.navigation.navigate("StudentsList", {teacher_code:item.teacher_code})}}
                    >
                        <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        );
        }

    componentDidMount=()=>{
        this.getUserDetails()
        this.getClasses()
    }

    componentWillUnmount=()=>{
        this.requestRef()
    }

    render(){
        return(
            <View style={{flex:1, justifyContent:'center', backgroundColor:"#F8BE85"}}>
                <AppHeader title="Home Screen" />
                {
                    this.showModal()
                }
                {
                    this.showModal2()
                }
                <View>
                    {
                        this.state.classes.length === 0?(
                            <View>
                                <Text style={{marginTop:100, textAlign:'center', fontSize:20}}>
                                    No Classes Found Create or Join the class
                                </Text>
                            </View>
                        ):(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.classes}
                                renderItem={this.renderItem}
                                />
                        )
                    }
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={()=>{this.setState({isModalVisible2:true})}}
                    >
                        <Text style={styles.buttonText}>Join Class</Text>
                    </TouchableOpacity>
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
        marginTop:50,
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