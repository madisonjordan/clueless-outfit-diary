import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';


// props:
// - value (required)
// - onChangeText (required)
// - textContentType (required)
// - placeholder
export default class TextInputWrapper extends React.Component{
    render(){
        return(
            <View
                style={{backgroundColor: 'white', width: '30%', padding: '2%', borderRadius: 10}}
            >
                <TextInput
                    value={this.props.value}
                    onChangeText={text => this.__onChangeText(text)}
                    placeholder={this.props.placeholder}
                    placeholderTextColor="gray"
                    textContentType={this.props.textContentType}
                />
            </View>
        );
    }

    __onChangeText(text){
        this.props.onChangeText(text);
    }
}