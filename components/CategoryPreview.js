import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import style from '../styles/style';

var Datastore = require('react-native-local-mongodb'), outfitDb = new Datastore({ filename: 'outfits', autoload: true });
var Datastore = require('react-native-local-mongodb'), categoryDb = new Datastore({ filename: 'categories', autoload: true });


// Pass prop category id
export default class CategoryPreview extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        outfitDb.find({categories: this.props.categoryId}).limit(4).exec(function(err, docs){
            this.setState({
                outfits: docs,
            });
        }.bind(this));
    }

    render(){
        let pics = new Map()

        return(
            <View style={style.container}>

            </View>
        );
    }
}const style = StyleSheet.create({
    container:{
        flex: 1,
        width: 300,
        height: 300,
        flexWrap: 'wrap',
        backgroundColor: 'black',  
    },
});

