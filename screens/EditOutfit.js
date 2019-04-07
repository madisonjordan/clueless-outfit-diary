import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import style from '../styles/style';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/Feather';

const defaultImg = require('../images/default-outfit.jpg');
const imagePickerOptions = {
    title: 'Select outfit image'
};

export default class EditOutfit extends React.Component{
    constructor(props){
        super(props);

        this.state={
            imageUri: '',
            allCategories: [],
            allTags: [],
            categories: [],
            tags: [],
        };
    }

    // componentDidMount(){
    // }

    render(){
        var source;
        if (this.state.imageUri == ''){
            source = defaultImg;
        } else{
            source = {uri: this.state.imageUri};
        }

        return(
            <SafeAreaView style={style.container}>
                <View style={style.container}>

                    <Text>Edit Outfit Screen</Text>

                    <Image source={source} style={{width: 400, height: 400, resizeMode: 'contain'}}/>

                    <TouchableOpacity onPress={this.pressCamera.bind(this)} style={{flex: 1, alignItems: 'center'}}>
                        <Text>Select image</Text>
                        <Icon name="camera" size={30} />
                    </TouchableOpacity>

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

    pressCamera(){
        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            if (response.uri){
                this.updateImage(response.uri);
            }
        });
    }

    updateImage(path){
        this.setState({
            imageUri: path
        });
    }
}

const styles = StyleSheet.create({
    outfitImage:{
        height: '40%',
    },
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
