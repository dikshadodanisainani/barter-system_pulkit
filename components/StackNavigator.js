import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import UserDetails from '../screens/UserDetails';
import {AppDrawerNavigator} from './AppDrawerNavigator';

export const StackNavigator=createStackNavigator({
    HomeScreen:{
        screen:AppDrawerNavigator,
        navigationOptions:{
            headerShown:false,
        }
    },

    Exchanger:{
        screen:UserDetails,
        navigationOptions:{
            headerShown:false,
        }
    }
},
{
    initialRouteName:'HomeScreen'
}
)

