import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import style from '../styles/style';

export default class EditOutfit extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <SafeAreaView style={style.container}>
                <View style={style.container}>

                    <Text>Edit Outfit Screen</Text>

                    
                    <TouchableOpacity onPress={this.pressSave.bind(this)} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>SAVE</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        );
    }

    pressSave(){
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    saveButton:{
        flex: 1,
        // IDK how to get the text in the center of the button :(
        maxHeight: '10%',
        padding: '3%',
        margin: '1%',
        backgroundColor: 'red',
        borderRadius: 20,
    },
    saveButtonText:{
        fontSize: 20,
        color: 'white',
    },
});
