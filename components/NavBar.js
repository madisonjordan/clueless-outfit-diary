import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class NavBar extends React.Component{
    
    constructor(props){
        super(props);
        this.routeName = this.props.navigation.state.routeName;
    }

    render(){
        return(
            <View style={styles.container}>
                
                <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate('OutfitSearch')}
                    style={(this.routeName == 'OutfitSearch') ? 
                        [styles.button, styles.selectedButton] : 
                        styles.button}
                >
                    <Icon name="search" size={30}/>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate('CategoryList')}
                    style={(this.routeName == 'CategoryList') ? 
                        [styles.button, styles.selectedButton] : 
                        styles.button}
                >
                    <Icon name="th-large" size={30}/>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>this.props.navigation.navigate('EditOutfit')}
                    style={(this.routeName == 'EditOutfit') ? 
                        [styles.button, styles.selectedButton] : 
                        styles.button}
                >
                        <Icon name="plus" size={30}/>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#290017',
        //position: 'absolute',
        bottom: 0,
        maxHeight: '10%',
        width: '100%',
    },
    button: {
        margin: '1%',
        padding: '3%',
        borderRadius: 20,
        backgroundColor: '#B52F7B',
    },
    selectedButton: {
        backgroundColor: '#B52F7B',
    },
});


