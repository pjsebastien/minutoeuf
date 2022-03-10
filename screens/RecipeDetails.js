import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import TopIcons from '../components/recipe-details/TopIcons';
import IngredientsList from '../components/recipe-details/IngredientsList';

const RecipeDetails = () => {
    const recipe = {
        title: 'Oeufs mimosas au saumon et a la feta du sud ouest',
        category: 'Petit déjeuner',
        image: require('../assets/temp/alacoque.jpg'),
        difficulty: 'Facile',
        time: '20 min',
        ingredients: [
            {
                id: 0,
                name: 'Saumon',
                quantity: 300,
                mesure: 'gr',
                image: require('../assets/temp/dur.jpg'),
            },
            {
                id: 1,
                name: 'Oeuf',
                quantity: 1,
                mesure: '',
                image: require('../assets/temp/mollé.jpg'),
            },
            {
                id: 2,
                name: 'Feta',
                quantity: 100,
                mesure: 'gr',
                image: require('../assets/temp/poché.jpg'),
            },
        ],
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ImageBackground
                        style={styles.mainImage}
                        source={recipe.image}
                    ></ImageBackground>
                    <View style={styles.recipeContainer}>
                        <TopIcons recipe={recipe} />
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={styles.title}>{recipe.title}</Text>
                            <Text style={styles.categoryText}>{recipe.category}</Text>
                            <IngredientsList ingredients={recipe.ingredients} />
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
