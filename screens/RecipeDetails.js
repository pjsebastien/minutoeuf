import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import TopIcons from '../components/recipe-details/TopIcons';
import IngredientsList from '../components/recipe-details/IngredientsList';
import { useEffect } from 'react';

const RecipeDetails = ({ route }) => {
    const [recipe, setRecipee] = useState({});
    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        let { selectedRecipe } = route?.params;
        setRecipee(selectedRecipe);
        setIngredients(selectedRecipe.ingredients);
    }, []);
    console.log(recipe.ingredients);
    return (
        <View style={styles.container}>
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
                            <IngredientsList ingredients={ingredients} />
                            <Text>{recipe.content}</Text>
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
