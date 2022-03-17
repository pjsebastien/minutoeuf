import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';
import { useEffect } from 'react';

const Recipes = props => {
    const [activeCategory, setActiveCategory] = useState('Petit-Déjeuner');
    const [fetchedRecipes, setFetchedRecipes] = useState([]);
    const recipes = useSelector(state => state.recipes);
    const categories = useSelector(state => state.categories);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appActions.getRecipes('id'));
        dispatch(appActions.getCategories());
        setFetchedRecipes(recipes);
    }, []);

    const onPressCategoryHandle = category => {
        const selectedCategoryRecipes = recipes.filter(
            recipe => recipe.category == category,
        );
        setFetchedRecipes(selectedCategoryRecipes);
        return setActiveCategory(category);
    };

    const getColorCategory = category => {
        if (activeCategory == category) {
            return Colors.textPrimary;
        }
        return Colors.secondaryGray;
    };
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
                    <Text style={styles.heroText}>Choisir la catégorie</Text>
                    <View style={styles.buttonTopContainer}>
                        <FlatList
                            nestedScrollEnabled
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={categories}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => onPressCategoryHandle(item.name)}
                                >
                                    <Text
                                        style={{
                                            ...styles.ButtonTopText,
                                            color: getColorCategory(item.name),
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.cards}>
                            <FlatList
                                nestedScrollEnabled
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={
                                    fetchedRecipes.length > 0 ? fetchedRecipes : recipes
                                }
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        activeOpacity={0.8}
                                        style={{
                                            ...styles.card,
                                            backgroundColor:
                                                item.id % 2
                                                    ? Colors.secondaryYellowLight
                                                    : Colors.backGroundColorSecondary,
                                        }}
                                        onPress={() =>
                                            props.navigation.navigate('RecipeDetails', {
                                                selectedRecipe: item,
                                            })
                                        }
                                    >
                                        <Image
                                            source={{
                                                uri: item.image,
                                            }}
                                            style={styles.imageCard}
                                        />
                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingVertical: 10,
                                                paddingHorizontal: 5,
                                                height:
                                                    Dimensions.get('window').height *
                                                    0.25,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...styles.cardText,
                                                    color:
                                                        item.id % 2
                                                            ? Colors.textPrimaryLight
                                                            : Colors.textPrimary,
                                                }}
                                                numberOfLines={3}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...styles.cardText,
                                                    color:
                                                        item.id % 2
                                                            ? Colors.textPrimaryLight
                                                            : Colors.textPrimary,
                                                }}
                                            >
                                                {item.difficulty}
                                            </Text>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Ionicons
                                                    name="timer"
                                                    size={16}
                                                    color={
                                                        item.id % 2
                                                            ? Colors.textPrimaryLight
                                                            : Colors.textPrimary
                                                    }
                                                />
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        color:
                                                            item.id % 2
                                                                ? Colors.textPrimaryLight
                                                                : Colors.textPrimary,
                                                    }}
                                                >
                                                    {item.time} min
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default Recipes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColorMain,
    },
    heroText: {
        marginTop: Platform.OS === 'android' ? 50 : 30,
        fontFamily: 'Source-serif-bold',
        fontSize: 28,
        marginBottom: 16,
        color: Colors.textPrimary,
    },
    buttonTopContainer: {
        marginVertical: 18,
        flexDirection: 'row',
    },
    ButtonTopText: {
        fontFamily: 'Orkney-bold',
        fontSize: 18,
        marginRight: 50,
    },
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    card: {
        width: 220,
        height: Dimensions.get('window').height * 0.68,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 15,
        marginRight: 25,
    },
    imageCard: {
        height: Dimensions.get('window').height * 0.43,
        width: 220,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: 'cover',
    },
    cardText: {
        fontSize: 18,
        marginTop: 2,
        letterSpacing: 0.5,
        fontFamily: 'Orkney-bold',
    },
});
