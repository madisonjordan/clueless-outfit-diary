import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import style from '../styles/style';
import NavBar from '../components/NavBar';

// const outfitDb = new Datastore({filename: 'outfits', autoload: true});
// const categoryDb = new Datastore({filename: 'categories', autoload: true});
// const tagDb = new Datastore({filename: 'tags', autoload: true});

export default class OutfitSearch extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <SafeAreaView style={style.container}>
                <View style={style.container}>
                    <Text style={{fontSize: 30, color: 'white'}}>Search Outfits</Text>
                    <Text>Coming soon! ;-)</Text>
                </View>

                <NavBar navigation={this.props.navigation} />
            </SafeAreaView>
        );
    }
}
