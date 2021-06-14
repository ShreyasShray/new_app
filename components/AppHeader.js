import React from 'react'
import {Header} from 'react-native-elements';

const AppHeader =(props)=>{
    return(
        <Header centerComponent={{text:props.title, style:{fontSize:20, fontWeight:'bold', color:"#000", backgroundColor:'skyblue'}}}></Header>
    );
}

export default AppHeader;