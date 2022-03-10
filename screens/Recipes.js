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

const Recipes = props => {
    const categories = [
        {
            id: 0,
            title: 'Petit-Déjeuner',
            image: require('../assets/temp/alacoque.jpg'),
        },
        {
            id: 1,
            title: 'Entrée',
            image: require('../assets/temp/dur.jpg'),
        },
        {
            id: 2,
            title: 'Plat chaud',
            image: require('../assets/temp/mollé.jpg'),
        },
        {
            id: 3,
            title: 'Dessert',
            image: require('../assets/temp/mollé.jpg'),
        },
    ];
    const recipes = [
        {
            id: 0,
            title: 'Oeufs mimosas au saumon et a la feta du sud ouest',
            image: require('../assets/temp/alacoque.jpg'),
        },
        {
            id: 1,
            title: 'Omelette au jambon et aux champignons',
            image: require('../assets/temp/dur.jpg'),
        },
        {
            id: 2,
            title: 'Third Item',
            image: require('../assets/temp/mollé.jpg'),
        },
    ];
    const [activeCategory, setActiveCategory] = useState('Petit-Déjeuner');

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
                                    onPress={() => onPressCategoryHandle(item.title)}
                                >
                                    <Text
                                        style={{
                                            ...styles.ButtonTopText,
                                            color: getColorCategory(item.title),
                                        }}
                                    >
                                        {item.title}
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
                                data={recipes}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        activeOpacity={0.8}
                                        style={{
                                            ...styles.card,
                                            backgroundColor:
                                                item.id % 2
                                                    ? Colors.secondaryYellow
                                                    : Colors.backGroundColorSecondary,
                                        }}
                                        onPress={() =>
                                            props.navigation.navigate('RecipeDetails', {
                                                selectedRecipe: item,
                                            })
                                        }
                                    >
                                        <Image
                                            source={item.image}
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
                                                {item.title}
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
                                                Facile
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
                                                    3-5 min
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
