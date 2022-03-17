import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';

const IngredientsList = ({ ingredients }) => {
    console.log(ingredients);
    const [count, setCount] = useState(2);
    return (
        <View>
            <View style={styles.countContainer}>
                <View style={styles.textCountContainer}>
                    <Text style={styles.countTitle}>Ingredients</Text>
                    <Text style={styles.countSubtitle}>Nombre de personnes ?</Text>
                </View>
                <View style={styles.buttonCountContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            count > 1 ? setCount(count - 1) : null;
                        }}
                        style={styles.buttonContent}
                    >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>{count}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            count <= 9 ? setCount(count + 1) : null;
                        }}
                        style={styles.buttonContent}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {ingredients.map((ingredient, index) => {
                return (
                    <View key={index}>
                        <View style={styles.cardIngredientsContainer}>
                            <View style={styles.containerItems}>
                                {/* <Image
                                    style={styles.cardImage}
                                    source={ingredient.image}
                                /> */}
                                <Text style={styles.cardIngredientName}>
                                    {ingredient.attributes.title}
                                </Text>
                            </View>
                            <View style={styles.containerItems}>
                                <Text style={styles.cardIngredientQuantity}>
                                    {ingredient.attributes.quantity > 0
                                        ? ingredient.attributes.quantity * count
                                        : null}{' '}
                                    {ingredient.attributes.mesure
                                        ? ingredient.attributes.mesure
                                        : null}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

export default IngredientsList;

const styles = StyleSheet.create({
    cardIngredientsContainer: {
        marginVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 25,
    },
    buttonCountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 90,
        height: 40,
        borderRadius: 15,
        backgroundColor: Colors.secondaryGrayLight,
    },
    countTitle: {
        fontFamily: 'Orkney-bold',
        fontSize: 20,
        color: Colors.textPrimary,
    },
    countSubtitle: {
        fontFamily: 'Orkney-bold',
        fontSize: 12,
        color: Colors.secondaryGray,
    },
    buttonContent: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Orkney-bold',
        fontSize: 16,
    },
    containerItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 20,
    },
    cardIngredientName: {
        marginLeft: 12,
        fontFamily: 'Orkney-bold',
        fontSize: 16,
        color: Colors.textPrimary,
    },
    cardIngredientQuantity: {
        fontFamily: 'Orkney-bold',
        fontSize: 16,
        color: Colors.secondaryGray,
    },
});
