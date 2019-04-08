import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import style from '../styles/style';
import NavBar from '../components/NavBar';
//import Datastore from 'react-native-local-mongodb';

var Datastore = require('react-native-local-mongodb'), outfitDb = new Datastore({ filename: 'outfits', autoload: true });
var Datastore = require('react-native-local-mongodb'), categoryDb = new Datastore({ filename: 'categories', autoload: true });
var Datastore = require('react-native-local-mongodb'), tagDb = new Datastore({ filename: 'tags', autoload: true });

export default class CategoryList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            outfits: [],
            categories: [],
            tags: [],
        };

        this.reloadDatabases.bind(this);
    }

    componentDidMount(){
        this.reloadDatabases();
    }

    reloadDatabases(){
        outfitDb.loadDatabase(function(err){
            let outfits = outfitDb.find({}, function(err, docs){
                this.setState({
                    outfits: docs
                });
            }.bind(this));
        }.bind(this));

        // categoryDb.loadDatabase(function(err){
        //    let categories = categoryDb.find({}, function(err, docs){
        //         this.setState({
        //             categories: docs,
        //         });
        //     }.bind(this)); 
        // }.bind(this));
        // tagDb.loadDatabase(function(err){
        //     let tags = tagDb.find({}, function(err, docs){
        //         this.setState({
        //             tags: docs,
        //         });
        //     }.bind(this));
        // }.bind(this));
    }

    render(){

        var outfits = this.state.outfits.map( (doc) => (<Image source={{uri: doc.image}} style={{height: 300, width: 300, resizeMode: 'contain'}}/>));

        return(
            <SafeAreaView style={style.container}>
                <View style={style.container}>
                    <Text style={{fontSize: 30, color: 'white'}}>Outfits</Text>

                    <ScrollView contentContainerstyle={style.scrollView}>
                        {outfits}
                    </ScrollView>
                </View>

                <NavBar navigation={this.props.navigation} />
            </SafeAreaView>
        );
    }
}
