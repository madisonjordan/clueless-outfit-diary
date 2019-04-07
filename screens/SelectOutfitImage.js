import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import style from '../styles/style';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/Feather';

const options = {
    title: 'Select outfit image',
};

export default class SelectOutfitImage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <SafeAreaView style={style.container}>
                <View style={style.container}>
                    <Text>Select an image for your new outfit</Text>
                </View>

                <TouchableOpacity onPress={this.pressCamera.bind(this)}>
                    <Icon name="camera" size={30} />
                </TouchableOpacity>

            </SafeAreaView>
        );
    }

    pressCamera(){
        ImagePicker.showImagePicker(options, (response) => {
            if(response.didCancel){
                console.log(`nvm`);
            } else if(response.error){
                console.error(`Uh oh\n${response.error}`);
            } else{
                const imgPath = response.uri;

                this.props.navigation.navigate('EditOutfit', {
                    outfitImage: imgPath
                })
            }
        });
    }
}
