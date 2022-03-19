import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import Colors from '../constants/Colors';

import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

import CardRecipe from '../components/CardRecipe';
import GoBackButton from '../components/GoBackButton';

const SearchedRecipe = ({ route }) => {
    const dispatch = useDispatch();
    const searchedRecipes = useSelector(state => state.searchedRecipes);

    useEffect(() => {
        let { query } = route?.params;
        dispatch(appActions.getSearchedRecipes(query));
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
                    <GoBackButton
                        title={
                            searchedRecipes.length > 1
                                ? `${searchedRecipes.length} Résultats`
                                : `${searchedRecipes.length} Résultat`
                        }
                        customContainerStyle={{
                            marginTop: Platform.OS === 'android' ? 50 : 30,
                            marginBottom: 20,
                        }}
                    />
                    {!searchedRecipes.length ? (
                        <>
                            <Text style={styles.notFound}>
                                Désolé, il n'y a aucune recette correspondante à votre
                                recherche.
                            </Text>
                        </>
                    ) : (
                        <>
                            <View style={styles.buttonTopContainer}>
                                <Text style={styles.ButtonTopText}>
                                    Dévouvrez nos recettes :
                                </Text>
                            </View>
                            <CardRecipe data={searchedRecipes} />
                        </>
                    )}
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default SearchedRecipe;

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
    notFound: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'rgba(0, 0,0 , 0.3)',
        marginTop: 30,
        textAlign: 'center',
    },
});
