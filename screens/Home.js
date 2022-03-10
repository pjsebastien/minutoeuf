import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Home = props => {
    const DATA = [
        {
            id: 0,
            title: 'First Item',
            image: require('../assets/temp/alacoque.jpg'),
        },
        {
            id: 1,
            title: 'Second Item',
            image: require('../assets/temp/dur.jpg'),
        },
        {
            id: 2,
            title: 'Third Item',
            image: require('../assets/temp/mollé.jpg'),
        },
    ];
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
                        <TextInput placeholder="Rechercher une recette..." />
                    </View>
                    <View style={styles.buttonTopContainer}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <Text style={styles.ButtonTopText}>Minut'Oeuf</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6}>
                            <Text style={styles.ButtonTopText}>Dernières recettes</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.cards}>
                            <FlatList
                                nestedScrollEnabled
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={DATA}
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
                                            props.navigation.navigate(
                                                'TimerInstruction',
                                                {
                                                    selectedRecipe: item,
                                                },
                                            )
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
                                                justifyContent: 'center',
                                                height:
                                                    Dimensions.get('window').height *
                                                    0.12,
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
                                            >
                                                {item.title}
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
    card: {
        width: 190,
        height: Dimensions.get('window').height * 0.55,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 15,
        marginRight: 25,
    },
    imageCard: {
        height: Dimensions.get('window').height * 0.43,
        width: 190,
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
