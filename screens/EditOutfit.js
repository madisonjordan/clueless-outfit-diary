import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import style from '../styles/style';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/Feather';
import SelectMultiple from 'react-native-select-multiple'
import TextInputWrapper from '../components/TextInputWrapper';
import Dialog from "react-native-dialog";
//import Datastore from 'react-native-local-mongodb';

var Datastore = require('react-native-local-mongodb')
, outfitDb = new Datastore({ filename: 'outfits', autoload: true });
var Datastore = require('react-native-local-mongodb')
, categoryDb = new Datastore({ filename: 'categories', autoload: true });
var Datastore = require('react-native-local-mongodb')
, tagDb = new Datastore({ filename: 'tags', autoload: true });

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
            newCategories: [],
            allTags: [],
            newTags: [],
            categories: [],
            tags: [],
            newTag: '',
            newCategory: '',
            dialogVisible: false,
        };
    }

    componentDidMount(){
        this.getCategories();
        this.getTags();
    }

    render(){
        var source;
        if (this.state.imageUri == ''){
            source = defaultImg;
        } else{
            source = {uri: this.state.imageUri};
        }

        return(
            <SafeAreaView style={style.safeArea}>
                <ScrollView contentContainerStyle={style.container}>

                    <Image source={source} style={{width: 400, height: 400, resizeMode: 'contain'}}/>

                    <TouchableOpacity onPress={this.pressCamera.bind(this)} style={{flex: 1, alignItems: 'center'}}>
                        <Text>Select image</Text>
                        <Icon name="camera" size={30} />
                    </TouchableOpacity>

                    <View style={style.container}>
                        <Text>Categories</Text>

                        <SelectMultiple 
                            items={this.state.allCategories}
                            selectedItems={this.state.categories}
                            onSelectionsChange={this.onSelectedCategoriesChange.bind(this)}
                        />

                        <TouchableOpacity onPress={()=>this.setState({dialogVisible: true})}>
                            <Icon name="plus" size={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={style.container}>
                        <Text>Tags</Text>

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <TextInputWrapper
                                value={this.state.newTag}
                                onChangeText={text=>this.setState({newTag: text})}
                                textContentType="none"
                                placeholder="New tag"
                            />
                            <TouchableOpacity onPress={this.addNewTag.bind(this)}>
                                <Icon name="plus" size={20} />
                            </TouchableOpacity>
                        </View>

                        <SelectMultiple 
                            items={this.state.allTags}
                            selectedItems={this.state.tags}
                            onSelectionsChange={this.onSelectedTagsChange.bind(this)}
                        />
                    </View>

                    <TouchableOpacity onPress={this.pressSave.bind(this)} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>SAVE</Text>
                    </TouchableOpacity>

                </ScrollView>

                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>New category</Dialog.Title>

                    <Dialog.Input value={this.state.newCategory} onChangeText={text=>this.setState({newCategory: text})}/>

                    <Dialog.Button label="Add" onPress={this.addNewCategory.bind(this)} />
                    <Dialog.Button label="Cancel" onPress={()=>this.setState({dialogVisible: false})} />
                </Dialog.Container>

            </SafeAreaView>
        );
    }

    cancelNewCategory(){
        this.setState({dialogVisible: false});
        this.setState({newCategory: ''});
    }

    getCategories(){
        categoryDb.find({}, function(err, docs){
            this.setState({allCategories: docs});
        }.bind(this));
    }

    updateCategories(){
        let newCategories = this.state.newCategories;
        for(let c of newCategories){
            categoryDb.insert(c);
        }
    }

    getTags(){
        tagDb.find({}, function(err, docs){
            this.setState({allTags: docs})
        }.bind(this));
    }

    updateTags(){
        let newTags = this.state.newTags;
        for(let t of newTags){
            tagDb.insert(t);
        }
    }

    addNewCategory(){
        let newCategory = this.state.newCategory;
        if(!newCategory || newCategory == ''){
            this.setState({dialogVisible: false});
            return;
        }

        let currentSelectedCategories = this.state.categories;
        currentSelectedCategories.unshift(newCategory);
        this.setState({categories: currentSelectedCategories});

        let currentAllCategories = this.state.allCategories;
        currentAllCategories.unshift(newCategory);
        this.setState({categories: currentAllCategories});

        let newCategories = this.state.newCategories;
        newCategories.unshift(newCategories);
        this.setState({
            newCategories: newCategories
        });  

        // Add to allCategories global list

        this.setState({dialogVisible: false});
    }

    addNewTag(){
        let newTag = this.state.newTag;
        if (!newTag || newTag == '' ){
            return;
        }

        let currentSelectedTags = this.state.tags;
        currentSelectedTags.unshift(newTag);
        this.setState({
            tags: currentSelectedTags
        });

        let currentAllTags = this.state.allTags;
        currentAllTags.unshift(newTag);
        this.setState({
            allTags: currentAllTags
        });

        let newTags = this.state.newTags;
        newTags.unshift(newTag);
        this.setState({
            newTags: newTags
        });        
        // Add to allTags global list
    }

    onSelectedTagsChange = (selectedItems) => {
        this.setState({
            tags: selectedItems
        });
    }

    onSelectedCategoriesChange = (selectedItems) => {
        this.setState({
            categories: selectedItems
        });
    }

    pressSave(){
        if(!this.state.imageUri || this.state.imageUri == ''){
            alert(`Please select an image for your outfit`);
            return;
        }

        let newOutfit = {
            image: this.state.imageUri,
            tags: this.state.tags,
            categories: this.state.categories,
        };

        outfitDb.insert(newOutfit, function(error, newDoc){
            if(error){
                alert(`Failed to insert outfit into the database:\n${error}\n`);
                return;
            }         
    
            this.updateTags();
            this.updateCategories();
            this.props.navigation.goBack();
        }.bind(this));
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

const renderLabel = (label, style) => {
    return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{label}</Text>
        </View>
    );
};

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
