import React from 'react'
import {Header} from 'react-native-elements';

const AppHeader =(props)=>{
    return(
        <Header containerStyle={{backgroundColor:"orange"}} centerComponent={{text:props.title, style:{fontSize:20, fontWeight:'bold', color:"white"}}}></Header>
    );
}

export default AppHeader;