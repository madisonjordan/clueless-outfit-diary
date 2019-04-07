import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import style from '../styles/style';
import NavBar from '../components/NavBar';

export default class CategoryList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <SafeAreaView style={style.container}>
                <View style={style.container}>
                    <Text>Category List Screen</Text>
                </View>

                <NavBar navigation={this.props.navigation} />
            </SafeAreaView>
        );
    }
}
