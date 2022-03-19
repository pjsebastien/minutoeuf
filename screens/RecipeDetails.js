import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import TopIcons from '../components/recipe-details/TopIcons';
import { MarkdownView } from 'react-native-markdown-view';
import IngredientsList from '../components/recipe-details/IngredientsList';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';
import GoBackButton from '../components/GoBackButton';

const RecipeDetails = ({ route }) => {
    const dispatch = useDispatch();
    const [recipe, setRecipee] = useState({});
    const ingredients = useSelector(state => state.ingredients);
    useEffect(() => {
        let { selectedRecipe } = route?.params;
        setRecipee(selectedRecipe);
        dispatch(appActions.getIngredients(selectedRecipe.name));
    }, []);
    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', zIndex: 2, marginHorizontal: 15 }}>
                <GoBackButton
                    customContainerStyle={{
                        marginTop: Platform.OS === 'android' ? 35 : 20,
                    }}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ImageBackground
                        style={styles.mainImage}
                        source={{
                            uri: recipe.image,
                        }}
                    ></ImageBackground>
                    <View style={styles.recipeContainer}>
                        <TopIcons recipe={recipe} />
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={styles.title}>{recipe.name}</Text>
                            <Text style={styles.categoryText}>{recipe.category}</Text>
                            <IngredientsList ingredients={ingredients.ingredients} />
                            <View style={{ marginVertical: 25 }}>
                                <MarkdownView styles={markdown}>
                                    {recipe.content}
                                </MarkdownView>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default RecipeDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColorMain,
    },
    mainImage: {
        height: Dimensions.get('window').height * 0.5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    recipeContainer: {
        top: Dimensions.get('window').height * -0.1,
        width: Dimensions.get('window').width,
        backgroundColor: Colors.backGroundColorMain,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        zIndex: 10,
    },
    title: {
        fontFamily: 'Source-serif-bold',
        fontSize: 22,
        marginBottom: 6,
        color: Colors.textPrimary,
    },
    categoryText: {
        fontSize: 16,
        fontFamily: 'Orkney-regular',
    },
});

const markdown = StyleSheet.create({
    heading4: {
        fontFamily: 'Source-serif-bold',
    },
    listItemUnorderedContent: {
        flex: 1,
        fontFamily: 'Orkney-regular',
    },
    list: {
        marginTop: 15,
        marginBottom: 25,
    },
    listItem: {
        marginVertical: 8,
    },
    paragraph: {
        fontFamily: 'Orkney-regular',
    },
});
