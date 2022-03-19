import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CardRecipe = ({ data }) => {
    const navigation = useNavigation();
    return (
        <View style={{ marginVertical: 10 }}>
            <View style={styles.cards}>
                <FlatList
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data}
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
                                navigation.navigate('RecipeDetails', {
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
                                    height: Dimensions.get('window').height * 0.25,
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
    );
};

export default CardRecipe;

const styles = StyleSheet.create({
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
