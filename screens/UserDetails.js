import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { Card,Header,Icon} from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';


export default class UserDetails extends Component
{
    constructor()
    {
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            exchangerId:this.props.navigation.state.param('details')["user_id"],
            exchangeId:this.props.navigation.state.param('details')["exchange_id"],
            itemName:this.props.navigation.state.param('details')["book_name"],
            description:this.props.navigation.state.param('details')["description"],
            exchangerName:'',
            exchangerContact:'',
            exchangerAddress:'',
            exchangerRequestDocId:'',
        }
    }
    getReceiverDetails()
    {
        db.collection('users').where('email_id','==',this.state.exchangerId).get()
        .then(snapshot=>
            {
                snapshot.forEach(doc=>
                    {
                        this.setState({
                          exchangerName:doc.data().first_name,
                          exchangerContact:doc.data().contact,
                          exchangerAddress:doc.data().address,
                        })
                    })
            })
            db.collection('exchanges').where('request_id','==',this.state.exchangeId).get()
            .then(snapshot=>
                {
                    snapshot.forEach(doc=>
                        {
                            this.setState({
                              exchangerRequestDocId:doc.id
                            })
                        })
                })
    }
    updateStatus=()=>
    {
        db.collection('MyBartars').add({
            item_name:this.state.itemName,
            request_id:this.state.exchangeId,
            exchanger_name:this.state.exchangerName,
            exchange_id:this.state.userId,
            exchange_status:'Interested',
        })
    }
    componentDidMount()
    {
        this.getReceiverDetails()
    }

    render()
    {
        return(
            <View style={styles.container}>
                <View style={{flex:0.1}}>
                    <Header
                    leftComponent={<Icon name ="arrow-left" type="feather" color='cyan' onPress={()=>
                    {
                        this.props.navigation.goBack()
                    }}/>}
                    centerComponent={{text:'Exchnage',style:{color:'aqau',fontSize:20,fontWeight:'bold'}}}
                    backgroundColor='lightblue'/>

                </View>
                
                <View style={{flex:0.3}}>
          <Card
              title={"Item Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.itemName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>About : {this.state.description}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Exchnager Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.exchangerName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.exchangerContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.exchangerAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.exchangerId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateStatus()
                  }}>
                <Text>Exchange</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'cyan',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})