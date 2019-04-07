import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import style from '../styles/style';
import NavBar from '../components/NavBar';
import LinearGradient from 'react-native-linear-gradient';
export default class CategoryList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(


            
// Within your render function
            <SafeAreaView style={style.container}>
                <View style={style.container}>
                    <Text>Category List Screen</Text>
                </View>

                <NavBar navigation={this.props.navigation} />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    saveButton:{
        flex: 1,
        // IDK how to get the text in the center of the button :(
        maxHeight: '10%',
        padding: '3%',
        margin: '1%',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    saveButtonText:{
        fontSize: 20,
        color: 'white',
    },
});
