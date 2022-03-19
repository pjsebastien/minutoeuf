import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

import TypeOfEggCard from '../components/home-page/TypeOfEggCard';
import LastRecipeCard from '../components/home-page/LastRecipeCard';

const Home = props => {
    const [activeCategory, setActiveCategory] = useState(`Minut'Oeuf`);
    const [query, setQuery] = useState('');

    const typeOffEggs = useSelector(state => state.typeOffEggs);
    const recipes = useSelector(state => state.recipes);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appActions.getTypeOffEggs());
        dispatch(appActions.getRecipes('createdAt'));
        // console.log(recipes.slice(0, 3));
    }, []);

    const handleOnSubmit = () => {
        props.navigation.navigate('SearchedRecipe', {
            query: query,
        });
    };

    const onPressCategoryHandle = category => {
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
                    <Text style={styles.heroText}>
                        Que veux tu cuisiner aujourd'hui ?
                    </Text>
                    <View style={styles.searchInput}>
                        <Feather
                            style={{ paddingHorizontal: 10 }}
                            name="search"
                            size={24}
                            color={Colors.secondaryYellow}
                        />
                        <TextInput
                            value={query}
                            onChangeText={text => setQuery(text)}
                            placeholder="Rechercher une recette..."
                            onSubmitEditing={() => handleOnSubmit()}
                        />
                    </View>
                    <View style={styles.buttonTopContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => onPressCategoryHandle("Minut'Oeuf")}
                        >
                            <Text
                                style={{
                                    ...styles.ButtonTopText,
                                    color: getColorCategory("Minut'Oeuf"),
                                }}
                            >
                                Minut'Oeuf
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => onPressCategoryHandle('Dernières recettes')}
                        >
                            <Text
                                style={{
                                    ...styles.ButtonTopText,
                                    color: getColorCategory('Dernières recettes'),
                                }}
                            >
                                Dernières recettes
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.cards}>
                            {activeCategory == "Minut'Oeuf" ? (
                                <TypeOfEggCard typeOffEggs={typeOffEggs} />
                            ) : (
                                <LastRecipeCard recipes={recipes.slice(0, 5)} />
                            )}
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default Home;

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
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backGroundColorSecondary,
        borderRadius: 25,
        padding: 10,
        fontSize: 16,
        marginTop: 15,
    },
    buttonTopContainer: {
        marginVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ButtonTopText: {
        fontFamily: 'Orkney-bold',
        fontSize: 18,
        color: Colors.textPrimary,
    },
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
