import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Datastore from 'react-native-local-mongodb';
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import CategoryList from './screens/CategoryList';
import OutfitSearch from './screens/OutfitSearch';
import SelectOutfitImage from './screens/SelectOutfitImage';
import EditOutfit from './screens/EditOutfit';

const MainNavigator = createStackNavigator(
    {
        CategoryList:       {screen: CategoryList},
        OutfitSearch:       {screen: OutfitSearch},
        SelectOutfitImage:  {screen: SelectOutfitImage},
        EditOutfit:         {screen: EditOutfit},
    },
    {
        initialRouteName: 'CategoryList',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        },
    }
);

const App = createAppContainer(MainNavigator);

export default App;
