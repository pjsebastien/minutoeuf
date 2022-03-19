import {
    FlatList,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../constants/Colors';

import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

import CardRecipe from '../components/CardRecipe';

const Recipes = () => {
    const [activeCategory, setActiveCategory] = useState('Petit-Déjeuner');
    const [fetchedRecipes, setFetchedRecipes] = useState([]);

    const recipes = useSelector(state => state.recipes);
    const categories = useSelector(state => state.categories);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appActions.getRecipes('createdAt'));
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
                    <CardRecipe
                        data={fetchedRecipes.length > 0 ? fetchedRecipes : recipes}
                    />
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
});
