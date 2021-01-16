import React,{components} from 'react';
import {Header,Icon} from 'react-native-elements';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';

const MyHeader=(props)=>
{
    return(
        <Header
        centerComponent={{text:props.title,style:{color:'#66CDAA',fontSize:20,fontWeight:'bold'}}}
        backgroundColor='#AFEEEE'
        />
    )
}

export default MyHeader;