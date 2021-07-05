import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native'; 
import firebase from 'firebase';
import db from '../config';
import { ListItem } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

export default class ListOfStudentsScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            students:[],
            teacher_code:this.props.navigation.getParam("teacher_code")
        }
    }

    getStudents=async()=>{
        db.collection("classes").where("teacher_code", "==", this.state.teacher_code)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({students:doc.data().student_details})
                console.log(this.state.students)
            })
        })
    }

    keyExtractor=(item, index)=> index.toString()

    renderItem=({item, i})=>{
        return(
            <ListItem
                key={i}
                title={item.first_name + " " + item.last_name}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                rightElement={
                    <TouchableOpacity
                        style={[styles.buttonStyle,{marginTop:0}]}
                        onPress={()=>{this.props.navigation.navigate("HWScreen", {details:item})}}
                    >
                        <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider={true}
            ></ListItem>
        );
    }

    componentDidMount=()=>{
        this.getStudents()
    }

    render(){
        return(
            <ScrollView style={{flex:1, backgroundColor:"#F8BE85"}}>
                <AppHeader title="List Of Students" />
                {
                    this.state.students.length===0?(
                        <View>
                            <Text style={{marginTop:200, textAlign:'center', fontSize:20}}>No Students Found</Text>
                        </View>
                    ):(
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.students}
                            renderItem={this.renderItem}
                        ></FlatList>
                    )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
})